'use strict';

const { splitVendorChunk } = require("vite");

const submitBtn = document.querySelector('.js__submitBtn');
const inputName = document.querySelector('.js__inputName');

const charactersUl = document.querySelector('.js__charactersUl');
const favCharacters = document.querySelector('js__favCharacters');

let html = '';
let characters = [];

const placeHolder = "https://placehold.co/210x295?text=Disney";


fetch('//api.disneyapi.dev/character?pageSize=50')
 .then(response => response.json())
 .then((data) => {

    characters = data.data;

    for ( const charactersObj of characters) {
    
        html += `
        <li class="card js__card">
              <h2 class="card_title">${charactersObj.name}</h2>
              <img src="${charactersObj.imageUrl || placeHolder}" alt="Foto de ${charactersObj.name}"></img>
        </li>
        `
    }

    charactersUl.innerHTML = html;
});


/*const card = document.querySelector('js__card');

card.addEventListener('click', handleFavCard)
const handleFavCard = (ev) => {
   
characters.slice
}*/

