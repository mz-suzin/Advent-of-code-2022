//coded by mz-suzin
const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').toString().split('\r\n');

//function that returns an array with length 10, being
//0 -> empty item
//1-9 -> stacks of crates
const getStacksPosition = (data) => {
    let stacks = [];
    let numStacks = 9;
    let initialMaxStack = 8;

    for (let i = 1; i <= numStacks; i++){
        stacks[i] = [];
    }

    for (let i = 0; i < initialMaxStack; i++){
        for (let j = 1; j <= numStacks; j++) { 
            let crate = data[i].charAt(1+((j-1)*4));
            if (crate.match(/[a-z]/i))
                stacks[j].push(crate);
        }
    }

    for (let k = 1; k <= numStacks; k++){
        stacks[k] = stacks[k].reverse();
    }

    return stacks;
}

const getCraneInstructions = (data) => {
    let instructions = [];
    let offset = 9;

    for (let i = 0; i < (data.length - offset - 1); i++){
        instructions[i] = [];
    }
    instructions = data.map((line, i) => {
        if(i > offset) {
            instructions[i - offset - 1] = line.match(/\d+/g);
        }
        return instructions;
    })
 
    return instructions[0];
}

const getTopCrates = (stacks) => {
    let topCrates = [];
    // console.log(stacks);
    for (let i = 1; i <= stacks.length; i++) {
        if(stacks[i]){
            topCrates.push(stacks[i].pop());
        }
    }
    return topCrates.join('');
}

const solution = (data) => {
    let topCrates = '';

    //stacks[0] = empty item ---- stacks[1-9] = crate position
    stacks = getStacksPosition(data);

    instructions = getCraneInstructions(data);

    for (let i = 0; i <= instructions.length - 1; i++){
        let quantity = instructions[i][0];
        let fromStack = instructions[i][1];
        let toStack = instructions[i][2];
        let toAdd = '';

        for (let j = 0; j <= quantity - 1; j++) {
            toAdd = stacks[fromStack].pop();
            stacks[toStack].push(toAdd);

            // consoling
            // console.log('quantity', quantity);
            // console.log('from stack', stacks[fromStack]);
            // console.log('to Stack', stacks[toStack]);
        }
    }

    topCrates = getTopCrates(stacks);
    console.log(`the top crates, after moving them, are: ${topCrates}`);

}

solution(data);