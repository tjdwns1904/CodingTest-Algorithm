function solution(record) {
    var answer = [];
    // 맵 사용
    const map = new Map();
    for (const r of record){
        const [command, uid, nickname] = r.split(' ');
        if(command === 'Leave')continue;
        map.set(uid, nickname);
    }
    for (const r of record){
        const [command, uid, nickname] = r.split(' ');
        if(command === 'Change')continue;
        const msg = command === 'Enter' ? '들어왔습니다.' : '나갔습니다.';
        answer.push(`${map.get(uid)}님이 ${msg}`);
    }
    return answer;
}