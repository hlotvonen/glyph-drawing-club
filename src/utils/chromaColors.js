import { getRandomInt, getRandomFloat } from "./utils"
import chroma from "chroma-js";

export function chromaColor(colors, random, mode, gamma, correctLightness, padding, bezier, scaleLength) {
    let colorArray = []
    if (random == true) {
        let prevColor = chroma.random()
        const randomNum = getRandomInt(3, 5)
        for (let i = 0; i < randomNum; i++) {
            let newColor = chroma.random()
            let i = chroma.deltaE(prevColor, newColor, 2, 0.1)
            do {
                i += chroma.deltaE(prevColor, newColor);
                newColor = chroma.random()
            } while (i < 100);

            const chance = getRandomInt(1, 12)
            if (chance == 1) {
                newColor.saturate(getRandomFloat(0, 4))
            } else if (chance == 2) {
                newColor.desaturate(getRandomFloat(0, 4))
            } else if (chance == 3) {
                newColor.desaturate(getRandomFloat(0, 4))
            } else if (chance == 4) {
                newColor.brighten(getRandomFloat(0, 4))
            } else if (chance == 4) {
                newColor.darken(getRandomFloat(0, 4))
            }
            
            colorArray.push(newColor)
            prevColor = newColor
        }
    } else {
        colorArray = colors
    }
    if (correctLightness == true) {
        return chroma.scale(colorArray).mode('lch').gamma(gamma).padding(padding).correctLightness().colors(scaleLength)
    }
    if (bezier == true) {
        return chroma.bezier(colorArray).scale().mode(mode).gamma(gamma).colors(scaleLength)
    }
    return chroma.scale(colorArray).mode(mode).gamma(gamma).padding(padding).colors(scaleLength)
} 