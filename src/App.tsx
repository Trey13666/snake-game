import { useState } from 'react';
import './App.css';
import GameBoard from './components/game/GameBoard';
import ScoreBoard from './components/UI/ScoreBoard';
import Controls from './components/game/Controls';
import { GameMode } from './types/game';

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameMode, setGameMode] = useState<GameMode>('NORMAL');
  const [isPaused, setIsPaused] = useState(false);

  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  return (
    <div className="game-container">
      <h1>贪吃蛇</h1>
      <div className="game-wrapper">
        <ScoreBoard score={score} highScore={highScore} />
        <Controls 
          gameMode={gameMode} 
          setGameMode={setGameMode}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
        />
        <GameBoard 
          gameMode={gameMode} 
          onScoreUpdate={handleScoreUpdate}
          isPaused={isPaused}
        />
      </div>
    </div>
  );
}

export default App;
