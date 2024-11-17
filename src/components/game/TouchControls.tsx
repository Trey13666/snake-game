import { useState } from 'react';
import { Direction } from '../../types/game';

interface TouchControlsProps {
  onDirectionChange: (direction: Direction) => void;
}

const TouchControls = ({ onDirectionChange }: TouchControlsProps) => {
  const [startTouch, setStartTouch] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartTouch({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startTouch) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - startTouch.x;
    const deltaY = touch.clientY - startTouch.y;

    const minSwipeDistance = 30;

    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        onDirectionChange(deltaX > 0 ? 'RIGHT' : 'LEFT');
      } else {
        onDirectionChange(deltaY > 0 ? 'DOWN' : 'UP');
      }
      setStartTouch(null);
    }
  };

  return (
    <div 
      className="touch-area"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setStartTouch(null)}
    >
      <div className="touch-hint">
        滑动屏幕控制方向
      </div>
    </div>
  );
};

export default TouchControls;
