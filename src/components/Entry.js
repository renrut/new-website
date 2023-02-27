import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import * as THREE from "three";
import {Websites} from "../const/Websites";

export default function HeadScene(props) {
  const NUM_PARTICLES = 40;

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  let renderer = new THREE.WebGLRenderer();

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  camera.position.z = 3;

  scene.add(new THREE.AmbientLight(0xffffff, .9));

  //spawn spheres in a random position between -10 and 10
  let particles = [];
  let particleGeometry = new THREE.SphereGeometry(.02, 12, 12);
  let particleMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
  for(let i = 0; i < NUM_PARTICLES; i++){
    let particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.x = Math.random() * 8 - 4;
    particle.position.y = Math.random() * 8 - 4;
    particle.position.z = Math.random() * 5 - 5;
    let randomAngle = Math.random() * .1 + .01;
    scene.add(particle);
    particles.push({particle:particle,angle:randomAngle});
  }


  let onWindowResize = (()=> {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  });

  window.addEventListener("resize", onWindowResize, true);
  let requestAnimationId = null;
  let animate = function () {
    requestAnimationId = requestAnimationFrame( animate );
    //animate the model
    //if not dragging, animate the model back to the origin

    //slowly move the particles to revolve around the origin
    for(let i = 0; i < NUM_PARTICLES; i++){
      let particle = particles[i].particle;
      let angle = particles[i].angle * (Math.PI/180);

      let center = new THREE.Vector3(0, 0, 0);
      let point = particle.position

      let rotatedX = Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y-center.y) + center.x;
      let rotatedY = Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y;

      particle.position.x = rotatedX;
      particle.position.y = rotatedY;
    }

    renderer.render( scene, camera );
  }
  animate();

  //
  useEffect(() => {
    let canvases = document.querySelectorAll('canvas');

    //tear down scene
    return () => {
      while(scene.children.length > 0){
        scene.remove(scene.children[0]);
      }
      cancelAnimationFrame(requestAnimationId);
      scene = null;
      renderer.clear();
      camera = null;
      renderer = null;
      for(let i = 0; i < canvases.length; i++){
        console.log(canvases[i])
        canvases[i].remove();
      }

    }
  });

  return (
    <div className={"entryScene"}>
      <div className={"entrySceneText"}>
        Hello and welcome to my website! If you're looking for a more professional experience, click the 'Professional' button below. If you are looking for something more fun, click 'Fun'. If you simply want my PDF resume, click 'Resume'.
      </div>
      <button className={"entryPickerButton"} type={"button"}><Link to="/professional">PROFESSIONAL</Link></button>
      <button className={"entryPickerButton"} type={"button"}><Link to="/fun">FUN</Link></button>
      <button className={"entryPickerButton"} type={"button"} onClick={()=>{window.location.href = '/documents/resume.pdf'}}>RESUME</button>
    </div>
  );
}
