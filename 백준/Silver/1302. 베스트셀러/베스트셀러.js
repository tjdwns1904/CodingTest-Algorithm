let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let N = +input[0];
let books = input.slice(1);
const map = new Map();

for(const book of books){
    map.set(book, (map.get(book) || 0) + 1);
}

const arr = Array.from(map.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
console.log(arr[0][0]);