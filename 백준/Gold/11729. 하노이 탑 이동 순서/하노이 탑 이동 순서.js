let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim();

let K = Number(input);
let order = [];
function dp(num, from, to, left) {
  if(num === 0)return;
    
  dp(num - 1, from, left, to);
  order.push([from, to]);
  dp(num - 1, left, to, from);
}

dp(K, 1, 3, 2);
console.log(order.length);
let result = '';
for(const o of order){
  result += o.join(' ') + '\n';
}

console.log(result);