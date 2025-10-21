//여러 줄 입력

let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [king, stone, count] = input[0].split(' ');
const moves = {
    'R': [0, 1], 'L': [0, -1], 'B': [-1, 0], 'T': [1, 0], 
    'RT': [1, 1], 'RB': [-1, 1], 'LT': [1, -1], 'LB': [-1, -1]
};
let [kingCol, kingRow] = king.split('');
kingCol = Number(kingCol.charCodeAt(0) - 65);
kingRow = Number(kingRow);
let [stoneCol, stoneRow] = stone.split('');
stoneCol = Number(stoneCol.charCodeAt(0) - 65);
stoneRow = Number(stoneRow);
for (let i = 1; i <= count; i++) {
    let move = moves[input[i].trim()];
    let newKing = movePiece(move, [kingCol, kingRow]);
    if(newKing[0] === kingCol && kingRow === newKing[1])continue;
    if(newKing[0] === stoneCol && newKing[1] === stoneRow){
        let newStone = movePiece(move, [stoneCol, stoneRow]);
        if(newStone[0] === stoneCol && newStone[1] === stoneRow)continue;
        [stoneCol, stoneRow] = newStone;
    }
    [kingCol, kingRow] = newKing;
}

let finalKing = String.fromCharCode(65 + kingCol) + kingRow.toString();
let finalStone = String.fromCharCode(65 + stoneCol) + stoneRow.toString();

console.log(finalKing);
console.log(finalStone);

function movePiece([moveRow, moveCol], [pieceCol, pieceRow]){
    let [newCol, newRow] = [pieceCol + moveCol, pieceRow + moveRow];
    if(newRow > 8 || newRow <= 0 || newCol >= 8 || newCol < 0)return [pieceCol, pieceRow];
    return [newCol, newRow];
}