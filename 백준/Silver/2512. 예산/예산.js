let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let N = Number(input[0]);
let budgets = input[1].split(' ').map(Number);
let total = Number(input[2]);
const MAX = Math.max(...budgets);
let answer = 0;
binarySearch()
console.log(answer);

function binarySearch() {
    let start = 0;
    let end = MAX;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        let sum = 0;
        for (const budget of budgets) {
            if (budget > mid) {
                sum += mid;
            } else {
                sum += budget;
            }
            if(sum > total)break;
        }
        if (sum > total) {
            end = mid - 1;
        } else {
            answer = mid;
            start = mid + 1;
        }
    }
}