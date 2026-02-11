let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let N = Number(input[0]);
let cranes = input[1].split(' ').map(Number).sort((a, b) => b - a);
let M = Number(input[2]);
let boxes = input[3].split(' ').map(Number).sort((a, b) => b - a);

if (cranes[0] < boxes[0]) {
    console.log(-1);
    return;
}
let times = 0;
let left = M;
let start = Array(N).fill(0);
let visited = Array(M).fill(0);
while (left > 0) {
  let moved = 0;
  for (let i = 0; i < N; i++) {
    for(let j = start[i]; j < M; j++){
      start[i] = j + 1;
      if(visited[j])continue;
      if(cranes[i] >= boxes[j]){
        visited[j] = 1;
        left--;
        break;
      }
    }
  }
  times++;
}

console.log(times);