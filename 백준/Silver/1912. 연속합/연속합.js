//여러 줄 입력

let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let count = Number(input[0]);
let numbers = input[1].split(' ').map(Number);
let DP = new Array(count).fill(0);
let answer = numbers[0];
DP[0] = numbers[0];

for(let i = 1; i < count; i++){
    DP[i] = Math.max(DP[i - 1] + numbers[i], numbers[i]);
    answer = Math.max(DP[i], answer);
}

console.log(answer);