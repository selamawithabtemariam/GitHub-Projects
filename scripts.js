
console.log("Working with GitHub api");

function requestUserRepos(username){
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/users/${username}/repos`;
    
    xhr.open('GET', url, true);

    // parsing through the request
    xhr.onload = function() {
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
function makeItCollapsible(){
    var coll = document.getElementsByClassName("collapsible")
    var i;

    for(i = 0; i < coll.length; i++){
        coll[i].addEventListener('click', function(){
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            // toggle visiblity
            if(content.style.maxHeight){
                content.style.maxHeight = null;
            } else{
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}
// public static void main ... lol

let githubUser = 'abrahammehari';
//requestUserRepos(githubUser);
makeItCollapsible();