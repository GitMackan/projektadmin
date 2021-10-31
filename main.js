// HTML-Element
let studiesEl = document.getElementById("studies-container");
let jobsEl = document.getElementById("jobs-container");
let sitesEl = document.getElementById("sites-container");

// Studie-element
let studieBtn = document.getElementById("addStudie");
let studieUni = document.getElementById("uni");
let studieEdu = document.getElementById("edu");
let studieStart = document.getElementById("schoolStart");
let studieEnd = document.getElementById("schoolEnd");
let StudieErrorMessage = document.querySelector(".StudieErrorMessage");
let studieUpdate = document.getElementById("studieUpdated");
let studieError = document.getElementById("studieError");

// Jobb-element
let jobBtn = document.getElementById("addJob");
let jobWork = document.getElementById("job");
let jobTitle = document.getElementById("jobTitle");
let jobStart = document.getElementById("jobStart");
let jobEnd = document.getElementById("jobEnd");
let JobErrorMessage = document.querySelector(".JobErrorMessage");
let jobUpdate = document.getElementById("jobUpdated");
let jobError = document.getElementById("jobError");

// Webbsida-element 
let siteBtn = document.getElementById("addSite");
let siteTitle = document.getElementById("siteTitle");
let siteUrl = document.getElementById("url");
let siteInfo = document.getElementById("info")
let SiteErrorMessage = document.querySelector(".SiteErrorMessage");
let siteUpdate = document.getElementById("siteUpdated");
let siteError = document.getElementById("siteError");

// Händelsehanterare
studieBtn.addEventListener('click', addStudie);
jobBtn.addEventListener('click', addJob);
siteBtn.addEventListener('click', addSite);
window.addEventListener('load', getStudies);
window.addEventListener('load', getJobs);
window.addEventListener('load', getSites);


/**
 * <------------------ Studier -------------------------->
 */
// Hämta studier
function getStudies () {
    studiesEl.innerHTML = ""; 
    StudieErrorMessage.innerHTML = "";
    fetch('https://studenter.miun.se/~many2005/dt173g/projectapi/studies.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(studie => {
            // Utskrift till DOM
            studiesEl.innerHTML += 
            `<div class="card">
                <div>
                    <label for="school">Skola:</label>
                    <input type="text" id="uni${studie.id}" value="${studie.uni}">
                    <br>
                    <label for="education">Utbildning:</label>
                    <input type="text" id="edu${studie.id}" value="${studie.edu}">
                    <br>
                    <label for="schoolStart">Start-datum:</label>
                    <input type="date" id="start${studie.id}" placeholder="2000-01-01" value="${studie.start}">
                    <br>
                    <label for="schoolEnd">Slut-datum:</label>
                    <input type="date" id="end${studie.id}" placeholder="2000-01-01" value="${studie.end}">
                    <br>
                    <button id="delete${studie.id}" onClick="deleteStudie(${studie.id})" class="delete">Radera</button>
                    <button id="update${studie.id}" onClick="updateStudie(${studie.id})" class="update">Uppdatera</button>
                </div>
            </div>`
        })
    })
}

