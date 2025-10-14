let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim();

const count = new Map();
for(const c of input){
    count.set(c, (count.get(c) || 0) + 1);
}

if(!check()){
    console.log("I'm Sorry Hansoo");
    return;
}

createPalindrome();

function createPalindrome(){
    let result = [];
    let chars = Array.from(count.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    let idx = 0;
    for(const [char, cnt] of chars){
        for(let i = 0; i < Math.floor(cnt / 2); i++){
            result[idx] = char;
            result[input.length - (idx + 1)] = char;
            idx++;
        }
        if(cnt % 2 !== 0)result[Math.floor(input.length / 2)] = char;
    }
    
    console.log(result.join(''));
}

function check(){
    let odd = 0;
    for(const cnt of count.values()){
        if(cnt % 2 !== 0)odd++;
    }
    return odd <= 1;
}
