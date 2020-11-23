'use strict';

let playerState = 0;
let sumOfPick = 0;
let gameState = 0;
let winGame = 0;
const gameArray = [
    '0', '1', '2',
    '3', '4', '5',
    '6', '7', '8'
]

// Tömb elemeinek vizsgálata

function checkLine(i, j, k, box) {
    const result = document.querySelector('.result-hide');
    
    if (gameArray[i] === gameArray[j] && gameArray[i]===gameArray[k]) {
        gameState = 1;
        winGame = 1;
        result.innerHTML = 'A győztes: <b>'+gameArray[i]+'</b>';
        result.setAttribute('class', 'result');
        const boxClass1 = box[i].getAttribute('class');
        const boxClass2 = box[j].getAttribute('class');
        const boxClass3 = box[k].getAttribute('class');
        box[i].setAttribute('class', boxClass1+' border');
        box[j].setAttribute('class', boxClass2+' border');
        box[k].setAttribute('class', boxClass3+' border');
        document.querySelector('.restart-hide').setAttribute('class', 'restart');
    } else {
        if (sumOfPick === 9 && winGame === 0) {
            result.innerHTML = 'Nincs győztes.';
            result.setAttribute('class', 'result');
            document.querySelector('.restart-hide').setAttribute('class', 'restart');
        }
    }
}

function checkGrid(box) {
    checkLine(0, 1, 2, box); // 0 1 2 - első sor
    checkLine(3, 4, 5, box); // 3 4 5 - második sor
    checkLine(6, 7, 8, box); // 6 7 8 - harmadik sor
    checkLine(0, 3, 6, box); // 1 3 6 - első oszlop
    checkLine(1, 4, 7, box); // 1 4 7 - második oszlop
    checkLine(2, 5, 8, box); // 2 5 8 - harmadik oszlop
    checkLine(0, 4, 8, box); // 0 4 8 - első átló
    checkLine(2, 4, 6, box); // 2 4 6 - második átló
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