// Funktion för att lägga till studier
function addStudie() {
    // Deklarerar värden från formulär till variabler
    let uni = studieUni.value;
    let edu = studieEdu.value;
    let schoolStart = studieStart.value;
    let schoolEnd = studieEnd.value;
    let studie = {'uni': uni, 'edu': edu, 'start': schoolStart, 'end': schoolEnd};
    // Kontroll av värden
    if (uni.length > 0 && edu.length > 0 && schoolStart.length > 0 && schoolEnd.length > 0) {
        // Fetch-anrop
        fetch('https://studenter.miun.se/~many2005/dt173g/projectapi/studies.php', {
        method: 'POST',
        body: JSON.stringify(studie),
    })
    .then(response => response.json())
    .then(data => {
        getStudies();
        studieUni.value = "";
        studieEdu.value = "";
        studieStart.value = "";
        studieEnd.value = "";
    })
    .catch(error => {
        console.log('Error: ', error);
    })
    } else {
        // Vid fel värden
        StudieErrorMessage.innerHTML = "Vänligen fyll i alla fält!";
    }
}
// Uppdatera studie
function updateStudie(id) {
    let uni = document.getElementById("uni" + id).value;
    let edu = document.getElementById("edu" + id).value;
    let start = document.getElementById("start" + id).value;
    let end = document.getElementById("end" + id).value;    
    let studie = {'id' : id, 'uni' : uni, 'edu' : edu, 'start' : start, 'end' : end};
    // Kontroll av värden
    if (uni.length > 0 && edu.length > 0 && start.length > 0 && end.length > 0) {
        // Fetch-anrop
        fetch('https://studenter.miun.se/~many2005/dt173g/projectapi/studies.php?id=' + id, {
            method: 'PUT',
            body: JSON.stringify(studie),
        })
        .then(response => response.json())
        .then(data => {
            studieError.innerHTML = "";
            studieUpdate.innerHTML = "Studie uppdaterad!";
            getStudies();
        })
    } else {
        // Vid fel värden
        studieUpdate.innerHTML = "";
        studieError.innerHTML = "Alla fält måste vara i fyllda!";
    }
}
// Ta bort studie
function deleteStudie(id) {
    // Fetch-anrop
    fetch('https://studenter.miun.se/~many2005/dt173g/projectapi/studies.php?id=' + id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        getStudies();
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}

/**
 * <------------------ JOBB -------------------------->
 */

// Funktioner för jobb 
// Hämta jobb
function getJobs () {
    jobsEl.innerHTML = "";
    JobErrorMessage.innerHTML = "";
    // Fetch-anrop
    fetch('https://studenter.miun.se/~many2005/dt173g/projectapi/jobs.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(job => {
            // Utskrift till DOM
            jobsEl.innerHTML += 
            `<div class="card">
            <div>
                <label for="job">Arbetsplats:</label>
                <input type="text" id="job${job.id}" value="${job.job}">
                <br>
                <label for="education">Utbildning:</label>
                <input type="text" id="jobtitle${job.id}" value="${job.title}">
                <br>
                <label for="schoolStart">Start-datum:</label>
                <input type="date" id="jobstart${job.id}" placeholder="2000-01-01" value="${job.start}">
                <br>
                <label for="schoolEnd">Slut-datum:</label>
                <input type="date" id="jobend${job.id}" placeholder="2000-01-01" value="${job.end}">
                <br>
                <button id="delete${job.id}" onClick="deleteJob(${job.id})" class="delete">Radera</button>
                <button id="update${job.id}" onClick="updateJob(${job.id})" class="update">Uppdatera</button>
            </div>
        </div>`
        })
    })
}

// Funktion för att lägga till Jobb
function addJob() {
    // Deklarerar värden från formulär till variabler
    let job = jobWork.value;
    let title = jobTitle.value;
    let start = jobStart.value;
    let end = jobEnd.value;
    let jobs = {'job': job, 'title': title, 'start': start, 'end': end};
    // Kontroll av värden
    if (job.length > 0 && title.length > 0 && start.length > 0 && end.length > 0) {
        // Fetch-anrop
        fetch('https://studenter.miun.se/~many2005/dt173g/projectapi/jobs.php', {
        method: 'POST',
        body: JSON.stringify(jobs),
    })
    .then(response => response.json())
    .then(data => {
        getJobs();
        jobWork.value = "";
        jobTitle.value = "";
        jobStart.value = "";
        jobEnd.value = "";
    })
    .catch(error => {
        console.log('Error: ', error);
    })
    } else {
        // Vid fel värden
        JobErrorMessage.innerHTML += "Vänligen fyll i alla fält!";
    }
}

