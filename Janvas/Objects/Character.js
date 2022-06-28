import * as JANVAS from '../Janvas.js'

const STATES = {
    idle: 'IDLE',
    attack: 'ATTACK',
    block: 'BLOCK',
    evade: 'EVADE',
    damage: 'DAMAGE',
    none: 'NONE',
    move: 'WALK',
    dead: 'DEAD'
}

export class Character{
    constructor({name: name, layer: layer, x: x, y: y, animations: {moveAnimation: moveAnimation, idleAnimation: idleAnimation, attackAnimation: attackAnimation, blockAnimation: blockAnimation, evadeAnimation: evadeAnimation, damageAnimation: damageAnimation, deadAnimation: deadAnimation}, health: health, speed: speed, defense: defense, evasion: evasion, attackDamage: attackDamage, attackNumber: attackNumber, pierce: pierce, regeneration: regeneration, lifesteal: lifesteal, weapon: weapon, armor: armor, shield: shield}){
        //Visual
        this.name = name
        this.layer = layer
        this.idleAnimation = idleAnimation
        this.attackAnimation = attackAnimation
        this.damageAnimation = damageAnimation
        this.evadeAnimation = evadeAnimation
        this.blockAnimation = blockAnimation
        this.moveAnimation = moveAnimation
        this.deadAnimation = deadAnimation
        this.x = x
        this.y = y

        //Stats
        this.health = health == undefined ? 0 : health
        this.speed = speed == undefined ? 0 : speed
        this.defense = defense == undefined ? 0 : defense
        this.evasion = evasion == undefined ? 0 : evasion
        this.attackDamage = attackDamage == undefined ? 0 : attackDamage
        this.attackNumber = attackNumber == undefined ? 0 : attackNumber
        this.pierce = pierce == undefined ? 0 : pierce
        this.regeneration = regeneration == undefined ? 0 : regeneration
        this.lifesteal = lifesteal == undefined ? 0 : lifesteal

        //Equipment
        this.weapon = undefined
        this.shield = undefined
        this.armor = undefined

        this.equip(weapon)
        this.equip(shield)
        this.equip(armor)

        this.state = STATES.none
        this.canInteract = true
    }

    /**
     * attempt to damage character the provided amount
     * @param {number} amount 
     */
    async damage(amount){
        JANVAS.CanvasManager.erase(this.layer, this.x, this.y, this.damageAnimation.getFrame().asset.frameWidth, this.damageAnimation.getFrame().asset.frameHeight)
        this.state = STATES.damage

        //Damage Logic

        while(this.state == STATES.damage){
            const frame = this.damageAnimation.nextFrame()
            if(this.damageAnimation.hasNextFrame()){
                this.#animateItems()
                JANVAS.CanvasManager.draw(frame.asset, this.layer, this.x, this.y, frame.dx, frame.dy)
                await this.#sleep(0.1)
                JANVAS.CanvasManager.erase(this.layer, this.x, this.y, frame.asset.frameWidth, frame.asset.frameHeight)
            }else{
                this.state = STATES.idle
                this.idle()
            }
        }

    }

    /**
     * attacks enemy
     */
    async attack(){
        if(this.#canInteract()){
            
            JANVAS.CanvasManager.erase(this.layer, this.x, this.y, this.attackAnimation.getFrame().asset.frameWidth, this.attackAnimation.getFrame().asset.frameHeight)
            this.state = STATES.attack

            
            //Attack Logic
    
            
            while(this.state == STATES.attack){
                const frame = this.attackAnimation.nextFrame()
                if(this.attackAnimation.hasNextFrame()){
                    JANVAS.CanvasManager.draw(frame.asset, this.layer, this.x, this.y, frame.dx, frame.dy)
                    this.#animateItems()
                    await this.#sleep(0.1)
                    JANVAS.CanvasManager.erase(this.layer, this.x, this.y, frame.asset.frameWidth, frame.asset.frameHeight)
                }else{
                    this.state = STATES.idle
                    this.idle()
                    this.canInteract = true
                }
            }
        }
    }

