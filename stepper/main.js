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
	},
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

const viewTable = () => {
	title.textContent = "Verbs that appear with each gender, by genre";
	subtitle.textContent = "Note that these are single instances rather than aggregated statistics; however, their frequencies may be greater than one.";

	content.innerHTML = `
		<div class="view w-full h-full flex justify-center items-center">
			<img class="w-128 h-128 object-contain" src="assets/views/viewTable/overview.png" />
		</div>

	`;
};

// gender counts by genre plot
const view6 = () => {
	title.textContent = 'Here is how gender appears in different genres';
	subtitle.textContent = "There tend to be more male subjects mentioned overall."
	content.innerHTML = `
		<div class="view w-full h-full flex justify-center items-center">
			<div id="view-plt"/>
		</div>
	`;

	const unique_tracks = svo['Document ID'].dropDuplicates()
	// gender_by_genre = unique_tracks.groupby(by=['top_genre'], as_index=False)[['S Gender']].value_counts()
	//
	// genre_ordered = gender_by_genre.groupby(by='top_genre').agg('sum').sort_values(by="count", ascending=True).index

	console.log("df")
	console.log(df)
	console.log("merged df")
	console.log(merged_df)
	console.log("svo")
	console.log(svo)

};

const view5 = () => {
	title.textContent = "We can also observe how gender is classified for subjects & objects in song lyrics."
	subtitle.textContent = "It is interesting to see how there tend to be more male objects across time."
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

	let s_g = merged_df.loc({ columns: ["year", "S Gender"] }).groupby(["year"]);
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

	let o_g = merged_df.loc({ columns: ["year", "O Gender"] }).groupby(["year"]);
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
		x: s_x,
		y: s_ms,
		type: "line",
		marker: { color: green },
		transforms: [{
			type: 'sort',
			target: 'x',
			order: 'descending'
		}],
		name: "Male References",
	},
	{
		x: s_x,
		y: s_fs,
		type: "line",
		marker: { color: "purple" },
		transforms: [{
			type: 'sort',
			target: 'x',
			order: 'descending'
		}],
		name: "Female References",
	}], { ...layout, title: "Subject Gender Across Time" });

	Plotly.newPlot("view-2-plt", [{
		x: o_x,
		y: o_ms,
		type: "line",
		marker: { color: green },
		transforms: [{
			type: 'sort',
			target: 'x',
			order: 'descending'
		}],
		name: "Male References",
	},
	{
		x: o_x,
		y: o_fs,
		type: "line",
		marker: { color: "purple" },
		transforms: [{
			type: 'sort',
			target: 'x',
			order: 'descending'
		}],
		name: "Female References",
	}], { ...layout, title: "Object Gender Across Time" });

}

const view4 = () => {
	title.textContent = "Let's take a look at the average popularity of music genres"
	subtitle.textContent = "Popularity is a metric reported by the Spotify API which reports how popular a given artist is at the time of data collection."
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

	let pop_tensors = df.loc({ columns: ["top_genre", "popularity"] }).groupby(["top_genre"]).colDict;
	let x = [];
	let y = [];
	for (let [genre, popularity] of Object.entries(pop_tensors)) {
		let m = popularity.popularity.reduce((partialSum, a) => partialSum + a, 0) / popularity.popularity.length;
		x.push(genre || "Other");
		y.push(m);
	}

	Plotly.newPlot("view-plt", [{
		x: x,
		y: y,
		type: "bar",
		marker: { color: green },
		transforms: [{
			type: 'sort',
			target: 'y',
			order: 'descending'
		}]
	}], { ...layout });

}

const view3 = () => {
	title.textContent = "Let's take a look at the average popularity of music genres"
	subtitle.textContent = "Popularity is a metric reported by the Spotify API which reports how popular a given artist is at the time of data collection."
	content.innerHTML = `
		<div class="view w-full h-full flex justify-center items-center">
			<div id="view-plt"/>
		</div>
	`;

	let pop_tensors = df.loc({ columns: ["top_genre", "popularity"] }).groupby(["top_genre"]).colDict;
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
	}]

	Plotly.newPlot("view-plt", [{
		x: x,
		y: Array(x.length).fill(0),
		type: "bar",
		marker: { color: green },
		transforms: [{
			type: 'sort',
			target: 'y',
			order: 'descending'
		}],
	}], { ...layout, xaxis: { 'visible': false }, yaxis: { range: [0, 50] } });

	Plotly.animate("view-plt", { data: finalData, layout: { xaxis: { 'visible': true } } }, { ...animationConfig });

}

const view2 = () => {
	title.textContent = "Music Genres"
	subtitle.textContent = "Song genres after preprocessing"
	content.innerHTML = `
		<div class="w-full h-full flex justify-center items-center">
			<div id="view-plt"/>
		</div>
	`;

	let v = df["top_genre"].valueCounts().sortValues({ 'ascending': false });

	Plotly.newPlot("view-plt", [{
		x: v.index.map((x) => x == "undefined" ? "other" : x),
		y: Array(v.size).fill(0),
		type: 'bar',
		marker: { color: green },
		transforms: [{
			type: 'sort',
			target: 'y',
			order: 'descending'
		}]
	}], { xaxis: { 'visible': false }, yaxis: { range: [0, 3000] }, ...layout });

	const finalData = [{
		x: v.index.map((x) => x == "undefined" ? "other" : x),
		y: v.values
	}];


	Plotly.animate("view-plt", { data: finalData, layout: { xaxis: { 'visible': true } } }, { ...animationConfig });
}

const view1 = () => {

	title.textContent = "Overview of Data";
	subtitle.textContent = "Overview of Data Subtitle";

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
}

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

const endView = () => {
	title.textContent = "Thank You";
	subtitle.innerHTML = `<a href="https://github.com/RafaelPiloto10/orpheus" target="_blank" referrer="noreferrer">For more information, check out our <span class="text-green-500 underline">GitHub</span></a>`
}

let views = [viewTable, introductionView, view1, view2, view3, view4, view5, view6, endView];
let currentView = 0;

const renderView = (view) => {
	content.innerHTML = "";
	view();
}

const _render = () => {
	renderView(views[currentView]);
}

const visitNext = () => {
	// enables both buttons in case they were disabled on the previous view
	enableButtons(true, true);

	if (currentView < views.length) {
		currentView += 1;
		startTime.textContent = `${currentView}:00`;
		progress.style.width = `${(currentView / (views.length - 1)) * 100}%`;
		_render();
	}
}

const visitBack = () => {
	// enables both buttons in case they were disabled on the previous view
	enableButtons(true, true);

	if (currentView > 0) {
		currentView -= 1;
		startTime.textContent = `${currentView}:00`;
		progress.style.width = `${(currentView / (views.length - 1)) * 100}%`;
		_render();
	}
}

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
}

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
}

window.onload = async () => {
	await loadData();
	enableButtons(true, true);
	startTime.textContent = `${currentView}:00`;
	endTime.textContent = `${views.length - 1}:00`;
	progress.style.width = `${currentView / views.length}%`;
	_render();

	next.addEventListener("click", () => visitNext());
	back.addEventListener("click", () => visitBack());
}
