import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'

import Home from './page/Home'
import jsonData from "./data.json";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} data={jsonData} />
    </Routes>
  )
}

export default App;
