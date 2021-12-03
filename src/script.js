import './style.css'
import * as THREE from 'three'
import * as ZapparThree from "@zappar/zappar-threejs";
import { BoxGeometry, SphereGeometry } from 'three';
import { gsap } from 'gsap';

let manager = new ZapparThree.LoadingManager();

const clock = new THREE.Clock()
// renderer
const renderer = new THREE.WebGLRenderer();
document.body.appendChild( renderer.domElement );

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene = new THREE.Scene();
let camera = new ZapparThree.Camera();

scene.background = camera.backgroundTexture;

// Request the necessary permission from the user
ZapparThree.permissionRequestUI().then(function(granted) {
    if (granted) camera.start();
    else ZapparThree.permissionDeniedUI();
});
const group = new THREE.Group();

// The Zappar library needs your WebGL context, so pass it
ZapparThree.glContextSet(renderer.getContext());

// ambient
scene.add( new THREE.AmbientLight( 0x222222 ) );

// ambient
scene.add( new THREE.PointLight( 0x222222, 3 ) );

let tracker = new ZapparThree.ImageTrackerLoader(manager).load("Markers/marker2.zpt");
let trackerGroup = new ZapparThree.ImageAnchorGroup(camera, tracker);
scene.add(trackerGroup);

// material
var material = new THREE.MeshPhongMaterial();

// mesh BACK
var geometry = new THREE.PlaneGeometry( 10, 10 );
var meshBack = new THREE.Mesh( geometry, material.clone() );
group.add( meshBack );
meshBack.material.color.set( 0xff0000 );
meshBack.renderOrder = 3;
meshBack.position.z = -10;
meshBack.material.colorWrite = false;
meshBack.material.side = THREE.DoubleSide;
// mesh Inner BACK
var geometry = new THREE.PlaneGeometry( 10, 10 );
var meshInnerBack = new THREE.Mesh( geometry, material.clone() );
group.add( meshInnerBack );
meshInnerBack.material.color.set( 0xff0000 );
meshInnerBack.renderOrder = 4;
meshInnerBack.position.z = -9.9;
meshInnerBack.material.side = THREE.DoubleSide;

// mesh FRONT
var geometry = new THREE.PlaneGeometry( 10, 10 );
var meshFront = new THREE.Mesh( geometry, material.clone() );
group.add( meshFront );
meshFront.material.color.set( 0x606060 );
meshFront.renderOrder = 4;
meshFront.material.colorWrite = false;
meshFront.position.z = 0;

// mesh LEFT
var geometry = new THREE.PlaneGeometry( 10, 10 );
var meshLeft = new THREE.Mesh( geometry, material.clone() );
group.add( meshLeft );
meshLeft.material.color.set( 0x0000ff );
meshLeft.renderOrder = 3;
meshLeft.position.z = -5;
meshLeft.position.x = -5;
meshLeft.rotation.y = -(Math.PI / 2);
meshLeft.material.colorWrite = false;
// mesh Inner LEFT
var geometry = new THREE.PlaneGeometry( 10, 10 );
var meshInnerLeft = new THREE.Mesh( geometry, material.clone() );
group.add( meshInnerLeft );
meshInnerLeft.material.color.set( 0xfcba03 );
meshInnerLeft.material.side = THREE.DoubleSide;
meshInnerLeft.renderOrder = 3;
meshInnerLeft.position.z = -5;
meshInnerLeft.position.x = -4.9;
meshInnerLeft.rotation.y = -(Math.PI / 2);
meshInnerLeft.material.side = THREE.DoubleSide;

// mesh RIGHT
var geometry = new THREE.PlaneGeometry( 10, 10 );
var meshRight = new THREE.Mesh( geometry, material.clone() );
group.add( meshRight );
meshRight.material.color.set( 0x0000ff );
meshRight.renderOrder = 3;
meshRight.position.z = -5;
meshRight.position.x = 5;
meshRight.rotation.y = (Math.PI / 2);
meshRight.material.colorWrite = false;
// mesh Inner RIGHT
var geometry = new THREE.PlaneGeometry( 10, 10 );
var meshInnerRight = new THREE.Mesh( geometry, material.clone() );
group.add( meshInnerRight );
meshInnerRight.material.color.set( 0xfcba03 );
meshInnerRight.renderOrder = 3;
meshInnerRight.position.z = -5;
meshInnerRight.position.x = 4.9;
meshInnerRight.rotation.y = -(Math.PI / 2);
meshInnerRight.material.side = THREE.DoubleSide;

// mesh d floor
var geometry = new THREE.PlaneGeometry( 10, 10 );
var meshFloor = new THREE.Mesh( geometry, material.clone() );
group.add( meshFloor );
meshFloor.material.color.set( 0x0000ff );
meshFloor.renderOrder = 2;
meshFloor.position.z = -5;
meshFloor.position.y = -5;
meshFloor.rotation.x = (Math.PI / 2);
meshFloor.material.colorWrite = false;
meshFloor.material.side = THREE.DoubleSide;
// mesh Inner floor
var geometry = new THREE.PlaneGeometry( 10, 10 );
var meshInnerFloor = new THREE.Mesh( geometry, material.clone() );
group.add( meshInnerFloor );
meshInnerFloor.material.color.set( 0x0000ff );
meshInnerFloor.renderOrder = 3;
meshInnerFloor.position.z = -5;
meshInnerFloor.position.y = -4.9;
meshInnerFloor.rotation.x = (Math.PI / 2);
meshInnerFloor.material.side = THREE.DoubleSide;

// mesh TOP
var geometry = new THREE.PlaneGeometry( 10, 10 );
var meshTop = new THREE.Mesh( geometry, material.clone() );
group.add( meshTop );
meshTop.material.color.set( 0x0000ff );
meshTop.renderOrder = 2;
meshTop.position.z = -5;
meshTop.position.y = 5;
meshTop.rotation.x = (Math.PI / 2);
meshTop.material.colorWrite = false;
meshTop.material.side = THREE.DoubleSide;
// mesh Inner Top
var geometry = new THREE.PlaneGeometry( 10, 10 );
var meshTopInner = new THREE.Mesh( geometry, material.clone() );
group.add( meshTopInner );
meshTopInner.material.color.set( 0x0000ff );
meshTopInner.renderOrder = 3;
meshTopInner.position.z = -5;
meshTopInner.position.y = 4.9;
meshTopInner.rotation.x = (Math.PI / 2);

// mesh sphere
var geometry = new SphereGeometry(2, 24, 24)
var sphere = new THREE.Mesh( geometry, material.clone() );
group.add( sphere );
sphere.material.color.set( 0x6817ff );
sphere.renderOrder = 3;
sphere.position.z = -5;

trackerGroup.add(group)
group.scale.set(0.2, 0.2, 0.2)
trackerGroup.position.z = -1

imageTracker.onNewAnchor.bind(anchor => {
    console.log("New anchor has appeared:", anchor.id);
    trackerGroup.visible = false
});

tracker.onNotVisible.bind(anchor => {
    console.log("Anchor is not visible:", anchor.id);
    trackerGroup.visible = false
});

tracker.onVisible.bind(anchor => {
    console.log("Anchor is visible:", anchor.id);
    trackerGroup.visible = true
});

function tick() {

    const elapsedTime = clock.getElapsedTime()

    sphere.position.y = Math.sin(elapsedTime)
    sphere.position.x = Math.cos(elapsedTime)

	renderer.render(scene, camera);
    
    camera.updateFrame(renderer);

    window.requestAnimationFrame(tick)
}

tick();
