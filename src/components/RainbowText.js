import {COLORS} from "../const/colors";
import React from "react";

//return rainbow text
export default function RainbowText(props){

  let makeRainbowText = ((text) => {
    let rainbowText = [];
    let colorIndex = 0;
    let colorKeys = Object.keys(COLORS);
    for(let i = 0; i < text.length; i++){
      rainbowText.push(<span key={text+i} style={{color: COLORS[colorKeys[colorIndex]]}}>{text[i]}</span>);
      colorIndex = (colorIndex + 1) % colorKeys.length;
    }
    return rainbowText;
  });

  return (
    <div className={"RainbowTextContainer"}>
      {makeRainbowText(props.text)}
    </div>
  );
}
