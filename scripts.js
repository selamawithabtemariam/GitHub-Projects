
console.log("Working with GitHub api");

function requestUserRepos(username){
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/users/${username}/repos`;
    // const url = `https://api.github.com/users//repos`;
    
    xhr.open('GET', url, true);

    // parsing through the request
    xhr.onload = function() {
        // convert api data to JSON format
        const data = JSON.parse(this.response);

        console.log(data);

        const projectList = document.querySelector(".api-data");

        for(let i in data){
            const eachTitle = data[i].name;
            const eachDesc = data[i].description;
            const eachUrl = data[i].html_url;
            const hasPages = data[i].hasPages;

            const newProject = document.createElement('a');
            newProject.href = eachUrl;
            newProject.innerText = eachTitle;
            
            if(eachDesc != null)
                newProject.innerText += " : " + eachDesc;

            projectList.appendChild(newProject);
        }
    }
    xhr.send();
}

let githubUser = 'abrahammehari';
requestUserRepos(githubUser);