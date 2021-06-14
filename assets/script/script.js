//events on loading: 
//wait for DOM to load
//add event listeners to .button: help, close, and dice 
//load instructions as a separate module localStorage


// document.addEventListener("DOMContentLoaded", function() {
//             if (localStorage.getItem('instrDisplayed') == true) {
//                 instructions.style.display = "none";
//             }
//         }

function hide() {
    let instructions = document.getElementById("instructions");
    instructions.style.display !== "none" ? instructions.style.display = "none" : instructions.style.display = "block";
    localStorage.setItem('instructionsShown', 'true');
}
document.addEventListener("DOMContentLoaded", function() {
        if (localStorage.getItem('instructionsShown')) {
            instructions.style.display = "none";
        }
    })
    //         }

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