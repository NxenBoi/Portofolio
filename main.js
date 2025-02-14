// Libraries
import * as THREE from 'three'
import gsap from 'gsap'

// Variables
const scrollSpeed = 0.01
const parallaxIntensity = 1
const bgcubecolors = [0x757575, 0x616161, 0x4a4a4a, 0x333333, 0x212121]

// Scene
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
var cameraAnchorPos = new THREE.Vector3().copy(camera.position);

// Renderer
export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x1c1c1c);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(update);
document.body.appendChild(renderer.domElement);

// Raycast
export const mouse = new THREE.Vector2();
export const raycaster = new THREE.Raycaster();

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(camera.position.x, camera.position.y, camera.position.z).normalize();
scene.add(directionalLight);

// Background
for (let layer = 0; layer < 5; layer++) {
    for (let i = 0; i < 50*layer; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: bgcubecolors[layer]});
        const cube = new THREE.Mesh(geometry, material);
    
        var range = (layer+1) * 20

        cube.position.x = Math.random() * range - range/2;
        cube.position.y = Math.random() * range - range/2;
        cube.position.z = layer * -5
    
        cube.rotation.x = Math.random() * 2 - 1;
        cube.rotation.y = Math.random() * 2 - 1;
        cube.rotation.z = Math.random() * 2 - 1;
    
        var scale = 0.5
        cube.scale.x = scale;
        cube.scale.y = scale;
        cube.scale.z = scale;
    
        gsap.to(cube.scale, {
            x: scale-0.1,
            y: scale-0.1,
            z: scale-0.1,
            duration: 1,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        })

        scene.add(cube);
    }
}

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
});

// Update
function update() {
    const offsetX = mouse.x * parallaxIntensity;
    const offsetY = mouse.y * parallaxIntensity;
    
    camera.position.x = cameraAnchorPos.x + offsetX;
    camera.position.y = cameraAnchorPos.y + offsetY;

    renderer.render(scene, camera)
}