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

const view1 = () => {
	title.textContent = "Overview of Data";
	subtitle.textContent = "Overview of Data Subtitle";

	content.innerHTML = `
		<div class="w-full h-full flex justify-center items-center">
			<p class="text-lg text-white">Overview of Data</p>
		</div>
	`;
}

const introductionView = () => {
	title.textContent = "Project Orpheus";
	subtitle.textContent = "An analysis of gender on song lyrics";

	content.innerHTML = `
		<div class="w-full h-full flex justify-center items-center overflow-hidden">
			<img class="w-64 h-64 object-contain" src="assets/orpheus.png"/>
		</div>
	`;
}

const endView = () => {
	title.textContent = "Thank You";
	subtitle.innerHTML = `<a href="https://github.com/RafaelPiloto10/orpheus" target="_blank" referrer="noreferrer">For more information checkout our GitHub</a>`
}

let views = [introductionView, view1, endView];
let currentView = 0;

const renderView = (view) => {
	content.innerHTML = "";
	view();
}

const render = () => {
	renderView(views[currentView]);
}

const visitNext = () => {
	if (currentView < views.length) {
		currentView += 1;
		startTime.textContent = `${currentView}:00`;
		progress.style.width = `${(currentView / (views.length - 1)) * 100}%`;
		render();
	}
}

const visitBack = () => {
	if (currentView > 0) {
		currentView -= 1;
		startTime.textContent = `${currentView}:00`;
		progress.style.width = `${(currentView / (views.length - 1)) * 100}%`;
		render();
	}
}

window.onload = () => {
	startTime.textContent = `${currentView}:00`;
	endTime.textContent = `${views.length - 1}:00`;
	progress.style.width = `${currentView / views.length}%`;
	render();

	next.addEventListener("click", () => visitNext());
	back.addEventListener("click", () => visitBack());
}
