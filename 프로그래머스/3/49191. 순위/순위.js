function solution(n, results) {
    var answer = 0;
    const stats = Array.from({length: n}, () => new Array(n).fill(0));
    for(let [a, b] of results){
        a--; b--;
        stats[a][b] = 1;
        stats[b][a] = -1;
    }
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            for(let k = 0; k < n; k++){
                if(stats[j][i] === 1 && stats[i][k] === 1){
                    stats[j][k] = 1;
                    stats[k][j] = -1;
                }else if(stats[j][i] === -1 && stats[i][k] === -1){
                    stats[j][k] = -1;
                    stats[k][j] = 1;
                }
            }
        }
    }
    for(const playerStat of stats){
        const cnt = playerStat.reduce((acc, curr) => curr ? acc + 1 : acc, 0);
        if(cnt === n - 1)answer++;
    }
    return answer;
}