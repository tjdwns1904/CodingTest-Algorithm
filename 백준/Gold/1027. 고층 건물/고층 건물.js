const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const heights = input[1].split(' ').map(Number);

let maxVisible = 0;

for (let i = 0; i < N; i++) {
    let count = 0;

    for (let j = 0; j < N; j++) {
        if (i === j) continue;

        let canSee = true;

        // i < j인 경우 → i 기준 오른쪽
        const left = Math.min(i, j);
        const right = Math.max(i, j);

        for (let k = left + 1; k < right; k++) {
            // 선분 i~j에서 x=k일 때의 y 좌표 계산
            const expectedY =
                heights[i] + ((heights[j] - heights[i]) * (k - i)) / (j - i);

            if (heights[k] >= expectedY - 1e-9) {
                canSee = false;
                break;
            }
        }

        if (canSee) count++;
    }

    maxVisible = Math.max(maxVisible, count);
}

console.log(maxVisible);