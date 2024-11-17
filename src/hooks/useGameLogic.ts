import { useState, useEffect, useCallback } from 'react';
import { Position, Direction, GameMode } from '../types/game';
import { GRID_SIZE, INITIAL_SNAKE_POSITION } from '../constants/gameConstants';

export const useGameLogic = (gameMode: GameMode, isPaused: boolean) => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE_POSITION);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const defaultSpeed = gameMode === 'EASY' ? 200 : gameMode === 'NORMAL' ? 150 : 100;

  const generateFood = useCallback(() => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    setFood(newFood);
  }, [snake]);

  useEffect(() => {
    if (isGameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(currentSnake => {
        const head = currentSnake[0];
        const newHead = { ...head };

        switch (direction) {
          case 'UP':
            newHead.y = (newHead.y - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'DOWN':
            newHead.y = (newHead.y + 1) % GRID_SIZE;
            break;
          case 'LEFT':
            newHead.x = (newHead.x - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'RIGHT':
            newHead.x = (newHead.x + 1) % GRID_SIZE;
            break;
        }

        if (currentSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsGameOver(true);
          return currentSnake;
        }

        const newSnake = [newHead, ...currentSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 1);
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, defaultSpeed);
    return () => clearInterval(gameInterval);
  }, [direction, food, generateFood, isGameOver, isPaused, defaultSpeed]);

  const changeDirection = (newDirection: Direction) => {
    if (
      (newDirection === 'UP' && direction !== 'DOWN') ||
      (newDirection === 'DOWN' && direction !== 'UP') ||
      (newDirection === 'LEFT' && direction !== 'RIGHT') ||
      (newDirection === 'RIGHT' && direction !== 'LEFT')
    ) {
      setDirection(newDirection);
    }
  };

  return {
    snake,
    food,
    score,
    isGameOver,
    setIsGameOver,
    changeDirection,
    resetGame: () => {
      setSnake(INITIAL_SNAKE_POSITION);
      setDirection('RIGHT');
      setScore(0);
      setIsGameOver(false);
      generateFood();
    }
  };
};
