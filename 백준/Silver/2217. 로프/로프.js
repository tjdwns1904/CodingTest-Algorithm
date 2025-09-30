let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let N = +input[0];
let ropes = input.slice(1).map(line => line.split(' ').map(Number)).sort((a, b) => a - b);
let answer = 0;

for(let i = 0; i < N; i++){
    answer = Math.max(answer, ropes[i] * (N - i));    
}

console.log(answer);