import React, { useState, useEffect } from 'react';
// Material UI
import Header from './components/Header.jsx';
import JournalGrid from './components/JournalGrid.jsx';
import PastEntry from './components/PastEntry.jsx';
import './App.css';

import axios from 'axios';
require('dotenv').config();


const URL = "http://localhost:5000/entries";

//{"answers":["I saw a tree.","It was cool.","It had a lot of colors."],"_id":"5db51e88859948421fb2c53a","date":"October 26, 2019","imgUrl":"https://i.gifer.com/NbS8.gif","keyword":"tree","SentimentScore":{"Mixed":0.030585512690246106,"Positive":0.9499207105636597,"Neutral":0.0141543131828308,"Negative":0.00893945890665054},"Sentiment":"POSITIVE","__v":0}
export default function App() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [timeOfDay, setTimeOfDay] = useState("Morning");

  // Use useCallback to memoize this function
  const fetchEntries = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL);
      let entries = response.data.map(entry => {
        return entry;
      });
      setEntries(entries);
      setIsLoading(false);
      console.log(entries)
    } catch (err) {
      console.log(err);
    }
  }

  // Upon initial load
  useEffect(() => {
    fetchEntries();
    let time_of_day = "Morning";
    var hours = new Date().getHours();
    var ampm = (hours >= 12) ? "PM" : "AM";
    if (ampm == "PM") {
      time_of_day = "Afternoon"
      if (hours > 17) { // 5:00pm or later
        time_of_day = "Evening";
      }
    } else {
      if (hours >= 0 && hours <= 3) {
        time_of_day = "Night";
      }
    }

    if (timeOfDay !== time_of_day) {
      setTimeOfDay(time_of_day);
    }
  }, []);

  function handleAdd(newEntry) {
    console.log("INSIDE HANDLE ADD!!!!!");
    setEntries([newEntry, ...entries]);
  }

  return (
    <div className="App">
      <Header message={`Good ${timeOfDay}, Esther and Will`}></Header>
      <JournalGrid entries={entries} onAdd={handleAdd} />
    </div>
  );
}
