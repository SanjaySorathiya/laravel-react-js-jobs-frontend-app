import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import ListJobs from './pages/ListJobs';
import AddJob from './pages/AddJob';

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<ListJobs/>} />
            <Route path="/add-job" element={<AddJob/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;