import { BoardTileEnum } from "../Enums";
const Create2DArray = function(x:number, y:number):BoardTileEnum[][]{
    let result = new Array(x);
    for(let i=0; i < x; i++){
        result[i] = new Array(y);
        for(let j = 0; j < y; j++){
            result[i][j] = BoardTileEnum.Empty
        }
    }
    return result;
}

export {Create2DArray}