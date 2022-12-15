//coded by mz-suzin
const fs = require('fs');

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

const isVisible = (matrix, row, col) => {
    let right = true;
    let top = true;
    let left = true;
    let bottom = true;
    tree = matrix[row][col];
    
    if (tree > 0) {
        //looking from left
        for (let j = 0; j < col; j++) {
            if (tree <= matrix[row][j]) {
                left = false;
                break;
            }
        } 
        if (!left) {
            //looking from right
            for (j = matrix[0].length-1; j > col; j--) {
                if (tree <= matrix[row][j]) {
                    right = false;
                    break;
                }
            }
        } 
        if (!right && !left) {
            //looking from top
            for (let i = 0; i < row; i++) {
                if (tree <= matrix[i][col]) {
                    top = false;
                    break;
                }
            }
        } 
        if (!top && !left && !right) {
            //looking from bottom
            for (i = matrix.length-1; i > row; i--) {
                if (tree <= matrix[i][col]) {
                    bottom = false;
                    break;
                }
            }
        }
    } else {
        return false;
    }

    return (right || left || bottom || top);
}

const getScenicScore = (matrix, row, col) => {
    let scoreRight = 0;
    let scoreLeft = 0;
    let scoreTop = 0;
    let scoreBottom = 0;
    tree = matrix[row][col];

    if (tree > 0) {
        //looking to the left
        for (let j = col-1; j >= 0; j--) {
            if (tree > matrix[row][j]) {
                scoreLeft++
            } else if (tree <= matrix[row][j]) {
                scoreLeft++;
                break;
            }
        } 
        //looking to the right
        for (j = col+1; j <= matrix[0].length - 1; j++) {
            if (tree > matrix[row][j]) {
                scoreRight++
            } else if (tree <= matrix[row][j]) {
                scoreRight++;
                break;
            }
        }
        //looking to the top
        for (let i = row-1; i >= 0; i--) {
            if (tree > matrix[i][col]) {
                scoreTop++
            } else if (tree <= matrix[i][col]) {
                scoreTop++;
                break;
            }
        }
        //looking to the bottom
        for (i = row+1; i <= matrix.length-1; i++) {
            if (tree > matrix[i][col]) {
                scoreBottom++
            } else if (tree <= matrix[i][col]) {
                scoreBottom++;
                break;
            }
        }
    } else {
        return 0;
    }

    return (scoreTop * scoreRight * scoreLeft * scoreBottom);
}

const calculate = (data) => {

    const matrix = createMatrix(data);

    let count = 0;
    let scenicScore = 0;
    let aux = 0;

    
    for (let ix = 1; ix < matrix.length - 1; ix++) {
        for (let jx = 1; jx < matrix[0].length - 1; jx++) {
            //PART1
            if (isVisible(matrix, ix, jx)){
                count++;
            }
            //PART2
            aux = getScenicScore(matrix, ix, jx);
            if (aux > scenicScore) scenicScore = aux;
            
        }
    }

    const sides = matrix.length * 2 + (matrix[0].length - 2) * 2;

    console.log(`The total amount of visible trees from all 4 sides is: ${sides + count}`)
    console.log(`The highest scenic score of all trees is: ${scenicScore}`)
}

const data = fs.readFileSync('input.txt', 'utf-8').toString().trim().split('\r\n');

calculate(data);

 //WRONG LOGIC THAT I'M SAD TO DELETE SO I'M JUST COMMENTING IT OUT. IT WORKS, BUT NOT AS INTENDED FOR THE CHALLENGE. SAD
    // for (let around = 1; around <= 4; around++){
    //     switch (around) {
    //         case 1: //looking from left
    //             count = 0;
    //             for (let i = 1; i < matrix.length - 1; i++) {
    //                 bigTree = matrix[i][0];
    //                 for (let j = 1; j < matrix[0].length - 1; j++) {
                        
    //                     if (matrix[i][j] > bigTree) {
    //                         bigTree = matrix[i][j];
    //                         count++;
    //                         if (bigTree === 9)
    //                         break;
    //                     }
    //                 }
    //             }
    //             console.log('im here 1 and count is: ', count);
    //             break;
            
    //         case 2: //looking from right
    //             count = 0;
    //             for (let i = 1; i < matrix.length - 1; i++) {
    //                 bigTree = matrix[i][matrix[0].length - 1];
    //                 for (let j = matrix[0].length - 2; j >= 1; j--) {
    //                     if (matrix[i][j] > bigTree) {
    //                         bigTree = matrix[i][j];
    //                         count++;
    //                         if (bigTree === 9)
    //                         break;
    //                     }
    //                 }
    //             }
    //             console.log('im here 2 and count is: ', count);
    //             break;

    //         case 3: //looking from top
    //             count = 0;
    //             for (let j = 1; j < matrix[0].length - 1; j++) {
    //                 bigTree = matrix[0][j];
    //                 for (let i = 1; i < matrix.length - 1; i++) {
    //                     if (matrix[i][j] > bigTree) {
    //                         bigTree = matrix[i][j];
    //                         count++;
    //                         if (bigTree === 9)
    //                         break;
    //                     }
    //                 }
    //             }
    //             console.log('im here 3 and count is: ', count);
    //             break;

    //         case 4: //looking from bottom
    //             count = 0;
    //             for (let j = 1; j < matrix[0].length - 1; j++) {
    //                 bigTree = matrix[matrix.length - 1][j];
    //                 for (let i = matrix.length - 2; i >= 1; i--) {
    //                     if (matrix[i][j] > bigTree) {
    //                         bigTree = matrix[i][j];
    //                         count++;
    //                         if (bigTree === 9)
    //                         break;
    //                     }
    //                     // console.log('matrix', matrix[i][j], 'bigTree', bigTree, 'count', count);
    //                 }
    //             }
    //             console.log('im here 4 and count is: ', count);
    //             break;
                
    //     }
        
    //     finalCount += count;
    //     console.log('final count: ', finalCount);
    // }