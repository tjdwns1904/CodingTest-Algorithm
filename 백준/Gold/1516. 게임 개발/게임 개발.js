let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const times = [];
const order = new Array(N).fill(0);
const preBuild = new Map();
for(let i = 0; i < N; i++){
    preBuild.set(i, new Set());
}
input.slice(1).forEach((line, idx) => {
    const [time, ...rest] = line.split(' ').map(Number);
    order[idx] = rest.length - 1;
    times[idx] = time;
    for(let pre of rest){
        if(pre === -1)break;
        pre--;
        preBuild.get(pre).add(idx);
    }
});

const queue = [];
const completion = new Array(N).fill(0);
for(let i = 0; i < N; i++){
    if(order[i] === 0){
        queue.push(i);
        completion[i] = times[i];
    }
}

while(queue.length){
    const curr = queue.shift();
    for(const next of preBuild.get(curr)){
        order[next]--;
        completion[next] = Math.max(completion[curr], completion[next]);
        if(order[next] === 0){
            queue.push(next);
            completion[next] += times[next];
        }
        preBuild.get(curr).delete(next);
    }
}

console.log(completion.join('\n'));