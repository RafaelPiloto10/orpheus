// Content information
const title = document.getElementsByClassName("page-title").item(0);
const subtitle = document.getElementsByClassName("page-subtitle").item(0);
const content = document.getElementsByClassName("content").item(0);

// Navigation progress
const progress = document.getElementsByClassName("progress-bar").item(0);
const startTime = document.getElementsByClassName("start-time").item(0);
const endTime = document.getElementsByClassName("end-time").item(0);

// Navigation
const play = document.getElementsByClassName("play").item(0);
const back = document.getElementsByClassName("back").item(0);
const next = document.getElementsByClassName("next").item(0);

const green = "#1DB954";
const black = "#191414";

const layout = {
	plot_bgcolor: black,
	paper_bgcolor: black,
	plot_fgcolor: green,
	font: {
		size: 12,
		color: "white"
	}
};

const animationConfig = {
	transition: {
		duration: 500,
		easing: "cubic-in-out"
	},
	frame: {
		duration: 500
	}
};

const closeReading3 = () => {
	title.textContent = "Close Reading: Hood Mentality";
	subtitle.textContent = "Ice Cube (2008)";

	content.innerHTML = `
		<div class="view w-full h-full flex justify-center items-center">
			<div class="flex items-center justify-center">
				<div class="w-full h-full flex flex-row gap-8">
					<div class="flex flex-col">
						<p class="w-full text-green-500 text-2xl">Rap</p>
						<br />
						<p class="text-white w-full justify-start">
							F*** school, n****, I'ma be a dope dealer,<br/>
							I'ma be a killer, yup a urban guerrilla,<br/>
							I'ma stack strilla, yeah, buy me a villa,<br/>
							Sell a five-oh to my Auntie Priscilla,<br/>
							I don't give a f*** that she look like thriller,<br/>
							Hit that shit, one more time and f*** around and <span class="text-purple-500">kill</span> her.<br/>
							Cause I got the heart of a Pittsburgh Steeler,<br/>
							Black n****, draped in gold with a nine milla,<br/>
						</p>
					</div>
					<div class="grow h-full flex items-start justify-self-end">
						<p class="text-right text-white">
							<span class="text-2xl text-green-500">Ice Cube Hood Mentality (2008)</span> <br/>
							<br />
							Rap music in, general during our close reading,<br/>
							showed very intense language. In Ice Cube's <br/>
							song, Hood Mentality, he recounts the mentality<br/>
							of a figure growing up in the "hood". The figure <br/>
							is a described to as a street gangster who makes <br/>
							no exceptions for who is disposable because they <br/>
							have a heart of a "Pittsburgh Steeler". The roles <br/>
							of gender here seem to indicate that the male gangster <br/>
							is cold blooded and "tougher" while the female is fragile<br/>
							and disposable.
						</p>
					</div>
				</div>
			</div>
		</div>
	`;
};

const closeReading2 = () => {
	title.textContent = "Close Reading: Hot Shot";
	subtitle.textContent = "Cliff Richard (1979)";

	content.innerHTML = `
		<div class="view w-full h-full flex justify-center items-center">
			<div class="flex items-center justify-center">
				<div class="w-full h-full flex flex-row gap-8">
					<div class="flex flex-col">
						<p class="w-full text-green-500 text-2xl">Pop</p>
						<br />
						<p class="text-white w-full justify-start">
							A faded picture on the mantel shelf,<br/>
							My older brother looks like myself,<br/>
							Remember Donny dated Susie,<br/>
							And Susie rated johnny,<br/>
							Johnny's into Susie, <br/> 
							But Susie's into Ronnie, <br/> 
							Ronnie <span class="text-purple-500">waits for</span> Louie, <br/> 
							But Louie's singing Louie-Lou-i <br />
						</p>
					</div>
					<div class="grow h-full flex items-start justify-self-end">
						<p class="text-right text-white">
							<span class="text-2xl text-green-500">Cliff Richard | Hot Shot (1979)</span> <br/>
							<br />
							In this example, we see that the SVO parser <br/>
							incorrectly classified "waits for" as female. Ronnie who <br/>
							appears to be a male figure is in the middle of a love "triangle." <br/>
							Ronnie is waiting for Louie, who is represented here as <br/>
							a more independent figure who is not into anyone. <br />
							In more "traditional" tales, the male figure <br />
							normally waits for the female, but the difference <br />
							here is that Cliff portrays the female as a free figure <br />	
							not even interested in love.<br />	
						</p>
					</div>
				</div>
			</div>
		</div>
	`;
};

