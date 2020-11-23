'use strict';
let gameState = 0;

const box = document.querySelectorAll('.section');

function backgroundChanger(i) {
    if (gameState===0) {
        box[i].setAttribute('class', 'section green');
        box[i].textContent = 'O';
        gameState = 1;
    } else {
        box[i].setAttribute('class', 'section red');
        box[i].textContent = 'X';
        gameState = 0;
    }
}

function colorClickEvent() {
    for (let i = 0; i < box.length; i += 1) {
        box[i].addEventListener('click', () => backgroundChanger(i));
    }
}

colorClickEvent();