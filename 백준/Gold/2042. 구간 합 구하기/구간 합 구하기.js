const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let [N, M, K] = input[0].split(' ').map(Number);
let tree = Array(N + 1).fill(0n);
let answer = [];
let arr = [0n, ...input.slice(1, N + 1).map(BigInt)];

for(let i = 1; i <= N; i++){
  update(i, BigInt(arr[i]));
};

input.slice(N + 1).forEach((line) => {
  let [a, b, c] = line.split(' ').map(Number);
  if (a === 1) {
    c = BigInt(c);
    let diff = c - arr[b];
    update(b, diff);
    arr[b] = c;
  } else {
    let result = sum(c) - sum(b - 1);
    answer.push(result);
  }
});

console.log(answer.join('\n'));

//펜윅 트리
function update(idx, v) {
  while(idx <= N){
    tree[idx] += v;
    idx += idx & -idx;
  }
}

function sum(idx) {
  let s = 0n;
  while(idx > 0){
    s += tree[idx];
    idx -= idx & -idx;
  }

  return s;
}