const closeReading1 = () => {
	title.textContent = "Close Reading: Go Go Round";
	subtitle.textContent = "Gordon Lightfoot (1967)";

	content.innerHTML = `
		<div class="view w-full h-full flex justify-center items-center">
			<div class="flex items-center justify-center">
				<div class="w-full h-full flex flex-row gap-8">
					<div class="w-full h-full flex flex-col">
						<p class="text-green-500 text-2xl">Rock</p>
						<br />
						<p class="text-white">
							Alone upon the sidewalks of despair, 'twas there she wandered with her<br />
							suitcase in her hand.  <br />
							Her fate she pondered, only a go-go girl in love with someone who didn't care.  <br />
							She met him on a night so rare when her friends were there and the band was<br />
							grooving.  <br />
							When he gave a glance that said how much he would like to meet her,  <br />
							How was she to know at the time he would <span class="text-green-500">mistreat</span> her?<br />
						</p>
					</div>
					<div class="grow w-full h-full flex items-start justify-self-end">
						<p class="w-full text-right text-white">
							<span class="text-2xl text-green-500">Gordon Lightfoot | Go Go Round (1967)</span> <br/>
							<br />
							Go-go dancers are dancers who are employed to entertain crowds at nightclubs or other venues where music is played. 
							Gordon describes a "go-go girl" who falls in love with a man who does not care for her. <br/>
							Ultimately, leaving her by the end of the night, Gordon describes the male figure as cold and distant. <br/>
							Here, the male is viewed negatively but also free spirited and unattached. <br/>
							The female is viewed more positively and potentially more traditional and attached.
						</p>
					</div>
				</div>
			</div>
		</div>
	`;
};

const viewTable = () => {
	title.textContent = "Verbs that appear with each gender, by genre";
	subtitle.textContent = "Note that these are single instances rather than aggregated statistics; however, their frequencies may be greater than one.";

	content.innerHTML = `
		<div class="view flex overflow-hidden">
			<img class="w-[800px] object-contain overflow-hidden" src="assets/views/viewTable/overview.png" />
		</div>
	`;
};

// gender counts by genre plot
const view6 = () => {
	title.textContent = 'Here is how gender appears in different genres';
	subtitle.textContent = "There tend to be more male subjects mentioned overall.";
	content.innerHTML = `
		<div class="view w-full h-full flex justify-center items-center">
			<div id="view-plt"/>
		</div>
	`;

	const uniqueRows = merged_df['Document ID'].dropDuplicates().index;
	const svoData = merged_df.iloc({rows: uniqueRows});

	const genreDict = svoData.groupby(['top_genre']).colDict;
	let x = [];
	let y = [];
	let genreCounts = {};
	for (let [genre, values] of Object.entries(genreDict)) {
		let gender = new dfd.Series(values['S Gender']).valueCounts();
		let genderLabels = gender.$index;
		let genderCounts = gender.$data;
		genreCounts[genre] = {};
		for (let i = 0; i < genderLabels.length; i++) {
			genreCounts[genre][genderLabels[i]] = genderCounts[i];
		}
	}

	const genreList = Object.keys(genreDict);

	let maleTrace = {
		x: genreList,
		y: Array(Object.values(genreCounts).length).fill(0),
		name: 'Male',
		marker: {'color': green},
		type: 'bar',
		transforms: [{
			'type': 'sort',
			'target': 'x',
			'order': 'ascending'
		}]
	};

	let femaleTrace = {
		x: genreList,
		y: Array(Object.values(genreCounts).length).fill(0),
		name: 'Female',
		marker: {'color': 'purple'},
		type: 'bar',
		transforms: [{
			'type': 'sort',
			'target': 'x',
			'order': 'ascending'
		}]
	};

	const maleFinalData = {
		x: genreList,
		y: Object.values(genreCounts).map(d => d['MALE'] || 0),
	}

	const femaleFinalData = {
		x: genreList,
		y: Object.values(genreCounts).map(d => d['FEMALE'] || 0),
	}

	const data = [maleTrace, femaleTrace];
	Plotly.newPlot('view-plt', data, {...layout, yaxis: {range: [0, 20]}});
	Plotly.animate('view-plt', {data: [maleFinalData, femaleFinalData]}, {...animationConfig})
};

