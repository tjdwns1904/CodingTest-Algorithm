function solution(numbers, target) {
    function calculate(sum, idx){
        if(idx === numbers.length){
            if(sum === target)answer++;
            return;
        }
        calculate(sum + numbers[idx], idx + 1);
        calculate(sum - numbers[idx], idx + 1);
    }
    var answer = 0;
    calculate(0, 0);
    return answer;
}