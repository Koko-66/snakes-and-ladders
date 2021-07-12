//----1. PAGE LOADING - INSTRUCTIONS AND GAME SETUP

//variables to store avatars
let blue = `<img src="assets/images/avatar_blue.png" alt="blue avatar" class="avatar on-board" onclick="toggleInstructions()">`;
let yellow = `<img src="assets/images/avatar-yellow2.png" alt="yellow avatar" class="avatar on-board" onclick="toggleInstructions()">`;
let evilBoy = `<img src="assets/images/JazzyCroc_black-backgr.jpeg" alt="Jazzy Croc's avatar" class="avatar croc-avatar">`;

//object to store player positions, results, and avatar
let player = {
  name: "pl",
  result: 0,
  position: 1,
  newPosition: 0,
  avatar: "",
};
//object to store computer'sś positions, results, and avatar
let ai = {
  avatar: evilBoy,
  name: "ai",
  result: 0,
  position: 1,
  newPosition: 0,
};
let currentPlayer;
let dice = document.getElementById("dice");
let instructions = document.getElementById("instructions");
let gameRunning = true;
let board = document.getElementById("game-container");
let header = document.getElementById("header");
let messageBox = document.getElementById("message-box"); //div to display messages in full screen rather than alerts
let messageText = document.getElementById("message-content");
let firstRound;
let snake1;
let snake2;
let snake3;
let ladder1;
let ladder2;
let ladder3;

// -----Events listeners ----

/**
 * Adds event listenter for instructions not to show on reloading;
 * Creates board (needs to be generated at this point otherwise board does not exist to palce the avatar into) and hides it;
 * checks localStorage for turnInfo and sets the content of the button accordingly.
 */
document.addEventListener("DOMContentLoaded", function () {
  createGameBoard();
  selectAvatar();
  if (localStorage.getItem("instructionsShown")) {
    instructions.style.display = "none";
    toggleBoard();
  } else {
    // cannot use toggle here; the board becomes visible
    board.style.visibility = "hidden";
    header.style.visibility = "hidden";
  }
});

//Adds event listener to the dice
dice.addEventListener("click", function () {
  round();
  dice.style.animationName = "unset";
});

//Adds click event listener to message to hide it on clicking and initiate further steps
messageBox.addEventListener("click", hideMessageBox);

//Adds event listener to close button for instructions
document
  .getElementById("close-instructions")
  .addEventListener("click", toggleInstructions);

//----- General functions -----

/**
 * Toggles show/hide of instructions and board, so that both are not shown at the same time
 * Toggles visibility of dice (hidden then Start Game button shown and shown when game is started)
 * Sets localStorage 'insturctionsShown' to true.
 */
function toggleInstructions() {
  instructions.style.display !== "none"
    ? (instructions.style.display = "none")
    : (instructions.style.display = "block");
  localStorage.setItem("instructionsShown", "true");
  instructions.style.display !== "none"
    ? (board.style.visibility = "hidden")
    : (board.style.visibility = "visible");
}
/**
 * Toggles visibility of the board, control buttons (dice, reset, start nad turn info) and header depending on the visibility of the instrucitons and messages;
 */
function toggleBoard() {
  instructions.style.display !== "block"
    ? (board.style.visibility = "visible")
    : (board.style.visibility = "hidden");
  instructions.style.display !== "block"
    ? (header.style.visibility = "visible")
    : (header.style.visibility = "hidden");
  messageBox.style.visibility !== "visible"
    ? (board.style.visibility = "visible")
    : (board.style.visibility = "hidden");
  messageBox.style.visibility !== "visible"
    ? (header.style.visibility = "visible")
    : (header.style.visibility = "hidden");
}

/**
 * Hides startButton and shows Dice.
 */
function showDice() {
  let startButton = document.getElementById("start-game-btn");
  startButton.style.display = "none";
  dice.style.display = "block";
}

/**
 * Checks if avatar is selected on loading and if not, prevents moving forward to the game.
 */
function checkForAvatar() {
  if (player.avatar === null) {
    messageText.innerHTML = "Choose an avatar";
    showMessageBox();
  } else {
    toggleInstructions();
  }
}

