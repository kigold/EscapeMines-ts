import {Create2DArray} from "./Helper/HelperMethods"
import {TurtleStatusEnum, DirectionEnum, BoardTileEnum,
    MovesEnum} from "./Enums";
import LocationData from "./Data/LocationData";

class TurtleGame{
    _direction:DirectionEnum;
    _initialDirection:DirectionEnum;
    _mineField:BoardTileEnum[][];
    _location:LocationData;
    _startLocation:LocationData;
    _status:TurtleStatusEnum;    
    XLowerBoundary:number;
    XUpperBoundary:number;
    YLowerBoundary:number;
    YUpperBoundary:number;
    _boardSettings:LocationData;

    constructor(boardSetting:LocationData, initialDirection:DirectionEnum,
        exitLocation:LocationData, startLocation:LocationData, 
        mineLocations:LocationData[]){
            this._boardSettings = boardSetting;
            this._mineField = Create2DArray(boardSetting.X, boardSetting.Y);
            this._initialDirection = initialDirection;
            this._direction = initialDirection;            
            this._startLocation = startLocation;
            this._location = startLocation.Copy();
            this._status = TurtleStatusEnum.Danger;
            this.XLowerBoundary = 0;
            this.YLowerBoundary = 0;
            this.XUpperBoundary = boardSetting.X - 1;
            this.YUpperBoundary = boardSetting.Y - 1;
            this._mineField[exitLocation.X][exitLocation.Y] = BoardTileEnum.Exit;

            mineLocations.forEach(mineLocation => {
                this._mineField[mineLocation.X][mineLocation.Y] = BoardTileEnum.Mine
            });
    }

    MoveTurtle(moves:string):TurtleStatusEnum{  
        this.ResetTurtle();
        const turtleMoves = moves.split(' ').map(x => MovesEnum[x])        
        turtleMoves.forEach(move => {       
            if(move == MovesEnum.M){
                this._location = this.UpdateTurtleLocation(this._direction, this._location);
            }
            else{
                this._direction = this.RotateTurtle(this._direction, move);
            }
            if(this._status != TurtleStatusEnum.Danger){
                return this._status;
            }                
        });
        return this._status
    }

    UpdateTurtleLocation(currentDirection:DirectionEnum, currentLocation:LocationData):LocationData{
        switch(currentDirection){
            case DirectionEnum.N:
                if(currentLocation.Y > this.YLowerBoundary)
                    currentLocation.Y--;
                break;
            case DirectionEnum.S:
                if(currentLocation.Y < this.YUpperBoundary)
                    currentLocation.Y++;
                break;
            case DirectionEnum.E:
                if(currentLocation.X < this.XUpperBoundary)
                    currentLocation.X++;
                break;
            case DirectionEnum.W:
                if(currentLocation.X > this.XLowerBoundary)
                    currentLocation.X--;
                break;
            default:
                break;
        }
        this.UpdateTurtleStatus(currentLocation);
        return currentLocation
    }

    RotateTurtle(currentDirection:DirectionEnum, move:MovesEnum): DirectionEnum{
        let change = currentDirection + move + 4;
        change = Math.abs(change) % 4;  
        return change
    }

    UpdateTurtleStatus(location:LocationData){
        const currentTile = this._mineField[location.X][location.Y];
        if(currentTile == BoardTileEnum.Exit){
            this._status = TurtleStatusEnum.Success;
            return;
        }
        if(currentTile == BoardTileEnum.Mine){
            this._status = TurtleStatusEnum.MineHit;
            return;
        }
        this._status = TurtleStatusEnum.Danger;
    }
    ResetTurtle(){
        this._status = TurtleStatusEnum.Danger;
        this._location = this._startLocation.Copy();
        this._direction = this._initialDirection;
    }

    PrintBoard(){
        console.log(`<-----------------${this._location.X}--Y:${this._location.Y}--Direction:${DirectionEnum[this._direction]}------------`);
        for (let i = 0; i < this._boardSettings.Y; i++)
            {
                for (var j = 0; j < this._boardSettings.X; j++)
                {
                    process.stdout.write(" | ");
                    process.stdout.write(BoardTileEnum[this._mineField[j][i]]);
                    process.stdout.write(" | ");
                }
                console.log();
            }
        console.log(`<-----------------${this._location.X}--Y:${this._location.Y}--Direction:${DirectionEnum[this._direction]}------------>`)
    }
}

export default TurtleGame