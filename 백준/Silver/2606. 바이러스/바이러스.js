let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [V, E] = [+input[0], +input[1]];
let edges = input.slice(2).map(line => line.split(' ').map(Number));
const graph = new Map();
const visited = new Set();
const q = [1];
visited.add(1);
for(const [a, b] of edges){
    if(!graph.has(a))graph.set(a, []);
    if(!graph.has(b))graph.set(b, []);
    graph.get(a).push(b);
    graph.get(b).push(a);
}

while(q.length){
    const curr = q.shift();
    if(!graph.has(curr))continue;
    for(const next of graph.get(curr)){
        if(visited.has(next))continue;
        visited.add(next);
        q.push(next);
    }
}

console.log(visited.size - 1);