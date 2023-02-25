import React, {useEffect, useState} from 'react';
import * as THREE from "three";
import {sparkleCursor} from "../sparkleCursor";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export default function HeadScene(props) {
  useEffect(() => {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    camera.position.z = 3;

    // add a light
    let light = new THREE.PointLight(0xfff5b6, 1, 1000);
    light.position.set(-5, 0, 10);
    scene.add(light);
    // add ambient light
    let ambientLight = new THREE.AmbientLight(0xffffff, .9);
    scene.add(ambientLight);


    // load a gltf model
    const loader = new GLTFLoader();

    let eyepieces = []
    let head;
    loader.load( '/models/myheadsm.glb', function ( gltf ) {
      head = gltf.scene;
      gltf.scene.traverse( function ( child ) {
        if(child.name.includes("Sphere")){
          eyepieces.push(child);
        }
      });
      scene.add( gltf.scene );
    }, undefined, function ( error ) {
      console.error( error );
    } );


    // Load the background texture
    scene.background = new THREE.TextureLoader().load('/textures/mariobackground.png');

    let raycaster = new THREE.Raycaster();
    let isDragging = false;
    let headOriginRotation = new THREE.Vector3(0, 0, 0)


    let onWindowResize = (()=> {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    });


    let dragStart = ((event) => {

      if(event.touches){
        event = event.touches[0];
      }

      let mouse = new THREE.Vector2();
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1.;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      raycaster.setFromCamera( mouse, camera );

      let intersects = raycaster.intersectObjects(head.children);
      if(intersects.length > 0){
        isDragging = true;
      }
    });

    let dragMove = ((event) => {

      if(event.touches){
        event = event.touches[0];
      }

      //Height and width relation to the center of the head
      let height =(event.clientY / window.innerHeight) * 2 - 1;
      let width = (event.clientX / window.innerWidth) * 2 - 1;
      let newHeight = height + 1.7;
      let newWidth = -width - 0.075;

      let maxXLeft = -0.7;
      let maxXRight = 0.7;
      let maxYUp = 2;
      let maxYDown = 1.16;
      // //clamp newHeight and newWidth
      newHeight = Math.max(Math.min(newHeight, maxYUp), maxYDown);
      newWidth = Math.max(Math.min(newWidth, maxXRight), maxXLeft);

      eyepieces.forEach((eyepiece) => {
        //Up and Down
        eyepiece.rotation.x = newHeight;
        //Side to Side
        eyepiece.rotation.z = newWidth;
      });
      //Move Head
      if(isDragging){
        head.rotation.y = (event.clientX / window.innerWidth) - 0.5;
        head.rotation.x = (event.clientY / window.innerHeight) - 0.5;
      }

      // Stars fall from mouse
      let mouse = new THREE.Vector2();
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


    });

    let dragEnd = ((event) => {
      isDragging = false;
    });



    window.addEventListener("mousedown", dragStart, true);
    window.addEventListener("touchstart", dragStart, true);
    window.addEventListener("mousemove", dragMove, true);
    window.addEventListener("touchmove", dragMove, true);
    window.addEventListener("mouseup", dragEnd, true);
    window.addEventListener("touchend", dragEnd, true);
    window.addEventListener("resize", onWindowResize, true);

    new sparkleCursor();

    let animate = function () {
      requestAnimationFrame( animate );
      //animate the model
      //if not dragging, animate the model back to the origin


      if(!isDragging && head && headOriginRotation.distanceTo(head.rotation) > 0.01){
        head.rotation.x += (headOriginRotation.x - head.rotation.x) * 0.1;
        head.rotation.y += (headOriginRotation.y - head.rotation.y) * 0.1;
        head.rotation.z += (headOriginRotation.z - head.rotation.z) * 0.1;
      }


      renderer.render( scene, camera );
    }
    animate();
  }, []);

  return (
    <div className={"headscene"}>
    </div>
  );
}
