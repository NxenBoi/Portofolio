import { scene } from './main.js'
import { Text } from 'troika-three-text'

export function write(text, x, y, z, size) {
    const newText = new Text()
    newText.anchorX = 'center'
    newText.anchorY = 'middle'
    newText.font = 'public/mcfont.ttf'
    newText.text = text
    newText.fontSize = size
    newText.color = 'white'
    newText.lineHeight = 1.35

    newText.outlineColor = 'dimgray'
    newText.outlineOffsetX = 0.05
    newText.outlineOffsetY = 0.05

    newText.position.x = x
    newText.position.y = y
    newText.position.z = z

    newText.sync()
    return newText
}

export const hello = write('hello', -0.5, 5, 1.5, 1.4)
scene.add(hello)

export const imnxen = write("i'm nxen ♪", 0.7, 3.75, 1.5, 0.8)
scene.add(imnxen)

const x = write('ill give u 5% off', 0, 250, 0, 0.75)
scene.add(x)