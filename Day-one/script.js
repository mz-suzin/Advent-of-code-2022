const fs = require('fs');

const calculate = (allElfCalories) => {
    let highestCalories = 0;
    let top3Calories = 0;

    const allCalories = allElfCalories.split("\n\n").map((eachElf) => { //separates each elf's calories into an array where each line has all the elf's calories
        const eachElfCaloriesStr = eachElf.split("\n"); //separates each of those lines into a string of numbers, separated by commas

        const totalElfCalories = eachElfCaloriesStr.reduce(
            (acc, currVal) => acc + parseInt(currVal,10), 0 //returns the sum of each elf's calories by line
        );

        return totalElfCalories;
    });

    allCalories.sort((a,b) => b - a);

    highestCalories = allCalories[0];

    top3Calories = allCalories.slice(0,3) //since the array is organised by decreasing order, those 3 first items are the biggest ones.
    .reduce((a,b) => a + b, 0);

    return {
        highestCalories,
        top3Calories
    }
}


fs.readFile("day1_calories.txt", "utf-8", (err, data) => {
    if (err) throw err;

    const { highestCalories, top3Calories } = calculate(data.replace(/[\r]+/gm, ""));
    console.log(`The most calories an elf is carrying is ${highestCalories} and the sum of the top 3 is ${top3Calories}`);
})

