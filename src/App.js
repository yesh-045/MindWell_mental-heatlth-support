import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import Games from './components/Games';
import Activities from './components/Activities';
import Counselling from './components/Counselling';
import Footer from './components/Footer';
import GamePage from './components/GamePage';
import StressRelief from './components/StressRelief';
import ChatbotPage from './components/ChatbotPage';
import ProgressiveMuscleRelaxation from './components/ProgressiveMuscleRelaxation';
import PositiveWordPuzzle from './components/PositiveWordPuzzle';
import GuidedBreathingGame from './components/GuidedBreathingGame'; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* Include the Home component with navigation buttons */}
        <Home />  
        
        {/* Include the Header component right after the Home component */}
        <Header />

        {/* Define the routes for the application */}
        <Routes>
          <Route path="/" element={
            <>
              {/* Games, Activities, and Counselling will show under Header */}
              <Games />
              <Activities />
              <Counselling />
            </>
          } />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/stress-relief" element={<StressRelief />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/progressive-muscle-relaxation" element={<ProgressiveMuscleRelaxation />} />
          <Route path="/positive-word-puzzle" element={<PositiveWordPuzzle />} />
          <Route path="/guided-breathing-game" element={<GuidedBreathingGame />} />
        </Routes>
        
        {/* Include the Footer at the bottom of the page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
