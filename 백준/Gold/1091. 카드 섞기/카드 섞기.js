let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let N = +input[0];
let P = input[1].split(' ').map(Number);
let S = input[2].split(' ').map(Number);
let cards = Array.from({length: N}, (_, idx) => idx);

function shuffle(){
    let newCards = [];
    for(let i = 0; i < N; i++){
        newCards[S[i]] = cards[i];
    }
    return newCards;
}

function check(){
    for(let i = 0; i < N; i++){
        if(P[cards[i]] !== i % 3)return false;
    }
    return true;
}

function isBack(){
    for(let i = 0; i < N; i++){
        if(cards[i] !== i)return false;
    }
    return true;
}

let cnt = 0;

do{
    if(check()){
        console.log(cnt);
        return;
    }
    cards = shuffle();
    cnt++;
}while(!isBack());

console.log(-1);