function solution(n, q, ans) {
    var answer = 0;
    function check(comb){
        for(let i = 0; i < q.length; i++){
            let cnt = 0;
            for(const num of q[i]){
                if(comb.has(num))cnt++;
            }
            if(cnt !== ans[i]) return false;
        }
        
        return true;
    }
    
    function getComb(num, comb){
        if(comb.size === 5){
            if(check(comb)) answer++;
            return;
        }
        
        for(let i = num; i <= n; i++){
            comb.add(i);
            getComb(i + 1, comb);
            comb.delete(i);
        }
    }
    
    for(let i = 1; i <= n - 4; i++){
        getComb(i + 1, new Set([i]));
    }
    
    return answer;
}

// idx별로 진행
// ans 수 기반으로 q에서 조합 구성
// 1 ~ n 까지 배열로 선택 여부 확인
// q에서 조합된 수 외 나머지 선택 금지 처리 필요
// 마지막에 도달했을 때, 선택된 수 5개면 answer + 1