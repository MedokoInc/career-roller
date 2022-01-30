'use strict';

const randomBtn = document.getElementById("career-btn");
const allBtn = document.getElementById("all-btn");
randomBtn.addEventListener('click', displayRandomJob);
allBtn.addEventListener('click', displayFullDataSet);

let careerDiv = document.getElementById('random-career');

async function displayRandomJob() {
    const dataSet = await fetch('./data/OpenJsonData.json').then(response => response.json());
    let random = Math.floor(Math.random() * (dataSet.length));

    careerDiv.innerHTML = dataSet[random]["Description"];
    document.getElementById('full-data').innerText = JSON.stringify(dataSet[random], null, 4);
}

async function displayFullDataSet() {
    const dataSet = await fetch('./data/OpenJsonData.json').then(response => response.json());

    careerDiv.textContent = JSON.stringify(dataSet, null, 4);
}