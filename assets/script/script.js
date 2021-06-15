function hide() {
    let instructions = document.getElementById("instructions");
    instructions.style.display !== "none" ? instructions.style.display = "none" : instructions.style.display = "block";
    localStorage.setItem('instructionsShown', 'true');
}
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem('instructionsShown')) {
        instructions.style.display = "none";
    }
    createGameBoard();
})

function diceThrow() {
    return Math.floor(Math.random() * 7) + 1;
}

dice = document.getElementById("dice");
dice.addEventListener("click", function() {
    let result = diceThrow();
    console.log(result);
    dice.innerHTML = `<img src='assets/images/Dice-${result}-b.svg.png'`;
    // if (result === 1) {
    //     dice.innerHTML = "<img src=\"assets\/images\/Dice-1-b.svg.png\" > "
    // } else if (result === 2) {
    //     dice.innerHTML = '<img src="assets/images/Dice-2-b.svg.png">'
    // } else if (result === 3) {
    //     dice.innerHTML = "<img src=\"assets\/images\/Dice-3-b.svg.png\">"
    // } else if (result === 4) {
    //     dice.innerHTML = '<img src="assets/images/Dice-4-b.svg.png">'
    // } else if (result === 5) {
    //     dice.innerHTML = '<img src="assets/images/Dice-5-b.svg.png">'
    // } else if (result === 6) {
    //     dice.innerHTML = "<img src=\"assets\/images\/Dice-6-b.svg.png\">"
    // } else {
    alert("Oops, there's been an issue, please try again");
})





// generate gameboard option 1 by row

// function createGameBoard1() {
//     let gameBoard = document.getElementById("game-board");
//     for (let r = 0; r < 5; r++) {
//         let row = document.createElement("div");
//         row.className = 'board-row';
//         while (i < 6) {
//             for (let i = 1; i < 6; i++) {
//                 let field = document.createElement("div");
//                 field.className = 'field';
//                 row.appendChild(field);
//                 field.innerHTML = i;
//             }
//             gameBoard.appendChild(row);
//             while (5 < i <= 10) {
//                 for (let i = 11; i < 5; i--) {
//                     let field = document.createElement("div");
//                     field.className = 'field';
//                     row.appendChild(field);
//                     field.innerHTML = i;
//                 }
//                 gameBoard.appendChild(row);
//             }
//         }
//     }
// }
//generate gameboard option 2 by div

function createGameBoard() {
    let gameBoard = document.getElementById("game-board");
    board = [];
    // newRow = false;
    for (let i = 25; i > 0; --i) {
        let position = { position: i }
        board.push(position);
        let field = document.createElement("div");
        field.className = 'field';
        field.innerHTML = i;
        field.id = i;
        gameBoard.appendChild(field);
        // newRow = i % 5 === 0;
        // i += 5;
        // newRow = false;
    }
    console.log(board);
}

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