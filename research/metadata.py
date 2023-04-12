import os
import requests
import urllib.parse
import logging
import time
import json
import numpy as np

SPOTIFY_URL = "https://api.spotify.com/v1"
BEARER_TOKEN = ""

def get_song_paths(root_path: str):
    song_paths = []
    directory = os.fsencode(root_path)

    for file in os.listdir(directory):
        filename = os.fsdecode(file)
        song_paths.append(filename)

    return song_paths

def parse_song_path(path: str):
    tokens = path.replace("_", " ")
    return tokens

def get_track(song_path: str):
    global BEARER_TOKEN
    tokens = parse_song_path(song_path)
    query = urllib.parse.quote(tokens)
    url = f"{SPOTIFY_URL}/search?q={query}&type=track"
    headers = {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "authorization": BEARER_TOKEN,
            "cache-control": "no-cache",
            "origin": "https://developer.spotify.com",
            "pragma": "no-cache",
            "referer": "https://developer.spotify.com/",
            "sec-ch-ua": '"Brave";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "sec-gpc": "1",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
    }

    try:
        response = requests.get(url, headers=headers, timeout=5)

        if response is None:
            logging.warn(f"failed to retrieve {song_path};")
            return None
        elif response.status_code == 429 or response.status_code == 400 or response.status_code == 401:
            logging.error(f"need to update Spotify Bearer token!")
            BEARER_TOKEN = input("Enter the refreshed spotify bearer token: ")
            return get_track(song_path)

        elif response.status_code != 200:
            logging.warn(f"failed to retrieve {song_path}; got status {response.status_code}")
            return None

        response = response.json()
        if response is None or len(response["tracks"]["items"]) == 0:
            return None

        response = response["tracks"]["items"][0]

        artists = [artist["name"] for artist in response.get("artists", [])]
        popularity = response.get("popularity", None)
        release_date = response["album"].get("release_date", None)
        id = response.get("id", None)

        return {"id": id, "song_path": song_path, "artists": artists, "popularity": popularity, "release_date": release_date}
    except Exception as e:
        logging.warn(f"failed to retrieve {song_path}; got error {str(e)}")
        return None
    

if __name__ == "__main__":
    np.random.seed(0)

    song_paths = get_song_paths("../dataset/corpus")
    results = []
    logging.basicConfig(level=logging.INFO)

    total = len(song_paths)
    current = 0
    success = 0
    failed = 0

    try:
        np.random.shuffle(song_paths)

        for song_path in song_paths:
            response = get_track(song_path)

            if response is not None:
                results.append(response)
                success += 1
            else:
                failed += 1

            if current % 10 == 0:
                logging.info(f"{current}/{total}\tsuccessful: {success}\tfailed: {failed}")

            time.sleep(0.05)
            current += 1
    finally:
        dump = {"total": total, "success": success, "failed": failed, "results": results}
        output_name = f"../dataset/metadata_{time.time()}.json"
        with open(output_name, "w") as f:
            json.dump(dump, f)
