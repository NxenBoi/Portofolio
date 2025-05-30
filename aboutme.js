import * as THREE from 'three'
import gsap from 'gsap'
import { scene, camera, raycaster } from './main.js'
import { toggleCubes } from './background.js'
import { hello, imnxen, write } from './text.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { shatter } from './shattereffect.js'
import { exampleclipsbutton } from './exampleclips.js'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/Addons.js';

const links = {
    "roblox": "https://www.roblox.com/users/605812397/profile",
    "discord": "https://discord.gg/WUwTbXpH8G",
    "youtube": "https://www.youtube.com/@NxenBoi",
    "twitter": "https://x.com/nxen22"
}

var clickable = true

export var aboutmebutton
new OBJLoader().load(
	'/public/aboutme.obj',

	function (object) {
        aboutmebutton = object

        object.traverse((child) => {
            if (child.name == 'Base') {
                child.material = new THREE.MeshPhongMaterial({color: 'hotpink'})
            } else {
                child.material = new THREE.MeshPhongMaterial({emissive: 0xffffff, specular: 100, shininess: 100})
            }
        })
        
        scene.add(object)

        object.position.x = -4
        object.position.y = 0
        object.position.z = 2

        object.rotation.x = 0.2
        object.rotation.y = -0.8
        object.rotation.z = 0

        gsap.to(object.position, {
            y: 0.25,
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
                scene.remove(exampleclipsbutton)
                switchScene()
            }
        })
	},

	function (error) {console.log('An error happened / ', error)}
);

var clock
new OBJLoader().load(
	'/public/clock.obj',

	function (object) {
        object.traverse((child) => {
            if (child.name == 'Interior') {
                child.material = new THREE.MeshPhongMaterial({color: 'black'})
            } else {
                child.material = new THREE.MeshPhongMaterial({color: 'hotpink'})
            }
        })

        object.scale.set(0, 0, 1)

        object.position.x = 9
        object.position.y = -23
        object.position.z = 0

        clock = object
	},

	function (error) {console.log('An error happened / ', error)}
);

function animateParagraph1() {
    setTimeout(() => {
        const p1 = write("I'm an experienced scripter\non Roblox, with a big passion \nfor game development!", -13, -1.5, 1.5, 0.8)
        p1.textAlign = 'left'
        p1.outlineColor = 'dimgray'
        scene.add(p1)

        gsap.to(p1.position, {
            x: -5,
            duration: 0.5,
            ease: "power2.out",
        })

        const material = new THREE.MeshBasicMaterial({color: 'black'});
        const geometry = new THREE.BoxGeometry(3.5, 6, 2);
        const screen = new THREE.Mesh(geometry, material);
        screen.position.set(8.5, -2, 0);
        screen.rotation.set(0, 2.5, 0);
        scene.add(screen)

        const material1 = new THREE.MeshPhongMaterial({color: 'hotpink'});
        const geometry1 = new THREE.BoxGeometry(3.6, 6.1, 1.95);
        const frame = new THREE.Mesh(geometry1, material1);
        frame.position.set(8.5, -2, 0);
        frame.rotation.set(0, 2.5, 0);
        scene.add(frame)
    }, 200);

    setTimeout(() => {
        var i = 0
        for (const [acc, link] of Object.entries(links)) {
            const linkText = write(`@${acc}`, 7.75, 0.25-i*.65, 1, 0)
            linkText.textAlign = 'center'
            linkText.color = 'hotpink'
            linkText.outlineColor = 0x733251
            linkText.outlineOffsetX = 0.025
            linkText.outlineOffsetY = 0.025
            linkText.rotation.y = -0.7
            scene.add(linkText)

            gsap.to(linkText, {
                fontSize: 0.45,
                duration: (i+1)*0.5,
                ease: "expo.out",
            });

            window.addEventListener('mousemove', () => {
                const intersects = raycaster.intersectObject(linkText);

                if (intersects.length > 0) {
                    document.body.style.cursor = 'pointer';
                    gsap.to(linkText, {
                        fontSize: 0.5,
                        duration: 0.3,
                        ease: "power2.out"
                    })
                } else {
                    gsap.to(linkText, {
                        fontSize: 0.45,
                        duration: 0.3,
                        ease: "power2.out"
                    })
                }
            })

            window.addEventListener('mousedown', () => {
                const intersects = raycaster.intersectObject(linkText);

                if (intersects.length > 0) {
                    window.open(link, '_blank');
                }
            })

            i++
        }
    }, 400);
}

