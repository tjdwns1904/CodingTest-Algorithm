let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let N = +input[0];
let DP = Array(N + 1).fill(Infinity);
const kgs = [3, 5];
DP[0] = 0; 
for(let i = 3; i <= N; i++){
    for(const kg of kgs){
        if(i - kg < 0)continue;
        DP[i] = Math.min(DP[i - kg] + 1, DP[i]);
    }
}

console.log(DP[N] === Infinity ? -1 : DP[N]);
