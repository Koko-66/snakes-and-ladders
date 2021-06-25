//1. PAGE LOADING - INSTRUCTIONS AND GAME SETUP

//hides instructions pop up window on clicking Let's go button; sets localStorage to true if instructions were shown once
function hide() {
    let instructions = document.getElementById('instructions');
    instructions.style.display !== "none" ? instructions.style.display = 'none' : instructions.style.display = 'block';
    localStorage.setItem('instructionsShown', 'true');
    hideBoard();
    let dice = document.getElementById('dice');
    dice.style.display !== 'none' ? dice.style.display = 'none' : dice.style.display = 'block';
}
//adds event listenter for instructions not to show on reloading; creates board instead
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('instructionsShown')) {
        instructions.style.display = "none";
    }
    createGameBoard();
    selectAvatar();
})

//hides board when instructions are shown 
// fixes instructions width issue on smaller devices
function hideBoard() {
    let instructions = document.getElementById('instructions');
    let board = document.getElementById('game-area');
    instructions.style.display !== "none" ? board.style.display = "none" : board.style.display = "block";
}


//variables to store avatars
let blue = `<img src="assets/images/avatar_blue.png" alt="blue avatar" class="avatar">`;
let yellow = `<img src="assets/images/avatar-yellow2.png" alt="yellow avatar" class="avatar">`;
let evilBoy = `<img src="assets/images/avatar_red-copy.png" alt="red avatar" class="avatar">`;

//objects to store players position and avatar
let player = {
    name: 'pl',
    position: 1,
    result: 0
};
let ai = {
    name: 'ai',
    position: 1,
    avatar: evilBoy,
    result: 0
};

//selects avatar and places it in the start field
function selectAvatar() {
    let avatars = document.getElementsByClassName('avatar');
    for (let avatar of avatars) {
        avatar.addEventListener('click', function() {
            if (this.getAttribute('data-avatar-color') === 'blue') {
                player.avatar = blue;
                document.getElementById('f1').innerHTML = `1<div id ="pl-f1" class="player">${blue}</div><div id ="ai-f1" class="ai">${evilBoy}</div>`;
            } else {
                player.avatar = yellow;
                document.getElementById('f1').innerHTML = `1<div id ="pl-f1" class="player">${yellow}</div><div id ="ai-f1" class="ai">${evilBoy}</div>`;
            }
            localStorage.setItem('playerAvatar', player.avatar);
        })
    }
    player.avatar = localStorage.getItem('playerAvatar');
    localStorage.setItem('avatarSelected', 'true');
}

// generates gameboard by row and then field

function createGameBoard() {
    let gameBoard = document.getElementById('game-board');
    let end = document.createElement('div');
    end.className = 'board-edge';
    end.id = 'end';
    end.innerHTML = "END";
    gameBoard.appendChild(end);
    for (let r = 1; r < 6; ++r) {
        let row = document.createElement('div');
        row.className = 'board-row';
        row.style.flexDirection = r % 2 === 0 ? "row" : "row-reverse"; //reverses the order for every other row to make numbers flow correctly 
        for (let i = 1; i < 6; ++i) {
            let field = document.createElement('div');
            field.className = 'field';
            row.appendChild(field);
        }
        gameBoard.appendChild(row);
    }
    let start = document.createElement('div');
    start.className = 'board-edge';
    start.id = 'start';
    start.innerHTML = "START";
    gameBoard.appendChild(start);
    fillBoard();
}
//Adds numbers to the board and creates objects to push to board array for tracking 
//in descending order to start game from the bottom of the board
function fillBoard() {
    let i = 25;
    let fields = document.getElementsByClassName("field");
    for (field of fields) {
        let snake = `<img src = "assets/images/purple-snake2.png" alt="snake" class="snake">`
        let ladder = `<img src = "assets/images/ladder2.png" alt="ladder" class="ladder" data-type"="ladder">`

        // changes first field to "start" and last to "end" and adds separate divs for ai and player avatars with id's
        if (i === 1) {
            if (localStorage.getItem('avatarSelected')) { //checks if avatar has been already selected and places the selected to place it in.
                let avatar = localStorage.getItem('playerAvatar');
                field.innerHTML = `1<div id ="pl-f1" class="player">${avatar}</div> <div id ="ai-f1" class="ai">${evilBoy}</div>`;
            } else {
                field.innerHTML = `1<div id ="pl-f1" class="player"></div> <div id ="ai-f1" class="ai">${evilBoy}</div>`;
            }
        } else if (i === 7 || i === 20 || i === 24) {
            field.innerHTML = `${i}${snake}<div id ="pl-f${i}" class="player"></div> <div id ="ai-f${i}" class="ai">`;
            field.setAttribute('data-type', 'snake');
        } else if (i === 2 || i === 13 || i === 19) {
            field.innerHTML = `${i}${ladder}<div id ="pl-f${i}" class="player"></div> <div id ="ai-f${i}" class="ai">`;
            field.setAttribute('data-type', 'ladder');
        } else {
            field.innerHTML = `${i}<div id ="pl-f${i}" class="player"></div> <div id ="ai-f${i}" class="ai">`;
        }

        field.id = `f${i}`;
        i -= 1;
    }
}


//2. GAME FUNCTIONS

//sets game Running function for while loop
let gameRunning = true;

//generates random number between 1 and 6 for player; 
function generateNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

