function solution(maps) {
    const [n, m] = [maps.length, maps[0].length];
    const queue = [];
    const dist = Array.from({length: n}, () => new Array(m).fill(Infinity));
    const moves = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    let idx = 0;
    queue.push([0, 0]);
    dist[0][0] = 1;
    while(idx < queue.length){
        const [r, c] = queue[idx++];
        if(r === n - 1 && c === m - 1){
            return dist[r][c];
        }
        for(const [moveR, moveC] of moves){
            const [newR, newC] = [r + moveR, c + moveC];
            if(newR < 0 || newR >= n || newC < 0 || newC >= m)continue;
            if(maps[newR][newC] === 0 || dist[newR][newC] <= dist[r][c] + 1)continue;
            dist[newR][newC] = dist[r][c] + 1;
            queue.push([newR, newC]);
        }
    }
    return -1;
}