const view5 = () => {
	title.textContent = "We can also observe how gender is classified for subjects & objects in song lyrics.";
	subtitle.textContent = "It is interesting to see how there tend to be more male objects across time.";
	content.innerHTML = `
		<div class="view w-full h-full flex justify-center items-center">
			<div class="w-full h-full flex flex-row items-center justify-center">
				<div class="w-1/2 h-full flex items-center justify-center">
					<div class="w-full flex items-center justify-center" id="view-1-plt"></div>
				</div>

				<div class="w-1/2 h-full flex items-center justify-center">
					<div class="w-full flex items-center justify-center" id="view-2-plt"></div>
				</div>
			</div>
		</div>
	`;

	let s_g = merged_df.loc({columns: ["year", "S Gender"]}).groupby(["year"]);
	let s_x = [];
	let s_ms = [];
	let s_fs = [];

	for (let [year, data] of Object.entries(s_g.colDict)) {
		s_x.push(year);
		let m = data["S Gender"].filter((x) => x === "MALE").length;
		let f = data["S Gender"].filter((x) => x === "FEMALE").length;
		s_ms.push(m);
		s_fs.push(f);
	}

	let o_g = merged_df.loc({columns: ["year", "O Gender"]}).groupby(["year"]);
	let o_x = [];
	let o_ms = [];
	let o_fs = [];

	for (let [year, data] of Object.entries(o_g.colDict)) {
		o_x.push(year);
		let m = data["O Gender"].filter((x) => x === "MALE").length;
		let f = data["O Gender"].filter((x) => x === "FEMALE").length;
		o_ms.push(m);
		o_fs.push(f);
	}

	Plotly.newPlot("view-1-plt", [{
		x: [],
		y: [],
		type: "line",
		marker: {color: green},
		transforms: [{
			type: 'sort',
			target: 'x',
			order: 'ascending'
		}],
		name: "Male References"
	},
		{
			x: s_x,
			y: Array(s_fs.length).fill(0),
			type: "line",
			marker: {color: "purple"},
			transforms: [{
				type: 'sort',
				target: 'x',
				order: 'ascending'
			}],
			name: "Female References"
		}], {...layout, title: "Subject Gender Across Time", yaxis: {range: [0, 12]}});

	Plotly.newPlot("view-2-plt", [{
		x: o_x,
		y: Array(o_ms.length).fill(0),
		type: "line",
		marker: {color: green},
		transforms: [{
			type: 'sort',
			target: 'x',
			order: 'ascending'
		}],
		name: "Male References"
	},
		{
			x: o_x,
			y: Array(o_fs.length).fill(0),
			type: "line",
			marker: {color: "purple"},
			transforms: [{
				type: 'sort',
				target: 'x',
				order: 'ascending'
			}],
			name: "Female References"
		}], {...layout, title: "Object Gender Across Time", yaxis: {range: [0, 12]}});


	const lineAnimationConfig = {
		transition: {
			duration: 0
		},
		frame: {
			duration: 0,
			redraw: false
		}
	};
	const update = (i) => {
		const finalDataSubject = [{
			x: s_x.slice(0,i),
			y: s_ms.slice(0,i)
		}, {
			x: s_x.slice(0,i),
			y: s_fs.slice(0,i)
		}];
		const larger = Math.max(o_x.length, s_x.length)
		const j = Math.min(i, o_x.length)
		const finalDataObject = [{
			x: o_x.slice(0,j),
			y: o_ms.slice(0,j)
		}, {
			x: o_x.slice(0,j),
			y: o_fs.slice(0,j)
		}];
		Plotly.animate('view-1-plt', {data: finalDataSubject}, {...lineAnimationConfig});
		Plotly.animate('view-2-plt', {data: finalDataObject}, {...lineAnimationConfig});
		const next = Math.min(i+1, s_x.length)
		if (i != next) {
			requestAnimationFrame(() => update(next));
		}
	};

	requestAnimationFrame(() => update(0));

	const finalDataSubject = [{
		x: s_x,
		y: s_ms
	}, {
		x: s_x,
		y: s_fs
	}];

	const finalDataObject = [{
		x: o_x,
		y: o_ms
	}, {
		x: o_x,
		y: o_fs
	}];


	Plotly.animate('view-2-plt', {data: finalDataObject}, {...lineAnimationConfig});
};

