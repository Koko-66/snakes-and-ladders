//1. PAGE LOADING - INSTRUCTIONS AND GAME SETUP

//hides instructions pop up window on clicking Let's go button; sets localStorage to true if instructions were shown once
function hide() {
    let instructions = document.getElementById('instructions');
    instructions.style.display !== "none" ? instructions.style.display = "none" : instructions.style.display = "block";
    localStorage.setItem('instructionsShown', 'true');
    hideBoard();
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
let blue = `<img src="assets/images/avatar_blue.png" alt="blue avatar" class="avatar">`
let yellow = `<img src="assets/images/avatar-yellow2.png" alt="yellow avatar" class="avatar">`
let evilBoy = `<img src="assets/images/avatar_red-copy.png" alt="red avatar" class="avatar">`


let player = { position: 1, };
let ai = { position: 1, avatar: evilBoy };

//selects avatar and places it in the start field
function selectAvatar() {
    let avatars = document.getElementsByClassName('avatar');
    for (let avatar of avatars) {
        avatar.addEventListener('click', function() {
            if (this.getAttribute('data-avatar-color') === 'blue') {
                player.avatar = blue;
                document.getElementById('f1').innerHTML = `1<div id ="player-f1" class="player">${blue}</div><div id ="ai-f1" class="ai">${evilBoy}</div>`;
            } else {
                player.avatar = yellow;
                document.getElementById('f1').innerHTML = `1<div id ="player-f1" class="player">${yellow}</div><div id ="ai-f1" class="ai">${evilBoy}</div>`;
            }
            localStorage.setItem('playerAvatar', player.avatar);
        })
    }

    localStorage.setItem('avatarSelected', 'true');
}

// generates gameboard by row and then field

// let position;
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

    //Adds numbers to the board and creates objects to push to board array for tracking 
    //in descending order to start game from the bottom of the board
    let i = 25;
    let fields = document.getElementsByClassName("field");
    for (field of fields) {
        let snake = `<img src = "assets/images/purple-snake2.png" alt="snake" class="snake">`
        let ladder = `<img src = "assets/images/ladder2.png" alt="ladder" class="ladder">`
            //     position = { position: i }
            //     board.push(position);
            // changes first field to "start" and last to "end" and adds separate divs for ai and player avatars with id's
        if (i === 1) {
            if (localStorage.getItem('avatarSelected')) { //checks if avatar has been already selected and places the selected to place it in.
                let avatar = localStorage.getItem('playerAvatar');
                field.innerHTML = `1<div id ="player-f1" class="player">${avatar}</div> <div id ="ai-f1" class="ai">${evilBoy}</div>`;
            } else {
                field.innerHTML = `1<div id ="player-f1" class="player"></div> <div id ="ai-f1" class="ai">${evilBoy}</div>`;
            }
        } else if (i === 7 || i === 20 || i === 24) {
            field.innerHTML = `${i}${snake}<div id ="player-f${i}" class="player"></div> <div id ="ai-f${i}" class="ai">`;
        } else if (i === 2 || i === 13 || i === 19) {
            field.innerHTML = `${i}${ladder}<div id ="player-f${i}" class="player"></div> <div id ="ai-f${i}" class="ai">`;
        } else {
            field.innerHTML = `${i}<div id ="player-f${i}" class="player"></div> <div id ="ai-f${i}" class="ai">`;
        }

        field.id = `f${i}`;
        i -= 1;
    }
}


// console.log(board);

//2. GAME FUNCTIONS

//generates random number between 1 and 6 for player
let dice = document.getElementById('dice');

function diceThrow() {
    return Math.floor(Math.random() * 6) + 1;
}

//adds event listener to dice and changes image depending on what playerDiceThrow returns
let playerResult;
let aiResult;

dice.addEventListener("click", function() {
    playerResult = diceThrow();
    dice.innerHTML = `<img src="../assets/images/Dice-${playerResult}-b.svg.png" alt="Dice result ${playerResult}">`;
    playerTurn();
})

// -- check who goes first and generates alert --/
// on first dice click then set to true in localStorage
function goesFirst() {
    playerResult = diceThrow();
    aiResult = diceThrow();
    if (playerResult === aiResult) {
        alert(`EvilBoy: ${aiResult}.\nYou: ${playerResult}.\nIt's a tie! Try again!`);
    } else if (playerResult > aiResult) {
        alert(`EvilBoy: ${aiResult}.\nYou: ${playerResult}.\nCongratulations! You're going first`);
        var playerFirst = true;
    } else {
        alert(`EvilBoy: ${aiResult}.\nYou: ${playerResult}.\nSorry! EvilBoy is starting this time!`);
        var aiFirst = true
    }
    localStorage.setItem('goesFirst', true);
}

function playerTurn() {
    document.getElementById(`player-f${player.position}`).innerHTML = "";
    alert(`You threw: ${playerResult}`);
    player.position = player.position + playerResult;
    document.getElementById(`player-f${player.position}`).innerHTML = localStorage.getItem('playerAvatar');
    aiTurn();
};

function aiTurn() {
    aiResult = diceThrow();
    document.getElementById(`ai-f${ai.position}`).innerHTML = "";
    alert(`You threw: ${aiResult}`);
    ai.position = ai.position + aiResult;
    document.getElementById(`ai-f${ai.position}`).innerHTML = ai.avatar;
};


//game 




//to generate snakes and ladders automatically: genearate 2 (easy) 4 (medium) 5 (difficult) random numbers; 
//when number matches i place snake
//generate random numbers for ladders
//when number matches i check: if no snake in field and field above (might need to redo the field ids to "r1f3" for easier checks, would be fine since the avatars will move by avatar divs ids

//game functions: 

//move avatar
//move when on a "ladder" field
//move when on a "green" field
//game lasts while avatar not on End / i <=23)//

// newRow = i % 5 === 0;
// i += 5;
// newRow = false;


//game setup:
//close/toggle help button to show instructions
//select avatar 
//throw dice to choose who goes first

//game functions: 
//
//dice throw
//dice throw - computer (separate function?)
//dice throw - avatar (separate function?)
//move avatar
//move when on a "ladder" field
//move when on a "green" field
//game lasts while avatar not on End / i <=23)//