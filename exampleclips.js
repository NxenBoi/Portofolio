import * as THREE from 'three'
import gsap from 'gsap'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { scene, raycaster, toggleParallax } from './main.js'
import { scatterCubes } from './background.js'
import { hello, imnxen, write } from './text.js';
import { shatter } from './shattereffect.js'
import { aboutmebutton } from './aboutme.js'
import { CSS3DObject } from 'three/examples/jsm/Addons.js';

var clip = 0
const clips = [
    "https://www.youtube.com/embed/9fgL2knyVHk",
    "https://www.youtube.com/embed/DzqxjECpr-k",
    "https://www.youtube.com/embed/vtU8Vyu_pnM",
    "https://www.youtube.com/embed/KY_6ZBvADMg",
    "https://www.youtube.com/embed/ClWm6_WkIfQ",
    "https://www.youtube.com/embed/fhZxt_1LmhM",
    "https://www.youtube.com/embed/cBZGKcSU3XQ",
]

var clickable = true

export var exampleclipsbutton
new OBJLoader().load(
    '/public/exampleclips.obj',

    function (object) {
        exampleclipsbutton = object

        object.traverse((child) => {
            if (child.name == 'Base') {
                child.material = new THREE.MeshPhongMaterial({color: 'limegreen'})
            } else {
                child.material = new THREE.MeshPhongMaterial({emissive: 0xffffff, specular: 100, shininess: 100})
            }
        })
        
        scene.add(object)

        object.position.x = 4
        object.position.y = 0
        object.position.z = 2

        object.rotation.x = 0.2
        object.rotation.y = -2.3
        object.rotation.z = 0

        gsap.to(object.position, {
            y: 0.25,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: 0.5,
        })

        gsap.to(object.rotation, {
            y: -2.4,
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
                scene.remove(aboutmebutton)
                switchScene()
            }
        })
    },

    function (error) {console.log('An error happened / ', error)}
);

function makeScreen() {
    const material = [
        new THREE.MeshBasicMaterial({color: 'black'}),
        new THREE.MeshBasicMaterial({color: 'black'}),
        new THREE.MeshBasicMaterial({color: 'black'}),
        new THREE.MeshBasicMaterial({color: 'black'}),
        new THREE.MeshBasicMaterial({color: 'black'}),
        new THREE.MeshBasicMaterial({color: 'black'}),
    ];
    const geometry = new THREE.BoxGeometry(16, 9, 0.1);
    const screen = new THREE.Mesh(geometry, material);
    screen.position.set(0, 0, 1);
    scene.add(screen)

    const material1 = new THREE.MeshPhongMaterial({color: 'limegreen'});
    const geometry1 = new THREE.BoxGeometry(16.1, 9.1, 0.099);
    const frame = new THREE.Mesh(geometry1, material1);
    frame.position.set(0, 0, 1);
    scene.add(frame)

    const leftArrow = write('▶', -9, 0, 1.5, 1.4)
    leftArrow.color = 'limegreen'
    leftArrow.outlineColor = 'green'
    leftArrow.rotation.z = -Math.PI
    scene.add(leftArrow)

    const rightArrow = write('▶', 9, 0, 1.5, 1.4)
    rightArrow.color = 'limegreen'
    rightArrow.outlineColor = 'green'
    scene.add(rightArrow)

    const iframe = document.createElement('iframe');
    iframe.style.width = '800px';
    iframe.style.height = '450px';
    iframe.style.border = '0px';
    iframe.src = clips[clip];
    iframe.allow = 'autoplay; encrypted-media';
    iframe.allowFullscreen = true;
   
    const videoObject = new CSS3DObject(iframe);
    videoObject.position.set(0, 0, 1.05);
    videoObject.scale.set(0.02, 0.02, 0.02);
    scene.add(videoObject);
    
    window.addEventListener('mousemove', () => {
        const intersectsL = raycaster.intersectObject(leftArrow);

        if (intersectsL.length > 0) {
            document.body.style.cursor = 'pointer';
            gsap.to(leftArrow, {
                fontSize: 1.6,
                duration: 0.3,
                ease: "power2.out"
            })
        } else {
            gsap.to(leftArrow, {
                fontSize: 1.4,
                duration: 0.3,
                ease: "power2.out"
            })
        }

        const intersectsR = raycaster.intersectObject(rightArrow);

        if (intersectsR.length > 0) {
            document.body.style.cursor = 'pointer';
            gsap.to(rightArrow, {
                fontSize: 1.6,
                duration: 0.3,
                ease: "power2.out"
            })
        } else {
            gsap.to(rightArrow, {
                fontSize: 1.4,
                duration: 0.3,
                ease: "power2.out"
            })
        }
    })

    window.addEventListener('mousedown', () => {
        const intersectsL = raycaster.intersectObject(leftArrow);
        if (intersectsL.length > 0) {
            clip--
            if (clip < 0) clip = clips.length - 1
            iframe.src = clips[clip];
        }

        const intersectsR = raycaster.intersectObject(rightArrow);
        if (intersectsR.length > 0) {
            clip++
            if (clip >= clips.length) clip = 0
            iframe.src = clips[clip];
        }
    })
}

