let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [N, M] = [input[0], input[1]].map(Number);
let edges = input.slice(2, M + 2).map(line => line.split(' ').map(Number));
const graph = new Map();

for(const [from, to] of edges){
    if(!graph.has(from - 1))graph.set(from - 1, []);
    if(!graph.has(to - 1))graph.set(to - 1, []);
    graph.get(from - 1).push(to - 1);
    graph.get(to - 1).push(from - 1);
}

const queue = [];
let visited = Array(N).fill(false);
queue.push(0);
visited[0] = true;
while(queue.length){
    const curr = queue.shift();
    if(!graph.has(curr))continue;
    for(const node of graph.get(curr)){
        if(visited[node])continue;
        visited[node] = true;
        queue.push(node);
    }
}
let answer = -1;
for(let v of visited){
    if(v)answer++;
}

console.log(answer);