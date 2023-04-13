import pandas as pd
import os
from dotenv import load_dotenv
from zipfile import ZipFile
import requests
import aiohttp
import asyncio
import traceback
from aiolimiter import AsyncLimiter
import matplotlib.pyplot as plt

load_dotenv()
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

def get_access_token():
    endpoint = "https://accounts.spotify.com/api/token"
    params = {"grant_type": "client_credentials", "client_id": CLIENT_ID, "client_secret": CLIENT_SECRET}
    res = requests.post(f"{endpoint}/", headers={"Content-Type": "application/x-www-form-urlencoded"}, params=params)
    return res.json()['access_token']


def get_headers(auth_token):
    headers = {
        "credentials": "include",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Authorization": f"Bearer {auth_token}",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "Sec-GPC": "1",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "referrer": "https://developer.spotify.com/",
        "method": "GET",
        "mode": "cors"
    }
    return headers

#%%
# auth_mgr = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
# sp = spotipy.Spotify(auth_manager=auth_mgr)
# songs = pd.read_csv('dataset/spotify_millsongdata.csv')
# songs = songs.sample(100)
# res = sp.search("I've%20Been%20Thinking%20About%20You%20artist:Mariah%20Carey", limit=1)

# %%
# calls the search endpoint
# can take in track and artist as filters
# e.g. artist:Mariah Carey Hero
semaphore = asyncio.BoundedSemaphore(100)
rate_limiter = AsyncLimiter(1, 0.001)
async def get_track_json(song: str):
    endpoint = "https://api.spotify.com/v1/search"
    params = {
        "q": song,
        "type": "track",
        "limit": 1
    }

    headers = get_headers(get_access_token())

    session = aiohttp.ClientSession(connector=aiohttp.TCPConnector(limit=100), headers=headers)
    success = False
    retries = 0
    max_retries = 3
    async with session:
        while not success and retries < max_retries:
            try:
                async with session.get(endpoint, params=params) as resp:
                    if resp.status == 200:
                        data = await resp.json()
                        print("getting " + song)
                        success = True
                        return data['tracks']['items'][0]
                    elif resp.status == 401:
                        token = get_access_token()
                        session.headers["Authorization"] = "Bearer " + str(token)
                        retries += 1
                    elif resp.status == 429:
                        retries = 3
                        raise RuntimeError(f"{resp.status}: {await resp.text()}")
                    else:
                        print(f"{resp.status}: {await resp.text()}")
                        retries += 1
            except Exception as e:
                retries += 1
                traceback.print_exc()
                print("Retrying " + song)
                await asyncio.sleep(1)
    if not success:
        print(song + " failed after maximum retries")

#%%
file_names = []
with ZipFile("../dataset/corpus.zip", "r") as zp:
    file_names = zp.namelist()[1:]  # remove the current directory file: corpus/

song_df = pd.DataFrame(file_names, columns=['filepath'])


def extract_song(filepath: str):
    start_len = 7  # 'corpus/'
    end_len = 4  # '.txt'
    song = filepath[start_len:-end_len]
    song = song.replace("_", " ")
    return song


# %%
song_df['artist+song'] = song_df.apply(lambda s: extract_song(s['filepath']), axis=1)
# %%
results = []
async def fetch():
    # do batches of 400 at a time, save to file
    num_songs = song_df.shape[0]
    start = 0
    end = 500
    while start < 5000:
        tasks = [get_track_json(song_df.iloc[i]['artist+song']) for i in range(start, end)]
        global results
        results = await asyncio.gather(*tasks, return_exceptions=True)
        json_df = pd.json_normalize(results).fillna("UNKNOWN")
        artist_json_df = pd.json_normalize(json_df['artists'])[0]
        artist_df = pd.json_normalize(artist_json_df)
        json_selected_df = json_df[["id", "name", "duration_ms", "explicit", "popularity", "album.release_date"]]
        json_selected_df.insert(1, "artist", artist_df['name'])
        json_selected_df.to_csv("../dataset/api_data_5k.csv", mode="a", header=False, index=False)
        print(f"Completed {end}/{num_songs} songs")
        start += min(500, num_songs - start)
        end += 500

    print("DONE")

def main():
    # asyncio.run(fetch())

#%%
    api_data = pd.read_csv("dataset/api_data_5k.csv", names=["id", "artist", "title", "duration_ms", "explicit", "popularity", "release_date"])
    api_data['year'] = pd.to_datetime(api_data['release_date'], format='mixed', errors='coerce').dt.year
    temp = song_df.join(api_data)
#%%
    temp.to_csv("dataset/corpus_5k_spotify.csv")

#%%
    plt.hist(temp['year'], range=[1933, 2023], bins=90, color="#1DB954")
    # histoyear = temp['year'].hist(bins=50)
    plt.xlim(1933, 2023)
    plt.title("Frequency of Songs by Release Year")
    plt.ylabel("Count")
    plt.xlabel("Release Year")
    plt.show()
