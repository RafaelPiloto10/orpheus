import metadata from './assets/metadata_genres.json' assert {type: 'json'};

async function loadData() {
	var df = new dfd.DataFrame(metadata["results"]);
	var svo = await dfd.readCSV("./assets/svo.csv");

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
			for (const [bucket, keys] of Object.entries(buckets)) {
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
	df.addColumn("new_genres", newGenres, { inplace: true });

	const topGenres_ = df["new_genres"].values.map((x) => {
		for (const genre of topGenres) {
			if (x.indexOf(genre) != -1) {
				return genre;
			}
		}
	});

	df.addColumn("top_genre", topGenres_, { inplace: true });

	const year = df["release_date"].values.map((x) => parseInt(x.substring(0, 4)));
	df.addColumn("year", year, {inplace: true});

	let rm = `=hyperlink("C:\\Users\\rpilo\\Downloads\\orpheus\\dataset\\output\\coref_CoreNLP_minified_corpus\\coref\\`;
	let songPaths = svo["Document"].values.map((x) => x.substring(rm.length, x.length - 2));
	svo.addColumn("song_path", songPaths, { inplace: true });

	// merge  df and svo
	var merged_df = []
	for (let row of df.$data) {
		let song_path = row[1];
		let svo_res = svo.$data.filter((x) => {
			if (x.length != 10) return false;
			let sp = x[9];
			if (sp.includes(song_path)) {
				return true;
			}
			return false;
		});

		for (let s of svo_res) {
			s.pop();
			let merged = row.concat(s);
			merged_df.push(merged);
		}
	}

	let merged_cols = df.columns.concat(svo.columns);
	merged_cols.pop();
	merged_df = new dfd.DataFrame(merged_df, { columns: merged_cols });

	window.df = df;
	window.svo = svo;
	window.merged_df = merged_df
}

window.loadData = loadData;
