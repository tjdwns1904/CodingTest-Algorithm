function solution(N, number) {
    let DP = Array.from({length: 9}, () => new Set());
    const ops = ['+', '-', '*', '/'];
    for(let i = 1; i < 9; i++){
        let val = 0;
        for(let j = 0; j < i; j++){
            val = (val * 10) + N;
        }
        DP[i].add(val);
        if(val === number)return i;
        for(let j = 1; j <= i / 2; j++){
            for(const a of DP[i - j]){
                for(const b of DP[j]){
                    for(const op of ops){
                        let n1 = calculate(a, b, op);
                        let n2 = calculate(b, a, op);
                        if(n1 === number || n2 === number)return i;
                        DP[i].add(n1);
                        DP[i].add(n2);
                    }
                }
            }
        }
    }
    return -1;
}

function calculate(a, b, op){
    switch(op){
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        default:
            if(b !== 0) return Math.floor(a / b);
            else return 0;
    }
}