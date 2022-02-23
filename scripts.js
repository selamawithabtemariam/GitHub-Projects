function populateFields(username){
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/users/${username}/repos`;

    xhr.open('GET', url, true);
    // parsing through the request
    let listOfTitles = [];
    xhr.onload = function() {
        const data = JSON.parse(this.response);
        // console.log(data);
        const projectList = document.querySelector(".api-data");
        for(let i in data){
            const eachTitle = data[i].name;
            const eachDesc = data[i].description;
            const eachUrl = data[i].html_url;
            const hasPages = data[i].hasPages;
            
            // add to the repo name list
            listOfTitles.push(eachTitle);
            // if hasPages is true add a link to it.

            // repo button
            const newRepo = repoButtonMaker(eachTitle, eachDesc, projectList);
            
            // details within the repo (collapsibles)
            const repoContent = repoContentMaker(eachUrl);
            
            makeItCollapsible(newRepo);
            projectList.appendChild(repoContent);
        }
        drawMainChart(username, listOfTitles);
    }
    xhr.send();
}
function repoButtonMaker(eachTitle, eachDesc, projectList) {
    const newRepo = document.createElement('button');
    newRepo.type = "button";
    newRepo.className = "collapsible";
    newRepo.innerText = eachTitle;
    if (eachDesc != null)
        newRepo.innerText += " : " + eachDesc;
    projectList.appendChild(newRepo);
    return newRepo;
}
function repoContentMaker(eachUrl) {
    const repoContent = document.createElement('div');
    repoContent.className = 'repo-content';
    const repoLink = document.createElement('a');
    repoLink.href = eachUrl;
    repoLink.innerText = "Goto repository";
    const trial = document.createElement('h1');
    trial.textContent = "Graphs and details about the repo";
    repoContent.appendChild(trial);
    repoContent.appendChild(repoLink);
    return repoContent;
}
function makeItCollapsible(thisOne){
    thisOne.addEventListener('click', function(){
            thisOne.classList.toggle("active");
            var content = this.nextElementSibling;
            
            // toggle visiblity
            if(content.style.maxHeight){
                content.style.maxHeight = null;
                console.log("clicked off");
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                console.log("clicked on");
            }
    });
}
function drawMainChart(userURL, listOfRepo){
    const ctx = document.getElementById('user-languages');
    const xhrLan = new XMLHttpRequest();
    console.log(listOfRepo);

    for(const eachRepo of listOfRepo){
        const urlLan = `https://api.github.com/repos/${userURL}/${eachRepo}/languages`;
        console.log(urlLan);
        xhrLan.open('GET', urlLan, true);

        xhrLan.onload = function() {
            const languagesList = JSON.parse(this.response);
            console.log(languagesList);
            for(let langs in languagesList){
                console.log(langs);
            }
        }
        xhrLan.send();
    }
    
    let labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    let labelData = [34, 42, 19, 45];

    const mainChart = chartMain(ctx, labels, labelData);
}

function chartMain(ctx, labels, labelData) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Language breakdown',
                data: labelData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// public static void main ... lol
let githubUser = 'abrahammehari';
populateFields(githubUser);

// make use of bubbling of DOM elements