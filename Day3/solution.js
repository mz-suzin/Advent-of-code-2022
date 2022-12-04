//coded by mz-suzin
const fs = require('fs');

const calculate = (data) => {
    let totalPriorities = 0;
    const totalArrayPriorities = data.split('\n').map((rucksack) => {
        rucksack = rucksack.replace('\r', '');

        //split string in half
        let halfString = Math.floor(rucksack.length/2);
        ruck1 = rucksack.slice(0, halfString);
        ruck2 = rucksack.slice(halfString+1, rucksack.length);

        //comparing each character of ruck1 to all others at ruck2, checking if character has already been spotted as repeated,
        // if not, saving it with the ascii value of the repeated character
        let repeatedAscii = [];
        [...ruck1].forEach((letter) => {
            if (ruck2.includes(letter)) { 
                repeatedAscii.push(letter.charCodeAt(0));
            }
        })

        // convert to priorities from advent of code
        let priorities = 0;
        if (repeatedAscii.length > 0) {
            for (let i = 0; i < repeatedAscii.length; i++) {
                repeatedAscii[i] = repeatedAscii[i]-38;
                    if (repeatedAscii[i] >= 59)
                        repeatedAscii[i] -= 58;
            }
            priorities = repeatedAscii.reduce((a,b) => a+b);
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