import { scene, camera, raycaster, mouse } from './main.js'
import * as THREE from 'three'
import gsap from 'gsap'
import {Text} from 'troika-three-text'

let text = new Text()
text.anchorX = 'center'
text.anchorY = 'middle'
text.font = 'public/mcfont.ttf'
text.text = "hello!"
text.fontSize = 1.4
text.color = 'white'

text.outlineColor = 'dimgray'
text.outlineOffsetX = 0.05
text.outlineOffsetY = 0.05

text.position.x = -0.5
text.position.y = 5
text.position.z = 1.5

text.sync()
scene.add(text)

let text1 = new Text()
text1.anchorX = 'center'
text1.anchorY = 'middle'
text1.font = 'public/mcfont.ttf'
text1.text = "i'm nxen ♪"
text1.fontSize = 0.8
text1.color = 'white'

text1.outlineColor = 'dimgray'
text1.outlineOffsetX = 0.05
text1.outlineOffsetY = 0.05

text1.position.x = 0.7
text1.position.y = 3.75
text1.position.z = 1.5

text1.sync()
scene.add(text1)