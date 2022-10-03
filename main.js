import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const gui = new dat.GUI();
const world = {
  plane : {
    width : 10
  }
}
gui.add(world.plane,'width', 1,100,1).onChange(
  () => {
    planemesh.geometry.dispose()
    planemesh.geometry = new THREE.PlaneGeometry(world.plane.width,10,20,20);
    renderer.render(scene,camera);
  }
)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)

const plane = new THREE.PlaneGeometry(5,5,10,10);
const mat1 = new THREE.MeshPhongMaterial({color : 0xff0000 , side : THREE.DoubleSide , flatShading : true});
const planemesh = new THREE.Mesh(plane,mat1);

const {array}  = planemesh.geometry.attributes.position;

for(var i =0; i < array.length; i+=3 ){
  const x = array[i];
  const y = array[i+1];
  const z = array[i+2];

  array[i +2 ] = z + Math.random();
}

scene.add(planemesh);

const light = new THREE.DirectionalLight(0xffffff , 1);
light.position.set(0,0,2);
scene.add(light);


camera.position.z = 10;
renderer.render(scene,camera);

const animat2 = () => {
  requestAnimationFrame(animat2);

  planemesh.rotation.x += 0.01;
  planemesh.rotation.y += 0.01;

  renderer.render(scene,camera);
}

animat2();

function animate() {
  requestAnimationFrame(animate)

  controls.update()
  
  renderer.render(scene,camera);

  stats.update()
}
animate();



