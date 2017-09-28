/* global THREE */
//first js code written by Steven Tang
console.log('Hi!');
//so this imports three.js modules and creates a scene.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//creates a box
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
  color: '#b5169c'
});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}


function render() {
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(scene.children);
  for (var i = 0; i < intersects.length; i++) {
    intersects[i].object.material.color.set(0xff0000);
  }
  //animateCube
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
  renderer.render(scene, camera);

}

window.addEventListener('mousemove', onMouseMove, false);
window.requestAnimationFrame(render);
