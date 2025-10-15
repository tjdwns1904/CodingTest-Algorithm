let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let N = Number(input[0]);
let tasks = input.slice(1, N + 1).map(line => line.split(' ').map(Number));
let DP = new Array(N + 1).fill(0);

for(let i = 0; i <= N; i++){
    if(i > 0)DP[i] = Math.max(DP[i], DP[i - 1]);
    if(i < N && i + tasks[i][0] <= N){
        DP[i + tasks[i][0]] = Math.max(DP[i + tasks[i][0]], DP[i] + tasks[i][1]);
    }
}

console.log(DP[N]);