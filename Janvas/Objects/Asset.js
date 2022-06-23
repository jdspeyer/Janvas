const ASSET_TYPES = {
    Image: ['STATIC', 'SHEET'],
    Sound: ['SFX', 'MUSIC']
}

export class Asset {
    /**
     * constructor for asset properties.
     * @param {Object} parameters Input parameters
     * @param {string} parameters.path The relative path to the asset location
     * @param {enum} parameters.type Type of file: STATIC, SHEET, SFX, MUSIC
     * @param {number} parameters.width Image width
     * @param {number} parameters.height Image height
     * @param {number} parameters.frameWidth Individual frame width (SHEET)
     * @param {number} parameters.frameHeight Image frane height (SHEET)
     */
    constructor({path: path, type: type, width: width, height: height, frameWidth: frameWidth, frameHeight: frameHeight}){
        this.path = path
        this.element = null;
        this.type = type;

        this.width = width;
        this.height = height;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
    
        if(!this.#isValidType(type)){
            throw `Invalid type declaration. Expected [${Object.values(ASSET_TYPES)}] but recieved ${type}.`
        }
    }
    
    /**
     * used to play assets audio effect manually- used for testing
     */
    play(){
        if(ASSET_TYPES.Sound.includes(this.type)){
            this.element.play()
        }else{
            throw `Invalid element. Play is avaliable to [${ASSET_TYPES.Sound}].`
        }
    }

    /**
     * private function used to check if asset type is supported.
     * @param {enum} type STATIC, SHEET, SFX, MUSIC
     * @returns {boolean} true if asset type is supported, false if asset type is not supported
     */
    #isValidType(type){
        let outcome = false
        const types = Object.values(ASSET_TYPES)
        types.forEach(validTypeList => {
            if(validTypeList.includes(type)){
                outcome =  true
            }
        })
        return outcome
    }

    /**
     * loads the asset
     */
    async load(){
        await this.#loadAsset()
        this.#updateDimensions()
    }
    
    async #loadAsset(){
        return new Promise((resolve, reject) =>{
            let assetWidth = this.width
            let assetHeight = this.height
            
            if(ASSET_TYPES.Image.includes(this.type)){
                this.element = new Image()
                this.element.src = this.path
                this.element.onload = function(){
                    if(assetWidth == undefined){
                        this.assetWidth = this.width
                    }
                    if(assetHeight == undefined){
                        this.assetHeight = this.height
                    }
                    resolve()
                }
                this.width = assetWidth
                this.height = assetHeight
            }
            else if(ASSET_TYPES.Sound.includes(type)){
                this.element = new Audio(this.path)
                resolve()
            }
        })
    }
    
    #updateDimensions(){
        this.width = this.element.assetWidth
        this.height = this.element.assetHeight
    }
}

