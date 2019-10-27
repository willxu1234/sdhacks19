import React, { useState, useEffect } from 'react';
// Material UI
import Fab from '@material-ui/core/Fab';
import Header from './components/Header.jsx';
import JournalGrid from './components/JournalGrid.jsx';
import PastEntry from './components/PastEntry.jsx';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header message="Good Afternoon, Will"></Header>
      </header>
      <body>
        <JournalGrid />
        <Fab color="primary" aria-label="add">
          Add
        </Fab>
      </body>
    </div>
  );
}