// Uppdatera Jobb
function updateJob(id) {
    let job = document.getElementById("job" + id).value;
    let title = document.getElementById("jobtitle" + id).value;
    let start = document.getElementById("jobstart" + id).value;
    let end = document.getElementById("jobend" + id).value;    
    let jobs = {'id' : id, 'job' : job, 'title' : title, 'start' : start, 'end' : end};
    // Kontroll av värden
    if (job.length > 0 && title.length > 0 && start.length > 0 && end.length > 0) {
        // Fetch-anrop
        fetch('https://studenter.miun.se/~many2005/dt173g/projectapi/jobs.php?id=' + id, {
            method: 'PUT',
            body: JSON.stringify(jobs),
        })
        .then(response => response.json())
        .then(data => {
            jobError.innerHTML = "";
            jobUpdate.innerHTML = "Jobb uppdaterat!";
            getJobs();
        })
    } else {
        // Vid fel värden
        jobUpdate.innerHTML = "";
        jobError.innerHTML = "Alla fält måste vara i fyllda!";
    }
}
// Ta bort jobb
function deleteJob(id) {
    // Fetch-anrop
    fetch('https://studenter.miun.se/~many2005/dt173g/projectapi/jobs.php?id=' + id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        getJobs();
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}



/**
 * <------------------ Webbsidor -------------------------->
 */

// Hämta webbsidor
function getSites () {
    sitesEl.innerHTML = "";
    // Fetch-anrop
    fetch('https://studenter.miun.se/~many2005/dt173g/projectapi/sites.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(site => {
            // Utskrift till DOM
            sitesEl.innerHTML += 
            `<div class="card">
            <div>
                <label for="siteTitle">Webbsida:</label>
                <input type="text" id="siteTitle${site.id}" value="${site.title}">
                <br>
                <label for="education">Webblänk:</label>
                <input type="text" id="url${site.id}" value="${site.url}">
                <br>
                <label for="schoolStart">Beskrivning:</label>
                <input type="text" id="info${site.id}" value="${site.info}">
                <br>
                <button id="delete${site.id}" onClick="deleteSite(${site.id})" class="delete">Radera</button>
                <button id="update${site.id}" onClick="updateSite(${site.id})" class="update">Uppdatera</button>
            </div>
        </div>`
        })
    })
}
// Funktion för att lägga till webbsida
function addSite() {
    // event.preventDefault()
    // Deklarerar värden från formulär till variabler
    let title = siteTitle.value;
    let url = siteUrl.value;
    let info = siteInfo.value;
    let site = {'title': title, 'url': url, 'info': info};
    // Kontroll av värden
    if (title.length > 0 && url.length > 0 && info.length > 0) {
        // Fetch-anrop
        fetch('https://studenter.miun.se/~many2005/dt173g/projectapi/sites.php', {
        method: 'POST',
        body: JSON.stringify(site),
    })
    .then(response => response.json())
    .then(data => {
        getSites();
        siteTitle.value = "";
        siteUrl.value = "";
        siteInfo.value = "";
    })
    .catch(error => {
        console.log('Error: ', error);
    })
    } else {
        // Vid fel värden
        SiteErrorMessage.innerHTML += "Vänligen fyll i alla fält!";
    }
}
// Uppdatera webbsida
function updateSite(id) {
    let title = document.getElementById("siteTitle" + id).value;
    let url = document.getElementById("url" + id).value;
    let info = document.getElementById("info" + id).value;
    let site = {'id' : id, 'title' : title, 'url' : url, 'info' : info};
    // Kontroll av värden
    if (title.length > 0 && url.length > 0 && info.length > 0) {
        fetch('https://studenter.miun.se/~many2005/dt173g/projectapi/sites.php?id=' + id, {
            // Fetch-anrop
            method: 'PUT',
            body: JSON.stringify(site),
        })
        .then(response => response.json())
        .then(data => {
            siteError.innerHTML = "";
            siteUpdate.innerHTML = "Webbsida uppdaterad!";
            getSites();
        })
    } else {
        // Vid fel värden
        siteUpdate.innerHTML = "";
        siteError.innerHTML = "Alla fält måste vara i fyllda!";
    }
}
// Ta bort sidor
function deleteSite(id) {
    // Fetch-anrop
    fetch('https://studenter.miun.se/~many2005/dt173g/projectapi/sites.php?id=' + id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        getSites();
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}