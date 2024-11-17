import { GameMode } from '../../types/game';

interface ControlsProps {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
}

const Controls = ({ gameMode, setGameMode, isPaused, setIsPaused }: ControlsProps) => {
  return (
    <div className="controls">
      <select 
        value={gameMode} 
        onChange={(e) => setGameMode(e.target.value as GameMode)}
      >
        <option value="EASY">简单</option>
        <option value="NORMAL">普通</option>
        <option value="HARD">困难</option>
      </select>
      <button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? '继续' : '暂停'}
      </button>
    </div>
  );
};

export default Controls;