const view4 = () => {
	title.textContent = "Let's take a look at the average popularity of music genres";
	subtitle.textContent = "Popularity is a metric reported by the Spotify API which reports how popular a given artist is at the time of data collection.";
	content.innerHTML = `
		<div class="view w-full h-full flex justify-center items-center">
			<div class="w-full h-full flex flex-row items-center justify-center">
				<div class="w-1/2 h-full flex items-center justify-center">
					<div class="w-full flex items-center justify-center" id="view-plt"></div>
				</div>

				<div class="w-1/2 h-full flex items-center justify-center">
					<p class="text-base text-white text-center">It is interesting to note that some of the underrepresented songs in our dataset have notably high popularity such as dance, jazz, and soul.</p>
				</div>
			</div>
		</div>
	`;

	let pop_tensors = df.loc({columns: ["top_genre", "popularity"]}).groupby(["top_genre"]).colDict;
	let x = [];
	let y = [];
	for (let [genre, popularity] of Object.entries(pop_tensors)) {
		let m = popularity.popularity.reduce((partialSum, a) => partialSum + a, 0) / popularity.popularity.length;
		x.push(genre || "Other");
		y.push(m);
	}

	Plotly.newPlot("view-plt", [{
		x: x,
		y: Array(x.length).fill(0),
		type: "bar",
		marker: {color: green},
		transforms: [{
			type: 'sort',
			target: 'y',
			order: 'descending'
		}]
	}], {...layout, xaxis: {'visible': false}, yaxis: {range: [0, 50]}});

	const finalData = [{
		x: x,
		y: y
	}];

	Plotly.animate("view-plt", {data: finalData, layout: {xaxis: {'visible': true}}}, {...animationConfig});
};

const view3 = () => {
	title.textContent = "Let's take a look at the average popularity of music genres";
	subtitle.textContent = "Popularity is a metric reported by the Spotify API which reports how popular a given artist is at the time of data collection.";
	content.innerHTML = `
		<div class="view w-full h-full flex justify-center items-center">
			<div id="view-plt"/>
		</div>
	`;

	let pop_tensors = df.loc({columns: ["top_genre", "popularity"]}).groupby(["top_genre"]).colDict;
	let x = [];
	let y = [];
	for (let [genre, popularity] of Object.entries(pop_tensors)) {
		let m = popularity.popularity.reduce((partialSum, a) => partialSum + a, 0) / popularity.popularity.length;
		x.push(genre || "other");
		y.push(m);
	}

	const finalData = [{
		x: x,
		y: y
	}];

	Plotly.newPlot("view-plt", [{
		x: x,
		y: Array(x.length).fill(0),
		type: "bar",
		marker: {color: green},
		transforms: [{
			type: 'sort',
			target: 'y',
			order: 'descending'
		}]
	}], {...layout, xaxis: {'visible': false}, yaxis: {range: [0, 50]}});

	Plotly.animate("view-plt", {data: finalData, layout: {xaxis: {'visible': true}}}, {...animationConfig});

};

