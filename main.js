/* global THREE */
//first js code written by Steven Tang
console.log('Hi!');
//so this imports three.js modules and creates a scene.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

//creates a box
var distance = 3;
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
  color: '#fff'
});
var cubes = [];
for (var h = 0; h < 3; h++) {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var cube = new THREE.Mesh(geometry, material);
      cube.position.y = (distance * h) - 3;
      cube.position.x = (distance * i) - 6;
      cube.position.z = (distance * j);
      cubes.push(cube);
      scene.add(cube);
    }
  }
}

camera.position.z = 12;
camera.position.x = 12;
camera.rotation.y = 45;

function render() {
  window.requestAnimationFrame(render);

  //animateCubes
  cubes.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}
render();

var intersected;
window.addEventListener('mousedown', e => {
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  // update the picking ray with the camera and mouse position

  raycaster.setFromCamera(mouse, camera);
  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(scene.children);
  console.log(intersects);
  if (intersects.length > 0) {
    if (intersects[0].object.material.color.equals({
        r: 1,
        g: 1,
        b: 1
      })) {
      intersects[0].object.material.color.set('#ff0000');
    } else {
      intersects[0].object.material.color.set('#fff');
    }
  }
}, false);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);
