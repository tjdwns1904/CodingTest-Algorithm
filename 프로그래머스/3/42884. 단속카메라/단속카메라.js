function solution(routes) {
    var answer = 1;
    routes.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
    let camera = routes[0][1];
    for(const [start, end] of routes.slice(1)){
        if(camera >= start && camera <= end)continue;
        answer++;
        camera = end;
    }
    return answer;
}