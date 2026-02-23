let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split(/\s+/);

let [r1, c1, r2, c2] = input.map(Number);

function valueAt(r, c) {
  const n = Math.max(Math.abs(r), Math.abs(c));
  const max = (2 * n + 1) ** 2;
  if (n === r) {
      return max - (n - c);
  } else if (n === -c) {
    return max - 2 * n - (n - r);
  } else if (n === -r) {
    return max - 4 * n - (n + c);
  } else {
    return max - 6 * n - (n + r);
  }
}
let maxInRect = 0;
for (let r = r1; r <= r2; r++) {
  for (let c = c1; c <= c2; c++) {
    const v = valueAt(r, c);
    if (v > maxInRect) maxInRect = v;
  }
}
const width = String(maxInRect).length;

// 2) 값 찍기 + 우측 정렬
let out = [];
for (let r = r1; r <= r2; r++) {
  let row = [];
  for (let c = c1; c <= c2; c++) {
    const v = valueAt(r, c);
    row.push(String(v).padStart(width, ' '));
  }
  out.push(row.join(' '));
}
process.stdout.write(out.join('\n'));

