import * as JANVAS from "../Janvas/Janvas.js";

const player = new JANVAS.Asset({
    path: './Game/Assets/Player/wanderer.png',
    type: 'SHEET',
    frameWidth: 64,
    frameHeight: 48
})
const warriorPlayer = new JANVAS.Asset({
    path: './Game/Assets/Player/warrior.png',
    type: 'SHEET',
    frameWidth: 64,
    frameHeight: 48
})
const deadPlayer = new JANVAS.Asset({
    path: './Game/Assets/Player/dead.png',
    type: 'SHEET',
    frameWidth: 64,
    frameHeight: 64
})

const bow = new JANVAS.Asset({
    path: './Game/Assets/Player/Bow/wood_bow.png',
    type: 'SHEET',
    frameWidth: 64,
    frameHeight: 48
})
const swordIdle = new JANVAS.Asset({
    path: './Game/Assets/Player/Sword/wood_sword.png',
    type: 'SHEET',
    frameWidth: 64,
    frameHeight: 48    
})
const swordAttack = new JANVAS.Asset({
    path: './Game/Assets/Player/Sword/wood_sword_attack.png',
    type: 'SHEET',
    frameWidth: 64,
    frameHeight: 48    
})

const armor = new JANVAS.Asset({
    path: './Game/Assets/Player/Armor/armor.png',
    type: 'SHEET',
    frameWidth: 64,
    frameHeight: 48 
})

/**
 * loads in the game assets.
 */
async function loadAssets(){
    await player.load()
    await warriorPlayer.load()
    await deadPlayer.load()

    await bow.load()
    await swordIdle.load()
    await swordAttack.load()

    await armor.load()
    
    game()
}

async function game(){
    const characterIdleAnimation = new JANVAS.Animation({asset: player, startFrame: 0, endFrame: 2})
    const characterPunchAnimation = new JANVAS.Animation({asset: player, startFrame: 189, endFrame: 194})
    const characterDamageAnimation = new JANVAS.Animation({asset: player, startFrame: 27, endFrame: 33})
    const characterEvadeAnimation = new JANVAS.Animation({asset: player, startFrame: 72, endFrame: 78})
    const characterMoveAnimation = new JANVAS.Animation({asset: player, startFrame: 54, endFrame: 57})
    const characterDeadAnimation = new JANVAS.Animation({asset: deadPlayer, startFrame: 12, endFrame:16})

    const warriorAttackAnimation = new JANVAS.Animation({asset: warriorPlayer, startFrame: 36, endFrame: 40})
    const warriorBlockAnimation = new JANVAS.Animation({asset: warriorPlayer, startFrame: 0, endFrame: 1})

    const woodSwordIdleAnimation = new JANVAS.Animation({asset: swordIdle, startFrame: 0, endFrame: 2})
    const woodSwordAttackAnimation = new JANVAS.Animation({asset: swordAttack, startFrame: 36, endFrame: 40})
    const woodSwordDamageAnimation = new JANVAS.Animation({asset: swordIdle, startFrame: 27, endFrame: 33})
    const woodSwordEvadeAnimation = new JANVAS.Animation({asset: swordIdle, startFrame: 72, endFrame: 78})

    let woodSword = new JANVAS.Item({
        name: 'Wooden Sword',
        layer: 3,
        type: 'SWORD',
        animations: {
            idleAnimation: woodSwordIdleAnimation,
            attackAnimation: woodSwordAttackAnimation,
            damageAnimation: woodSwordDamageAnimation,
            evadeAnimation: woodSwordEvadeAnimation,

            charAttackAnimation: warriorAttackAnimation
        }
    })

    let character = new JANVAS.Character({
        name: 'Jake',
        layer: 4,
        x: 0,
        y: 0,
        weapon: woodSword,
        animations: {
            idleAnimation: characterIdleAnimation,
            attackAnimation: characterPunchAnimation,
            damageAnimation: characterDamageAnimation,
            evadeAnimation: characterEvadeAnimation,
            blockAnimation: warriorBlockAnimation,
            moveAnimation: characterMoveAnimation,
            deadAnimation: characterDeadAnimation
        }
    })

    character.idle()
    await sleep(1)
    await character.attack()
    await character.attack()
    await sleep(1)
    await character.block()
    await sleep(1)
    for(let i = 0; i < 3; i++){        
        await character.damage(1)
    }
    await sleep(1)
    await character.evade()
    await character.moveto(80)
    character.idle()
    await sleep(1)
    character.dead(0,-16)
}

loadAssets()

function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, duration * 1000)
    })
}