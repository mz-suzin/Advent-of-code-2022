//coded by mz-suzin
const fs = require('fs');

const calculate = (data) => {
    let totalPriorities1 = 0;
    let totalPriorities2 = 0;
    let flag_3elves = 0;
    let flag_checkedChar = 0;
    let elfGroup = [];
    const totalArrayPriorities = data.split('\n').map((rucksack) => {
        rucksack = rucksack.replace('\r', '');

        //FIRST DAY CALCULATIONS
            //split string in half - string is always even
            let halfString = rucksack.length/2;
            ruck1 = rucksack.slice(0, halfString);
            ruck2 = rucksack.slice(halfString, rucksack.length);

            //comparing each character of ruck1 to all others at ruck2, checking if character has already been spotted as repeated,
            // if not, saving it with the ascii value of the repeated character
            let repeatedAscii = 0;
            let checkedChar = [];
            [...ruck1].forEach((character) => {
                if (ruck2.includes(character) && !checkedChar.includes(character)) { 
                    checkedChar.push(character);
                    repeatedAscii = character.charCodeAt(0);
                }
            })

            // convert to priorities from advent of code
            priorities = calculatePriorities(repeatedAscii);

        //SECOND DAY CALCULATIONS
        let priorities2 = 0;

        if (flag_3elves++ < 3) {
            elfGroup.push(rucksack);
            if (flag_3elves === 3) {
                flag_checkedChar = 0;
                checkedChar.pop();

                [...elfGroup[0]].forEach((char) => { //comparing each character from 1st elf in group with all the rest of the group
                    checkedChar.push(char);

                    if (elfGroup[1].includes(char) && elfGroup[2].includes(char) && !flag_checkedChar){
                        flag_checkedChar = 1;
                        repeatedAscii = char.charCodeAt(0);
                        priorities2 = calculatePriorities(repeatedAscii);
                    }
                })
                flag_3elves = 0;
                elfGroup = [];
            }
        }

        result = {priorities, priorities2};
        
        return result;
    })
    
    
    for (let i = 0; i < totalArrayPriorities.length; i++){
        totalPriorities1 += totalArrayPriorities[i].priorities;
        totalPriorities2 += totalArrayPriorities[i].priorities2;
    }


    return { totalPriorities1, totalPriorities2 };
}

const calculatePriorities = (data) => {
    let priorities = 0;
    if (data !== 0) {
        priorities = data - 38;
        if (priorities >= 59)
            priorities -= 58;            
    }
    return priorities;
}


fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) throw err;

    const { totalPriorities1, totalPriorities2 } = calculate(data);
    console.log('priorities for day1: ', totalPriorities1);
    console.log('priorities for day2: ', totalPriorities2);

});