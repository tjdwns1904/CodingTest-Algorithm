let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString();

let N = Number(input);

let answer = 0;

getPermutation(Array.from({length: N}, () => Array(N).fill(0)), 0 , Array(N).fill(false));
console.log(answer);

function getPermutation(board, r, visited){
  if(r === N) {
    answer++;
    return;
  }
  
  for(let i = 0; i < N; i++){
    if(visited[i])continue;
    if(!isPruning(board, r, i))continue;
    visited[i] = true;
    board[r][i] = 1;
    getPermutation(board, r + 1, visited);
    board[r][i] = 0;
    visited[i] = false;
  }
}

function isPruning(board, r, c){
  for(let i = r - 1; i >= 0; i--){
    for(let j = 0; j < N; j++){
      if(board[i][j] === 1){
        if(r - i === Math.abs(c - j))return false;
      }
    }
  }
  return true;
}