    /**
     * blocks an attack
     */
    async block(){
        if(this.#canInteract()){
            JANVAS.CanvasManager.erase(this.layer, this.x, this.y, this.evadeAnimation.getFrame().asset.frameWidth, this.evadeAnimation.getFrame().asset.frameHeight)
            this.state = STATES.block
        }

        while(this.state == STATES.block){
            const frame = this.blockAnimation.nextFrame()
            if(this.blockAnimation.hasNextFrame()){
                JANVAS.CanvasManager.draw(frame.asset, this.layer, this.x, this.y, frame.dx, frame.dy)
                this.#animateItems()
                await this.#sleep(0.1)
                JANVAS.CanvasManager.erase(this.layer, this.x, this.y, frame.asset.frameWidth, frame.asset.frameHeight)
            }else{
                JANVAS.CanvasManager.draw(frame.asset, this.layer, this.x, this.y, frame.dx, frame.dy)
                await this.#sleep(1)
                this.state = STATES.idle
                JANVAS.CanvasManager.erase(this.layer, this.x, this.y, frame.asset.frameWidth, frame.asset.frameHeight)
                this.idle()
                this.canInteract = true
            }
        }
    }

    /**
     * evades an attack
     */
    async evade(){
        JANVAS.CanvasManager.erase(this.layer, this.x, this.y, this.evadeAnimation.getFrame().asset.frameWidth, this.evadeAnimation.getFrame().asset.frameHeight)
        this.state = STATES.evade

        //Damage Logic

        while(this.state == STATES.evade){
            const frame = this.evadeAnimation.nextFrame()
            if(this.evadeAnimation.hasNextFrame()){
                JANVAS.CanvasManager.draw(frame.asset, this.layer, this.x, this.y, frame.dx, frame.dy)
                this.#animateItems()
                await this.#sleep(0.1)
                JANVAS.CanvasManager.erase(this.layer, this.x, this.y, frame.asset.frameWidth, frame.asset.frameHeight)
            }else{
                this.state = STATES.idle
                this.idle()
            }
        }
    }

    /**
     * idle is the default animation state. Used to passively play the provided animation.
     */
    async idle(){
        this.state = STATES.idle
        
        while(this.state == STATES.idle){
            const frame = this.idleAnimation.nextFrame()
            JANVAS.CanvasManager.draw(frame.asset, this.layer, this.x, this.y, frame.dx, frame.dy)
            this.#animateItems()

            await this.#sleep(0.15)
            if(this.state == STATES.idle){
                JANVAS.CanvasManager.erase(this.layer, this.x, this.y, frame.asset.frameWidth, frame.asset.frameHeight)
            }
        }
    }


    async dead(xOffset, yOffset){
        const currentX = this.x
        const currentY = this.y

        JANVAS.CanvasManager.erase(this.layer, this.x, this.y, this.evadeAnimation.getFrame().asset.frameWidth, this.evadeAnimation.getFrame().asset.frameHeight)

        this.x = xOffset == undefined ? this.x : this.x+xOffset
        this.y = yOffset == undefined ? this.y : this.y+yOffset

        this.state = STATES.dead

        while(this.state == STATES.dead){
            const frame = this.deadAnimation.nextFrame()
            if(this.deadAnimation.hasNextFrame()){
                JANVAS.CanvasManager.draw(frame.asset, this.layer, this.x, this.y, frame.dx, frame.dy)
                this.#animateItems()
                await this.#sleep(0.1)
                JANVAS.CanvasManager.erase(this.layer, this.x, this.y, frame.asset.frameWidth, frame.asset.frameHeight)
            }else{
                JANVAS.CanvasManager.draw(frame.asset, this.layer, this.x, this.y, frame.dx, frame.dy)
                await this.#sleep(1)
                JANVAS.CanvasManager.erase(this.layer, this.x, this.y, frame.asset.frameWidth, frame.asset.frameHeight)
                this.x = currentX
                this.y = currentY
                this.hide()
            }
        }

    }

    /**
     * Removes the charcter from the scene and prevents further drawing until
     * the idle state is called again.
     */
    hide(){
        const frame = this.idleAnimation.getFrame()
        JANVAS.CanvasManager.erase(this.layer, this.x, this.y, frame.asset.frameWidth, frame.asset.frameHeight)
        this.state = STATES.none
        this.#animateItems()
    }

