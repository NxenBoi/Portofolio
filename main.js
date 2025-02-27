// Libraries
import * as THREE from 'three'
import gsap from 'gsap'

// Variables
const scrollSpeed = 0.02
const parallaxIntensity = 1

// Scene
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1c1c1c)

// Camera
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
var cameraAnchorPos = new THREE.Vector3().copy(camera.position);

// Renderer
export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(update);
document.body.appendChild(renderer.domElement);

// Raycast
export const mouse = new THREE.Vector2();
export const raycaster = new THREE.Raycaster();

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(camera.position.x, camera.position.y, camera.position.z).normalize();
scene.add(directionalLight);

// Events
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('wheel', (event) => {
    gsap.to(cameraAnchorPos, {
        y: cameraAnchorPos.y - event.deltaY * scrollSpeed,
        duration: 0.2,
        ease: "sine.Out"
    })

    if (cameraAnchorPos.y < -10) {
        animateParagraph2();
    }
});

// Update
function update() {
    const offsetX = mouse.x * parallaxIntensity;
    const offsetY = mouse.y * parallaxIntensity;
    
    camera.position.x = cameraAnchorPos.x + offsetX;
    camera.position.y = cameraAnchorPos.y + offsetY;

    renderer.render(scene, camera)
}