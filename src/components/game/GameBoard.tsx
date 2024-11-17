import { useEffect, useRef } from 'react';
import { CELL_SIZE, GRID_SIZE } from '../../constants/gameConstants';
import { GameMode, Direction } from '../../types/game';
import { useGameLogic } from '../../hooks/useGameLogic';
import TouchControls from './TouchControls';

interface GameBoardProps {
  gameMode: GameMode;
  onScoreUpdate: (score: number) => void;
  isPaused: boolean;
}

const GameBoard = ({ gameMode, onScoreUpdate, isPaused }: GameBoardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { snake, food, score, isGameOver, resetGame, changeDirection } = useGameLogic(gameMode, isPaused);

  useEffect(() => {
    onScoreUpdate(score);
  }, [score, onScoreUpdate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制网格背景
    ctx.strokeStyle = '#333';
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // 绘制蛇
    ctx.fillStyle = '#4CAF50';
    snake.forEach(({ x, y }) => {
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    });

    // 绘制食物
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);

  }, [snake, food]);

  const handleDirectionChange = (newDirection: Direction) => {
    if (!isGameOver && !isPaused) {
      changeDirection(newDirection);
    }
  };

  return (
    <div className="game-board">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        style={{ border: '2px solid #666', borderRadius: '16px' }}
      />
      {!isGameOver && <TouchControls onDirectionChange={handleDirectionChange} />}
      {isPaused && !isGameOver && (
        <div className="pause-overlay">
          <div className="pause-text">已暂停</div>
        </div>
      )}
      {isGameOver && (
        <div className="game-over">
          <h2>游戏结束</h2>
          <p>得分: {score}</p>
          <button onClick={resetGame}>重新开始</button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;