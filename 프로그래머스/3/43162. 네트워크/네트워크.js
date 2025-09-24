function solution(n, computers) {
    var answer = 0;
    const visited = new Array(n).fill(false);
    for(let i = 0; i < n; i++){
        if(visited[i])continue;
        visited[i] = true;
        const q = [i];
        let idx = 0;
        answer++;
        while(idx < q.length){
            const curr = q[idx++];
            for(let j = 0; j < n; j++){
                if(computers[curr][j] === 0 || visited[j])continue;
                visited[j] = true;
                q.push(j);
            }
        }
    }
    return answer;
}