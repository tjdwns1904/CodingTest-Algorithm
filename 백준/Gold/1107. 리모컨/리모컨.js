let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let N = Number(input[0]);
let M = Number(input[1]);
if (N === 100) {
  console.log(0);
  return;
}
let min = Math.abs(100 - N);
if (M > 0) {
  let broken = new Set(input[2].split(' ').map(Number));
  let buttons = []

  const getNumbers = (num, len) => {
    if (num.length === len) {
      min = Math.min(Math.abs(Number(num) - N) + num.toString().length, min);
      return;
    }

    for (const n of buttons) {
      getNumbers(num + n, len);
    }
  }

  if (M === 10) {
    console.log(min);
    return;
  }

  for (let i = 0; i < 10; i++) {
    if (!broken.has(i)) buttons.push(i);
  }

  for (let i = 1; i <= N.toString().length + 1; i++) {
    getNumbers('', i)
  }

  console.log(min);
} else {
  console.log(Math.min(input[0].length, min));
}