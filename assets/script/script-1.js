let snake1;
let snake2;
let snake3;
let ladder1
let ladder2;
let ladder3;

function generateSLPositions() {
    let rangeSnakes = [];
    for (let i = 6; i < 26; ++i) {
        rangeSnakes.push(i);
    }

    for (let x = 1; x < 4; ++x) {
        let index = Math.floor(Math.random() * 15) + 1;
        let value = rangeSnakes.splice(index, 1);
        eval(`snake${x} = ${value}`);
        console.log(`snake${x} = ${value}`);
    }

    let rangeLadders = [];
    for (let i = 1; i < 21; ++i) {
        rangeLadders.push(i);
    }

    for (let x = 1; x < 4; ++x) {
        let index = Math.floor(Math.random() * 15) + 1;
        while (rangeSnakes.includes(index)) {
            index = Math.floor(Math.random() * 15) + 1;
        }
        let value = rangeLadders.splice(index, 1);
        eval(`ladder${x} = ${value}`);
        console.log(`ladder${x} = ${value}`);
    }
}