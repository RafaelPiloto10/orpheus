import metadata from './assets/metadata_genres.json' assert {type: 'json'};

var df = new dfd.DataFrame(metadata["results"]);

const buckets = {
	"worship": ["worship", "christian", "gospel"],
	"folk": ["folk"],
	"dance": ["dance", "disco"],
	"metal": ["metal"],
	"jazz": ["jazz"],
	"country": ["country"],
	"rap": ["rap", "trap"],
	"punk": ["punk"],
	"soul": ["soul"],
	"hip-hop": ["hiphop", "hip-hop", "hip hop"],
	"rock": ["rock", "mellow gold", "grunge", "beatlesque"],
	"pop": ["pop", "new romantic", "adult standards", "new wave", "permanent wave", "urban contemporary"],
}

const topGenres = ["pop", "rock", "country", "worship", "rap", "folk", "soul", "dance", "metal", "punk", "jazz", "hip-hop"]

function normalizeGenre(genres) {
	const flattenedList = new Set();
	for (const genre of genres) {
		let didBucket = false;
		for (const [ bucket, keys ] of Object.entries(buckets)) {
			for (const k of keys) {
				if (genre.includes(k)) {
					flattenedList.add(bucket)
					didBucket = true;
					break
				}
			}

			if (didBucket) break;
		}

		if (!didBucket) {
			// pass
		}
	}
	return [...flattenedList]
}

const newGenres = df["genres"].values.map((x) => normalizeGenre(x.split(",")));
df.addColumn({column: "new_genres", value: newGenres});

const topGenres_ = df["new_genres"].values.map((x) => {
	for (const genre of topGenres) {
		if (x.indexOf(genre) != -1) {
			return genre;
		}
	}
});

df.addColumn({column: "top_genre", value: topGenres_});

window.df = df;
