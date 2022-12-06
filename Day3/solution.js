//coded by mz-suzin
const fs = require('fs');

const calculate = (data) => {
    let totalPriorities = 0;
    const totalArrayPriorities = data.split('\n').map((rucksack) => {
        rucksack = rucksack.replace('\r', '');

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
        let priorities = 0;
        if (repeatedAscii !== 0) {
            priorities = repeatedAscii - 38;
            if (priorities >= 59)
                priorities -= 58;            
        }
        
        
        return priorities;
    })

    totalPriorities = totalArrayPriorities.reduce((a,b) => a+b);

    return totalPriorities;
}


fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) throw err;

    result = calculate(data);
    console.log(result);

});