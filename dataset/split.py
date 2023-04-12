import argparse
import json
import os

FULL_CORPUS = "./corpus"
MINIFIED_CORPUS = "./minified_corpus"

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("input", help="The filename to parse the JSON from")
    args = parser.parse_args()

    with open(args.input, "r") as f:
        data = json.load(f)
        results = data["results"]
        for result in results:
            song_path = result["song_path"]
            with open(os.path.join(FULL_CORPUS, song_path), "r") as song:
                lines = song.readlines()
                with open(os.path.join(MINIFIED_CORPUS, song_path), "+w") as new_song:
                    new_song.writelines(lines)
