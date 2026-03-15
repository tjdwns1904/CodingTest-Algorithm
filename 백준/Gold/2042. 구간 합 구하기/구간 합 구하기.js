let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, M, K] = input[0].split(' ').map(Number);
let numbers = [0n, ...input.slice(1, N + 1).map(BigInt)];
let tree = Array(N + 1).fill(0n);
let answer = [];

function update(idx, number){
  let i = idx;
  while(i <= N){
    tree[i] += number;
    i += i & -i;
  }
}

function getSum(idx){
  let i = idx;
  let sum = 0n;
  while(i > 0){
    sum += tree[i];
    i -= i & -i;
  }

  return sum;
}

for(let i = 1; i <= N; i++){
  update(i, numbers[i]);
}

input.slice(N + 1).forEach((line) => {
  const [a, b, c] = line.split(' ').map(Number);
  if(a === 1){
    const diff = BigInt(c) - numbers[b];
    update(b, BigInt(diff));
    numbers[b] = BigInt(c);
  }else{
    const sum = getSum(c) - getSum(b - 1);
    answer.push(sum);    
  }
})

console.log(answer.join('\n'));