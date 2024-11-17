interface ScoreBoardProps {
    score: number;
    highScore: number;
  }
  
  const ScoreBoard = ({ score, highScore }: ScoreBoardProps) => {
    return (
      <div className="score-board">
        <div className="score-item">当前分数: <span className="score-value">{score}</span></div>
        <div className="score-divider">|</div>
        <div className="score-item">最高分数: <span className="score-value">{highScore}</span></div>
      </div>
    );
  };
  
  export default ScoreBoard;