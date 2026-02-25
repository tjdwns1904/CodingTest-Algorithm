let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [R, C] = input[0].split(/\s+/).map(Number);
let board = input.slice(1).map(line => line.split('').map(c => charToNum(c)));
const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const n = board[0][0];
let max = 1;

dfs(0, 0, 0 | (1 << n), 1);
console.log(max);

function charToNum(a){
  return a.charCodeAt(0) - 64;
}

function dfs(r, c, visited, cnt){
  if(cnt > max) max = cnt;

  for(const [moveR, moveC] of moves){
    const [newR, newC] = [r + moveR, c + moveC];
    if(newR < 0 || newR >= R || newC < 0 || newC >= C)continue;
    if(visited & (1 << board[newR][newC]))continue;
    dfs(newR, newC, visited | (1 << board[newR][newC]), cnt + 1);
  }
}