const view2 = () => {
	title.textContent = "Music Genres";
	subtitle.textContent = "Song genres after preprocessing";
	content.innerHTML = `
		<div class="w-full h-full flex justify-center items-center">
			<div id="view-plt"/>
		</div>
	`;

	let v = df["top_genre"].valueCounts().sortValues({'ascending': false});

	Plotly.newPlot("view-plt", [{
		x: v.index.map((x) => x == "undefined" ? "other" : x),
		y: Array(v.size).fill(0),
		type: 'bar',
		marker: {color: green},
		transforms: [{
			type: 'sort',
			target: 'y',
			order: 'descending'
		}]
	}], {xaxis: {'visible': false}, yaxis: {range: [0, 3000]}, ...layout});

	const finalData = [{
		x: v.index.map((x) => x == "undefined" ? "other" : x),
		y: v.values
	}];


	Plotly.animate("view-plt", {
		data: finalData,
		layout: {xaxis: {'visible': true}, yaxis: {range: [0, 3000]}}
	}, {...animationConfig});
};

const view1 = () => {

	title.textContent = "Overview of Data";
	subtitle.textContent = "We initially found our dataset on Kaggle, but had to limit the total size of our data due to computation limitations.";

	disableButtons(true, false);

	const chart = `
		<div class="w-full h-full flex justify-center items-center">
			<img class="w-128 h-128 object-contain" src="assets/views/view1/overview.png" />
		</div>
	`;

	content.innerHTML = `
		<div class="view-1 w-full h-full flex flex-col justify-center items-center" click="">
			<div class="flex grow items-center justify-centere">
				<h1 class="text-2xl text-white">
					In our analysis of gender in song lyrics, we obtained a dataset with 50K songs.
					We minified our analysis to only observe 6K songs randomly selected from the 50K...
				</h1>
			</div>

			<div class="pb-8">
				<p class="text-white animate-bounce">(click here to continue)</p>
			</div>
		</div>
	`;

	content.getElementsByClassName("view-1").item(0).addEventListener("click", () => {
		enableButtons(true, true);
		content.innerHTML = chart;
	});
};

const introductionView = () => {
	title.textContent = "Project Orpheus";
	subtitle.textContent = "An analysis of gender in song lyrics";

	content.innerHTML = `
		<div class="w-full h-full flex flex-col justify-center items-center overflow-hidden gap-2">
			<div class="grow flex justify-center items-center">
				<img class="w-64 h-64 object-contain" src="assets/orpheus.png"/>
			</div>

			<div class="flex flex-col items-start justify-end gap-2">
				<div class="flex flex-row items-center justify-center gap-4" >
					<img class="w-16 h-16 object-cover rounded-full overflow-hidden" src="https://rpiloto.codes/pfp.jpeg" />
					<p class="text-white">
						Rafael Piloto (<a class="underline text-green-500" href="https://github.com/RafaelPiloto10" target="_blank">@RafaelPiloto10</a>)
					</p>
				</div>

				<div class="flex flex-row items-center justify-center gap-4 pb-8" >
					<img class="w-16 h-16 object-cover rounded-full overflow-hidden" src="assets/authors/albert.jpeg" />
					<p class="text-white">
						Albert Terc (<a class="underline text-green-500" href="https://github.com/albytterc" target="_blank">@albytterc</a>)
					</p>
				</div>
			</div>
		</div>
	`;
};

