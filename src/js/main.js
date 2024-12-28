'use strict';

const submitBtn = document.querySelector('.js__submitBtn');
const inputName = document.querySelector('.js__inputName');

const charactersUl = document.querySelector('.js__charactersUl');
const favCharactersUl = document.querySelector('.js__favCharactersUl');

const deleteFavs = document.querySelector('.js__deleteFavs');

let html = '';
let characters = [];
let favCharacters = [];

const placeHolder = "https://placehold.co/210x295/80c0f5/white/?text=Disney";


fetch('//api.disneyapi.dev/character?pageSize=50')
 .then(response => response.json())
 .then((data) => {

    characters = data.data;

    for ( const charactersObj of characters) {
    
        html += `
        <li class="card">
              <h2 class="card_title">${charactersObj.name}</h2>
              <img src="${charactersObj.imageUrl || placeHolder}" alt="Foto de ${charactersObj.name}" onerror="this.onerror=null; this.src='${placeHolder}';"></img>
        </li>
        `;
    }

    charactersUl.innerHTML = html;

    const cards = document.querySelectorAll('.card');
    cards.forEach(singleCard =>{
        singleCard.addEventListener('click', handleFavChar);
    });

    loadFavCharacters();

});

const handleFavChar = (ev) => {
    const chosenCard = ev.currentTarget;
    const chosenName = chosenCard.querySelector('.card_title').innerHTML;

    const character = characters.filter((character) => character.name === chosenName);

    let htmlFav = '';
    

    const fav = favCharacters.find((character) => character.name === chosenName);
    if(fav === undefined){
        favCharacters.push(character[0]);
    }
    else{
        favCharacters = favCharacters.filter((character) => character.name !== chosenName);
    }

    for ( const favCh of favCharacters) {
    
        htmlFav += `
        <li class="card favCharacters">
              <h2 class="card_title">${favCh.name}</h2>
              <img src="${favCh.imageUrl || placeHolder}" alt="Foto de ${favCh.name}" onerror="this.onerror=null; this.src='${placeHolder}';"></img>
        </li>
        `;
    }

    favCharactersUl.innerHTML = htmlFav;
    localStorage.setItem('favCharacters', JSON.stringify(favCharacters));

    const cards = document.querySelectorAll('.card');
    cards.forEach(singleCard => {
        singleCard.addEventListener('click', handleFavChar);
    });
};

const handleFilteredName = (ev) =>{
    ev.preventDefault();
    const nameValue = inputName.value;
    const filteredCharacters = characters.filter((character) => {
            return character.name.toLowerCase()
            .includes(nameValue.toLowerCase())
    });

    let htmlFiltered = '';

    for ( const filterCh of filteredCharacters) {
        
        htmlFiltered += `
        <li class="card">
            <h2 class="card_title">${filterCh.name}</h2>
            <img src="${filterCh.imageUrl || placeHolder}" alt="Foto de ${filterCh.name}" onerror="this.onerror=null; this.src='${placeHolder}';"></img>
        </li>
        `;
    }

    charactersUl.innerHTML = htmlFiltered;

    const cards = document.querySelectorAll('.card');
    cards.forEach(singleCard => {
        singleCard.addEventListener('click', handleFavChar);
    });
};

const handleDeletedFavs = (ev) => {
    ev.preventDefault();

    favCharacters = [];
    favCharactersUl.innerHTML = '';
    localStorage.removeItem('favCharacters');
};

const loadFavCharacters = () => {
    const storedFavs = localStorage.getItem('favCharacters');
    if (storedFavs) {
        favCharacters = JSON.parse(storedFavs);
        let htmlFav = '';

        for (const favCh of favCharacters) {
          htmlFav += `
            <li class="card favCharacters">
                  <h2 class="card_title">${favCh.name}</h2>
                  <img src="${favCh.imageUrl || placeHolder}" alt="Foto de ${favCh.name}" onerror="this.onerror=null; this.src='${placeHolder}';"></img>
            </li>
          `;
        }
        favCharactersUl.innerHTML = htmlFav;
      }
};

inputName.addEventListener('input', handleFilteredName);
submitBtn.addEventListener('click', handleFilteredName);
deleteFavs.addEventListener('click', handleDeletedFavs);