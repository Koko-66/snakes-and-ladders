//1. PAGE LOADING - INSTRUCTIONS AND GAME SETUP

//variables to store avatars
let blue = `<img src="assets/images/avatar_blue.png" alt="blue avatar" class="avatar">`;
let yellow = `<img src="assets/images/avatar-yellow2.png" alt="yellow avatar" class="avatar">`;
let evilBoy = `<img src="assets/images/avatar_red-copy.png" alt="red avatar" class="avatar">`;
//objects to store players position and avatar
let player = {
    name: 'pl',
    result: 0,
    position: 1,
    newPosition: 0
};
let ai = {
    avatar: evilBoy,
    name: 'ai',
    result: 0,
    position: 1,
    newPosition: 0
};
let currentPlayer;
let dice = document.getElementById('dice')
let instructions = document.getElementById('instructions');
let gameRunning = true;
let id; // to set iverval for movePlayer function
let messageBox = document.getElementById('message-box'); //div to display messages in rather than alerts
let snakeField; // set to true or false to reverse increment in movePlayer function


/**
 * Toggles show/hide of instructions and board, so that both are not shown at the same time
 * Toggles visibility of dice
 * Sets localStorage 'insturctionsShown' to true.
 */
function hide() {
    instructions.style.display !== "none" ? instructions.style.display = 'none' : instructions.style.display = 'block';
    localStorage.setItem('instructionsShown', 'true');
    hideBoard();
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

dice.addEventListener('click', round);

/**
 * Toggles visibility of the board
 */
function hideBoard() {
    let board = document.getElementById('game-area');
    instructions.style.display !== "none" ? board.style.display = "none" : board.style.display = "block";
}

/**
 * Selects avatar on click
 * places it in the start field and
 * saves the choice in local storage
 */
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
/**
 * Generates board by row and then field
 */
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

/**
 * Adds numbers, snakes, ladders and id's to the board for tracking movement
 * Additions in descending oreder for the numbering to start at the bottom of the page.
 */
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
    addResultHolders();
}

/**
 * Adds player and ai results to ai-results and player-results divs.
 */
function addResultHolders() {
    document.getElementById('ai-result').innerHTML = `<strong>EvilBoy result:</strong> ${ai.result}`;
    document.getElementById('player-result').innerHTML = `<strong>Your result:</strong> ${player.result}`
}

//2. GAME FUNCTIONS

//sets game Running function for while loop
/**
 * Random dice thow to decide who goes first.
 Shows a message with information about the intial throw results, hides 'Start Game' button and shows 'Dice' instead. 
 Moves the avatar of the player who goes first.
 */
function goesFirst() {
    diceThrow(player);
    diceThrow(ai);
    if (player.result === ai.result) {
        messageBox.innerHTML = `Your result: ${player.result}<br><br>EvilBoy result: ${ai.result}<br><br>It's a tie! Try again!`;
    } else if (player.result > ai.result) {
        currentPlayer = player;
        showDice();
        messageBox.innerHTML = `Your result: ${player.result}<br><br>EvilBoy result: ${ai.result}<br><br>You're going first!`;
    } else {
        currentPlayer = ai;
        messageBox.innerHTML = `Your result: ${player.result}<br><br>EvilBoy result: ${ai.result}<br><br>Sorry! EvilBoy is starting this time!`;
        showDice();
    }
    messageBox.style.visibility = 'visible';
    document.getElementById('game-board').style.display = 'none';
    setTimeout(function() {
        messageBox.style.visibility = 'hidden';
        document.getElementById('game-board').style.display = 'block';
    }, 2000);
    setTimeout(function() { currentPlayerTurn(currentPlayer) }, 3500);
    setTimeout(function() { checkType(currentPlayer) }, 4000);
}

/** @generator generates random number between 1 and 6 for currentPlayer; */
function generateNumber() {
    return Math.floor(Math.random() * 6) + 1;
}


/** 
Simulates a dice throw 
@param currentPlayer;
*Generates a random number and pushes it to the result attribute of the current player and the resultHolders.
*If current player is 'player', changes the image in the dice.
*Computes the value of the new postion and pushes it to the newPosition attribute of the currentPlayer.
*/
function diceThrow(currentPlayer) {
    currentPlayer.result = generateNumber();
    let result = currentPlayer.result;
    if (currentPlayer === player) {
        dice.innerHTML = `<img src="../assets/images/Dice-${result}-b.svg.png" alt="Dice result ${result}">`;
        addResultHolders();
        currentPlayer.newPosition = currentPlayer.position + result;
    } else {
        currentPlayer.newPosition = currentPlayer.position + result;
        addResultHolders();
    }
}


/**
 * @param currentPlayer
 * moves avatar by the required number of steps
 * checks for the type of the field - snake or ladder
 * checks if the winning condition is met
 */
function currentPlayerTurn(currentPlayer) {
    id = setInterval(function() { moveAvatar(currentPlayer) }, 200);
    // setTimeout(function() { checkType(currentPlayer) }, 3000);
    // checkIfWin(currentPlayer);
    // currentPlayer !== player ? currentPlayer = player : currentPlayer = ai;
}


/**
 * Runs one round made of Player and Ai Turn with delay for AI movement while gameRunning is true.
 */
function round() {
    if (gameRunning) {
        currentPlayer = player;
        currentPlayerTurn(player);
        checkType(player);
        // checkIfWin(player);

        setTimeout(function() {
            currentPlayer = ai;
            diceThrow(ai);
            currentPlayerTurn(ai);
            checkType(ai)
                // checkIfWin(ai)
            currentPlayer = player;
        }, 2000);

    } else {
        alert("Game over!");
    }
}



