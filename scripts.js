function requestUserRepos(username){
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/users/${username}/repos`;
    
    xhr.open('GET', url, true);

    // parsing through the request
    xhr.onload = function() {
        const data = JSON.parse(this.response);
        // console.log(data);
        const projectList = document.querySelector(".api-data");
        for(let i in data){
            const eachTitle = data[i].name;
            const eachDesc = data[i].description;
            const eachUrl = data[i].html_url;
            const hasPages = data[i].hasPages;

            // repo button
            const newRepo = repoButtonMaker(eachTitle, eachDesc, projectList);

            // details within the repo (collapsibles)
            const repoContent = repoContentMaker(eachUrl);
            
            makeItCollapsible(newRepo);
            projectList.appendChild(repoContent);
        }
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
    repoLink.innerText = "link to repository";
    const trial = document.createElement('h1');
    trial.textContent = "hellow mf!";
    repoContent.appendChild(trial);
    repoContent.appendChild(repoLink);
    return repoContent;
}

function makeItCollapsible(thisOne){
    console.log("attaching");
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
// public static void main ... lol

let githubUser = 'abrahammehari';
requestUserRepos(githubUser);
