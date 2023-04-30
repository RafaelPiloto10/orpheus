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
		size: 10,
		color: "white"
	},
};

const view2 = () => {
	title.textContent = "Music Genres"
	subtitle.textContent = "Song genres after preprocessing"
	content.innerHTML = `
		<div class="view-2 w-full h-full flex justify-center items-center">
			<div id="view-2-plt"/>
		</div>
	`;

	let v = df["top_genre"].value_counts();

	Plotly.newPlot("view-2-plt", [{
		x: v.index_arr,
		y: v.values,
		type: "bar",
		marker: { color: green },
		transforms: [{
			type: 'sort',
			target: 'y',
			order: 'descending'
		}]
	}], { ...layout });
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
				<p class="text-white animate-bounce">(click to continue)</p>
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
	subtitle.innerHTML = `<a href="https://github.com/RafaelPiloto10/orpheus" target="_blank" referrer="noreferrer">For more information checkout our GitHub</a>`
}

let views = [introductionView, view1, view2, endView];
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

window.onload = () => {
	console.log();
	startTime.textContent = `${currentView}:00`;
	endTime.textContent = `${views.length - 1}:00`;
	progress.style.width = `${currentView / views.length}%`;
	_render();

	next.addEventListener("click", () => visitNext());
	back.addEventListener("click", () => visitBack());
}
