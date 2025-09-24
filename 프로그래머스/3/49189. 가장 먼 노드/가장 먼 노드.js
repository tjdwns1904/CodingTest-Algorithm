function solution(n, edge) {
    var answer = 0;
    const graph = new Map();
    for(let [a, b] of edge){
        a--; b--;
        if(!graph.has(a))graph.set(a, []);
        if(!graph.has(b))graph.set(b, []);
        graph.get(a).push(b);
        graph.get(b).push(a);
    }
    const dist = new Array(n).fill(Infinity);
    const q = [0];
    let idx = 0;
    dist[0] = 0;
    let maxDist = 0;
    while(idx < q.length){
        const curr = q[idx++];
        if(!graph.has(curr))continue;
        for(const next of graph.get(curr)){
            if(dist[next] <= dist[curr] + 1)continue;
            dist[next] = dist[curr] + 1;
            q.push(next);
            if(maxDist <= dist[next]){
                if(maxDist < dist[next]){
                    answer = 0;
                    maxDist = dist[next];
                }
                answer++;
            }
        }
    }
    return answer;
}