    async moveto(x){
        this.state = STATES.move
        if(this.x >= x){
            while(this.x > x){
                const frame = this.moveAnimation.nextFrame()
                JANVAS.CanvasManager.draw(frame.asset, this.layer, this.x, this.y, frame.dx, frame.dy)
                this.x -= 5
                await this.#sleep(0.1)
                JANVAS.CanvasManager.erase(this.layer, this.x, this.y, frame.asset.frameWidth, frame.asset.frameHeight)
            }
        }else{
            while(this.x < x){
                const frame = this.moveAnimation.nextFrame()
                JANVAS.CanvasManager.draw(frame.asset, this.layer, this.x, this.y, frame.dx, frame.dy)
                this.x += 5
                await this.#sleep(0.1)
                JANVAS.CanvasManager.erase(this.layer, this.x, this.y, frame.asset.frameWidth, frame.asset.frameHeight)
            }
        }
    }

    equip(item){
        if(item != undefined){
            try{
                const validTypes = item.getTypes()
                if(validTypes.weapon.includes(item.type)){
                    this.weapon = item
                    this.attackAnimation = item.charAttackAnimation == undefined ? this.attackAnimation : item.charAttackAnimation
                    console.log(this.attackAnimation)
                }
                else if(validTypes.shield.includes(item.type)){
                    this.shield = item
                }
                else if(validTypes.armor.includes(item.type)){
                    this.armor = item
                }
            }
            catch(e){
                throw `Character can only equip type Item.`
            }
        }
    }

