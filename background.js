import { scene, camera, raycaster, mouse } from './main.js'
import * as THREE from 'three'
import gsap from 'gsap'

const bgcubecolors = [0x4a4a4a, 0x4a4a4a, 0x4a4a4a, 0x333333, 0x212121]

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