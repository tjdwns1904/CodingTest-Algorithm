let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim();

let result = [];

function zoac(words, from, to) {
    if (from >= to) return;
    let min = from;
    for (let i = from + 1; i < to; i++) {
        if (words[min].localeCompare(words[i]) === 1) min = i;
    }
    result[min] = words[min];
    console.log(result.join(''));
    zoac(words, min + 1, to);
    zoac(words, from, min);
}

zoac(input, 0, input.length);