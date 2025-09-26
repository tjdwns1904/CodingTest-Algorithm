let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [N, M, K] = input[0].split(' ').map(Number);
let map = input.slice(1, N + 1);
let visited = Array.from({length: N}, () => Array.from({length: M}, () => Array(K + 1).fill(Number.MAX_SAFE_INTEGER)));
const queue = createQueue();
const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
queue.push([0, 0, 0]);
visited[0][0][0] = 1;

while(!queue.isEmpty()){
    const [r, c, des] = queue.shift();
    if(r === N - 1 && c === M - 1){
        console.log(Math.min(...visited[r][c]));
        return;
    }
    for(const [moveR, moveC] of moves){
        const [newR, newC] = [r + moveR, c + moveC];
        if(newR < 0 || newR >= N || newC < 0 || newC >= M)continue;
        if(des < K && map[newR][newC] === '1' && visited[newR][newC][des + 1] > visited[r][c][des] + 1){
            visited[newR][newC][des + 1] = visited[r][c][des] + 1;
            queue.push([newR, newC, des + 1]);
        }
        if(map[newR][newC] === '0' && visited[newR][newC][des] > visited[r][c][des] + 1){
            visited[newR][newC][des] = visited[r][c][des] + 1;
            queue.push([newR, newC, des]);
        }
    }
}

console.log(-1);

function createQueue(){
    let head = null;
    let tail = null;
    return{
        push(item){
            const node = {next: null, value: item};
            if(!head){
                head = node;
                tail = node;
            }else{
                tail.next = node;
                tail = node;
            }
        },
        shift(){
            if(!head)return null;
            const value = head.value;
            head = head.next;
            if(!head)tail = null;
            return value;
        },
        isEmpty(){
            return head === null;
        }
    }
}