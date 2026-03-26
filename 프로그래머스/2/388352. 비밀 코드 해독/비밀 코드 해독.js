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
        
        for(let i = num; i <= n - (4 - comb.size); i++){
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