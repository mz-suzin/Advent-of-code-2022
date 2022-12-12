//coded by mz-suzin
const fs = require('fs');

const solution = (data) => {
    //should I build the tree before and calculte the sum afterwards?
    //Or calculate on the fly
    //I'm leaning towards the later.
    //have to always save the previous command
    //Each directory can be an array containing [name of dir, size of dir]. 
    //Have to keep track of which array is inside which
    //One important step is to create an updater routine on the directory array every time ls is called.
    //At the end, just sum up all the sizes higher than 100000.
}

const data = fs.readFileSync('input.txt', 'utf-8').toString();

solution(data);