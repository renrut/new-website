import './App.css';
import React, {useEffect, useState} from 'react';
import RainbowText from "./components/RainbowText";
import AboutMeModal from "./components/AboutMeModal";
import HeadScene from "./components/HeadScene";

function App() {
  // Whether to show about me modal
  const [showAboutMe, setShowAboutMe] = useState(true);

  return (
    <div className="App">
      <div className={"DragContainer"}>
        <p>
          {"Drag Me!"}
        </p>
      </div>
      <div className={"HeadSceneContainer"}>
        <HeadScene/>
      </div>
      <div className={"AboutMeContainer"}>
          <RainbowText text={"About Me"}/>
      </div>
      <div className={"About"}>
        <AboutMeModal props={{isOpen: showAboutMe, closeModal: (() => setShowAboutMe(false))}}/>
      </div>

    </div>
  );
}

export default App;
