function solution(n, lost, reserve) {
    var answer = 0;
    const lostSet = new Set(lost.sort((a, b) => a - b).filter((a) => !reserve.includes(a)));
    const reserveSet = new Set(reserve.sort((a, b) => a - b).filter((a) => !lost.includes(a)));
    for(const student of reserveSet){
        if(lostSet.has(student + 1) || lostSet.has(student - 1)){
            const borrow = lostSet.has(student - 1) ? student - 1 : student + 1;
            lostSet.delete(borrow);
        }
    }
    answer = n - lostSet.size;
    return answer;
}