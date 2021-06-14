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

//generate gameboard option 1 by row

// function createGameBoard() {
//     let gameBoard = document.getElementById("game-board");
//     for (let r = 0; r < 5; r++) {
//         let row = document.createElement("div");
//         row.className = 'board-row';
//         for (let i = 0; i < 5; i++) {
//             let field = document.createElement("div");
//             field.className = 'field';
//             row.appendChild(field);
//             field.innerHTML = i;
//         }
//         gameBoard.appendChild(row);

//     }

// }

//generate gameboard option 2 by div

function createGameBoard() {
    let gameBoard = document.getElementById("game-board");
    change = false;
    for (let i = 0; i < 25; i++) {
        let field = document.createElement("div");
        field.className = 'field';
        change = i % 5 === 0 || i === 0;
        field.innerHTML = i;
        field.id = i;
        gameBoard.appendChild(field);
        change = false;
    }


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