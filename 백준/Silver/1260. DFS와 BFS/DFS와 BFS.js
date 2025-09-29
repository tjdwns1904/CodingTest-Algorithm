let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, M, V] = input[0].split(' ').map(Number);
let edges = input.slice(1).map(line => line.split(' ').map(Number));
const graph = new Map();
for(const [a, b] of edges){
    if(!graph.has(a))graph.set(a, []);
    if(!graph.has(b))graph.set(b, []);
    graph.get(a).push(b);
    graph.get(b).push(a);
}

console.log(dfs(V));
console.log(bfs(V));

function bfs(v){
    const q = [];
    const visited = new Set();
    let idx = 0;
    const order = [];
    q.push(v);
    visited.add(v);
    while(idx < q.length){
        const curr = q[idx++];
        order.push(curr);
        if(!graph.has(curr))continue;
        for(const next of graph.get(curr).reverse()){
            if(visited.has(next))continue;
            visited.add(next);
            q.push(next);
        }
    }

    return order.join(' ');
}

function dfs(v){
    const stack = [];
    const visited = new Set();
    const order = [];
    stack.push(v);
    while(stack.length){
        const curr = stack.pop();
        if(visited.has(curr))continue;
        visited.add(curr);
        order.push(curr);
        if(!graph.has(curr))continue;
        for(const next of graph.get(curr).sort((a, b) => b - a)){
            if(visited.has(next))continue;
            stack.push(next);
        }
    }

    return order.join(' ');
}