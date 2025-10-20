let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [N, M] = input[0].split(' ').map(Number);
let edges = input.slice(1, M + 1).map(line => {
    const [a, b] = line.split(' ').map(Number);
    return [a - 1, b - 1];
});
const MAX = Number.MAX_SAFE_INTEGER;
const friends = Array.from({length: N}, () => new Array(N).fill(MAX));
let [min, person] = [MAX, -1];
for(let [a, b] of edges){
    if(friends[a][b] !== MAX)continue;
    friends[a][b] = 1;
    friends[b][a] = 1;
}

for(let i = 0; i < N; i++){
    friends[i][i] = 0;
    for(let j = 0; j < N; j++){
        for(let k = 0; k < N; k++){
            if(j === k || friends[j][i] === MAX || friends[i][k] === MAX)continue;
            friends[j][k] = Math.min(friends[j][k], friends[j][i] + friends[i][k]);
            friends[k][j] = Math.min(friends[k][j], friends[k][i] + friends[i][j]);
        }
    }
}

for(const [idx, arr] of friends.entries()){
    const total = arr.reduce((acc, curr) => curr !== MAX ? acc + curr : acc, 0);
    if(total < min){
        min = total;
        person = idx + 1;
    }
}

console.log(person);
