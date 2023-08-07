let order = [];
let clickedOrder = [];
let score = 0;
let speed = 500;  // Velocidade inicial

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

// Adicionados os elementos de áudio aqui
const soundGreen = document.getElementById('soundGreen');
const soundRed = document.getElementById('soundRed');
const soundYellow = document.getElementById('soundYellow');
const soundBlue = document.getElementById('soundBlue');

const showMessage = (text) => {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.style.display = 'block';
}

const shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order.push(colorOrder);
    clickedOrder = [];
    
    for(let i = 0; i < order.length; i++) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, i + 1);
    }
    
    // Aumenta a dificuldade à medida que o jogo avança
    if(order.length > 5) {
        speed = 400;
    }
    if(order.length > 10) {
        speed = 300;
    }
}

const lightColor = (element, number) => {
    setTimeout(() => {
        element.classList.add('selected');
        playSound(element); // Adicionado para tocar o som da cor correspondente
    }, number * speed);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number * speed + 250);
}

const playSound = (element) => {
    switch(element) {
        case green: 
            soundGreen.play();
            break;
        case red: 
            soundRed.play();
            break;
        case yellow: 
            soundYellow.play();
            break;
        case blue: 
            soundBlue.play();
            break;
    }
}

const checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver(i);
            return;  // Termina a função
        }
    }
    if(clickedOrder.length == order.length) {
        score++;
        setTimeout(nextLevel, 1000);  // Delay para o próximo nível
    }
}

const click = (color) => {
    clickedOrder.push(color);
    createColorElement(color).classList.add('selected');
    
    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

const createColorElement = (color) => {
    switch(color) {
        case 0: return green;
        case 1: return red;
        case 2: return yellow;
        case 3: return blue;
        default: return null;
    }
}

const nextLevel = () => {
    showMessage(`Pontuação: ${score}`); // Mostra a pontuação atual no topo
    shuffleOrder();
    updateScore();
}

const gameOver = (wrongTurn) => {
    alert(`Você errou na cor ${wrongTurn + 1}.\nPontuação: ${score}!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    speed = 500;  // Redefine a velocidade
    playGame();
}

const playGame = () => {
    score = 0;
    countdown(3); // Começa a contagem regressiva
    updateScore();
}

const countdown = (timeLeft) => {
    if (timeLeft > 0) {
        showMessage(`Iniciando novo jogo em ${timeLeft} segundos...`);
        setTimeout(() => countdown(timeLeft - 1), 1000);
    } else {
        showMessage('Jogo iniciado!');
        setTimeout(nextLevel, 1000);
    }
}

const updateScore = () => {
    const highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
    if(score > highScore) {
        localStorage.setItem('highScore', score);
    }
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.textContent = `Pontuação Máxima: ${highScore}`;
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

const restartButton = document.getElementById('restartGame');
restartButton.addEventListener('click', playGame);

playGame();
