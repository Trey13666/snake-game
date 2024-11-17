import { useState, useEffect, useCallback } from 'react';
import { Position, Direction, GameMode } from '../types/game';
import { GRID_SIZE, INITIAL_SNAKE_POSITION, INITIAL_SPEED, DIFFICULTY_SETTINGS } from '../constants/gameConstants';

export const useGameLogic = (gameMode: GameMode, isPaused: boolean) => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE_POSITION);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  // 生成新的食物位置
  const generateFood = useCallback(() => {
    const newFood: Position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    setFood(newFood);
  }, []);

  // 检查碰撞
  const checkCollision = useCallback((head: Position) => {
    // 检查墙壁碰撞
    if (gameMode !== 'EASY') {
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        return true;
      }
    } else {
      // 简单模式下穿过墙壁
      head.x = (head.x + GRID_SIZE) % GRID_SIZE;
      head.y = (head.y + GRID_SIZE) % GRID_SIZE;
    }

    // 检查自身碰撞
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
  }, [snake, gameMode]);

  // 移动蛇
  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      if (checkCollision(head)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // 检查是否吃到食物
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, checkCollision, generateFood]);

  // 处理键盘事件
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  // 游戏循环
  useEffect(() => {
    if (isGameOver || isPaused) return;

    const gameSpeed = INITIAL_SPEED * DIFFICULTY_SETTINGS[gameMode].speedMultiplier;
    const gameLoop = setInterval(moveSnake, gameSpeed);

    return () => clearInterval(gameLoop);
  }, [moveSnake, gameMode, isGameOver, isPaused]);

  // 在 useGameLogic 函数中添加一个新的方法
  const changeDirection = (newDirection: Direction) => {
    // 防止反向移动
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
