export class Animation{
    constructor({asset: asset, startFrame: startFrame, endFrame: endFrame}){
        
        if(asset == undefined || asset.type == undefined || asset.type != 'SHEET'){
            throw `Object must be asset with type [SHEET].`
        }

        const horizontalFrames = Math.floor(asset.width/asset.frameWidth)
        const verticalFrames = Math.floor(asset.height/asset.frameHeight)
        const totalFrames = horizontalFrames * verticalFrames

        if(startFrame > endFrame){
            throw `Start frame must be smaller than end frame.`
        }

        if(startFrame > totalFrames || endFrame > totalFrames){
            throw `Frame index out of bounds.`
        }

        this.asset = asset
        this.startFrame = startFrame
        this.endFrame = endFrame
        this.currentFrame = startFrame-1

        this.animationOriginY = asset.frameHeight * this.#calculateYPosition(startFrame, horizontalFrames)
        this.animationOriginX = asset.frameWidth * this.#calculateXPosition(startFrame, horizontalFrames)
    }

    /**
     * calculates the y pixel value of the upper left corner of the provided start frame
     * @param {number} startFrame
     * @param {number} horizontalFrames 
     * @returns value between 0 and verticalFrames indicating the frames vertical position
     */
    #calculateYPosition(startFrame, horizontalFrames){
        let rowNumber = 0
        while(startFrame > horizontalFrames){
            startFrame = startFrame - horizontalFrames
            rowNumber++
        }
        return rowNumber
    }

    /**
     * calculates the x pixel value of the upper left corner of the provided start frame
     * @param {number} startFrame 
     * @param {number} horizontalFrames 
     * @returns {number} value between 0 and horizontalFrames indicating the frames horizontal position
     */
    #calculateXPosition(startFrame, horizontalFrames){
        return startFrame > horizontalFrames ? startFrame % horizontalFrames : startFrame
    }

    /**
     * get information on the next frame
     * @returns {object} frame containing the asset information and draw location of the next frame
     */
    nextFrame(){
        if(this.currentFrame < this.endFrame){
            this.currentFrame++
        }else{
            this.currentFrame = this.startFrame
        }

        let frame = {
            asset: this.asset,
            dx: this.animationOriginX + (this.asset.frameWidth*(this.currentFrame-this.startFrame)),
            dy: this.animationOriginY
        }
        return frame
    }

    /**
     * 
     * @returns {boolean} true if there is another frame left in cycle, false if not.
     */
    hasNextFrame(){
        return !(this.currentFrame == this.endFrame)
    }

    /**
     * get informattion on current frame
     * @returns {object} frame containing the asset information and draw location of the current frame.
     */
    getFrame(){
        let frame = {
            asset: this.asset,
            dx: this.animationOriginX + (this.asset.frameWidth*(this.currentFrame-this.startFrame)),
            dy: this.animationOriginY
        }
        return frame
    }
}