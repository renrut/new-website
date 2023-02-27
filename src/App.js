import './App.css';
import React, {useState} from 'react';
import { Route, Routes, Link } from "react-router-dom"
import RainbowText from "./components/RainbowText";
import AboutMeModal from "./components/AboutMeModal";
import HeadScene from "./components/HeadScene";
import Entry from "./components/Entry";
import {Websites} from "./const/Websites";
import Boring from "./components/Boring";

function App() {
  // Whether to show about me modal
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [websiteToDisplay, setWebsiteToDisplay] = useState(Websites.ENTRY);

  let entryPage = (
    <div id="App" className="App">
      <div className={"EntryContainer"}>
        <Entry selectSite={setWebsiteToDisplay}/>
      </div>
    </div>
  );

  let funWebsite = (
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

  let boringWebsite = (
    <div id="App" className="App">
      <Boring/>
    </div>
    );

  return(

    <Routes>
      <Route path="/" element={entryPage} />
      <Route path="/fun" element={funWebsite} />
      <Route path="/professional" element={boringWebsite} />
    </Routes>
  );
}

export default App;
