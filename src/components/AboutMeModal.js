import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

export default function AboutMeModal(props) {
  Modal.setAppElement('body');

  return (
    <Modal
      contentLabel="About Me Modal"
      className="modal"
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      overlayClassName="overlay"
    >
      <div className={"modalClose"}>
        <p onClick={props.onClose}>X</p>
      </div>
      <div className={"modalAboutInfo"}>
        <p>I am a software developer from Brevard, NC with a diverse range of work experience. My most recent role involved serving as a Summer Camp Director, where I oversaw technology and facilities operations. Before my stint as a Summer Camp Director, I worked in the fast-paced, agile environment of Amazon Advertisement, specializing in (Big) Data Delivery and prior to that, I worked on Amazon Alexa, where my responsibilities included creating and maintaining highly scalable and highly available services.</p>
        <p>In my free time, I enjoy tinkering with technology that captures my interest, and I am an avid outdoor enthusiast who enjoys skiing, running, and flying my paragliding. Additionally, I spend time woodworking in my small shop, where I am currently constructing a campervan with my wife.</p>
        <p>This website is a nostalgic tribute to Super Mario 64, one of the first video games I ever played and still one of my all-time favorites. As Dr. Ian Malcolm famously said in Jurassic Park, "I was so preoccupied with whether or not I could, I didn't stop to think if I should." With that in mind, I created a 3D model of my head using photogrammetry and Blender. To make the model less unsettling, I applied a comic book filter to the texture, although I'm not entirely convinced it was successful in removing the creepiness factor!</p>
        <p>I have additional plans for updates, so please check back periodically to see them and thank you for your interest!</p>
        <p>For more information about my work experience, please see my resume. To connect with me, please visit my LinkedIn profile.</p>
      </div>
      <div className={"modalAboutLinks"}>
        <a href={"https://www.linkedin.com/in/turner-strayhorn/"}>Resume</a>
        <a href={"https://www.linkedin.com/in/turner-strayhorn/"}>LinkedIn</a>
        <a href={"https://www.github.com/renrut"}>Github</a>
      </div>
    </Modal>
  );
}