let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [M, N] = input[0].split(' ').map(Number);
let maze = input.slice(1).map(line => line.split('').map(Number));
const destroyed = Array.from({length: N}, () => Array(M).fill(Infinity));
const q = [[0, 0, 0]];
let idx = 0;
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];
destroyed[0][0] = 0;
while(idx < q.length){
    const [r, c] = q[idx++];
    for(let i = 0; i < 4; i++){
        const [newR, newC] = [r + dr[i], c + dc[i]];
        if(newR < 0 || newR >= N || newC < 0 || newC >= M)continue;
        let newDes = destroyed[r][c];
        if(maze[newR][newC] === 1)newDes++;
        if(destroyed[newR][newC] <= newDes)continue;
        destroyed[newR][newC] = newDes;
        q.push([newR, newC]);
    }
}

console.log(destroyed[N - 1][M - 1]);