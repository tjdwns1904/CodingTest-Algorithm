let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, M] = [+input[0], +input[2]];
let numbers = input[1].split(' ').map(Number);
let DP = Array(M + 1).fill(0n);
for(let i = 0; i <= M; i++){
    let roomNum = DP[i].toString();
    for(let j = 0; j < N; j++){
        if((i === 0 && j === 0) || i + numbers[j] > M)continue;
        DP[i + numbers[j]] = BigInt(roomNum + j) > BigInt(DP[i + numbers[j]]) ? BigInt(roomNum + j) : BigInt(DP[i + numbers[j]]);
    }
}

console.log(DP[M].toString());