/**
 * Selects avatar on click and:
 * places it in the start field if none avatar has been selected before;
 * if avatar already selected replaces it in the position is is currently in;
 * saves the choice in local storage to be visible on reloading.
 */
function selectAvatar() {
  let avatars = document.getElementsByClassName("avatar-instructions");
  for (let avatar of avatars) {
    avatar.addEventListener("click", function () {
      if (player.avatar === "") {
        if (this.getAttribute("data-avatar-color") === "blue") {
          player.avatar = blue;
          document.getElementById(
            "pl-1"
          ).innerHTML = `<div id ="pl-1" class="player">${blue}</div>`;
        } else {
          player.avatar = yellow;
          document.getElementById(
            "pl-1"
          ).innerHTML = `<div id ="pl-1" class="player">${yellow}</div>`;
        }
        localStorage.setItem("playerAvatar", player.avatar);
      } else {
        if (this.getAttribute("data-avatar-color") === "blue") {
          player.avatar = blue;
          document.getElementById(
            `pl-${player.position}`
          ).innerHTML = `<div id ="pl-${player.position}" class="player">${blue}</div>`;
        } else {
          player.avatar = yellow;
          document.getElementById(
            `pl-${player.position}`
          ).innerHTML = `<div id ="pl-${player.position}" class="player">${yellow}</div>`;
        }
        localStorage.setItem("playerAvatar", player.avatar);
      }
      toggleInstructions();
      toggleBoard();
    });

    player.avatar = localStorage.getItem("playerAvatar");
    localStorage.setItem("avatarSelected", "true");
  }
}

/**
 * Generates board by row and then field with reverse order for every other row to maintain the flow of numbering and Start and End divs on top and bottom.
 */
function createGameBoard() {
  let gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  let end = document.createElement("div");
  end.className = "board-edge";
  end.id = "wrapping-top";
  end.innerHTML = `
    <div id="results">
    Jazzy Croc:&nbsp;
    <div id="ai-result" class="result"></div>
    You:&nbsp;
    <div id="pl-result" class="result"></div></div>END`;
  gameBoard.appendChild(end);
  for (let r = 1; r < 6; ++r) {
    let row = document.createElement("div");
    row.className = "board-row";
    row.style.flexDirection = r % 2 === 0 ? "row" : "row-reverse"; //reverses the order for every other row to make numbers flow correctly
    for (let i = 1; i < 6; ++i) {
      let field = document.createElement("div");
      field.className = "field";
      row.appendChild(field);
    }
    gameBoard.appendChild(row);
  }
  let start = document.createElement("div");
  start.className = "board-edge";
  start.id = "wrapping-bottom";
  start.innerHTML = "START";
  gameBoard.appendChild(start);
  fillBoard();
}

/**
 * Generates positions for snakes and ladders
 */

function generateSLPositions() {
  let snakes = []; // array to use for checking for snakes when creating ladders;
  let rangeSnakes = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24]; //possible snake positions

  let y = 10; // value to use in generation of index; needs to be decreased to allow for change of indexes in rangeSnakes as they are spliced; same logic used below for ladders
  for (let x = 1; x < 4; ++x) {
    let index = Math.floor(Math.random() * y);
    let value = eval(`${rangeSnakes.splice(index, 1)}`);
    snakes.push(value);
    eval(`snake${x} = ${value}`);
    console.log(`snake${x} = ${value}`);
    console.log(snakes);
    --y;
  }

  let rangeLadders = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
  let ladders = [];
  let z = 10;
  for (let x = 1; x < 4; ++x) {
    let index = Math.floor(Math.random() * z);
    let value = rangeLadders[index];
    ladders.push(value);
    while (snakes.includes(value)) {
      // checks whether the field already contains a snake and generates intex again if yes
      index = Math.floor(Math.random() * z);
      value = rangeLadders[index];
      console.log(value);
    }
    value = eval(`${rangeLadders.splice(index, 1)}`);
    eval(`ladder${x} = ${value}`);
    console.log(`ladder${x} = ${value}`);
    --z;
  }
}

