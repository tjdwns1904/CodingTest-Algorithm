let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

let N = Number(input);
let hex = [];
let DP = Array.from({ length: 6 }, () => new Set());
let odd = 1;
let idx = 2;
hex[0] = 0;
hex[1] = 1;

while (hex[idx - 1] < N) {
  hex[idx] = (6 * idx) - 6 + hex[idx - 1] - odd;
  odd += 2;
  idx++;
}

for (let i = 1; i < idx; i++) {
   if (hex[i] === N) {
    console.log(1);
    return;
  }
  DP[1].add(hex[i]);
}
for (let i = 2; i < 6; i++) {
  for (let j = 1; j < idx; j++) {
    for(let hexNum of DP[i - 1]){
      let sum = hexNum + hex[j];
      if(sum === N) {
        console.log(i);
        return;
      }
      DP[i].add(sum);
    }
  }
}

console.log(6);