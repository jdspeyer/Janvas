import * as JANVAS from '../Janvas.js'

const ITEM_TYPES = {
    weapon: ['STAFF', 'SWORD', 'BOW', 'NONE'],
    shield: ['SHIELD', 'NONE'],
    armor: ['ARMOR', 'NONE'],
}

export class Item{
    constructor({name: name, layer: layer, type: type, animations: {moveAnimation: moveAnimation, idleAnimation: idleAnimation, attackAnimation: attackAnimation, blockAnimation: blockAnimation, evadeAnimation: evadeAnimation, damageAnimation: damageAnimation, charIdleAnimation: charIdleAnimation, charAttackAnimation: charAttackAnimation, charBlockAnimation: charBlockAnimation, charEvadeAnimation: charEvadeAnimation, charDamageAnimation: charDamageAnimation}, health: health, speed: speed, defense: defense, evasion: evasion, attackDamage: attackDamage, attackNumber: attackNumber, pierce: pierce, regeneration: regeneration, lifesteal: lifesteal}){
        if(!this.#isValidType(type)){
            throw `Invalid type declaration. Expected [${Object.values(ITEM_TYPES)}] but recieved ${type}.`
        }
        
        // Visual
        this.name = name
        this.layer = layer
        this.type = type
        
        // Animations
        this.idleAnimation = idleAnimation
        this.attackAnimation = attackAnimation
        this.blockAnimation = blockAnimation
        this.evadeAnimation = evadeAnimation
        this.damageAnimation = damageAnimation

        // Alters To Character
        this.charIdleAnimation = charIdleAnimation
        this.charAttackAnimation = charAttackAnimation
        this.charBlockAnimation = charBlockAnimation
        this.charEvadeAnimation = charEvadeAnimation
        this.charDamageAnimation = charDamageAnimation

        // Stats Modification
        this.health = health == undefined ? 0 : health
        this.speed = speed == undefined ? 0 : speed
        this.defense = defense == undefined ? 0 : defense
        this.evasion = evasion == undefined ? 0 : evasion
        this.attackDamage = attackDamage == undefined ? 0 : attackDamage
        this.attackNumber = attackNumber == undefined ? 0 : attackNumber
        this.pierce = pierce == undefined ? 0 : pierce
        this.regeneration = regeneration == undefined ? 0 : regeneration
        this.lifesteal = lifesteal == undefined ? 0 : lifesteal
    }

    async damage(x,y){
    }

    /**
     *
     */
    async attack(damage, quantity){
    }

    /**
     *
     */
    block(){

    }

    /**
     * 
     */
    async evade(x,y){
    }

    /**
     *
     */
    async idle(x,y){
    }

    getTypes(){
        return ITEM_TYPES
    }

    /**
     * private function used to check if item type is supported.
     * @param {enum} type STATIC, SHEET, SFX, MUSIC
     * @returns {boolean} true if asset type is supported, false if asset type is not supported
     */
    #isValidType(type){
        let outcome = false
        const types = Object.values(ITEM_TYPES)
        types.forEach(validTypeList => {
            if(validTypeList.includes(type)){
                outcome =  true
            }
        })
        return outcome
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