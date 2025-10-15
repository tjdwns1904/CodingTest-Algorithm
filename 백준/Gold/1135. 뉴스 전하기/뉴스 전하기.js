let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let n = Number(input[0]);
let parents = input[1].split(' ').map(Number);

// 트리 구성: 각 노드의 자식 리스트를 배열로 저장 (노드 번호: 0 ~ n-1)
let tree = new Array(n).fill(0).map(() => []);
for (let i = 1; i < n; i++) {
    let p = parents[i];
    tree[p].push(i);
}

// DFS 함수: 현재 노드의 전파 시간을 계산
function dfs(node) {
    // 자식이 없으면 0분 걸림
    if (tree[node].length === 0) return 0;
    
    let times = [];
    // 각 자식에 대해 전파 시간을 계산
    for (let child of tree[node]) {
        times.push(dfs(child));
    }
    
    // 전파 시간이 큰 자식부터 전화해야 전체 시간이 최소가 됨
    times.sort((a, b) => b - a);
    
    // 한 번에 한 명씩 전화할 수 있으므로, i번째 자식은 (i+1)분의 추가 대기 시간이 필요
    let maxTime = 0;
    for (let i = 0; i < times.length; i++) {
        maxTime = Math.max(maxTime, times[i] + i + 1);
    }
    return maxTime;
}

console.log(dfs(0));