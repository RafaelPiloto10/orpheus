import json
import requests
import pandas as pd
import logging
from research.spotify_api import get_headers, get_access_token

BASE_URL = "https://api.spotify.com/v1/"
with open("../dataset/metadata_1681267067.746167.json", "r") as data:
    songs = json.load(data)

#%%
auth_token = get_access_token()
logging.getLogger().setLevel(logging.INFO)

"""
Must be a list of at most 50 track ids
"""
def get_tracks_json(track_ids: list):
    endpoint = "tracks"
    id_string = ",".join(track_ids)
    logging.info("Getting track jsons")
    resp = requests.get(BASE_URL + endpoint, params={'ids': id_string}, headers=get_headers(auth_token))
    return resp.json()

def get_artists_genres(artist_ids: list):
    endpoint = "artists"
    id_string = ",".join(artist_ids)
    logging.info("Getting artist genres")
    res = requests.get(BASE_URL + endpoint, params={"ids": id_string}, headers=get_headers(auth_token))
    artist_list = res.json()['artists']
    genres = [artist['genres'] for artist in artist_list]
    return genres

def get_artist_ids(artist_list):
    # get id of primary (first) artist of each track
    ids = artist_list.apply(lambda artist: artist[0]['id'])
    return ids

def _contains_genre(track_json):
    has_genre = track_json['album'].get('genres') is not None
    for artist in track_json['artists']:
        if artist.get('genres') is not None:
            return True
    return has_genre


if __name__ == '__main__':
    corpus_df = pd.json_normalize(songs['results'])
    start = 0
    end = 50
    while start < corpus_df.shape[0]:
        song_ids = list(corpus_df['id'][start:end])
        songs_json = get_tracks_json(song_ids)
        songs_df = pd.json_normalize(songs_json['tracks'])
        artist_ids = list(get_artist_ids(songs_df['artists']))
        songs_df['genres'] = get_artists_genres(artist_ids)

        for i in range(songs_df.shape[0]):
            songs['results'][i+start]['genres'] = songs_df['genres'].iloc[i]

        start += 50
        end += 50


    with open("with_genres.json", "w+") as fp:
        json.dump(songs, fp)

