class Queue{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    enqueue(item){
        const node = {next: null, value: item}
        if(this.size === 0)this.head = node;
        else this.tail.next = node;
        this.tail = node;
        this.size++;
    }
    
    dequeue(){
        if(this.size === 0)return null;
        const value = this.head.value;
        if(this.size === 1){
            this.head = null;
        }else{
            this.head = this.head.next;
        }
        this.size--;
        return value;
    }
    
    isEmpty(){
        return this.size === 0;
    }
}

let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, M, K] = input[0].split(' ').map(Number);
let map = input.slice(1).map(line => line.split('').map(Number));
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];
const dist = Array.from({length: N}, () => Array.from({length: M}, () => Array(K + 1).fill(Infinity)));
const q = new Queue();
q.enqueue([0, 0, 0]);
dist[0][0][0] = 1;
while(!q.isEmpty()){
    const [r, c, d] = q.dequeue();
    for(let i = 0; i < 4; i++){
        const [newR, newC] = [r + dr[i], c + dc[i]];
        if(newR < 0 || newR >= N || newC < 0 || newC >= M)continue;
        const currDist = dist[r][c][d] + 1;
        if(map[newR][newC] === 1 && d < K && dist[newR][newC][d + 1] > currDist){
            dist[newR][newC][d + 1] = currDist;
            q.enqueue([newR, newC, d + 1]);
        }
        if(map[newR][newC] === 0 && dist[newR][newC][d] > currDist){
            dist[newR][newC][d] = currDist;
            q.enqueue([newR, newC, d]);
        }
    }
}
           
const min = Math.min(...dist[N - 1][M - 1]);
console.log(min === Infinity ? -1 : min);