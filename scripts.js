
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

        for(let i in data){
            console.log("Repo : " , data[i].name);
            console.log("Description : " , data[i].description);
            console.log("URL : " , data[i].html_url);

            if(data[i].has_pages === true){
                console.log("-----> > > > > > Has a GitHub page");
            }
        }
    }
    xhr.send();
}

let githubUser = 'abrahammehari';
requestUserRepos(githubUser);