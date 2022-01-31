import 'bootstrap';
import './scss/app.scss';

const randomBtn = document.getElementById("career-btn");
const allBtn = document.getElementById("all-btn");
randomBtn.addEventListener('click', getRandomJob);
allBtn.addEventListener('click', displayFullDataSet);

let jobHistory = [];
let historyIndex = 0

const undoBtn = document.getElementById("undo-btn");
const redoBtn = document.getElementById("redo-btn")
updateBtns();
undoBtn.addEventListener('click', undo);
redoBtn.addEventListener('click', redo);

let careerDiv = document.getElementById('random-career');

function updateBtns() {
    undoBtn.disabled = (historyIndex <= 1);
    redoBtn.disabled = (historyIndex >= 0 && historyIndex >= jobHistory.length);
}

async function getRandomJob() {
    const dataSet = await fetch('../data/OpenJsonData.json').then(response => response.json());
    let random = Math.floor(Math.random() * (dataSet.length));
    let randomEntry = dataSet[random];

    displayJobEntry(randomEntry);
    jobHistory[historyIndex] = randomEntry;
    historyIndex++;

    updateBtns();

    // document.getElementById('full-data').innerText = JSON.stringify(dataSet[random], null, 4);
}

function displayJobEntry(entry) {
    careerDiv.innerHTML = "";

    let titleElement = document.createElement("h1")
    titleElement.innerText = entry['Titel'];
    careerDiv.appendChild(titleElement);

    appendJobInfo('ID', 'CourseId', careerDiv, entry);
    appendJobInfo('Bundesland', 'Province', careerDiv, entry);
    appendJobInfo('Ort', 'Place', careerDiv, entry);

    appendJobInfo('Organisator', 'Organiser', careerDiv, entry);
    appendJobInfo('Kurstyp', 'CourseType', careerDiv, entry);
    appendJobInfo('Quelle', 'Url', careerDiv, entry);

    careerDiv.appendChild(document.createElement("hr"));

    let descriptionElement = document.createElement("div");
    descriptionElement.innerHTML = entry['Description'];
    careerDiv.appendChild(descriptionElement);

    careerDiv.appendChild(document.createElement("hr"));

    entry['CourseDates'].forEach(date => {
        let datesElement = document.createElement("div");
        datesElement.classList.add("job-date")
        appendJobInfo("Datums-ID", "CourseDateID", datesElement, date);
        appendJobInfo("Kurstyp", "CourseType", datesElement, date);
        appendJobInfo("Start", "StartDate", datesElement, date);
        appendJobInfo("Ende", "EndDate", datesElement, date);
        appendJobInfo("Straße", "Street", datesElement, date);
        appendJobInfo('Organisator', 'Organiser', datesElement, date);
        appendJobInfo('Quelle', 'Url', datesElement, date);

        careerDiv.appendChild(datesElement);
    })

    careerDiv.appendChild(document.createElement("hr"));
}


function undo() {
    historyIndex--;
    displayJobEntry(jobHistory[historyIndex - 1]);

    updateBtns();
}

function redo() {
    historyIndex++;
    displayJobEntry(jobHistory[historyIndex - 1]);

    updateBtns();

}
async function displayFullDataSet() {
    const dataSet = await fetch('../data/OpenJsonData.json').then(response => response.json());

    careerDiv.textContent = JSON.stringify(dataSet, null, 4);
}

function appendJobInfo(name, jsonName, container, entry) {
    let infoDiv = document.createElement('div');
    infoDiv.classList.add('job-info');
    let infoTitle = document.createElement('span');
    infoTitle.classList.add('bold');
    infoTitle.innerText = name + ": ";

    let infoText = document.createElement('span');
    if (isValidHttpUrl(entry[jsonName])) {
        infoText = document.createElement('a');
        infoText.href = entry[jsonName];
    }

    infoText.innerText = entry[jsonName] ? (entry[jsonName]) : "-";

    infoDiv.appendChild(infoTitle);
    infoDiv.appendChild(infoText);

    container.appendChild(infoDiv)
}

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}