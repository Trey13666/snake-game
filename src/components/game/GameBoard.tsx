import { useGameLogic } from '../../hooks/useGameLogic';
import { GameMode } from '../../types/game';
import TouchControls from './TouchControls';
import { useEffect } from 'react';

interface GameBoardProps {
  gameMode: GameMode;
  onScoreUpdate: (score: number) => void;
  isPaused: boolean;
}

const GameBoard = ({ gameMode, onScoreUpdate, isPaused }: GameBoardProps) => {
  const {
    snake,
    food,
    score,
    isGameOver,
    changeDirection,
    resetGame
  } = useGameLogic(gameMode, isPaused);

  useEffect(() => {
    onScoreUpdate(score);
  }, [score, onScoreUpdate]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          changeDirection('UP');
          break;
        case 'ArrowDown':
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
          changeDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [changeDirection]);

  return (
    <div className="game-board">
      {snake.map((segment, index) => (
        <div
          key={index}
          className="snake-segment"
          style={{
            left: `${segment.x * 20}px`,
            top: `${segment.y * 20}px`
          }}
        />
      ))}
      <div
        className="food"
        style={{
          left: `${food.x * 20}px`,
          top: `${food.y * 20}px`
        }}
      />
      {isGameOver && (
        <div className="game-over">
          <h2>游戏结束!</h2>
          <button onClick={resetGame}>重新开始</button>
        </div>
      )}
      {!isGameOver && <TouchControls onDirectionChange={changeDirection} />}
    </div>
  );
};

export default GameBoard;
