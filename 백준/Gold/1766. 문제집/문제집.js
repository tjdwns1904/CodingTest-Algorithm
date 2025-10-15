let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [N, M] = input[0].split(' ').map(Number);
let info = input.slice(1, M + 1).map(line => line.split(' ').map(Number));

const indegree = new Array(N).fill(0);
const rel = new Map();
for(const [a, b] of info){
    if(!rel.has(a - 1))rel.set(a - 1, []);
    rel.get(a - 1).push(b - 1);
    indegree[b - 1]++;
}

const pq = [];
for(let i = 0; i < N; i++){
    if(indegree[i] === 0)heapPush(pq, i);
}
const order = [];
while(pq.length){
    const curr = heapPop(pq);
    order.push(curr + 1);
    if(!rel.has(curr))continue;
    for(const p of rel.get(curr)){
        indegree[p]--;
        if(indegree[p] === 0)heapPush(pq, p);
    }
}

console.log(order.join(' '));

function heapPush(heap, item){
    heap.push(item);
    let idx = heap.length - 1;
    while(idx > 0){
        let parent = Math.floor((idx - 1) / 2);
        if(heap[parent] <= heap[idx])break;
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
    let smallest = idx;
    while(true){
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        if(left < heap.length && heap[left] < heap[smallest])smallest = left;
        if(right < heap.length && heap[right] < heap[smallest])smallest = right;
        if(smallest === idx)break;
        [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
        idx = smallest;
    }
    
    return head;
}