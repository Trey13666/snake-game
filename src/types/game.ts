export type Position = {
    x: number;
    y: number;
  };
  
  export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  
  export type GameStatus = 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';
  
  export type GameMode = 'EASY' | 'NORMAL' | 'HARD';
  
  export type GameState = {
    snake: Position[];
    food: Position;
    direction: Direction;
    score: number;
    status: GameStatus;
    speed: number;
    highScore: number;
  };