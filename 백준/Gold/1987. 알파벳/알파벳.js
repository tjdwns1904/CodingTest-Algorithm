let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [R, C] = input[0].split(' ').map(Number);
let board = input.slice(1).map(line => line.split('').map((c) => c.charCodeAt(0) - 'A'.charCodeAt(0)));
const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];
let max = 1;
function dfs(r, c, visited, cnt){
  if(cnt > max) max = cnt;
  for(let i = 0; i < 4; i++){
    const [newR, newC] = [r + dr[i], c + dc[i]];
    if(newR < 0 || newR >= R || newC < 0 || newC >= C)continue;
    if(visited & (1 << board[newR][newC]))continue;
    dfs(newR, newC, visited | (1 << board[newR][newC]), cnt + 1);
  }
}

dfs(0, 0, 1 << board[0][0], 1);
console.log(max);