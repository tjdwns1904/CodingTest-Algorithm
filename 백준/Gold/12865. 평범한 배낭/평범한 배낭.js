let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [N, W] = input[0].split(' ').map(Number);
let items = input.slice(1, N + 1).map(line => line.split(' ').map(Number));
let dp = Array(W + 1).fill(0);

for (let i = 0; i < N; i++) {
    let [weight, value] = items[i];
    for (let w = W; w >= weight; w--) {
        dp[w] = Math.max(dp[w], dp[w - weight] + value);
    }
}

console.log(Math.max(...dp));