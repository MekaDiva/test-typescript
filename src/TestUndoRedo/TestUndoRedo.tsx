import React, { useState } from 'react';
import logo from './logo.svg';
import './TestUndoRedo.css';

type TPoint = {
  x: number;
  y: number;
}

const TestUndoRedo = () => {
  const [points, setPoints] = useState<TPoint[]>([]);
  const [poped, setPoped] = useState<TPoint[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    setPoints([...points, { x: e.clientX, y: e.clientY }]);
  };

  const handleUndo = () => {
    console.log('Undo');
    const newPoints = [...points];
    const newPoped = [...poped];
    const pop = newPoints.pop();
    if (pop) {
      newPoped.push(pop);
      setPoped(newPoped);
    }
    setPoints(newPoints);
  };

  const handleRedo = () => {
    console.log('Redo');

    if (poped.length === 0) {
      return;
    }
    
    const newPoints = [...points];
    newPoints.push(poped[0]);
    setPoints(newPoints);

    const newPoped = [...poped];
    newPoped.shift();
    setPoped(newPoped);
  };

  console.log(points);

  return (
    <div>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
      <div className="App" onClick={handleClick}>
        {points.map((point, index) => <div className='Point' style={{
          left: point.x - 25,
          top: point.y - 25,
          width: 50,
          height: 50,
        }} key={index}></div>)}
      </div>
    </div>

  );
}

export default TestUndoRedo;
