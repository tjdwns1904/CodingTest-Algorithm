let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let T = +input[0];
let idx = 1;
for(let i = 0; i < T; i++){
    let [N, M] = input[idx++].split(' ').map(Number);
    let flights = input.slice(idx, idx + M).map(line => line.split(' ').map(Number));
    idx += M;
    console.log(N - 1);
}