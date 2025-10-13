var answer = -1;

function getMax(remain, dungeons, cnt, visited){
    if(remain < 0)return;
    if(cnt > dungeons.length)return;
    answer = Math.max(cnt, answer);
    for(let i = 0; i < dungeons.length; i++){
        if(visited[i])continue;
        if(remain < dungeons[i][0])continue;
        visited[i] = true;
        getMax(remain - dungeons[i][1], dungeons, cnt + 1, visited);
        visited[i] = false;
    }
}

function solution(k, dungeons) {
    getMax(k, dungeons, 0, []);
    return answer;
}