let currentPlayer;
let dice = document.getElementById('dice');
dice.addEventListener('click', round);

//
function diceThrow(currentPlayer) {
    let result = generateNumber();
    currentPlayer.result = result;
    dice.innerHTML = `<img src="../assets/images/Dice-${result}-b.svg.png" alt="Dice result ${result}">`;
    if (currentPlayer === player) {
        alert(`Your result: ${player.result}`);
    } else {
        alert(`EvilBoy's result: ${ai.result}`);
    }
}

// -- check who goes first and hides Start Game button/Shows dice; sets value for current player
function goesFirst() {
    diceThrow(player);
    diceThrow(ai);
    if (player.result === ai.result) {
        alert(`It's a tie! Try again!`);
    } else if (player.result > ai.result) {
        alert(`Congratulations! You're going first`);
        currentPlayer = player;
        moveAvatar(player);
        showDice();
        checkType();
    } else {
        alert(`Sorry! EvilBoy is starting this time!`);
        currentPlayer = ai;
        moveAvatar(ai);
        showDice();
        checkType();
    }
    // currentPlayer = player;
}

// Shows dice after goes first initiated
function showDice() {
    let startButton = document.getElementById('start-game-btn');
    let dice = document.getElementById('dice');
    startButton.style.display = 'none';
    dice.style.display = 'block';
}

//rules for moving if snake is in the field
function moveIfSnake(currentPlayer) {
    if (currentPlayer.position === 3 || (currentPlayer.position - 3) % 5 === 0) {
        currentPlayer.position = currentPlayer.position - 5;
    } else if (currentPlayer.position === 1 || (currentPlayer.position - 1) % 5 === 0) {
        currentPlayer.position = currentPlayer.position - 1;
    } else if (currentPlayer.position === 2 || (currentPlayer.position - 2) % 5 === 0) {
        currentPlayer.position = currentPlayer.position - 3;
    } else if (currentPlayer.position === 4 || (currentPlayer.position - 4) % 5 === 0) {
        currentPlayer.position = currentPlayer.position - 7;
    } else {
        currentPlayer.position = currentPlayer.position - 9;
    }
}

//rules for moving if ladder is in the field
function moveIfLadder(currentPlayer) {
    if (currentPlayer.position === 3 || (currentPlayer.position - 3) % 5 === 0) {
        currentPlayer.position = currentPlayer.position + 5;
    } else if (currentPlayer.position === 1 || (currentPlayer.position - 1) % 5 === 0) {
        currentPlayer.position = currentPlayer.position + 9;
    } else if (currentPlayer.position === 2 || (currentPlayer.position - 2) % 5 === 0) {
        currentPlayer.position = currentPlayer.position + 7;
    } else if (currentPlayer.position === 4 || (currentPlayer.position - 4) % 5 === 0) {
        currentPlayer.position = currentPlayer.position + 3;
    } else {
        currentPlayer.position = currentPlayer.position + 1;
    }
}

function moveAvatar(currentPlayer) {
    document.getElementById(`${currentPlayer.name}-f${currentPlayer.position}`).innerHTML = ""; // deletes avatar from current position;
    currentPlayer.position = currentPlayer.position + currentPlayer.result;
    if (currentPlayer.position < 25) {
        document.getElementById(`${currentPlayer.name}-f${currentPlayer.position}`).innerHTML = currentPlayer.avatar; // places avatar in the new position;
    } else {
        currentPlayer.position >= 25;
        document.getElementById(`${currentPlayer.name}-f25`).innerHTML = currentPlayer.avatar;
    }
}

function checkType() {
    let field = document.getElementById(`f${currentPlayer.position}`);
    if (field.getAttribute('data-type') === 'snake') {
        document.getElementById(`${currentPlayer.name}-f${currentPlayer.position}`).innerHTML = ""; // deletes avatar from current position;
        moveIfSnake(currentPlayer);
        document.getElementById(`${currentPlayer.name}-f${currentPlayer.position}`).innerHTML = currentPlayer.avatar;
        alert("Ooops! There's a snake! Run away!");
    } else if (field.getAttribute('data-type') === 'ladder') {
        document.getElementById(`${currentPlayer.name}-f${currentPlayer.position}`).innerHTML = "";
        moveIfLadder(currentPlayer);
        alert("There's a ladder! Climb up!");
        document.getElementById(`${currentPlayer.name}-f${currentPlayer.position}`).innerHTML = currentPlayer.avatar;
    } else {
        document.getElementById(`${currentPlayer.name}-f${currentPlayer.position}`).innerHTML = currentPlayer.avatar;
    }
}

//checks if player/ai's position is greater than 25 and finishes the
function checkIfWin(currentPlayer) {
    if (currentPlayer.position >= 25) {
        gameRunning = false;
        if (currentPlayer === player) {
            alert("Congratulations! You've won!");
        } else {
            alert("Sorry! You lost, try again!");
        }

    } else {
        gameRunning = true;
    }
}

function playerTurn() {
    currentPlayer = player;
    moveAvatar(player);
    checkType(player);
    checkIfWin(player);
}

function aiTurn() {
    currentPlayer = ai;
    diceThrow(ai);
    moveAvatar(ai);
    checkType(ai);
    checkIfWin(ai);
    currentPlayer = player;

}

function round() {
    if (gameRunning) {
        playerTurn();
        aiTurn()
    } else {
        alert("Game over!");
    }
}