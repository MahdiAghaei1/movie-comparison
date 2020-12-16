const searchData = async (searchTerm , root) =>{ 
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
            makeDropDown(data.titles , root , data.titles.id);
        })
    })
    .catch(err => {
        console.error(err);
    });
};
const searchId = async (id , root) => {
    await fetch(`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${id}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "da68d5ede2msha95623227f2eef2p100be1jsn899d7b581b72",
            "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
        }
    })
    .then((res) => {
        res.json()
        .then((data) => {
            makeDetails(data.length , data.year , data.rating , data.rating_votes , root)
        })
    })
    .catch(err => {
        console.error(err);
    });
};

const makeDropDown = (movies,root,id) => {
    for(movie of movies){
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-guess');
        let imgDiv = document.createElement('div');
        imgDiv.classList.add('movie-img');
        let titleDiv = document.createElement('div');
        titleDiv.classList.add('movie-title');

        let img = document.createElement('img');
        img.src = movie.image;
        let title = document.createElement('p');
        title.innerText = movie.title;

        title.addEventListener('click' , (e) => {
            summaryDiv = e.path[3].nextElementSibling;
            searchId(id , summaryDiv)
        })
        imgDiv.appendChild(img);
        titleDiv.appendChild(title);
        movieDiv.appendChild(imgDiv);
        movieDiv.appendChild(titleDiv);
        root.appendChild(movieDiv);
    };
};

const leftInput = document.querySelector('#left-input');
let timeOutIdOne;
leftInput.addEventListener('input' , () => {
    if (timeOutIdOne) {
        clearTimeout(timeOutIdOne)
    }
    const leftDropDown = document.querySelector('#left-drop-down');
    leftDropDown.innerHTML ='';
    timeOutIdOne = setTimeout(() =>{
        searchData(leftInput.value , leftDropDown)
    } , 800);
});
const rightInput = document.querySelector('#right-input');
let timeOutIdTwo;
rightInput.addEventListener('input' , () => {
    if (timeOutIdTwo) {
        clearTimeout(timeOutIdTwo)
    }
    const rightDropDown = document.querySelector('#right-drop-down');
    rightDropDown.innerHTML ='';
    timeOutIdTwo = setTimeout(() =>{
        searchData(rightInput.value , rightDropDown)
    } , 800);
});

const makeDetails = (length , year , rating , votes , root) =>{
    let summary;
    let h3;
    let p;

    summary = document.createElement('div');
    summary.classList.add('summary');
    h3 = document.createElement('h3')
    h3.innerText = 'Length';
    p = document.createElement('p');
    p.innerText = length ;

    summary.appendChild(h3);
    summary.appendChild(p);
    root.appendChild(summary);
};