/**
 * Adds numbers, snakes, ladders and id's to the board for tracking movement
 * Numering in descending oreder to start from the bottom of page and go up.
 */
function fillBoard() {
  generateSLPositions();
  let i = 25;
  let fields = document.getElementsByClassName("field");
  for (field of fields) {
    let snake = `<img src = "assets/images/purple-snake2.png" alt="snake" class="snake">`;
    let ladder = `<img src = "assets/images/ladder2.png" alt="ladder" class="ladder" data-type"="ladder">`;

    // changes first field to "start" and last to "end" and adds separate divs for ai and player avatars with id's
    if (i === 1) {
      if (localStorage.getItem("avatarSelected")) {
        //checks if avatar has been already selected and places the selected to place it in.
        let avatar = localStorage.getItem("playerAvatar");
        field.innerHTML = `1<div id ="pl-1" class="player">${avatar}</div> <div id ="ai-1" class="ai">${evilBoy}</div>`;
      } else {
        field.innerHTML = `1<div id ="pl-1" class="player"></div> <div id ="ai-1" class="ai">${evilBoy}</div>`;
      }
    } else if (i === snake1 || i === snake2 || i === snake3) {
      field.innerHTML = `${i}${snake}<div id ="pl-${i}" class="player"></div> <div id ="ai-${i}" class="ai">`;
      field.setAttribute("data-type", "snake");
    } else if (i === ladder1 || i === ladder2 || i === ladder3) {
      field.innerHTML = `${i}${ladder}<div id ="pl-${i}" class="player"></div> <div id ="ai-${i}" class="ai">`;
      field.setAttribute("data-type", "ladder");
    } else {
      field.innerHTML = `${i}<div id ="pl-${i}" class="player"></div> <div id ="ai-${i}" class="ai">`;
    }
    field.id = `f${i}`;
    i -= 1;
  }
}

/**
 * Adds current player's result to the result display div at the top of the board and increases the size of the font to highlight whose turn it is.
 * @param {*} currentPlayer
 */
function addResult(currentPlayer) {
  resultHolder = document.getElementById(`${currentPlayer.name}-result`);

  resultHolder.innerHTML = ` ${currentPlayer.result}`;
  resultHolder.style.transform = "scale(2)";

  setTimeout(function () {
    resultHolder.style.transform = "scale(1)";
  }, 500);
}

/**
 * Displays the full screen message box
 */
function showMessageBox() {
  messageBox.style.visibility = "visible";
  toggleBoard();
  if (messageText.innerHTML === "Choose an avatar") {
    instructions.style.visibility = "hidden";
  }
}

/**
 * Hides message box, shows board and intiates ai move if ai's turn
 */
function hideMessageBox() {
  if (firstRound === true && currentPlayer === ai) {
    messageBox.style.visibility = "hidden";
    toggleBoard();
    currentPlayerTurn(currentPlayer);
  } else if (currentPlayer === ai) {
    messageBox.style.visibility = "hidden";
    toggleBoard();
  } else if (messageText.innerHTML === "Choose an avatar") {
    messageBox.style.visibility = "hidden";    
    instructions.style.visibility = "visible"; // specific case, cannot use toggle here
  } else {
    messageBox.style.visibility = "hidden";
    toggleBoard();
  }
}

//-----2. GAME FUNCTIONS

// - Running the game

/**
 * Random dice throw for player and ai to decide who goes first.
 Shows a message with information about the intial throw results, hides 'Start Game' button and shows 'Dice' instead. 
 Moves the avatar of ai if he goes first
 */
function goesFirst() {
  messageText.innerHTML = "";
  firstRound = true;
  diceThrow(player);
  diceThrow(ai);
  if (player.result === ai.result) {
    messageText.innerHTML = `You: ${player.result}<br>Jazzy Croc: ${ai.result}<br><br>It's a tie! Try again!`;
  } else if (player.result > ai.result) {
    currentPlayer = player;
    showDice();
    messageText.innerHTML = `You: ${player.result}<br>Jazzy Croc: ${ai.result}<br><br>You're going first! Throw the dice!`;
  } else {
    currentPlayer = ai;
    showDice();
    messageText.innerHTML = `You: ${player.result}<br>Jazzy Croc: ${ai.result}<br><br>Jazzy Croc is going first!`;
    addResult(ai);
  }
  showMessageBox();
}
/**
 * Runs one round made of Player and Ai Turn with delay for AI movement while gameRunning is true.
 */
