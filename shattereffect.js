import { scene } from './main.js'
import * as THREE from 'three'
import gsap from 'gsap'

export function shatter(position, color) {
    const group = new THREE.Group();
    const rotation = new THREE.Euler(0.2, -0.8, -0.2);
    const size = 2;
    const divisions = 4;

    const cubeSize = size / divisions;
    
    for (let x = 0; x < divisions; x++) {
        for (let y = 0; y < divisions; y++) {
            for (let z = 0; z < divisions; z++) {
                const material = new THREE.MeshBasicMaterial({color: color});
                const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
                const cube = new THREE.Mesh(geometry, material);

                cube.position.set(
                    (x - (divisions / 2 - 0.5)) * cubeSize,
                    (y - (divisions / 2 - 0.5)) * cubeSize,
                    (z - (divisions / 2 - 0.5)) * cubeSize
                );  

                group.add(cube);
            }
        }
    }

    group.position.copy(position);
    group.rotation.set(rotation.x, rotation.y, rotation.z);

    scene.add(group);

    const time = 1
    var I = 0

    group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            const originalPosition = child.position.clone();
            child.position.set(0, 0, 0);

            gsap.to(child.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: time,
                ease: "power4.out",
                onUpdate: () => {
                    child.position.copy(originalPosition);
                },
                onComplete: () => {
                    child.position.copy(originalPosition);
                    I++
                    if (I == 64) scene.remove(group)
                }
            });

            const dir = originalPosition.clone().normalize();

            gsap.to(child.position, {
                x: (dir.x + (Math.random() - 0.5) * 0.5 ) * 5,
                y: (dir.y + (Math.random() - 0.5) * 0.5 ) * 5,
                z: (dir.z + (Math.random() - 0.5) * 0.5 ) * 5,
                duration: time,
                ease: "power4.out"
            });

            gsap.to(child.rotation, {
                x: Math.random() * 2,
                y: Math.random() * 2,
                z: Math.random() * 2,
                duration: time,
                ease: "power4.out",
            })
        }
    });
} 