import './App.css';
import React, {useEffect, useState} from 'react';
import RainbowText from "./components/RainbowText";
import AboutMeModal from "./components/AboutMeModal";
import HeadScene from "./components/HeadScene";

function App() {
  // Whether to show about me modal
  const [showAboutMe, setShowAboutMe] = useState(false);



  return (
    <div id="App" className="App">
      <div className={"DragContainer"}>
        <p>
          {"Drag Me!"}
        </p>
      </div>
      <div className={"HeadSceneContainer"}>
        <HeadScene/>
      </div>
      <div className={"AboutMeContainer"} onClick={()=>{setShowAboutMe(true)}}>
          <RainbowText text={"About Me"} />
      </div>
      <div className={"About"}>
        <AboutMeModal isOpen={showAboutMe} onClose={()=>{setShowAboutMe(false)}}/>
      </div>

    </div>
  );
}

export default App;
