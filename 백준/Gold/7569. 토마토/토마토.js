let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [C, R, H] = input[0].split(' ').map(Number);
let boxes = Array.from({length: H}, () => Array.from({length: R}, () => Array(C).fill(0)));
const queue = [];
let tomatos = 0;
for(let i = 1; i <= R * H; i++){
  let h = Math.floor((i - 1) / R);
  let r = (i - 1) % R;
  input[i].split(' ').forEach((t, idx) => {
    let tomato = Number(t);
    if(tomato === 0){
      tomatos++;
    }
    if(tomato === 1){
      queue.push([h, r, idx, 0]);
    }
    boxes[h][r][idx] = tomato;
  });
}
const dh = [-1, 1, 0, 0, 0, 0];
const dr = [0, 0, -1, 0, 1, 0];
const dc = [0, 0, 0, -1, 0, 1];
let idx = 0;
let max = 0;
while(idx < queue.length){
  const [h, r, c, cnt] = queue[idx++];
  for(let i = 0; i < 6; i++){
    const [newH, newR, newC] = [h + dh[i], r + dr[i], c + dc[i]];
    if(newH < 0 || newH >= H || newR < 0 || newR >= R || newC < 0 || newC >= C)continue;
    if(boxes[newH][newR][newC] !== 0)continue;
    boxes[newH][newR][newC] = 1;
    tomatos--;
    max = Math.max(cnt + 1, max);
    queue.push([newH, newR, newC, cnt + 1]);
  }
}

if(tomatos > 0){
  console.log(-1);
}else{
  console.log(max);
}