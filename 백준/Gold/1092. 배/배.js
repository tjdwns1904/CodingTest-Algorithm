let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let N = Number(input[0]);
let cranes = input[1].split(' ').map(Number).sort((a, b) => b - a);
let M = Number(input[2]);
let boxes = input[3].split(' ').map(Number).sort((a, b) => b - a);

if(boxes[0] > cranes[0]){
    console.log(-1);
    return;
}

let left = M;
let visited = Array(M).fill(false);
let start = Array(N).fill(0);
let times = 0;
while(left > 0){
    for(let i = 0; i < N; i++){
        for(let j = start[i]; j < M; j++){
            start[i] = j + 1;
            if(visited[j])continue;
            if(boxes[j] <= cranes[i]){
                visited[j] = true;
                left--;
                break;
            }
        }
    }
    times++;
}

console.log(times);