function renderGrid() {
    clips.forEach((link, i) => {
        var videoFrame = document.createElement('button');
        videoFrame.style.background = 'rgba(34, 34, 34, 0.1)';
        videoFrame.style.borderRadius = '4px';
        videoFrame.style.backdropFilter = 'blur(5px)';
        videoFrame.style.color = 'white';
        videoFrame.style.border = 'none';
        videoFrame.style.padding = '10px 15px';
        videoFrame.style.paddingTop = '15px';
        videoFrame.style.fontSize = '10px';
        videoFrame.style.lineHeight = '1';
        videoFrame.innerHTML = ''; 

        // Create iframe for YouTube embed
        var iframe = document.createElement('iframe');
        iframe.src = link;
        iframe.width = '800';
        iframe.height = '450';
        iframe.style.border = 'none';
        iframe.allow = 'autoplay; encrypted-media';
        iframe.allowFullscreen = true;

        videoFrame.appendChild(iframe);

        var object3d = new CSS3DObject(videoFrame);
        var x = 0.012;
        object3d.scale.set(x, x, x);

        // Grid positioning: 3 per row
        const col = i % 3;
        const row = Math.floor(i / 3);
        const spacingX = 10; // horizontal spacing
        const spacingY = 6; // vertical spacing

        object3d.position.set(
            (col - 1) * spacingX, // center grid horizontally
            -(row * spacingY),    // stack rows downward
            0
        );

        scene.add(object3d);
    });
}

function switchScene() {
    shatter(new THREE.Vector3(4, 0, 2), 'limegreen')
    scatterCubes(2)
    toggleParallax(false)

    //makeScreen()
    renderGrid()

    scene.remove(hello)
    scene.remove(imnxen)

    const title = write('< Example Clips >', 0, 15, 1.5, 1)
    title.outlineColor = 'dimgray'
    scene.add(title)

    gsap.to(title.position, {
        y: 5.5,
        duration: 0.5,
        ease: "power2.out",
    })

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
    object3d.position.set(0, -18, 0);
    scene.add(object3d);

    // Add hover effect
    backButton.addEventListener('mouseenter', () => {
        backButton.style.background = 'rgba(67, 208, 65, 0.15)';
        backButton.style.boxShadow = '0 4px 15px rgba(82, 192, 72, 0.2)';
    });

    backButton.addEventListener('mouseleave', () => {
        backButton.style.background = 'rgba(255, 255, 255, 0.05)';
        backButton.style.boxShadow = 'none';
    });

    backButton.addEventListener('click', () => {
        location.reload();
    });
}