//coded by mz-suzin
const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').toString().split('\r\n');

const solution = (data) => {
    let fullyOverlaping = 0;
    let partialOverlaping = 0;

    const getSections = (elf) => {
        const [firstSection, lastSection] = elf.split('-');
        return [+firstSection, +lastSection];
    }
    
    data.map((pair) => {
        [firstElf, secondElf] = pair.split(',');

        [firstSection, lastSection] = getSections(firstElf);
        [firstSection2, lastSection2] = getSections(secondElf);

        //fully overlaping sections:
        if ((firstSection >= firstSection2 && lastSection <= lastSection2) || (firstSection <= firstSection2 && lastSection >= lastSection2)){
            fullyOverlaping++;
        }

        //partial overlaping sections:
        if (firstSection <= lastSection2 && lastSection >= firstSection2){
            partialOverlaping++;
        }

    })
    console.log(`the total number of fully overlaping sections is: ${fullyOverlaping}`);
    console.log(`the number of partial overlaping sections is: ${partialOverlaping}`);
}

solution(data);