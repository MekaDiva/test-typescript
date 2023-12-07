import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Link to='/test-undo-redo'>Test Undo Redo</Link>
      <Link to='/test-stop-light'>Test Stop Light</Link>
    </div>
  );
}

export default App;
