import TurtleGame from "./TurtleGame";
import * as fs from "fs";
import * as readLine from "readline";
import LocationData from "./Data/LocationData";
import { DirectionEnum, TurtleStatusEnum } from "./Enums";

const filePath = "C:\\Users\\kingslee\\Desktop\\turtle.txt"
const Run = () => {
    let line:string;
    let counter:number = 0;
    let boardDimension:LocationData = null;
    let exitLocation:LocationData = null;
    let startingPostiton:LocationData = null;
    let EscapeMinesGame: TurtleGame = null;
    let mineLocations:LocationData[] = new Array();

    const rl = readLine.createInterface({
        input: fs.createReadStream(filePath)
    });

    rl.on('line', (line:string)=> {
        counter++;
        let lineArray:string[] = line.split(' ');
        if(counter < 5){
            //Game Configurations
            switch(counter){
                case 1:
                //Get Board Dimentsions
                    boardDimension = new LocationData(parseInt(lineArray[0]), parseInt(lineArray[1]));
                    break;
                case 2: 
                //Get Mine Locations
                    lineArray.forEach(dimension => {
                        const mines = dimension.split(',');    
                        mineLocations.push(new LocationData(parseInt(mines[0]), parseInt(mines[1])));
                    });
                    break;
                case 3 :
                //Get Exit Location
                    exitLocation = new LocationData(parseInt(lineArray[0]), parseInt(lineArray[1]));
                    break;
                case 4 :
                //Get Starting Position and Direction
                    startingPostiton = new LocationData(parseInt(lineArray[0]), parseInt(lineArray[1]));
                    const initialDirection:DirectionEnum = DirectionEnum[lineArray[2]];

                    //Create Board             
                    EscapeMinesGame = new TurtleGame(boardDimension, initialDirection, exitLocation, 
                        startingPostiton, mineLocations);
            }
        }
        else{
            //Read  Turtle Moves
            console.log("Sequence " + (counter - 4) + ": " + TurtleStatusEnum[EscapeMinesGame.MoveTurtle(line)]);
        }
    })
}

export {Run}