function round() {
  if (gameRunning) {
    currentPlayer = player;
    currentPlayerTurn(player);
    diceThrow(player);
  }
}

/**
 * Initiates Ai move after checking if messages need to be displayed and if it's the first round
 */
function initiateAiMove() {
  currentPlayer = ai;
  diceThrow(ai);
  currentPlayerTurn(ai);
  let pulseResetDelay = 300 * ai.result + 7000;
  setTimeout(function () {
    dice.style.animationName = "pulse";
  }, pulseResetDelay);
}

/** @generator generates random number between 1 and 6 for currentPlayer; */
function generateNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

/** 
Simulates a dice throw 
*Generates a random number and pushes it to the result attribute of the current player and the resultHolders.
*If current player is 'player', changes the image in the dice.
*Computes the value of the new postion and pushes it to the newPosition attribute of the currentPlayer.
@param currentPlayer;
*/
function diceThrow(currentPlayer) {
  currentPlayer.result = generateNumber();
  let result = currentPlayer.result;
  if (currentPlayer === player) {
    dice.innerHTML = `<img src="assets/images/Dice-${result}-b.svg.png" alt="Dice result ${result}">`;
   if (firstRound === false) {
     addResult(player);
   }
    currentPlayer.newPosition = currentPlayer.position + result;
  } else {
    currentPlayer.newPosition = currentPlayer.position + result;
    if (firstRound === false) {
      addResult(ai);
    }
  }
}

/**
 Takes currentPlayer as a parameter;
 *Sets interval for the individual steps to visualise movement.
 *Checks if new positions is outside of the board (>25) and if so, sets position and newPosition to 25 to avoid error.
 *If the new position is within range, increments position by one until it equals newPostion, then clears interval set in currentPlayerTurn function and checks for snake or ladder.
 @param currentPlayer ai or player
 */
function currentPlayerTurn(currentPlayer) {
  let id = setInterval(function () {
    moveAvatar(currentPlayer);
  }, 300);
  firstRound = false;

  function moveAvatar(currentPlayer) {
    if (currentPlayer.position === currentPlayer.newPosition) {
      clearInterval(id);
      checkType(currentPlayer);
    } else {
      if (currentPlayer.newPosition > 25) {
        document.getElementById(
          `${currentPlayer.name}-${currentPlayer.position}`
        ).innerHTML = "";
        currentPlayer.position = 25;
        currentPlayer.newPosition = 25;
        document.getElementById(`${currentPlayer.name}-25`).innerHTML =
          currentPlayer.avatar;
      } else {
        document.getElementById(
          `${currentPlayer.name}-${currentPlayer.position}`
        ).innerHTML = "";
        currentPlayer.position += 1;
        document.getElementById(
          `${currentPlayer.name}-${currentPlayer.position}`
        ).innerHTML = currentPlayer.avatar;
      }
    }
  }
}

/**
 * Checks the data-type in the field to determine if it contains snake/ladder or checks for win.
 * Calls moveIfSnake/moveIfLadder functions to compute the new postions as needed.
 * Moves the avatar into the newPosition.
 * Initiates ai move
 */
