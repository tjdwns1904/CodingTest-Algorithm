let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split(' ');

let [N, K] = input.map(Number);
let answer = 0;
// 2로 계속 나누면서 나머지 계산
// 물의 양은 2^t
// 기존 물을 최대로 합친 후, 나머지 계산 (리터 별 최대 1개)
// 물이 있는 병의 합이 K 이하일 때까지 반복
let queue = [];
let t = 0;
while(N > 0){
    if(N % 2 === 1)queue.push(Math.pow(2, t));
    N = Math.floor(N / 2);
    t++;
}

while(queue.length > K){
  let b1 = queue.shift();
  let b2 = queue[0];
  while(b1 < b2){
    answer += b1;
    b1 *= 2;
  }
  queue[0] *= 2;
}

console.log(answer);
