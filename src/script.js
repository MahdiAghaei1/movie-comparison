//event listener => search

const searchData = async (searchTerm) =>{ 
    await fetch(`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${searchTerm}`, 
    {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "da68d5ede2msha95623227f2eef2p100be1jsn899d7b581b72",
            "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
        }
    })
    .then((res)=> {
        res.json()
        .then((data) => {
            makeDropDown(data.titles);
        })
    })
    .catch(err => {
        console.error(err);
    });
};

const makeDropDown = (guesses) => {
    const mainDiv = document.querySelector('#one');
    for(guess of guesses){
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-guess');
        let imgDiv = document.createElement('div');
        imgDiv.classList.add('movie-img');
        let titleDiv = document.createElement('div');
        titleDiv.classList.add('movie-title');

        let img = document.createElement('img');
        img.src = guess.image;
        let title = document.createElement('p');
        title.innerText = guess.title;

        imgDiv.appendChild(img);
        titleDiv.appendChild(title);
        movieDiv.appendChild(imgDiv);
        movieDiv.appendChild(titleDiv);
        mainDiv.appendChild(movieDiv);
    };
};