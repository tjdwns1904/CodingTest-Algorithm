let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let idx = 0;
let p = 1;
while(idx < input.length){
    const N = Number(input[idx++]);
    if(N === 0)break;
    const map = input.slice(idx, N + idx).map(line => line.split(' ').map(Number));
    const ans = dijkstra(map, N);
    console.log(`Problem ${p++}: ${ans}`);
    idx += N;
}

function dijkstra(map, N){
    const visited = Array.from({length: N}, () => new Array(N).fill(false));
    const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const pq = [[0, 0, map[0][0]]];
    while(pq.length){
        const [r, c, lost] = heapPop(pq);
        if(visited[r][c])continue;
        visited[r][c] = true;
        if(r === N - 1 && c === N - 1)return lost;
        for(const [moveR, moveC] of moves){
            const [newR, newC] = [r + moveR, c + moveC];
            if(newR < 0 || newR >= N || newC < 0 || newC >= N)continue;
            if(visited[newR][newC])continue;
            heapPush(pq, [newR, newC, lost + map[newR][newC]]);
        }
    }
    return -1;
}

function heapPush(heap, item){
    heap.push(item);
    let idx = heap.length - 1;
    while(idx > 0){
        let parent = Math.floor((idx - 1) / 2);
        if(heap[parent][2] <= heap[idx][2])break;
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
        if(left < heap.length && heap[left][2] < heap[smallest][2])smallest = left;
        if(right < heap.length && heap[right][2] < heap[smallest][2])smallest = right;
        if(smallest === idx)break;
        [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
        idx = smallest;
    }
    
    return head;
}