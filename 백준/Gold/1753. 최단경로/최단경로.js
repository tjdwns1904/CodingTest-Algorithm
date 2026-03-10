let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [V, E] = input[0].split(' ').map(Number);
let start = Number(input[1]) - 1;
let edges = input.slice(2, E + 2).map(line => {
    let [from, to, weight] = line.split(' ').map(Number);
    return [from - 1, to - 1, weight];
});
let weights = new Map();
let dist = Array(V).fill(Number.MAX_SAFE_INTEGER);

for(let [from, to, weight] of edges){
    if(!weights.has(from))weights.set(from, new Map());
    let prev = weights.get(from).get(to) ?? Number.MAX_SAFE_INTEGER;
    weights.get(from).set(to, Math.min(prev, weight));
}

let pq = [];
heapPush(pq, [start, 0]);
while(pq.length){
    const [curr, weight] = heapPop(pq);
    if(dist[curr] <= weight)continue;
    dist[curr] = weight;
    if(!weights.has(curr))continue;
    for(let [to, w] of weights.get(curr).entries()){
        if(dist[to] <= weight + w)continue;
        heapPush(pq, [to, weight + w]);
    }
}

for(let d of dist){
    console.log(d === Number.MAX_SAFE_INTEGER ? 'INF' : d);
}

function heapPush(heap, item){
    heap.push(item);
    let idx = heap.length - 1;
    while(idx > 0){
        let parent = Math.floor((idx - 1) / 2);
        if(heap[parent][1] <= heap[idx][1])break;
        [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
        idx = parent;
    }
}

function heapPop(heap){
    if (heap.length === 1) return heap.pop();
    const head = heap[0];
    heap[0] = heap.pop();
    let idx = 0;
    let smallest = idx;
    while(true){
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        if(left < heap.length && heap[left][1] < heap[smallest][1])smallest = left;
        if(right < heap.length && heap[right][1] < heap[smallest][1])smallest = right;
        if(smallest === idx)break;
        [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
        idx = smallest;
    }
    return head;
}