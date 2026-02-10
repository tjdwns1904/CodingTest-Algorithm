let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split(' ');

let [N, r, c] = input.map(Number);
let answer = 0;

function solve(size, r, c){
  if(size === 1)return;
  let half = size / 2;
  if(r < half && c < half){
    solve(half, r, c);
  }else if(r < half && c >= half){
    answer += half * half;
    solve(half, r, c - half);
  }else if(r >= half && c < half){
    answer += 2 * half * half;
    solve(half, r - half, c);
  }else{
    answer += 3 * half * half;
    solve(half, r - half, c - half);
  }
}

solve(Math.pow(2, N), r, c);
console.log(answer);

