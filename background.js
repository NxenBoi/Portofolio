import { scene } from './main.js'
import * as THREE from 'three'
import gsap from 'gsap'

const cubeScale = 0.5
var baseColor = new THREE.Color(0x4a4a4a)
var cubes = []

for (let layer = 0; layer < 6; layer++) {
    const darknessFactor = 0.9 / layer
    const darkenedColor = baseColor.clone().multiplyScalar(darknessFactor);

    for (let i = 0; i < 50*layer; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: darkenedColor});
        const cube = new THREE.Mesh(geometry, material);
    
        var range = (layer+1) * 20

        cube.position.x = Math.random() * range - range/2;
        cube.position.y = Math.random() * range - range/2;
        cube.position.z = layer * -5
    
        cube.rotation.x = Math.random() * 2 - 1;
        cube.rotation.y = Math.random() * 2 - 1;
        cube.rotation.z = Math.random() * 2 - 1;
    
        cube.scale.x = cubeScale;
        cube.scale.y = cubeScale;
        cube.scale.z = cubeScale;
    
        gsap.to(cube.scale, {
            x: cubeScale-0.1,
            y: cubeScale-0.1,
            z: cubeScale-0.1,
            duration: 1,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        })
        
        cubes.push(cube);
        scene.add(cube);
    }
}

export function toggleBackground(toggled) {
    cubes.forEach(cube => {
        if (toggled) {
            scene.add(cube)
        } else {
            scene.remove(cube)
        }
    });
}