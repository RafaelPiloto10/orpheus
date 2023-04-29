const WIDTH = d3.select('.container').node().clientWidth;
const HEIGHT = d3.select('.container').node().clientHeight;
const pageList = d3.select('.pages')
const pageNumbers = d3.select('#pagination-nums')
const listItems = pageList.selectAll('div.page')
const prevButton = d3.select('#previous')
const nextButton = d3.select('#next')
let currentPage = 1

const addPage = (pageNum) => {
	pageNumbers.append('a')
		.attr('href', '#/')
		.attr('id', 'page-num-'+pageNum)
		.classed('pagination-num', true)
		.html(pageNum)
}

window.addEventListener('load', () => {
	for (let i = 1; i <= listItems.size(); i++) {
		addPage(i)
	}
	if (currentPage === 1) {
		disableButton(prevButton)
		d3.select('#page-num-1').classed('selected', true)
	}
	document.querySelectorAll(".pagination-num").forEach(numButton => {
		const pageNum = Number(numButton.innerText)
		numButton.addEventListener("click", () => {
			updatePagination(pageNum)
			toggleButton()
		});
	});

	document.querySelectorAll('.page-link').forEach(btn => {
		btn.addEventListener('click', () => {
			toggleButton()
		})
	})
})

const toggleButton = () => {
	if (currentPage === 1) {
		disableButton(prevButton)
	} else {
		enableButton(prevButton)
	}

	if (currentPage === listItems.size()) {
		disableButton(nextButton)
	} else {
		enableButton(nextButton)
	}
}

const disableButton = (button) => {
	button.attr('disabled', true)
	button.classed('disabled', true)
	button.classed('hover', false)
}

const enableButton = (button) => {
	button.attr('disabled', null)
	button.classed('disabled', false)
	button.classed('hover', true)
}

const setCurrentPage = (pageNum) => {
	currentPage = pageNum
}


const updatePagination = (updatedPageNum) => {
	d3.select('#page-num-'+currentPage).classed('selected', false)
	d3.select('#vis-'+currentPage).classed('showing', false)
	setCurrentPage(updatedPageNum)
	d3.select('#page-num-'+currentPage).classed('selected', true)
	d3.select('#vis-'+currentPage).classed('showing', true)
	event.preventDefault()
}
d3.select('#next').on('click', () => {
	updatePagination(currentPage + 1)
})

d3.select('#previous').on('click', () => {
	updatePagination(currentPage - 1)
})