    /**
     * 
     * @returns true if the player can interact, false if they cant
     */
    #canInteract(){
        if(this.states == STATES.none){
            return false
        }else if(this.canInteract){
            return true
        }else{
            return false
        }
    }

    /**
     * ensures all equipped items follow the same animation performed by player
     */
    async #animateItems(){
        let weaponFrame
        let shieldFrame
        let armorFrame

        // Relay Idle Animation to items
        if(this.state == STATES.idle){
            if(this.armor != undefined){
                armorFrame = this.armor.idleAnimation.nextFrame()
                JANVAS.CanvasManager.draw(armorFrame.asset, this.layer, this.x, this.y, armorFrame.dx, armorFrame.dy)
            }
            if(this.shield != undefined){
                shieldFrame = this.shield.idleAnimation.nextFrame()
                JANVAS.CanvasManager.draw(shieldFrame.asset, this.layer, this.x, this.y, shieldFrame.dx, sheildFrame.dy)
            }
            if(this.weapon != undefined){
                weaponFrame = this.weapon.idleAnimation.nextFrame()
                JANVAS.CanvasManager.draw(weaponFrame.asset, this.layer, this.x, this.y, weaponFrame.dx, weaponFrame.dy)
            }
        }

        // Relay Attack Animation to items
        else if(this.state == STATES.attack){
            if(this.armor != undefined){
                armorFrame = this.armor.attackAnimation.nextFrame()
                if(this.armor.attackAnimation.hasNextFrame()){
                    JANVAS.CanvasManager.draw(armorFrame.asset, this.layer, this.x, this.y, armorFrame.dx, armorFrame.dy)
                }else{
                    this.armor.attackAnimation.currentFrame = this.armor.attackAnimation.startFrame
                }
            }
            if(this.shield != undefined){
                shieldFrame = this.shield.attackAnimation.nextFrame()
                if(this.shield.attackAnimation.hasNextFrame()){
                    JANVAS.CanvasManager.draw(shieldFrame.asset, this.layer, this.x, this.y, shieldFrame.dx, shieldFrame.dy)
                }else{
                    this.shield.attackAnimation.currentFrame = this.shield.attackAnimation.startFrame
                }
            }
            if(this.weapon != undefined){
                weaponFrame = this.weapon.attackAnimation.nextFrame()
                if(this.weapon.attackAnimation.hasNextFrame()){
                    JANVAS.CanvasManager.draw(weaponFrame.asset, this.layer, this.x, this.y, weaponFrame.dx, weaponFrame.dy)
                }else{
                    this.weapon.attackAnimation.currentFrame = this.weapon.attackAnimation.startFrame
                }
            }
        }

        // Relay Evade Animation to items
        else if(this.state == STATES.evade){
            if(this.armor != undefined){
                armorFrame = this.armor.evadeAnimation.nextFrame()
                if(this.armor.evadeAnimation.hasNextFrame()){
                    JANVAS.CanvasManager.draw(armorFrame.asset, this.layer, this.x, this.y, armorFrame.dx, armorFrame.dy)
                }else{
                    this.armor.evadeAnimation.currentFrame = this.armor.evadeAnimation.startFrame
                }
            }
            if(this.shield != undefined){
                shieldFrame = this.shield.evadeAnimation.nextFrame()
                if(this.shield.evadeAnimation.hasNextFrame()){
                    JANVAS.CanvasManager.draw(shieldFrame.asset, this.layer, this.x, this.y, shieldFrame.dx, shieldFrame.dy)
                }else{
                    this.shield.evadeAnimation.currentFrame = this.shield.evadeAnimation.startFrame
                }
            }
            if(this.weapon != undefined){
                weaponFrame = this.weapon.evadeAnimation.nextFrame()
                if(this.weapon.evadeAnimation.hasNextFrame()){
                    JANVAS.CanvasManager.draw(weaponFrame.asset, this.layer, this.x, this.y, weaponFrame.dx, weaponFrame.dy)
                }else{
                    this.weapon.evadeAnimation.currentFrame = this.weapon.evadeAnimation.startFrame
                }
            }
        }

        // Relay Evade Animation to items
        else if(this.state == STATES.evade){
            if(this.armor != undefined){
                armorFrame = this.armor.evadeAnimation.nextFrame()
                if(this.armor.evadeAnimation.hasNextFrame()){
                    JANVAS.CanvasManager.draw(armorFrame.asset, this.layer, this.x, this.y, armorFrame.dx, armorFrame.dy)
                }else{
                    this.armor.evadeAnimation.currentFrame = this.armor.evadeAnimation.startFrame
                }
            }
            if(this.shield != undefined){
                shieldFrame = this.shield.evadeAnimation.nextFrame()
                if(this.shield.evadeAnimation.hasNextFrame()){
                    JANVAS.CanvasManager.draw(shieldFrame.asset, this.layer, this.x, this.y, shieldFrame.dx, shieldFrame.dy)
                }else{
                    this.shield.evadeAnimation.currentFrame = this.shield.evadeAnimation.startFrame
                }
            }
            if(this.weapon != undefined){
                weaponFrame = this.weapon.evadeAnimation.nextFrame()
                if(this.weapon.evadeAnimation.hasNextFrame()){
                    JANVAS.CanvasManager.draw(weaponFrame.asset, this.layer, this.x, this.y, weaponFrame.dx, weaponFrame.dy)
                }else{
                    this.weapon.evadeAnimation.currentFrame = this.weapon.evadeAnimation.startFrame
                }
            }
        }

        // Relay Damage Animation to items
        else if(this.state == STATES.damage){
            if(this.armor != undefined){
                armorFrame = this.armor.damageAnimation.nextFrame()
                if(this.armor.damageAnimation.hasNextFrame()){
                    JANVAS.CanvasManager.draw(armorFrame.asset, this.layer, this.x, this.y, armorFrame.dx, armorFrame.dy)
                }else{
                    this.armor.damageAnimation.currentFrame = this.armor.damageAnimation.startFrame
                }
            }
            if(this.shield != undefined){
                shieldFrame = this.shield.damageAnimation.nextFrame()
                if(this.shield.damageAnimation.hasNextFrame()){
                    JANVAS.CanvasManager.draw(shieldFrame.asset, this.layer, this.x, this.y, shieldFrame.dx, shieldFrame.dy)
                }else{
                    this.shield.damageAnimation.currentFrame = this.shield.damageAnimation.startFrame
                }
            }
            if(this.weapon != undefined){
                weaponFrame = this.weapon.damageAnimation.nextFrame()
                if(this.weapon.damageAnimation.hasNextFrame()){
                    JANVAS.CanvasManager.draw(weaponFrame.asset, this.layer, this.x, this.y, weaponFrame.dx, weaponFrame.dy)
                }else{
                    this.weapon.damageAnimation.currentFrame = this.weapon.damageAnimation.startFrame
                }
            }
        }
    }

    /**
     * timing function for animations and attack speed
     * @param {number} duration seconds
     * @returns 
     */
    #sleep(duration) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, duration * 1000)
        })
    }
}