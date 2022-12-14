//coded by mz-suzin
const fs = require('fs');
const { getEnabledCategories } = require('trace_events');


const createMatrix = (input) => {
    let auxArray = [];
    let matrix = [];

    for (let i = 0; i <= input.length - 1; i++) {
        auxArray = [];
        [...data[i]].forEach(element => {
            auxArray.push(element);
        });
        matrix[i] = [...auxArray];
    }

    return matrix;
}

const calculate = (data) => {

    const matrix = createMatrix(data);

    let count = 0;
    let finalCount = 0;

    for (let around = 1; around <= 4; around++){
        switch (around) {
            case 1: //looking from left
                count = 0;
                for (let i = 1; i < matrix.length - 1; i++) {
                    bigTree = matrix[i][0];
                    for (let j = 1; j < matrix[0].length - 1; j++) {
                        
                        if (matrix[i][j] > bigTree) {
                            bigTree = matrix[i][j];
                            count++;
                            if (bigTree === 9)
                            break;
                        }
                        // console.log('matrix', matrix[i][j], 'bigTree', bigTree, 'count', count);
                    }
                }
                console.log('im here 1 and count is: ', count);
                break;
            
            case 2: //looking from right
                count = 0;
                for (let i = 1; i < matrix.length - 1; i++) {
                    bigTree = matrix[i][matrix[0].length - 1];
                    for (let j = matrix[0].length - 2; j >= 1; j--) {
                        if (matrix[i][j] > bigTree) {
                            bigTree = matrix[i][j];
                            count++;
                            if (bigTree === 9)
                            break;
                        }
                    }
                }
                console.log('im here 2 and count is: ', count);
                break;

            case 3: //looking from top
                count = 0;
                for (let j = 1; j < matrix[0].length - 1; j++) {
                    bigTree = matrix[0][j];
                    for (let i = 1; i < matrix.length - 1; i++) {
                        if (matrix[i][j] > bigTree) {
                            bigTree = matrix[i][j];
                            count++;
                            if (bigTree === 9)
                            break;
                        }
                    }
                }
                console.log('im here 3 and count is: ', count);
                break;

            case 4: //looking from bottom
                count = 0;
                for (let j = 1; j < matrix[0].length - 1; j++) {
                    bigTree = matrix[matrix.length - 1][j];
                    for (let i = matrix.length - 2; i >= 1; i--) {
                        if (matrix[i][j] > bigTree) {
                            bigTree = matrix[i][j];
                            count++;
                            if (bigTree === 9)
                            break;
                        }
                        // console.log('matrix', matrix[i][j], 'bigTree', bigTree, 'count', count);
                    }
                }
                console.log('im here 4 and count is: ', count);
                break;
                
        }
        
        finalCount += count;
        console.log('final count: ', finalCount);
    }

    const sides = matrix.length * 2 + (matrix[0].length - 2) * 2;

    console.log('sides', sides, 'Final count', finalCount);
    console.log(`The total amount of visible trees from all 4 sides is: ${sides + finalCount}`)


}

const data = fs.readFileSync('input_short.txt', 'utf-8').toString().trim().split('\r\n');

calculate(data);