const endView = () => {
	title.textContent = "Thank You";
	subtitle.innerHTML = `<a href="https://github.com/RafaelPiloto10/orpheus" target="_blank" referrer="noreferrer">For more information, check out our <span class="text-green-500 underline">GitHub</span></a>`
	content.innerHTML = `
		<div class="w-full h-full flex flex-col justify-center items-center overflow-hidden gap-2">
			<div class="grow flex justify-center items-center">
				<p class="text-white">
					Limitations: Do consider that we were only able to explore 6K randomly selected songs from a dataset of 50K songs. This is in no way representative of all of music,
					but we are still interested in some of the results that we were able to find in how gender operates within the songs <span class="italic">we did analyze</span>.
					We used the <a href="https://github.com/NLP-Suite/NLP-Suite">NLP Suite</a> for our analysis which has its own limitations.
				</p>
			</div>

			<div class="flex flex-col items-start justify-end gap-2">
				<div class="flex flex-row items-center justify-center gap-4" >
					<img class="w-16 h-16 object-cover rounded-full overflow-hidden" src="https://rafaelpiloto10.github.io/assets/img/profile.jpg" />
					<p class="text-white">
						Rafael Piloto (<a class="underline text-green-500" href="https://github.com/RafaelPiloto10" target="_blank">@RafaelPiloto10</a>)
					</p>
				</div>

				<div class="flex flex-row items-center justify-center gap-4 pb-8" >
					<img class="w-16 h-16 object-cover rounded-full overflow-hidden" src="assets/authors/albert.jpeg" />
					<p class="text-white">
						Albert Terc (<a class="underline text-green-500" href="https://github.com/albytterc" target="_blank">@albytterc</a>)
					</p>
				</div>
			</div>
		</div>

	`;
}

let views = [introductionView, view1, view2, view3, view4, view5, view6, viewTable, closeReading1, closeReading2, closeReading3, endView];
let currentView = 0;

const renderView = (view) => {
	content.innerHTML = "";
	view();
};

const _render = () => {
	renderView(views[currentView]);
};

const visitNext = () => {
	// enables both buttons in case they were disabled on the previous view
	enableButtons(true, true);

	if (currentView < views.length - 1) {
		currentView += 1;
		startTime.textContent = `${currentView}:00`;
		progress.style.width = `${(currentView / (views.length - 1)) * 100}%`;
		_render();
	}
};

const visitBack = () => {
	// enables both buttons in case they were disabled on the previous view
	enableButtons(true, true);

	if (currentView > 0) {
		currentView -= 1;
		startTime.textContent = `${currentView}:00`;
		progress.style.width = `${(currentView / (views.length - 1)) * 100}%`;
		_render();
	}
};

const disableButtons = (f, b) => {
	if (f) {
		next.disabled = true;
		const nextIcon = next.getElementsByClassName("icon").item(0);
		nextIcon.style.stroke = "gray";
		nextIcon.classList.remove("hover:fill-white");
	}

	if (b) {
		back.disabled = true;
		const backIcon = back.getElementsByClassName("icon").item(0);
		backIcon.style.stroke = "gray";
		backIcon.classList.remove("hover:fill-white");
	}
};

const enableButtons = (f, b) => {
	if (f) {
		next.disabled = false;
		const nextIcon = next.getElementsByClassName("icon").item(0);
		nextIcon.style.stroke = "white";
		nextIcon.classList.add("hover:fill-white");
	}

	if (b) {
		back.disabled = false;
		const backIcon = back.getElementsByClassName("icon").item(0);
		backIcon.style.stroke = "white";
		backIcon.classList.add("hover:fill-white");
	}
};

window.onload = async () => {
	await loadData();
	enableButtons(true, true);
	startTime.textContent = `${currentView}:00`;
	endTime.textContent = `${views.length - 1}:00`;
	progress.style.width = `${currentView / views.length}%`;
	_render();

	next.addEventListener("click", () => visitNext());
	back.addEventListener("click", () => visitBack());
};
