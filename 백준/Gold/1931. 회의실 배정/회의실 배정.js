let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let N = Number(input[0]);
let meetings = input.slice(1, N + 1)
    .map(line => line.split(' ').map(Number))
    .sort((a, b) => {
        if(a[1] !== b[1])return a[1] - b[1];
        return a[0] - b[0];
    });
let answer = 1;
let meeting = meetings[0];

for(let i = 1; i < meetings.length; i++){
    if(meeting[1] <= meetings[i][0]){
        meeting = meetings[i];
        answer++;
    }    
}

console.log(answer);