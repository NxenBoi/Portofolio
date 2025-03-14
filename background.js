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
        
        cubes.push(cube);
        scene.add(cube);
    }
}

export function toggleCubes(toggled) {
    cubes.forEach(cube => {
        if (toggled) {
            scene.add(cube);
        }
        else {
            gsap.to(cube.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.5,
                ease: "sine.out",
                onComplete: () => {
                    scene.remove(cube);
                }
            });
        }
    });
}

export function changeCubesColor(color) {
    cubes.forEach(cube => {
        const layer = cube.position.z / -5
        const darknessFactor = 0.9 / layer
        const darkenedColor = new THREE.Color(color).clone().multiplyScalar(darknessFactor);
        cube.material = new THREE.MeshBasicMaterial({color: darkenedColor})
    });
}

export function changeCubeGeometry(geometry) {
    cubes.forEach(cube => {
        cube.geometry = geometry
    });
}

export function changeCubeScale(scale) {
    cubes.forEach(cube => {
        gsap.to(cube.scale, {
            x: scale,
            y: scale,
            z: scale,
            duration: 0.5,
            ease: "sine.out"
        })
    });
}

export function scatterCubes(factor) {
    cubes.forEach(cube => {
        gsap.to(cube.position, {
            x: cube.position.x + (Math.random() - 0.5) * factor,
            y: cube.position.y + (Math.random() - 0.5) * factor,
            z: cube.position.z + (Math.random() - 0.5) * factor,
            duration: 0.5,
            ease: "sine.out",
        })
    });
}