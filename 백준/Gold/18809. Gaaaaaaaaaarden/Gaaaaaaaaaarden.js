let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [N, M, G, R] = input[0].split(' ').map(Number);
let garden = input.slice(1).map(line => line.split(' ').map(Number));
let yellows = [];
let answer = 0;
const RED = 3;
const GREEN = 4;
const FLOWER = RED + GREEN;

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (garden[i][j] === 2) yellows.push([i, j]);
    }
}

getComb([], [], -1);
console.log(answer);

function getComb(rSelected, gSelected, idx) {
    if (rSelected.length + gSelected.length === G + R) {
        answer = Math.max(simulate(rSelected, gSelected), answer);
        return;
    }
    for (let i = idx + 1; i < yellows.length; i++) {
        if (rSelected.length < R) {
            rSelected.push(i);
            getComb(rSelected, gSelected, i);
            rSelected.pop();
        }
        if (gSelected.length < G) {
            gSelected.push(i);
            getComb(rSelected, gSelected, i);
            gSelected.pop();
        }
    }
}

function simulate(rSelected, gSelected){
    const gardenCopy = Array.from({length: N}, () => Array.from({length: M}, () => new Array(2).fill(-1)));
    let flowers = 0;
    const q = [];
    let idx = 0;
    const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for(const idx of rSelected){
        const [r, c] = yellows[idx];
        q.push([r, c, 0]);
        gardenCopy[r][c] = [RED, 0];
    }
    for(const idx of gSelected){
        const [r, c] = yellows[idx];
        q.push([r, c, 0]);
        gardenCopy[r][c] = [GREEN, 0];
    }

    while(idx < q.length){
        const [r, c, time] = q[idx++];
        if(gardenCopy[r][c][0] === FLOWER)continue;
        for(const [moveR, moveC] of moves){
            const [newR, newC] = [r + moveR, c + moveC];
            if(newR < 0 || newR >= N || newC < 0 || newC >= M)continue;
            const [color, t] = gardenCopy[newR][newC];
            if(gardenCopy[r][c][0] + color === FLOWER && time + 1 === t){
                flowers++;
                gardenCopy[newR][newC][0] = FLOWER;
                continue;
            }
            if(garden[newR][newC] === 0 || color !== -1)continue;
            q.push([newR, newC, time + 1]);
            gardenCopy[newR][newC] = [gardenCopy[r][c][0], time + 1];
        }
    }

    return flowers;
}