import * as JANVAS from "../Janvas/Janvas.js";

const player = new JANVAS.Asset({
    path: './Game/Assets/Player/wanderer.png',
    type: 'SHEET',
    frameWidth: 64,
    frameHeight: 48
})

const bow = new JANVAS.Asset({
    path: './Game/Assets/Player/bow.png',
    type: 'SHEET',
    frameWidth: 64,
    frameHeight: 48
})

const armor = new JANVAS.Asset({
    path: './Game/Assets/Player/armor.png',
    type: 'SHEET',
    frameWidth: 64,
    frameHeight: 48 
})

/**
 * loads in the game assets.
 */
async function loadAssets(){
    await player.load()
    await bow.load()
    await armor.load()
    
    game()
}

async function game(){
    let wanderIdleAnimation = new JANVAS.Animation({
        asset: player,
        startFrame: 10,
        endFrame: 216
    })

    let counter = 0
    while(true){
        JANVAS.CanvasManager.draw(player, 0, 0, 0, counter)
        JANVAS.CanvasManager.draw(bow, 0, 0, 0, counter)
        JANVAS.CanvasManager.draw(armor, 0, 0, 0, counter)
        await sleep(0.2)
        JANVAS.CanvasManager.erase(0, 0, 0, 640, 360)
        if(counter == 2){
            counter = -1
        }
        counter++
    }
}

loadAssets()

function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, duration * 1000)
    })
}