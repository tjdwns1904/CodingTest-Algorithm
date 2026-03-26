const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let N = Number(input[0]);
let map = input.slice(1).map(line => line.split(' ').map(Number));
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];
let dp = Array.from({length: N}, () => Array(N).fill(0));
let max = 1;

function dfs(r, c){
  if(dp[r][c]) return dp[r][c];
  dp[r][c] = 1;
  for(let i = 0; i < 4; i++){
    const [nr, nc] = [r + dr[i], c + dc[i]];
    if(nr < 0 || nr >= N || nc < 0 || nc >= N)continue;
    if(map[r][c] >= map[nr][nc])continue;
    dp[r][c] = Math.max(dp[r][c], dfs(nr, nc) + 1);
  }

  return dp[r][c];
}

for(let i = 0; i < N; i++){
  for(let j = 0; j < N; j++){
    max = Math.max(max, dfs(i, j));
  }
}

console.log(max);