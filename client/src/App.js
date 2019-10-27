import React, { useState, useEffect, useReducer, useCallback } from 'react';
// Material UI
import Header from './components/Header.jsx';
import JournalGrid from './components/JournalGrid.jsx';
import PastEntry from './components/PastEntry.jsx';
import './App.css';

import axios from 'axios';
require('dotenv').config();


const URL = "/api/entries";

//{"answers":["I saw a tree.","It was cool.","It had a lot of colors."],"_id":"5db51e88859948421fb2c53a","date":"October 26, 2019","imgUrl":"https://i.gifer.com/NbS8.gif","keyword":"tree","SentimentScore":{"Mixed":0.030585512690246106,"Positive":0.9499207105636597,"Neutral":0.0141543131828308,"Negative":0.00893945890665054},"Sentiment":"POSITIVE","__v":0}
export default function App() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Use useCallback to memoize this function
  const fetchEntries = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL);
      setEntries(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [setIsLoading, setEntries]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <div className="App">
      <header className="App-header">
        <Header message="Good Afternoon, Will"></Header>
      </header>
      <body>
        <JournalGrid />
      </body>
    </div>
  );
}
