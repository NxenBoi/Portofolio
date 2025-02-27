import { scene, camera, raycaster, mouse } from './main.js'
import { toggleCubes } from './background.js'
import { hello, imnxen, write } from './text.js';
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import gsap from 'gsap'

const links = {
    "roblox": "https://www.roblox.com/users/605812397/profile",
    "discord": "https://discord.gg/WUwTbXpH8G"
}

var clickable = true

new OBJLoader().load(
	'/public/aboutme.obj',

	function (object) {
        object.traverse((child) => {
            if (child.name == 'Base') {
                child.material = new THREE.MeshPhongMaterial({color: 'hotpink'})
            } else {
                child.material = new THREE.MeshPhongMaterial({emissive: 0xffffff, specular: 100, shininess: 100})
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
            
            if (intersects.length > 0 && clickable) {
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
            if (intersects.length > 0 && clickable) {
                clickable = false
                scene.remove(object)
                switchScene(object)
            }
        })
	},

	function (xhr) {console.log( (xhr.loaded / xhr.total * 100) + '% loaded')},
	function (error) {console.log('An error happened')}
);

const group = new THREE.Group();
function makeCubes() {
    const position = new THREE.Vector3(-4, 1, 2);
    const rotation = new THREE.Euler(0.2, -0.8, -0.2);
    const size = 2;
    const divisions = 4;

    const cubeSize = size / divisions;
    
    for (let x = 0; x < divisions; x++) {
        for (let y = 0; y < divisions; y++) {
            for (let z = 0; z < divisions; z++) {
                const material = new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff});
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
}   

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

var pc
new MTLLoader().load('public/pc.mtl', (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('public/pc.obj', (object) => {
        object.position.set(8.5, -2.5, 0);
        object.rotation.set(0, 2.5 ,0)
        object.scale.set(0, 0, 0);
        pc = object
    });
});

function animateParagraph1() {
    setTimeout(() => {
        const p1 = write("i'm an experienced scripter\non Roblox, with a big passion \nfor game development!", -13, -1.5, 1.5, 0.8)
        p1.textAlign = 'left'
        p1.outlineColor = 0x8a4565
        scene.add(p1)

        gsap.to(p1.position, {
            x: -5,
            duration: 0.5,
            ease: "power2.out",
        })

        scene.add(pc);
        gsap.to(pc.scale, {
            x: 2,
            y: 2,
            z: 2,
            duration: 0.5,
            ease: "expo.out",
        });
    }, 200);

    setTimeout(() => {
        var i = 0
        for (const [acc, link] of Object.entries(links)) {
            const linkText = write(acc, 7.2, -.15-i*.5, 1.5, 0)
            linkText.textAlign = 'center'
            linkText.color = 0x00ff00
            linkText.outlineColor = 0x006100
            linkText.outlineOffsetX = 0.025
            linkText.outlineOffsetY = 0.025
            linkText.rotation.y = -0.7
            scene.add(linkText)

            gsap.to(linkText, {
                fontSize: 0.35,
                duration: (i+1)*0.5,
                ease: "expo.out",
            });

            i++
        }
    }, 400);
}

function animateParagraph2() {
    const cubePositions = [-11, -9, -7, -5];
    const cubeHeight = 4;
    const initialY = -13.5;
    const initialZ = 1;
    const delayIncrement = 0.1;

    cubePositions.forEach((x, index) => {
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.FrontSide, });
        const geometry = new THREE.BoxGeometry(0.75, cubeHeight, 0.75);
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, initialY, initialZ);
        cube.rotation.set(0, 1, 0);
        cube.scale.set(0, 0, 0);
        scene.add(cube);

        const backgroundMaterial = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: 0x1f1f1f,
            transparent: true,
            opacity: 1
        });
        const backgroundCube = new THREE.Mesh(geometry, backgroundMaterial);
        backgroundCube.position.set(x, initialY, initialZ);
        backgroundCube.rotation.set(0, 1, 0);
        backgroundCube.scale.set(0.99, 0, 0.99);
        scene.add(backgroundCube);

        gsap.to(backgroundCube.scale, {
            y: 0.99,
            duration: 0.75,
            ease: "back.out(0.5)",
            delay: index * delayIncrement
        });

        gsap.to(backgroundCube.position, {
            y: backgroundCube.position.y + 2,
            duration: 0.75,
            ease: "back.out(0.5)",
            delay: index * delayIncrement
        });

        gsap.to(cube.material.color, {
            r: 0,
            g: 1,
            b: 0,
            duration: 2,
            ease: "expo.Out",
            delay: index * delayIncrement
        });

        gsap.to(cube.scale, {
            y: 1,
            duration: 2,
            ease: "expo.Out",
            delay: index * delayIncrement,

            onStart: () => {
                cube.scale.x = 1
                cube.scale.z = 1
            },
        });

        gsap.to(cube.position, {
            y: cube.position.y + 2,
            duration: 2,
            ease: "expo.Out",
            delay: index * delayIncrement
        });
    });

    const tops = ["fast", "safe", "clean", "modular"];
    const bottoms = ["slow", "unsafe", "mess", "fixed"];

    cubePositions.forEach((x, index) => {
        const top = write(tops[index], x, initialY+4.5, 1, 0.4)
        top.color = 'limegreen'
        top.outlineColor = 'darkgreen'
        scene.add(top)

        const bottom = write(bottoms[index], x, initialY-0.5, 1, 0.4)
        bottom.color = 'red'
        bottom.outlineColor = 'darkred'
        scene.add(bottom)
    })

    const p1 = write("my code is organized, optimized\nand secure. i always make sure\nthese requirements are met.", 13, -12, 1.5, 0.8)
    p1.textAlign = 'right'
    p1.outlineColor = 0x8a4565
    scene.add(p1)

    gsap.to(p1.position, {
        x: 4.25,
        duration: 1,
        ease: "power2.out",
    })
}

function switchScene() {
    makeCubes()
    shatter()

    const targetColor = new THREE.Color(0xc4588e);
    gsap.to(scene.background, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        duration: 2,
        ease: "power2.out",
    });

    scene.remove(hello)
    scene.remove(imnxen)

    toggleCubes(false)

    const aboutme = write('< About Me >', 0, 15, 1.5, 1.4)
    aboutme.outlineColor = 0x8a4565
    scene.add(aboutme)

    gsap.to(aboutme.position, {
        y: 4.5,
        duration: 0.5,
        ease: "power2.out",
    })

    const arrow = write('▶', 0, -6, 1.5, 1.4)
    arrow.color = null
    arrow.outlineOpacity = 0
    arrow.material = new THREE.MeshBasicMaterial({color: 'black', transparent: true, opacity: 0.25})
    arrow.rotation.z = -Math.PI/2
    scene.add(arrow)

    animateParagraph1()
    
    var interval = setInterval(() => {
        if (camera.position.y < -4) {
            clearInterval(interval)
            gsap.to(arrow.material, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
            })
            animateParagraph2()
        }
    }, 100);

    setTimeout(() => {
        const p1 = write("my delivery and responses are\nvery quick, and i'm flexible with\nwhen or how much i can work.", -13, -22.5, 1.5, 0.8)
        p1.textAlign = 'left'
        p1.outlineColor = 0x8a4565
        scene.add(p1)

        gsap.to(p1.position, {
            x: -5,
            duration: 0.5,
            ease: "power2.out",
        })
    }, 600);
}