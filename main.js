/* global THREE */
//first js code written by Steven Tang
console.log('Hi!');
//so this imports three.js modules and creates a scene.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 500 );
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));


//important render stuff
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(3);
document.body.appendChild( renderer.domElement );

//create a blue LineBasicMaterial
var material = new THREE.LineBasicMaterial({ color: 0x0152FF });
var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));
var line = new THREE.Line(geometry, material);

//creating a torus
var geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
var material = new THREE.MeshBasicMaterial( { color: 0x0152FF } );
var torus = new THREE.Mesh( geometry, material );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0x0152FF} );
var cube = new THREE.Mesh( geometry, material );

// scene.add stuff
// scene.add(line);
scene.add( torus );
// scene.add( cube );
renderer.render(scene, camera);

function render() {
    window.requestAnimationFrame(render);
  
    //animateTorus
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
  
    renderer.render(scene, camera);
  }
render();
