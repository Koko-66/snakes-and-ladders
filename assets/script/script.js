//hides instructions pop up window on clicking Let's go button; sets localStorage to true if instructions were shown once
function hide() {
    let instructions = document.getElementById('instructions');
    instructions.style.display !== "none" ? instructions.style.display = "none" : instructions.style.display = "block";
    localStorage.setItem('instructionsShown', 'true');
}
//adds event listenter for instructions not to show them on reloading; creates board instead
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



// generate gameboard option by row

function createGameBoard() {
    let gameBoard = document.getElementById('game-board');
    for (let r = 1; r < 6; ++r) {
        let row = document.createElement('div');
        row.className = 'board-row';
        row.style.flexDirection = r % 2 === 0 ? "row" : "row-reverse"; //reverses the order for every other row to reverse counting 
        for (let i = 1; i < 6; ++i) {
            let field = document.createElement('div');
            field.className = 'field';
            row.appendChild(field);
        }
        gameBoard.appendChild(row);
    }

    //add numbers to the board and objects to board list for tracking
    let i = 25;
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

//add 

// function createGameBoard() {
//     let gameBoard = document.getElementBy) =n-ol,l,l, Id('game-board');
//     board = []
//     for (let r = 1; r < 6; ++r) {
//         let row = document.createElement('div');
//         row.className = 'board-row';
//         row.style.flexDirection = r % 2 === 0 ? "row-reverse" : "row";
//         for (i = 1; i < 6; ++i) {
//             let field = document.createElement('div');
//             field.className = 'field';
//             field.innerHTML = i;
//             row.appendChild(field);

//         gameBoard.appendChild(row);
//     }
// }
// } else {
//     for (i = i * 2; i >= i * 2; i--) {
//         var field = document.createElement('div');
//         field.className = 'field';
//         row.appendChild(field);
//         field.innerHTML = i;
//     }
// let row = document.createElement("div");


// while (5 < i <= 10) {
//     for (let i = 11; i < 5; i--) {
//         let field = document.createElement("div");
//         field.className = 'field';
//         row.appendChild(field);
//         field.innerHTML = i;
//     }
// gameBoard.appendChild(row);


//generate gameboard option 2 by div

// function createGameBoard() {
//     let gameBoard = document.getElementById("game-board");
//     board = [];
//     // newRow = false;
//     for (let i = 25; i > 0; --i) {
//         let position = { position: i }
//         board.push(position);
//         let field = document.createElement("div");
//         field.className = 'field';
//         field.innerHTML = i;
//         field.id = i;
//         gameBoard.appendChild(field);
//         // newRow = i % 5 === 0;
//         // i += 5;
//         // newRow = false;
//     }
//     console.log(board);
// }

//game setup:
//select avatar 
//throw dice to choose who goes first

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