/**
 * Random dice thow to decide who goes first.
 Shows a message with information about the intial throw results, hides 'Start Game' button and shows 'Dice' instead. 
 Moves the avatar of the player who goes first.
 */



/**Sets Dice display to 'block' */
function showDice() {
    let startButton = document.getElementById('start-game-btn');
    startButton.style.display = 'none';
    dice.style.display = 'block';
}

/**@param currentPlayer
 Set of rules to compute the newPosition for the currentPlayer if the field contains a snake
 * */
function moveIfSnake(currentPlayer) {
    if ((currentPlayer.newPosition - 3) % 5 == 0) {
        currentPlayer.newPosition = currentPlayer.newPosition - 5;
    } else if ((currentPlayer.newPosition - 1) % 5 == 0) {
        currentPlayer.newPosition = currentPlayer.newPosition - 1;
    } else if ((currentPlayer.newPosition - 2) % 5 == 0) {
        currentPlayer.newPosition = currentPlayer.newPosition - 3;
    } else if ((currentPlayer.newPosition - 4) % 5 == 0) {
        currentPlayer.newPosition = currentPlayer.newPosition - 7;
    } else {
        currentPlayer.newPosition = currentPlayer.newPosition - 9;
    }
}

/**@param currentPlayer
 Set of rules to compute the newPosition for the currentPlayer
 */
function moveIfLadder(currentPlayer) {
    if (currentPlayer.newPosition === 3 || (currentPlayer.newPosition - 3) % 5 === 0) {
        currentPlayer.newPosition = currentPlayer.newPosition + 5;
    } else if (currentPlayer.newPosition === 1 || (currentPlayer.newPosition - 1) % 5 === 0) {
        currentPlayer.newPosition = currentPlayer.newPosition + 9;
    } else if (currentPlayer.newPosition === 2 || (currentPlayer.newPosition - 2) % 5 === 0) {
        currentPlayer.newPosition = currentPlayer.newPosition + 7;
    } else if (currentPlayer.newPosition === 4 || (currentPlayer.newPosition - 4) % 5 === 0) {
        currentPlayer.newPosition = currentPlayer.newPosition + 3;
    } else {
        currentPlayer.newPosition = currentPlayer.newPosition + 1;
    }
}



/**
 @param {*} currentPlayer 
 Takes currentPlayer as a parameter;
 *Checks if new positions is outside of the board (>25) sets position and newPosition to 25 to avoid error.
 *If new position witin the range increments position by one until both are equal then clears interval set in currentPlayerTurn function.
 */
function moveAvatar(currentPlayer) {
    if (currentPlayer.newPosition == currentPlayer.position) {
        clearInterval(id);
    } else {
        // will increment until the position is equla to the new positionśś
        if (currentPlayer.newPosition > 25) {
            document.getElementById(`${currentPlayer.name}-f${currentPlayer.position}`).innerHTML = "";
            currentPlayer.position = 25;
            currentPlayer.newPosition = 25;
            document.getElementById(`${currentPlayer.name}-f25`).innerHTML = currentPlayer.avatar;
        } else {
            document.getElementById(`${currentPlayer.name}-f${currentPlayer.position}`).innerHTML = "";
            if (snakeField === true) {
                currentPlayer.position -= 1;
            } else {
                currentPlayer.position += 1;
            }
            document.getElementById(`${currentPlayer.name}-f${currentPlayer.position}`).innerHTML = currentPlayer.avatar; // places avatar in the new position;
        }

    }
    snakeField = false;
}

// function moveAvatar(currentPlayer) {
//     //incrementing position by one with interval of every 200; move the avatar by
//     //set interval 
//     document.getElementById(`${currentPlayer.name}-f${currentPlayer.position}`).innerHTML = ""; // deletes avatar from current position;
//     currentPlayer.position = currentPlayer.position + currentPlayer.result;
//     if (currentPlayer.position < 25) {
//         document.getElementById(`f${currentPlayer.position}`).background = 'red';
//         document.getElementById(`${currentPlayer.name}-f${currentPlayer.position}`).innerHTML = currentPlayer.avatar; // places avatar in the new position;
//     } else {
//         currentPlayer.position >= 25;
//         document.getElementById(`${currentPlayer.name}-f25`).innerHTML = currentPlayer.avatar;
//     }
// }

/**
 * Checks if the filed contains a snake or a ladder.
 * Computes the newPosition of the currentPlayer
 */
function checkType(currentPlayer) {
    let field = document.getElementById(`f${currentPlayer.newPosition}`);
    if (field.getAttribute('data-type') === 'snake') {
        snakeField = true;
        // document.getElementById(`${currentPlayer.name}-f${currentPlayer.position}`).innerHTML = ""; // deletes avatar from current position;
        setTimeout(function() { moveIfSnake(currentPlayer) }, 500);
        // document.getElementById(`${currentPlayer.name}-f${currentPlayer.newPosition}`).innerHTML = currentPlayer.avatar;
        alert("Ooops! There's a snake! Run away!");
    } else if (field.getAttribute('data-type') === 'ladder') {
        // document.getElementById(`${currentPlayer.name}-f${currentPlayer.newPosition}`).innerHTML = "";
        setTimeout(function() { moveIfLadder(currentPlayer) }, 500);
        alert("There's a ladder! Climb up!");
        // document.getElementById(`${currentPlayer.name}-f${currentPlayer.newPosition}`).innerHTML = currentPlayer.avatar;
    } else {
        checkIfWin(currentPlayer);
    }
}

/** 
 Checks if player/ai's position is greater than 25 and finishes the game if true
 */
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