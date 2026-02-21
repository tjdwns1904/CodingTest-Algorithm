// BOJ 1022 소용돌이 예쁘게 출력하기 (JS)
// 핵심: (r, c) -> 값 수식으로 계산 + 가장 큰 값 자리수로 폭 맞추기

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
const [r1, c1, r2, c2] = input;

function valueAt(r, c) {
  const n = Math.max(Math.abs(r), Math.abs(c));
  const maxVal = (2 * n + 1) ** 2; // (n, n)에 있는 값

  if (r === n) {
    // 아래 변: (n, n)에서 왼쪽으로
    return maxVal - (n - c);
  } else if (c === -n) {
    // 왼쪽 변: 아래 변(2n) 지나서 위로
    return maxVal - 2 * n - (n - r);
  } else if (r === -n) {
    // 위 변: 2변(4n) 지나서 오른쪽으로
    return maxVal - 4 * n - (c + n);
  } else {
    // 오른쪽 변: 3변(6n) 지나서 아래로
    return maxVal - 6 * n - (r + n);
  }
}

// 1) 출력 범위에서 최댓값 찾아 폭(자리수) 결정
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