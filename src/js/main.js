'use strict';

const submitBtn = document.querySelector('.js__submitBtn');
const inputName = document.querySelector('.js__inputName');

const charactersUl = document.querySelector('.js__charactersUl');
const favCharactersUl = document.querySelector('js__favCharactersUl');

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

    debugger

    const cards = document.querySelectorAll('.card');
    cards.forEach(singleCard =>{
        singleCard.addEventListener('click', handleFavChar);
    });

});

const handleFavChar = (ev) => { debugger
    const chosenCard = ev.currentTarget;
    const chName = chosenCard.querySelector('.card_title').innerHTML;

    const character = characters.filter((character) => character.name === chName);
    chosenCard.classList.toggle('favCharacters');
};




