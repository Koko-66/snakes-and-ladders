//1. PAGE LOADING - INSTRUCTIONS AND GAME SETUP

//hides instructions pop up window on clicking Let's go button; sets localStorage to true if instructions were shown once
function hide() {
    let instructions = document.getElementById('instructions');
    instructions.style.display !== "none" ? instructions.style.display = "none" : instructions.style.display = "block";
    localStorage.setItem('instructionsShown', 'true');
}
//adds event listenter for instructions not to show on reloading; creates board instead
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('instructionsShown')) {
        instructions.style.display = "none";
    }
    createGameBoard();
})

//variables to store avatars
let blue = `<img src="assets/images/avatar_blue.png" alt="blue avatar"></img>`
let yellow = `<img src="assets/images/avatar-yellow.png" alt="yellow avatar"></img>`
let evilBoy = `<img src="assets/images/avatar_red.png" alt="red avatar"></img>`

//selects avatar and places it in the start field
let player = { position: 1, };
let ai = { position: 1, avatar: evilBoy };
let avatars = document.getElementsByClassName('avatar');
for (let avatar of avatars) {
    avatar.addEventListener('click', function() {
        if (this.getAttribute('data-avatar-color') === 'blue') {
            player.avatar = blue;
            document.getElementById('f1').innerHTML = `<div id ="player-f1" class="player">${blue}</div><div id ="ai-f1" class="ai">${evilBoy}</div>`;
        } else {
            player.avatar = yellow;
            document.getElementById('f1').innerHTML = `<div id ="player-f1" class="player">${yellow}</div><div id ="ai-f1" class="ai">${evilBoy}</div>`;
        }
    })
}

// generates gameboard by row and then field

// let position;
function createGameBoard() {
    let gameBoard = document.getElementById('game-board');
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
    //Adds numbers to the board and creates objects to push to board array for tracking 
    //in escending order to start game from the bottom of the board
    let i = 25;
    let fields = document.getElementsByClassName("field");
    for (field of fields) {
        //     position = { position: i }
        //     board.push(position);
        // changes first field to "start" and last to "end" and adds separate divs for ai and player avatars with id's
        if (i === 1) {
            field.innerHTML = `Start<div id ="player-f1" class="player"></div> <div id ="ai-f1" class="ai">${evilBoy}</div>`;
        } else if (i === 25) {
            field.innerHTML = `End<div id ="player-f25" class="player"></div> <div id ="ai-f25" class="ai">`;
        } else {
            field.innerHTML = `${i} <div id ="player-f${i}" class="player"></div> <div id ="ai-f${i}" class="ai">`;
        }
        field.id = `f${i}`;
        i -= 1;
    }
    // console.log(board);
}

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
    document.getElementById(`player-f${player.position}`).innerHTML = player.avatar;

};

// if (localStorage.getItem('goesFirst')) {
//     function gameRound();
// }


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