let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [R, C, K] = input[0].split(' ').map(Number);
let map = input.slice(1);
let cnt = 0;
const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function getRoutes(r, c, visited){
    if(visited.size > K)return;
    if(r === 0 && c === C - 1){
        if(visited.size === K)cnt++;
        return;
    }
    
    for(const [moveR, moveC] of moves){
        const [newR, newC] = [r + moveR, c + moveC];
        if(newR < 0 || newR >= R || newC < 0 || newC >= C)continue;
        const key = `${newR},${newC}`;
        if(visited.has(key) || map[newR][newC] === 'T')continue;
        visited.add(key);
        getRoutes(newR, newC, visited);
        visited.delete(key);
    }
}

getRoutes(R - 1, 0, new Set([`${R - 1},${0}`]));
console.log(cnt);