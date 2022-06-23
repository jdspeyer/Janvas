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

        this.animationOriginY = asset.frameWidth * this.#calculateYPosition(startFrame, horizontalFrames)
        this.animationOriginX = asset.frameHeight * this.#calculateXPosition(startFrame, horizontalFrames)
    }

    #calculateYPosition(startFrame, horizontalFrames){
        let rowNumber = 0
        while(startFrame > horizontalFrames){
            startFrame = startFrame - horizontalFrames
            rowNumber++
        }
        return rowNumber
    }

    #calculateXPosition(startFrame, horizontalFrames){
        return startFrame > horizontalFrames ? startFrame % horizontalFrames : startFrame
    }

    draw(){

    }
}