let order = [];
let clickedOrder = [];
let score = 0;

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

function playSound(buffer) {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
}

// Função para mostrar a mensagem
let showMessage = (text) => {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.style.display = 'block'; // Mostra a div

}

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i = 0; i < order.length; i++) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, i + 1);
    }
}

let lightColor = (element, number) => {
    setTimeout(() => {
        element.classList.add('selected');
    }, number * 500); // Acende após um delay de number * 500

    setTimeout(() => {
        element.classList.remove('selected');
    }, number * 500 + 250); // Desliga 250ms depois de acender
}

let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        score++;  // incrementa a pontuação aqui
        showMessage(`Pontuação: ${score}\n`);
        nextLevel();
    }
}

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

let nextLevel = () => {
    shuffleOrder();
    updateScore(); 
}

let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    playGame();
}


let playGame = () => {
    score = 0; // Aqui zeramos a pontuação
    showMessage('Bem vindo ao Genius! Iniciando novo jogo!');
    updateScore(); // Atualizar o placar
    nextLevel();
}

let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;

let updateScore = () => {
    if(score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore); // Salva a nova pontuação máxima no localStorage
    }
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.textContent = `Pontuação Máxima: ${highScore}`;
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

const restartButton = document.getElementById('restartGame');
restartButton.addEventListener('click', () => {
    order = [];
    clickedOrder = [];
    playGame();
});

playGame();
