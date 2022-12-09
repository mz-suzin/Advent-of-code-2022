//coded by mz-suzin
const fs = require('fs');

const compareCharacters = (string, iterator) => {
    areDifferent = true;
    for (let k = iterator; k >= 1; k--){
        for (let j = k-1; j >= 0; j--){
            if (string[k] === string[j]) {
                areDifferent = false;
                return areDifferent;
            }
        }
    }
    return areDifferent;
}

const solution = (data) => {
    let startOfPackage = 0;
    let startOfMessage = 0;
    let stringTest = '';
    let index = 0;
    
    //PART1
    //iterate between all elements of input
    for (index = 0; index < data.length - 3; index++) {
        
        //separate the test string into slices of 4, starting from index
        stringTest = data.slice(index, index + 4).toString();

        
        //compare if any of those 4 characters are repeated doing the less amount of iterations possible
        if(compareCharacters(stringTest, 3)){
            startOfPackage = index + 4;
            break;
        }
    }

    //PART2
    //iterate between all elements of input -- It should start from Start of Package huh? 
    for (index = 0; index < data.length - 3; index++) {

        //separate the test string into slices of 14, starting from index
        stringTest = data.slice(index, index + 14).toString();
    
        //compare if any of those 14 characters are repeated doing the less amount of iterations possible
        if(compareCharacters(stringTest, 13)){
            startOfMessage = index + 14;
            break;
        }
    }

    console.log(`The message should start at character number __${startOfPackage}__`);
    console.log(`The message started at character number __${startOfMessage}__`);
}
        

const data = fs.readFileSync('input.txt', 'utf8').toString();

solution(data);