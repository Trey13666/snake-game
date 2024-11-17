import { Direction } from '../../types/game';
import { useState, useEffect } from 'react';

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

    // 需要一定的滑动距离才触发方向改变
    const minSwipeDistance = 30;

    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // 水平滑动
        onDirectionChange(deltaX > 0 ? 'RIGHT' : 'LEFT');
      } else {
        // 垂直滑动
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
