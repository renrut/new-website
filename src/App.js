import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


function App() {
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
      loader.load( '/models/myhead.glb', function ( gltf ) {
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
      let texture = new THREE.TextureLoader().load('/textures/mariobackground.png');
      scene.background = texture;

      let raycaster = new THREE.Raycaster();
      let isDragging = false;
      let headOriginRotation = new THREE.Vector3(0, 0, 0)

      window.addEventListener("mousedown", (event) => {
        let mouse = new THREE.Vector2();
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );

        let intersects = raycaster.intersectObjects(head.children);
        console.log(intersects[0])
        if(intersects.length > 0){
          isDragging = true;
        }
      });

      window.addEventListener("mousemove", (event) => {
        eyepieces.forEach((eyepiece) => {
          eyepiece.rotation.x = (event.clientY / window.innerWidth) + 1.35;
          eyepiece.rotation.z = -((event.clientX / window.innerHeight) - 0.84);
        });
        if(isDragging){
          head.rotation.y = (event.clientX / window.innerWidth) - 0.5;
          head.rotation.x = (event.clientY / window.innerHeight) - 0.5;
        }
      });

      window.addEventListener("mouseup", (event) => {
        isDragging = false;
      });




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
    <div className="App">

    </div>
  );
}

export default App;
