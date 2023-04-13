import json
import requests
import pandas as pd
from research.spotify_api import get_headers, get_access_token

BASE_URL = "https://api.spotify.com/v1/"
with open("../dataset/metadata_1681267067.746167.json", "r") as data:
    songs = json.load(data)

#%%
auth_token = get_access_token()

def get_tracks_json(track_ids: list):
    endpoint = "tracks"
    id_string = ",".join(track_ids)
    resp = requests.get(BASE_URL + endpoint, params={'ids': id_string}, headers=get_headers(auth_token))
    return resp.json()

# def get_tracks_genres(tracks_json: dict):
#     json_list = tracks_json['tracks']
#     json_df = pd.DataFrame(json_list)
#     json_df['genreIncluded'] = json_df.apply(lambda row: contains_genre(row), axis=1)
#     return json_df

def get_artists_genres(artist_ids: list):
    endpoint = "artists"
    id_string = ",".join(artist_ids)
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
    song_ids = []
    for i in range(50):
        song_id = songs['results'][i]['id']
        song_ids.append(song_id)
    songs_json = get_tracks_json(song_ids)
    songs_df = pd.json_normalize(songs_json['tracks'])
    artist_ids = list(get_artist_ids(songs_df['artists']))
    songs_df['genres'] = get_artists_genres(artist_ids)
    for i in range(50):
        songs['results'][i]['genres'] = songs_df['genres'].iloc[i]

    with open("with_genres.json", "w+") as fp:
        json.dump(songs, fp)


# print(get_track_genre(songs['results'][0]['id']))