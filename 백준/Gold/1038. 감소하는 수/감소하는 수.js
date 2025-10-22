let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim();

let num = Number(input);
let cnt = -1;
let found = false;

for(let i = 1; i <= 10; i++){
    if(found)break;
    getNum(i, 10, []);
}

if(!found)console.log(-1);

function getNum(length, prev, n){
    if(found)return;
    if(length === n.length){
        cnt++;
        if(cnt === num){
            found = true;
            console.log(Number(n.join('')));
        }
        return;
    }
    for(let i = 0; i < prev; i++){
        getNum(length, i, [...n, i]);
    }
}