import { useState, useCallback } from 'react'
import './App.css'
import GameBoard from './components/Game/GameBoard'
import ScoreBoard from './components/UI/ScoreBoard'
import Controls from './components/Game/Controls'
import { GameMode } from './types/game'

function App() {
  const [gameMode, setGameMode] = useState<GameMode>('NORMAL')
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const handleStart = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleScoreUpdate = useCallback((newScore: number) => {
    setScore(newScore)
    if (newScore > highScore) {
      setHighScore(newScore)
    }
  }, [highScore])

  return (
    <div className="game-container">
      <h1>贪吃蛇游戏</h1>
      <div className="game-wrapper">
        <ScoreBoard score={score} highScore={highScore} />
        <GameBoard 
          gameMode={gameMode} 
          onScoreUpdate={handleScoreUpdate}
          isPaused={!isPlaying}
        />
        <Controls 
          onModeChange={setGameMode}
          onStart={handleStart}
          onPause={handlePause}
          isPlaying={isPlaying}
          currentMode={gameMode}
        />
      </div>
    </div>
  )
}

export default App
