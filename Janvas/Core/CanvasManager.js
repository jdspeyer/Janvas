let layers = []

export class JCanvasManager {
    constructor(id){
        const CANVAS_WIDTH = 640
        const CANVAS_HEIGHT = 360
        
        this.layers = []

        const janvasDiv = document.getElementById(id)
        const layerTotal = Math.floor(janvasDiv.getAttribute('layers'))

        for(let i = 0; i < layerTotal; i++){
            const layer = document.createElement("canvas")
            const context = layer.getContext('2d')

            layer.id = `janvas-layer-${layerTotal-i}`
            layer.style = `z-index: ${layerTotal-i};`
            layer.classList = 'janvas-style-layer'
            layer.width = CANVAS_WIDTH
            layer.height = CANVAS_HEIGHT

            this.layers.push([layer,context])
            janvasDiv.appendChild(layer)
        }
    }

    draw(asset, layer, x, y, frame){
        if(frame == undefined){
            frame = 0
        }

        if(layer > this.layers.length-1){
            throw `No such layer exists.`
        }
        else if(asset == undefined || asset.type == undefined || !(asset.type != 'SHEET' || asset.type != 'STATIC')){
            throw `Object must be asset with type [SHEET, STATIC].`
        }

        const drawContext = this.layers[layer][1]
        
        if(asset.type == 'SHEET'){
            drawContext.drawImage(asset.element, asset.frameWidth*frame, 0, asset.frameWidth, asset.frameHeight, x, y, asset.frameWidth, asset.frameHeight)
        }else{
            drawContext.drawImage(asset.element, x, y)
        }

    }

    erase(layer, x, y, width, height){
        const drawContext = this.layers[layer][1]

        drawContext.clearRect(x, y, width, height);
    }
}