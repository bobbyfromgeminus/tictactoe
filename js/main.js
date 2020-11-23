'use strict';

let playerState = 0;
let sumOfPick = 0;
let gameState = 0;
const players = ['O', 'X']
const gameArray = [
    '0', '1', '2',
    '3', '4', '5',
    '6', '7', '8'
]

// Tömb elemeinek vizsgálata

function checkLine(i, j, k, box) {    
    if (gameArray[i] === gameArray[j] && gameArray[i]===gameArray[k]) {
        gameState = 1;
        const boxClass1 = box[i].getAttribute('class');
        const boxClass2 = box[j].getAttribute('class');
        const boxClass3 = box[k].getAttribute('class');
        box[i].setAttribute('class', boxClass1+' border');
        box[j].setAttribute('class', boxClass2+' border');
        box[k].setAttribute('class', boxClass3+' border');
    }
}

function checkGrid(box) {
    checkLine(0, 1, 2, box); // első sor
    checkLine(3, 4, 5, box); // második sor
    checkLine(6, 7, 8, box); // harmadik sor
    checkLine(0, 3, 6, box); // első oszlop
    checkLine(1, 4, 7, box); // második oszlop
    checkLine(2, 5, 8, box); // harmadik oszlop
    checkLine(0, 4, 8, box); // első átló
    checkLine(2, 4, 6, box); // második átló
    whoWin();
}

function whoWin() {
    const result = document.querySelector('.result-hide');
    const restart = document.querySelector('.restart-hide');
    if (gameState===1) {
        restart.setAttribute('class', 'restart');
        result.setAttribute('class', 'result');
        result.innerHTML = 'A győztes: <b>'+players[playerState]+'</b>';
    } else {
        if (sumOfPick === 9) {
            result.innerHTML = 'Nincs győztes.';
            result.setAttribute('class', 'result');
            document.querySelector('.restart-hide').setAttribute('class', 'restart');
        }
    }
}

function boxPicker(i, box) {
    const boxClass = box[i].getAttribute('class');
    const info = document.querySelector('.info')
    info.innerHTML = '';
    if (gameState===0) {
        if (boxClass!='section') {
            info.innerHTML = 'Ez bizony már foglalt.';
        } else {
            if (playerState===0) {
                box[i].setAttribute('class', 'picked green');
                box[i].textContent = 'O';
                gameArray[i] = 'O';
                sumOfPick += 1;
                checkGrid(box);
                playerState = 1;
            } else {
                box[i].setAttribute('class', 'picked red');
                box[i].textContent = 'X';
                gameArray[i] = 'X';
                sumOfPick += 1;
                checkGrid(box);
                playerState = 0;
            }
        }
    } else {
        info.innerHTML = 'Már vége a játéknak!';
    }
}

function boxClickEvent() {
    const box  = document.querySelectorAll('.section');
    for (let i = 0; i < box.length; i += 1) {
        box[i].addEventListener('click', () => boxPicker(i, box));
    }
}

boxClickEvent();