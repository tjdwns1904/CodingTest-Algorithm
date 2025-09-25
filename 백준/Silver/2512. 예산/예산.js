let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let N = Number(input[0]);
let budgets = input[1].split(' ').map(Number);
let total = Number(input[2]);
let budgetNeeded = budgets.reduce((acc, curr) => acc += curr, 0);
if (budgetNeeded <= total) {
    console.log(Math.max(...budgets));
} else {
    console.log(binarySearch());
}

function binarySearch() {
    let start = 0;
    let end = total;
    while (start < end) {
        let mid = Math.floor((start + end) / 2);
        let sum = 0;
        for (const budget of budgets) {
            if (budget > mid) {
                sum += mid;
            } else {
                sum += budget;
            }
        }
        if (sum > total) {
            end = mid;
        } else {
            start = mid + 1;
        }
    }

    return start - 1;
}