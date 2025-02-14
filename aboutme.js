import { scene, camera, raycaster, mouse } from './main.js'
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import gsap from 'gsap'

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
        object.rotation.z = -0.2
        object.rotation.y = -0.8

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
	},

	function (xhr) {console.log( (xhr.loaded / xhr.total * 100) + '% loaded')},
	function (error) {console.log('An error happened')}
);