let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let N = Number(input[0]);
let ingredients = input
  .slice(1)
  .filter(line => line.trim().length > 0)
  .map(line => line.trim().split(/\s+/).map(Number));;

const map = new Map();

for (const [a, b, p, q] of ingredients){
  if(!map.has(a)){
    map.set(a, []);
  }
  if(!map.has(b)){
    map.set(b, []);
  }
  map.get(a).push([b, BigInt(q), BigInt(p)]);
  map.get(b).push([a, BigInt(p), BigInt(q)]);
}

const queue = [0];
const ratio = Array(N).fill(null);
ratio[0] = [1n, 1n];

while(queue.length > 0){
  const curr = queue.shift();
  if(!map.has(curr))continue;
  for(const [ next, p, q ] of map.get(curr)){
    if(ratio[next])continue;
    let [num, den] = [ratio[curr][0] * p, ratio[curr][1] * q];
    let g = gcd(num, den)
    ratio[next] = [num / g, den / g];
    queue.push(next);
  }
}

let l = ratio[0][1];

for(let i = 1; i < N; i++){
  l = lcm(l, ratio[i][1]);
}

let answer = Array(N).fill(null);

for(let i = 0; i < N; i++){
  answer[i] = Number((l * ratio[i][0]) / ratio[i][1]);
}
console.log(answer.join(' '));

function gcd(a, b){
  return b === 0n ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}