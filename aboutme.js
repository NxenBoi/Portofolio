import { scene, camera, raycaster, mouse, renderer } from './main.js'
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import gsap from 'gsap'
import { renderGroup } from 'three/tsl';

const loader = new OBJLoader()

loader.load(
	'models/aboutme.obj',

	function (object) {
        object.traverse((child) => {
            if (child.name == 'Base') {
                child.material = new THREE.MeshPhongMaterial({color: 'hotpink'})
            } else {
                child.material = new THREE.MeshPhongMaterial({color: 0x1c1c1c})
            }
        })
        
        scene.add(object)

        object.position.x = -4
        object.position.y = 1
        object.position.z = 2

        object.rotation.x = 0.2
        object.rotation.y = -0.8
        object.rotation.z = -0.2

        gsap.to(object.position, {
            y: 1.25,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        })

        gsap.to(object.rotation, {
            y: -0.9,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        })

        window.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
            raycaster.setFromCamera(mouse, camera);
        
            const intersects = raycaster.intersectObject(object);
        
            if (intersects.length > 0) {
                document.body.style.cursor = 'pointer';
                gsap.to(object.scale, {
                    x: 1.1,
                    y: 1.1,
                    z: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                })
            } else {
                document.body.style.cursor = 'default';
                gsap.to(object.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.3,
                    ease: "power2.out"
                })
            }
        })

        window.addEventListener('mousedown', () => {
            const intersects = raycaster.intersectObject(object);
            if (intersects.length > 0) switchScene(object)
            scene.remove(object)
        })
	},

	function (xhr) {console.log( (xhr.loaded / xhr.total * 100) + '% loaded')},
	function (error) {console.log('An error happened')}
);

const position = new THREE.Vector3(-4, 1, 2);
const rotation = new THREE.Euler(0.2, -0.8, -0.2);
const size = 2;
const divisions = 4;

const group = new THREE.Group();
const cubeSize = size / divisions;
const material = new THREE.MeshBasicMaterial({color: 'hotpink'});

for (let x = 0; x < divisions; x++) {
    for (let y = 0; y < divisions; y++) {
        for (let z = 0; z < divisions; z++) {
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

function shatter() {
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

function switchScene() {
    shatter()
}