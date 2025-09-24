function solution(n, lost, reserve) {
    var answer = 0;
    const lostSet = new Set(lost.sort((a, b) => a - b));
    const reserveSet = new Set(reserve.sort((a, b) => a - b));
    for(const student of reserveSet){
        if(lostSet.has(student) || lostSet.has(student - 1)){
            const borrow = lostSet.has(student) ? student : student - 1;
            lostSet.delete(borrow);
        }else if(lostSet.has(student + 1) && !reserveSet.has(student + 1)){
            lostSet.delete(student + 1)
        }
    }
    answer = n - lostSet.size;
    return answer;
}