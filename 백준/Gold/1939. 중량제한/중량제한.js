let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, M] = input[0].split(' ').map(Number);
let bridges = input.slice(1, M + 1).map(line => line.split(' ').map(Number));
let [f1, f2] = input[M + 1].split(' ').map(Number);
const graph = new Map();
const maxWeight = Array(N).fill(-1);
f1--; f2--;

for(let [a, b, c] of bridges){
    a--; b--;
    if(!graph.has(a))graph.set(a, new Map());
    if(!graph.has(b))graph.set(b, new Map());
    graph.get(a).set(b, Math.max(c, (graph.get(a).get(b) || 0)));
    graph.get(b).set(a, Math.max(c, (graph.get(b).get(a) || 0)));
}

const pq = [[f1, 0]];
while(pq.length){
    const [curr, w] = heapPop(pq);
    if(curr === f2){
        console.log(w);
        return;
    }
    if(maxWeight[curr] >= w)continue;
    maxWeight[curr] = w;
    if(!graph.has(curr))continue;
    for(const [next, limit] of graph.get(curr).entries()){
        if(limit === 0)continue;
        const wLimit = w === 0 ? limit : Math.min(limit, w);
        if(maxWeight[next] >= wLimit)continue;
        heapPush(pq, [next, wLimit]);
    }
}

function heapPush(heap, item){
    heap.push(item);
    let idx = heap.length - 1;
    while(idx > 0){
        let parent = ((idx - 1) >> 1);
        if(heap[parent][1] >= heap[idx][1])break;
        [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
        idx = parent;
    }
}

function heapPop(heap){
    if(heap.length === 0)return null;
    if(heap.length === 1)return heap.pop();
    const head = heap[0];
    heap[0] = heap.pop();
    let idx = 0;
    let biggest = 0;
    while(true){
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        if(left < heap.length && heap[left][1] > heap[biggest][1])biggest = left;
        if(right < heap.length && heap[right][1] > heap[biggest][1])biggest = right;
        if(biggest === idx)break;
        [heap[idx], heap[biggest]] = [heap[biggest], heap[idx]];
        idx = biggest;
    }
    
    return head;
}