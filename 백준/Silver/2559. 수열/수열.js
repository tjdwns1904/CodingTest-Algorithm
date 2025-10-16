const fs = require('fs');
const [num, input] = fs.readFileSync("/dev/stdin").toString().trim().split('\n');
const [N, K] = num.trim().split(" ").map(Number);
const inputArr = input.trim().split(" ").map(Number);
function solution(){
    let max = Number.MIN_SAFE_INTEGER;
    let sum = 0;
    const tmpArr = [];
    inputArr.forEach(temp => {
        if(tmpArr.length === K){
            max = Math.max(sum, max);
            sum -= tmpArr.shift();
        }
        sum += temp;
        tmpArr.push(temp);
    });
    max = Math.max(sum, max);
    console.log(max);
}

solution();