//coded by mz-suzin
const fs = require('fs');

//1st challenge
//A & X -> ROCK 1p
//B & Y -> PAPER 2p
//C & Z -> SCISSOR 3p

//DRAW = AX, BY, CZ 3p
//WIN = AY, BZ, CX 6p
//LOSS = AZ, BX, CY 0p

//2nd challenge
//X -> MUST LOOSE -- A -> 3p || B -> 1p || C -> 2p
//Y -> MUST DRAW -- A -> 1p || B -> 2p || C -> 3p
//Z -> MUST WIN -- A -> 2p || B -> 3p || C -> 1p

const calculate = (data) => {
    let myPlay = '';
    let totalPointsSecondChallenge = [];

    //mapping for conversion of points from challenge 1 -> challenge 2
    let mapping = [1,6,8,3,5,7,2,4,9]; //each position refers to the total points in challenge 1 and the value for the position is the new total points.

    const totalPointsFirstChallenge = data.split('\n').map((eachRound) => {
        eachRound = eachRound.replace(' ', '').replace('\r','');
        myPlay = eachRound.slice(1,2);

        let pointsFirstChallenge = 0;

        if (eachRound === 'AY' || eachRound === 'BZ' || eachRound === 'CX') { //IT'S A WIN!
            pointsFirstChallenge = 6;
        } else if (eachRound === 'AX' || eachRound === 'BY' || eachRound === 'CZ') { //IT'S A DRAW!
            pointsFirstChallenge = 3;
        }

        switch (myPlay) {
            case 'X':
                pointsFirstChallenge += 1;
                break;
            case 'Y':
                pointsFirstChallenge += 2;
                break;
            case 'Z':
                pointsFirstChallenge += 3;
                break;
        }

        return pointsFirstChallenge;
    })

    // console.log(totalPointsFirstChallenge);

    let i = 0;
    totalPointsFirstChallenge.map((val) => {
        for (i = 1; i<=9; i++) {
            if (i === val) {
                totalPointsSecondChallenge.push(mapping[i-1]);
                i = 100;
            }
        }    
    })
    // console.log(totalPointsSecondChallenge);

    let x = 0;
    let y = 0;

    x = totalPointsFirstChallenge.reduce((a,b) => a + b);
    y = totalPointsSecondChallenge.reduce((a,b) => a + b);

    console.log(x);
    console.log(y);

    return { x, y }
}


fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) throw err;

    const { totalPoints1, totalPoints2 } = calculate(data);
    console.log(`The total score for the 1st challenge is ${totalPoints1} `);
    console.log(`The total score for the 2nd challenge is ${totalPoints2} `);

});
