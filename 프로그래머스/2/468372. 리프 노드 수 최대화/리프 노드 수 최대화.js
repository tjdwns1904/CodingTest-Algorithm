function solution(dist_limit, split_limit) {
  let answer = 1;

  function dfs(cur, used, split, leaf) {
    // 여기서 멈추면 현재 cur개는 전부 리프
    answer = Math.max(answer, leaf + cur);

    if (used === dist_limit) return;

    for (const child of [2, 3]) {
      if (split * child > split_limit) continue;

      // 현재 깊이에서 실제로 분배 노드로 쓸 수 있는 최대 개수
      const x = Math.min(cur, dist_limit - used);
      if (x === 0) continue;

      const nextCur = x * child;
      const nextLeaf = leaf + (cur - x);

      dfs(nextCur, used + x, split * child, nextLeaf);
    }
  }

  // 루트의 유일한 자식 1개에서 시작
  dfs(1, 0, 1, 0);

  return answer;
}