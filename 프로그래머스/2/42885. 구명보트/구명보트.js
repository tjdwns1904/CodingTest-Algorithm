function solution(people, limit) {
    people.sort((a, b) => a - b);
    var answer = 0;
    let start = 0;
    let end = people.length - 1;
    while(start <= end){
        let weight = people[start] + people[end];
        if(weight <= limit){
            start++;
        }
        end--;
        answer++;
    }
    return answer;
}