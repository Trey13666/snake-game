import { Position } from '../types/game';

export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const INITIAL_SPEED = 300;
export const SCORE_INCREMENT = 10;

export const INITIAL_SNAKE_POSITION: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

export const DIFFICULTY_SETTINGS = {
  EASY: { speedMultiplier: 0.8 },
  NORMAL: { speedMultiplier: 1 },
  HARD: { speedMultiplier: 1.2 },
};