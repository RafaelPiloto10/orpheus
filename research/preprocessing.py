import argparse
import pandas as pd
import logging
from os import path

DATASET_PATH = "../dataset/spotify_millsongdata.csv"
CORPUS_FOLDER_PATH = "../dataset/corpus"

def get_title(row):
    artist = row["artist"].rstrip().lstrip().replace(" ", "_").replace("'", "")
    song = row["song"].rstrip().lstrip().replace(" ", "_").replace("'", "")
    return f"{artist}_{song}.txt"

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--logLevel", default="info")
    args = parser.parse_args()

    logging.basicConfig(level=args.logLevel.upper())

    df = pd.read_csv(DATASET_PATH)

    df.drop(columns=["link"])
    df["title"] = df.apply(get_title, axis=1)

    for title, text in zip(df["title"], df["text"]):
        logging.debug(title)
        with open(path.join(CORPUS_FOLDER_PATH, title), "+w") as f:
            f.writelines(text)