function animateParagraph2() {
    const cubePositions = [-11.5, -9.5, -7.5, -5.5];
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
            color: 0x292929,
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

        const targetColor = new THREE.Color('hotpink');
        gsap.to(cube.material.color, {
            r: targetColor.r,
            g: targetColor.g,
            b: targetColor.b,
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
    const bottoms = ["slow", "unsafe", "messy", "rigid"];

    cubePositions.forEach((x, index) => {
        const top = write(tops[index], x, initialY+4.5, 1, 0.4)
        top.color = 'hotpink'
        top.outlineColor = 0x733251
        scene.add(top)

        const bottom = write(bottoms[index], x, initialY-0.5, 1, 0.4)
        bottom.color = 'darkgray'
        bottom.outlineColor = 0x383838
        scene.add(bottom)
    })

    const p1 = write("My code is organized, optimized\nand secure. I easily integrate in\n teams, being able to use any tool.", 13, -12, 1.5, 0.8)
    p1.textAlign = 'right'
    p1.outlineColor = 'dimgray'
    scene.add(p1)

    gsap.to(p1.position, {
        x: 4.25,
        duration: 1,
        ease: "power2.out",
    })
}

function animateParagraph3() {
    const p1 = write("My delivery and responses are\nvery quick, and I'm flexible with\nwhen or how much I can work.", -13, -22.5, 1.5, 0.8)
    p1.textAlign = 'left'
    p1.outlineColor = 'dimgray'
    scene.add(p1)

    gsap.to(p1.position, {
        x: -5,
        duration: 1,
        ease: "power2.out",
    })

    scene.add(clock)

    gsap.to(clock.scale, {
        x: 25,
        y: 25,
        z: 1,
        duration: 1,
        ease: "power4.out",
    })

    clock.traverse((child) => {
        if (child.name === 'ShortHand') {
            child.geometry.computeBoundingBox();
            const boundingBox = child.geometry.boundingBox;

            const pivot = new THREE.Vector3(
                (boundingBox.max.x + boundingBox.min.x) / 2 - 0.03,
                (boundingBox.max.y + boundingBox.min.y) / 2 - 0.0175,
                (boundingBox.max.z + boundingBox.min.z) / 2
            );

            child.geometry.translate(-pivot.x, -pivot.y, -pivot.z);
            child.position.copy(pivot);

            gsap.to(child.rotation, {
                z: Math.PI * 20,
                duration: 10,
                ease: "sine.inOut",
                repeat: -1
            });
        } else if (child.name === 'LongHand') {
            child.geometry.computeBoundingBox();
            const boundingBox = child.geometry.boundingBox;

            const pivot = new THREE.Vector3(
                (boundingBox.max.x + boundingBox.min.x) / 2 - 0.015,
                (boundingBox.max.y + boundingBox.min.y) / 2 - 0.0435,
                (boundingBox.max.z + boundingBox.min.z) / 2
            );

            child.geometry.translate(-pivot.x, -pivot.y, -pivot.z);
            child.position.copy(pivot);

            gsap.to(child.rotation, {
                z: -Math.PI * 20,
                duration: 10,
                ease: "sine.inOut",
                repeat: -1
            });
        }
    });
}

function switchScene() {
    shatter(new THREE.Vector3(-4, 0, 2), 'hotpink')

    scene.remove(hello)
    scene.remove(imnxen)

    toggleCubes(false)

    const title = write('< About Me >', 0, 15, 1.5, 1.4)
    title.outlineColor = 'dimgray'
    scene.add(title)

    gsap.to(title.position, {
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

    var interval2 = setInterval(() => {
        if (camera.position.y < -16) {
            clearInterval(interval2)
            gsap.to(arrow.material, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
            })
            animateParagraph3()
        }
    }, 100);

    var backButton = document.createElement('button');
    backButton.style.background = 'rgba(255, 255, 255, 0.05)';
    backButton.style.borderRadius = '4px';
    backButton.style.backdropFilter = 'blur(5px)';
    backButton.style.color = 'white';
    backButton.style.border = 'none';
    backButton.style.padding = '10px 15px';
    backButton.style.paddingTop = '15px';
    backButton.style.transition = 'all 0.3s ease';
    backButton.style.fontSize = '10px';
    backButton.style.lineHeight = '1';
    backButton.style.transition = 'all 0.3s ease';
    backButton.innerHTML = '< Back >';

    backButton.style.fontFamily = 'Minecraft';
    var fontFace = new FontFace('Minecraft', 'url(/public/mcfont.ttf)');
    fontFace.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        backButton.style.fontFamily = 'Minecraft';
    });

    var object3d = new CSS3DObject(backButton);
    var x = 0.04;
    object3d.scale.set(x, x, x);
    object3d.position.set(0, -28, 0);
    scene.add(object3d);

    // Add hover effect
    backButton.addEventListener('mouseenter', () => {
        backButton.style.background = 'rgba(208, 65, 203, 0.15)';
        backButton.style.boxShadow = '0 4px 15px rgba(192, 72, 162, 0.2)';
    });

    backButton.addEventListener('mouseleave', () => {
        backButton.style.background = 'rgba(255, 255, 255, 0.05)';
        backButton.style.boxShadow = 'none';
    });

    backButton.addEventListener('click', () => {
        location.reload();
    });
}