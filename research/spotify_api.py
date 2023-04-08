import pandas as pd
import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv

load_dotenv()
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
auth_mgr = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(auth_manager=auth_mgr)

#%%
songs = pd.read_csv('dataset/spotify_millsongdata.csv')
songs = songs.sample(100)
res = sp.search("I've%20Been%20Thinking%20About%20You%20artist:Mariah%20Carey", limit=1)
# song = sp.track('7gZACjanWmzBcl1tOtFWSY')

#%%
# can take in track and artist as filters
# e.g. track:
def get_track_json(title, artist):
    try:
        json = sp.search(f"{title} artist:{artist}", limit=1)
        return json['tracks']['items'][0]
    except Exception:
        return None

def get_track_id(json):
    try:
        return json['id']
    except Exception:
        return None

def get_track_popularity(json):
    try:
        return json['popularity']
    except Exception:
        return None

def get_track_date(json):
    try:
        return json['album']['release_date']
    except Exception:
        return None

# song_json = get_track_json(songs['song'])
song_jsons = songs.apply(lambda s: get_track_json(s['song'], s['artist']), axis=1)
#%%
songs['track_spotify_id'] = song_jsons.apply(lambda s: get_track_id(s))
songs['popularity'] = song_jsons.apply(lambda s: get_track_popularity(s))
songs['release_date'] = song_jsons.apply(lambda s: pd.to_datetime(get_track_date(s)))
songs['year'] = songs['release_date'].dt.year.astype('Int64')
#%%
songs.dropna(inplace=True)
# songs['audio_features'] = sp.audio_features(list(songs['track_spotify_id']))
audio_flat = pd.json_normalize(sp.audio_features(list(songs['track_spotify_id'])))
songs = songs.reset_index(drop=True)
songs = songs.merge(audio_flat, left_on="track_spotify_id", right_on="id")
songs.drop("id", axis=1, inplace=True)
