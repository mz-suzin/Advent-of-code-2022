//coded by mz-suzin - with regards to https://github.com/sansk
const fs = require('fs');

const getCmdType = (line) => {
    if (line.startsWith('$')) return 'shell-command';
    if (line.startsWith('dir')) return 'directory';
    return 'file';
}

const calculate = () => {
    let currDir = ['root'];
    const directory = new Map();

    for (const line of data) {
        if (getCmdType(line) === 'shell-command') {
            const [aux, cmd, arg] = line.split(' ');

            if (cmd === 'cd') {
                if (arg === '/')
                    currDir.splice(1);
                else if (arg === '..')
                    currDir.pop();
                else 
                    currDir.push(arg);
            }
        }
        if (getCmdType(line) === 'file') {
            const [size] = line.split(' ');
            const key = currDir.join('/');

            //this line stores the sum of the sizes of each file inside the directory
            directory.set(key, (directory.get(key) || 0) + Number(size));

            //because we need the total size of the directory (including files from directories inside directories), we need to update every directory below the one we are.
            if (currDir.length > 1) {
                for (let i = currDir.length - 1; i > 0; i--){
                    const mainKey = currDir.slice(0,i).join('/');

                    directory.set(mainKey, (directory.get(mainKey) || 0) + Number(size));
                }
            }
        }

    }
    return directory;
}

const part1 = () => {
    const MAX_DIR_SIZE = 100000;
    const dirSize = calculate();
    let totalSize = 0;

    for (const size of dirSize.values()){
        if (size <= MAX_DIR_SIZE) totalSize += size;
    }

    console.log('Part 1: ');
    console.log('The total size of directories to be deleted is: ', totalSize);
}

const part2 = () => {
    REQUIRED_SPACE = 30000000;
    TOTAL_SPACE = 70000000;
    const dirSize = calculate();
    let totalSpaceNeeded = REQUIRED_SPACE - (TOTAL_SPACE - dirSize.get('root'))
    let smallestDir = dirSize.get('root');

    for (const size of dirSize.values()) {
        if (size >= totalSpaceNeeded && size < smallestDir) smallestDir = size;
    }

    console.log('Part 2: ')
    console.log('The smallest directory size that can be deleted to free up enough space is: ', smallestDir);
}

const data = fs.readFileSync('input.txt', 'utf-8').toString().trim().split('\r\n');

part1();
part2();