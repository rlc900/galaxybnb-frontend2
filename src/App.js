import React from 'react';
// import logo from './logo.svg';
import './App.css';
import GlobalFonts from './fonts/fonts.js'
import MainContainer from './containers/MainContainer'

function App() {
  return (
    <div className="App stars">
      <div className='twinkling'>
        <div className='clouds'>
            <GlobalFonts />
            <MainContainer />
      </div>
      </div>
    </div>
  );
}

export default App;
