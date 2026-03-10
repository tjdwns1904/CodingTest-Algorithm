let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [V, E] = input[0].split(' ').map(Number);
let start = Number(input[1]);
let graph = new Map();
input.slice(2, E + 2).forEach((line) => {
    let [u, v, w] = line.split(' ').map(Number);
    if(!graph.has(u)) graph.set(u, new Map());
    const minW = Math.min((graph.get(u).get(v) || Infinity), w);
    graph.get(u).set(v, minW);
});

let result = dijkstra(start);

for(let i = 1; i <= V; i++){
  console.log(result[i] === Infinity ? 'INF' : result[i]);
}

function dijkstra(start){
    const queue = [[start, 0]];
    let dists = Array(V + 1).fill(Infinity);
    while(queue.length > 0){
      const [curr, dist] = heapPop(queue);
      if(dists[curr] <= dist)continue;
      dists[curr] = dist;
      if(!graph.has(curr))continue;
      for(const [next, d] of graph.get(curr).entries()){
        if(d === Infinity)continue;
        heapPush(queue, [next, dist + d]);
      }
    }  
    return dists;
}

function heapPush(heap, item){
    heap.push(item);
    let idx = heap.length - 1;
    while(idx > 0){
        let parent = Math.floor((idx - 1) / 2);
        if(heap[parent][1] <= heap[idx][1])break;
        [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
        parent = idx;
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
        if(left < heap.length && heap[smallest][1] > heap[left][1])smallest = left;
        if(right < heap.length && heap[smallest][1] > heap[right][1])smallest = right;
        if(smallest === idx)break;
        [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
        idx = smallest;
    }
    return head;
}