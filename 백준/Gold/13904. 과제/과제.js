let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let N = +input[0];
let tasks = input.slice(1).map(line => line.split(' ').map(Number)).sort((a, b) => a[0] - b[0]);
const pq = [];

for(const [d, w] of tasks){
    heapPush(pq, w);
    if(pq.length > d)heapPop(pq);
}

let answer = 0;

while(pq.length){
    answer += heapPop(pq);    
}

console.log(answer);

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
    let smallest = 0;
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