let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let N = +input[0];
const minHeap = [];
const maxHeap = [];
const result = [];
for (let i = 1; i <= N; i++) {
    const num = +input[i];
    if (maxHeap.length === minHeap.length) {
        maxHeapPush(maxHeap, num);
    }else{
        minHeapPush(minHeap, num);
    }
    if (maxHeap.length && minHeap.length && maxHeap[0] > minHeap[0]) {
        const a = maxHeapPop(maxHeap);
        const b = minHeapPop(minHeap);
        minHeapPush(minHeap, a);
        maxHeapPush(maxHeap, b);
    }

    result.push(maxHeap[0]);
}

console.log(result.join('\n'));

function minHeapPush(heap, item) {
    heap.push(item);
    let idx = heap.length - 1;
    while (idx > 0) {
        let parent = ((idx - 1) >> 1);
        if (heap[parent] <= heap[idx]) break;
        [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
        idx = parent;
    }
}

function minHeapPop(heap) {
    if (heap.length === 0) return null;
    if (heap.length === 1) return heap.pop();
    const head = heap[0];
    heap[0] = heap.pop();
    let idx = 0;
    let smallest = 0;
    while (true) {
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
        if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
        if (smallest === idx) break;
        [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
        idx = smallest;
    }
    return head;
}

function maxHeapPush(heap, item) {
    heap.push(item);
    let idx = heap.length - 1;
    while (idx > 0) {
        let parent = ((idx - 1) >> 1);
        if (heap[parent] >= heap[idx]) break;
        [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
        idx = parent;
    }
}

function maxHeapPop(heap) {
    if (heap.length === 0) return null;
    if (heap.length === 1) return heap.pop();
    const head = heap[0];
    heap[0] = heap.pop();
    let idx = 0;
    let biggest = 0;
    while (true) {
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        if (left < heap.length && heap[left] > heap[biggest]) biggest = left;
        if (right < heap.length && heap[right] > heap[biggest]) biggest = right;
        if (biggest === idx) break;
        [heap[idx], heap[biggest]] = [heap[biggest], heap[idx]];
        idx = biggest;
    }
    return head;
}