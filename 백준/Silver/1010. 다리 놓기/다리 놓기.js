//여러 줄 입력

let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let count = input[0];
let DP = Array.from({length: 31}, () => Array(31).fill(0));
for(let i = 0; i <= 30; i++){
    DP[i][0] = 1;
    DP[i][i] = 1;
}

for(let i = 1; i <= 30; i++){
    for(let j = 1; j <= 30; j++){
        DP[i][j] = DP[i - 1][j - 1] + DP[i - 1][j];
    }
}

for (let i = 1; i <= count; i++) {
    [river1, river2] = input[i].split(' ').map(n => Number(n));
    console.log(DP[river2][river1]);
}