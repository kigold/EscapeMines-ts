export enum BoardTileEnum {
    Empty = 0,
    Mine,
    Exit
}

export enum DirectionEnum {
    N = 0,
    E,
    S,
    W
}

export enum MovesEnum {
    L = -1,
    M = 0,
    R = 1
}

export enum TurtleStatusEnum {
    Danger = 0,
    Success,
    MineHit
}