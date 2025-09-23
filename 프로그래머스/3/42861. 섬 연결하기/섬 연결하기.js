function solution(n, costs) {
    var answer = 0;
    costs.sort((a, b) => a[2] - b[2]);
    let islands = 0;
    let parent = Array.from({length: n}, (_, idx) => idx);
    for(const [a, b, c] of costs){
        if(!union(a, b, parent)){
            islands++;
            answer += c;
            if(islands === n - 1)break;
        }
    }
    
    return answer;
}

function union(a, b, parent){
    a = find(a, parent);
    b = find(b, parent);
    if(a === b)return true;
    parent[b] = a;
    return false;
}

function find(a, parent){
    if(parent[a] !== a){
        parent[a] = find(parent[a], parent);
    }
    return parent[a];
}