function checkType(currentPlayer) {
  let field = document.getElementById(`f${currentPlayer.newPosition}`);
  if (gameRunning) {
    if (field.getAttribute("data-type") === "snake") {
      document.getElementById(
        `${currentPlayer.name}-${currentPlayer.position}`
      ).innerHTML = ""; // deletes avatar from current position;
      moveIfSnake(currentPlayer);
      document.getElementById(
        `${currentPlayer.name}-${currentPlayer.newPosition}`
      ).innerHTML = currentPlayer.avatar;
    } else if (field.getAttribute("data-type") === "ladder") {
      document.getElementById(
        `${currentPlayer.name}-${currentPlayer.position}`
      ).innerHTML = ""; // deletes avatar from current position;
      moveIfLadder(currentPlayer);
      document.getElementById(
        `${currentPlayer.name}-${currentPlayer.newPosition}`
      ).innerHTML = currentPlayer.avatar;
      checkIfWin(currentPlayer);
    } else {
      checkIfWin(currentPlayer);
    }
    currentPlayer !== ai ? (currentPlayer = ai) : (currentPlayer = player); // swapps the player
    if (
      currentPlayer === ai &&
      firstRound === false &&
      player.position !== 25
    ) {
      setTimeout(initiateAiMove(), 1500); // initiates ai move if player set to ai
    }
  }
}

/**
 Computes the newPosition for the currentPlayer if the field contains a snake. Considers the fields by columns and adjusts the number according the pattern:
 * to check for numbers in 8, 13, 18, 23 take away 3 and check %5, then adjust position by -5;
 * to check for numbers 6, 11, 16 take away 1 and check %5, then adjust position by -1;
 * to check for numbers 7, 12, 17 take away 2 and check %5, then adjust position by -3;
 * to check for numbers 9, 14, 19 take away 4 and check %5, then adjust postion by -7; 
 * the remaining numbers: 10, 15, 20 adjust by -9;
 * bottom row can be ignored as snake cannot be placed there.
 * Using pattern rather than set numbers allows to increase the number of rows in the future
 *  @param currentPlayer ai or player
 */
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
  currentPlayer.position = currentPlayer.newPosition;
}

/**
 Computes the newPosition for the currentPlayer if the field contains a ladder. Considers the fields by columns and adjusts the number according the pattern:
 * to check for numbers 8, 13, 18 take away 3 and check %5, then adjust position by +5;
 * to check for numbers 6, 11 take away 1 and check %5, then adjust position by +9;
 * to check for numbers 7, 12, 17 take away 2 and check %5, then adjust position by +7;
 * to check for numbers 9, 14, 19 take away 4 and check %5, then adjust postion by +3; 
 * the remaining numbers: 10, 15, 20, adjust by +1;
 * bottom row is checked for exact matches, top can be ignored as no ladder can be placed there.
 * @param currentPlayer ai or player
 */
function moveIfLadder(currentPlayer) {
  if (
    currentPlayer.newPosition === 3 ||
    (currentPlayer.newPosition - 3) % 5 === 0
  ) {
    currentPlayer.newPosition = currentPlayer.newPosition + 5;
  } else if (
    currentPlayer.newPosition === 1 ||
    (currentPlayer.newPosition - 1) % 5 === 0
  ) {
    currentPlayer.newPosition = currentPlayer.newPosition + 9;
  } else if (
    currentPlayer.newPosition === 2 ||
    (currentPlayer.newPosition - 2) % 5 === 0
  ) {
    currentPlayer.newPosition = currentPlayer.newPosition + 7;
  } else if (
    currentPlayer.newPosition === 4 ||
    (currentPlayer.newPosition - 4) % 5 === 0
  ) {
    currentPlayer.newPosition = currentPlayer.newPosition + 3;
  } else {
    currentPlayer.newPosition = currentPlayer.newPosition + 1;
  }
  currentPlayer.position = currentPlayer.newPosition;
}

/** 
Checks if player/ai's position is equal to 25 (will not be greater since set in currentPlayerTurn), sets gameRunning to false and generates a winning message and reloads the page.
*/
function checkIfWin(currentPlayer) {
  if (currentPlayer.position === 25) {
    gameRunning = false;
    if (currentPlayer === player) {
      messageText.innerHTML = "Congratulations! You won!";
      setTimeout(showMessageBox(), 2000);
    } else {
      messageText.innerHTML = "Sorry! You lost, try again!";
      setTimeout(showMessageBox(), 2000);
    }
    setTimeout(function () {
      window.location.reload(true);
    }, 1000);
  } else {
    gameRunning = true;
  }
}
