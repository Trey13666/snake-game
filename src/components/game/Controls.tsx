import { GameMode } from '../../types/game';

interface ControlsProps {
  onModeChange: (mode: GameMode) => void;
  onStart: () => void;
  onPause: () => void;
  isPlaying: boolean;
  currentMode: GameMode;
}

const Controls = ({ onModeChange, onStart, onPause, isPlaying, currentMode }: ControlsProps) => {
  return (
    <div className="controls">
      <div className="mode-controls">
        {(['EASY', 'NORMAL', 'HARD'] as GameMode[]).map(mode => (
          <button
            key={mode}
            className={`mode-button ${currentMode === mode ? 'active' : ''}`}
            onClick={() => onModeChange(mode)}
          >
            {mode === 'EASY' ? '简单' : mode === 'NORMAL' ? '普通' : '困难'}
          </button>
        ))}
      </div>
      <div className="game-controls">
        <button 
          onClick={isPlaying ? onPause : onStart}
          style={{ 
            backgroundColor: isPlaying ? 'var(--danger-color)' : 'var(--success-color)'
          }}
        >
          {isPlaying ? '暂停' : '开始'}
        </button>
      </div>
    </div>
  );
};

export default Controls;