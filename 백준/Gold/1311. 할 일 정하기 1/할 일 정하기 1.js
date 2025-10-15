let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let N = Number(input[0]);
let D = input.slice(1, N + 1).map(line => line.split(' ').map(Number));
const len = Math.pow(2, N);
const cost = Array.from({length: N}, () => new Array(len).fill(-1));
console.log(dfs(0, 0));

function dfs(i, bitmask){
    if(i === N)return 0;
    if(cost[i][bitmask] !== -1)return cost[i][bitmask];
    let minCost = Infinity;
    for(let j = 0; j < N; j++){
        if(bitmask & (1 << j))continue;
        minCost = Math.min(minCost, D[i][j] + dfs(i + 1, bitmask | (1 << j)));
    }
    cost[i][bitmask] = minCost;
    return minCost;
}