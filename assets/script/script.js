
//1. page loading

//hides instructions pop up window on clicking Let's go button; sets localStorage to true if instructions were shown once
function hide() {
    let instructions = document.getElementById('instructions');
    instructions.style.display !== "none" ? instructions.style.display = "none" : instructions.style.display = "block";
    localStorage.setItem('instructionsShown', 'true');
}
//adds event listenter for instructions not to show on reloading; creates board instead
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem('instructionsShown')) {
        instructions.style.display = "none";
    }
    createGameBoard();
})

//generates random number between 1 and 6
function diceThrow() {
    return Math.floor(Math.random() * 6) + 1;
}

//creates a global variable for dice
let dice = document.getElementById('dice');

//adds event listener to dice and changes image depending on what the functions returns
dice.addEventListener("click", function() {
    let result = diceThrow();
    console.log(result);
    dice.innerHTML = `<img src="../assets/images/Dice-${result}-b.svg.png" alt="Dice result ${result}">`;
})

// generates gameboard by row and then field

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

    //adds numbers to the board and creates objects to push to board array for tracking
    let i = 25; //descending order to start game from the bottom of the board
    let fields = document.getElementsByClassName("field");
    let board = []
    for (field of fields) {
        let position = { position: i }
        board.push(position);
        if (i === 1) { // changes first field to "start" and last to "end"
            field.innerHTML = "Start";
        } else if (i === 25) {
            field.innerHTML = "End";
        } else {
            field.innerHTML = i;
        }
        field.id = `f${i}`;
        i -= 1;
    }
    console.log(board);
}

//game setup:
//select avatar 
//throw dice to choose who goes first

//add 


//game functions: 
//

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