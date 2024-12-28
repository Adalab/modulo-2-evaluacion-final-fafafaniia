'use strict';

const submitBtn = document.querySelector('.js__submitBtn');
const inputName = document.querySelector('.js__inputName');

const charactersUl = document.querySelector('.js__charactersUl');
const favCharactersUl = document.querySelector('.js__favCharactersUl');

const deleteFavs = document.querySelector('js__deleteFavs')

let html = '';
let characters = [];
let favCharacters = [];

const placeHolder = "https://placehold.co/210x295?text=Disney";


fetch('//api.disneyapi.dev/character?pageSize=50')
 .then(response => response.json())
 .then((data) => {

    characters = data.data;

    for ( const charactersObj of characters) {
    
        html += `
        <li class="card">
              <h2 class="card_title">${charactersObj.name}</h2>
              <img src="${charactersObj.imageUrl || placeHolder}" alt="Foto de ${charactersObj.name}"></img>
        </li>
        `;
    }

    charactersUl.innerHTML = html;

    const cards = document.querySelectorAll('.card');
    cards.forEach(singleCard =>{
        singleCard.addEventListener('click', handleFavChar);
    });

});

const handleFavChar = (ev) => {
    const chosenCard = ev.currentTarget;
    const chName = chosenCard.querySelector('.card_title').innerHTML;

    const character = characters.filter((character) => character.name === chName);
    /*chosenCard.classList.toggle('favCharacters');*/

    let htmlFav = '';
    

    const fav = favCharacters.find((character) => character.name === chName);
    if(fav === undefined){
        favCharacters.push(character[0]);
    }
    else{
        favCharacters = favCharacters.filter((character) => character.name !== chName);
    }

    for ( const favCh of favCharacters) {
    
        htmlFav += `
        <li class="card favCharacters">
              <h2 class="card_title">${favCh.name}</h2>
              <img src="${favCh.imageUrl || placeHolder}" alt="Foto de ${favCh.name}"></img>
        </li>
        `;
    }

    favCharactersUl.innerHTML = htmlFav;

    const cards = document.querySelectorAll('.card');
    cards.forEach(singleCard =>{
        singleCard.addEventListener('click', handleFavChar);
    });
};

const handleFilteredName = (ev) =>{
    ev.preventDefault();
  debugger;
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
          <img src="${filterCh.imageUrl || placeHolder}" alt="Foto de ${filterCh.name}"></img>
    </li>
    `;
    }

    charactersUl.innerHTML = htmlFiltered;

    const cards = document.querySelectorAll('.card');
    cards.forEach(singleCard =>{
        singleCard.addEventListener('click', handleFavChar);
    });

};


inputName.addEventListener('input', handleFilteredName);
submitBtn.addEventListener('click', handleFilteredName);