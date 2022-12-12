//coded by mz-suzin
const fs = require('fs');

//dir constructor
class newDir {
    constructor(dirName, currDir) {
        this.name = dirName;
        this.parent = currDir;
        this.size = 0;
    }
}

const readCmd = (cmd, currDir) => {
    if (cmd.includes('cd')) {
        dirName = cmd.replace('$ cd ', '');
        dirName = new newDir(dirName, currDir);
        console.log(dirName.name)
    }
}

const addFile = (cmd) => {

}

const solution = (data) => {
    //should I build the tree before and calculte the sum afterwards?
    //Or calculate on the fly
    //I'm leaning towards the later.
    //have to always save the previous command
    //Each directory can be an array containing [name of dir, size of dir]. 
    //Have to keep track of which array is inside which
    //One important step is to create an updater routine on the directory array every time 'cd ..' is called.
    //At the end, just sum up all the sizes higher than 100000.


    let currDir = 'asd';
    let prevCmd = '';


    data.forEach(cmd => {
        if (cmd.includes('$')) {
            readCmd(cmd, currDir);
            
        } else {
            addFile(cmd);
        }



        //leave this last
        prevCmd = cmd;
    });
}

const data = fs.readFileSync('short.txt', 'utf-8').toString().split('\r\n');

solution(data);