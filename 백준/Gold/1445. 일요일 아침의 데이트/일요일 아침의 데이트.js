let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [N, M] = input[0].split(' ').map(Number);
let forest = input.slice(1, N + 1);
const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const visited = Array.from({length: N}, () => new Array(M).fill(false));
let [start, dest] = [[0, 0], [0, 0]];

for(let i = 0; i < N; i++){
    for(let j = 0; j < M; j++){
        if(forest[i][j] === 'F')dest = [i, j];
        if(forest[i][j] === 'S')start = [i, j];
    }
}
const pq = [[...start, 0, 0]];

while(pq.length){
    const [r, c, g, p] = heapPop(pq);
    if(r === dest[0] && c === dest[1]){
        console.log(`${g} ${p}`);
        return;
    }
    if(visited[r][c])continue;
    visited[r][c]= true;
    for(const [moveR, moveC] of moves){
        const [newR, newC] = [r + moveR, c + moveC];
        if(newR < 0 || newR >= N || newC < 0 || newC >= M)continue;
        if(visited[newR][newC])continue;
        if(newR === dest[0] && newC === dest[1]){
            heapPush(pq, [newR, newC, g, p]);
        }else{
            const {isGarbage, isNext} = check(newR, newC);
            heapPush(pq, [newR, newC, g + isGarbage, p + isNext]);
        }
    }
}

function check(row, col){
    let isGarbage = forest[row][col] === 'g' ? 1 : 0;
    let isNext = 0;
    if(isGarbage === 1)return {isGarbage, isNext};
    for(const [moveR, moveC] of moves){
        const [newR, newC] = [row + moveR, col + moveC];
        if(newR < 0 || newR >= N || newC < 0 || newC >= M)continue;
        if(forest[newR][newC] === 'g'){
            isNext = 1;
            break;
        }
    }
    return {isGarbage, isNext};
}

function heapPush(heap, item){
    heap.push(item);
    let idx = heap.length - 1;
    while(idx > 0){
        let parent = Math.floor((idx - 1) / 2);
        if(heap[parent][2] < heap[idx][2])break;
        if(heap[parent][2] === heap[idx][2] && heap[parent][3] <= heap[idx][3])break;
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
        if(left < heap.length && 
           (heap[left][2] < heap[smallest][2] 
            || heap[left][2] === heap[smallest][2] && heap[left][3] < heap[smallest][3]
           ))smallest = left;
        if(right < heap.length && 
           (heap[right][2] < heap[smallest][2] 
            || heap[right][2] === heap[smallest][2] && heap[right][3] < heap[smallest][3]
           ))smallest = right;
        if(smallest === idx)break;
        [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
        idx = smallest;
    }
    
    return head;
}