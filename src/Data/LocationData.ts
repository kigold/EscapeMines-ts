class LocationData {
    X:number;
    Y:number;

    constructor(x:number, y:number){
        this.X = x;
        this.Y = y;
    }

    Copy():LocationData{
        let copy =  new LocationData(this.X, this.Y);
        return copy;
    }
}

export default LocationData