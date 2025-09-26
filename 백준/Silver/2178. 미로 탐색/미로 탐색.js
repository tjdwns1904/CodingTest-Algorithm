let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [N, M] = input[0].split(' ').map(Number);
let map = input.slice(1, N + 1);
let dist = Array.from({length: N}, () => Array(M).fill(Number.MAX_SAFE_INTEGER));
let queue = [];
const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
queue.push([0, 0]);
dist[0][0] = 1;
while(queue.length){
    const [r, c] = queue.shift();
    for(const [moveR, moveC] of moves){
        const [newR, newC] = [r + moveR, c + moveC];
        if(newR < 0 || newR >= N || newC < 0 || newC >= M)continue;
        if(map[newR][newC] === '0' || dist[newR][newC] <= dist[r][c] + 1)continue;
        dist[newR][newC] = dist[r][c] + 1;
        queue.push([newR, newC]);
    }
}

console.log(dist[N - 1][M - 1]);