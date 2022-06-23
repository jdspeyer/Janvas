export class Character{
    constructor({name: name, stances: stances, health: health, speed: speed, defense: defense, evasion: evasion, attack: attack, attackNum: attackNum, pierce: pierce, regeneration: regeneration, lifesteal: lifesteal, weapon: weapon, shield: shield, armor: armor}){
        //Visual
        this.name = name
        this.stances = stances
        
        //Stats
        this.health = health == undefined ? 0 : health
        this.speed = speed == undefined ? 0 : speed
        this.defense = defense == undefined ? 0 : defense
        this.evasion = evasion == undefined ? 0 : evasion
        this.attack = attack == undefined ? 0 : attack
        this.attackNum = attackNum == undefined ? 0 : attackNum
        this.pierce = pierce == undefined ? 0 : pierce
        this.regeneration = regeneration == undefined ? 0 : regeneration
        this.lifesteal = lifesteal == undefined ? 0 : lifesteal

        //Equipment
        this.weapon = weapon == undefined ? 0 : weapon
        this.shield = weapon == undefined ? 0 : shield
        this.armor = armor == undefined ? 0 : armor
    }


}