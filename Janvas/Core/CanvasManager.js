let layers = []

export class JCanvasManager {
    constructor(id){
        const janvasDiv = document.getElementById(id)
        
        const CANVAS_WIDTH = janvasDiv.getAttribute('width')
        const CANVAS_HEIGHT = janvasDiv.getAttribute('height')
        
        this.layers = []

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

    /**
     * draws an image onto the frame
     * @param {object} asset asset object  (SHEET, STATIC)
     * @param {number} layer layer that the asset should be drawn onto
     * @param {number} x x position of the asset
     * @param {number} y y position of the asset
     * @param {number} dx x position on the sheet (SHEET ONLY)
     * @param {number} dy y position on the sheet (SHEET ONLY)
     */
    draw(asset, layer, x, y, dx, dy){
        dx = dx == undefined ? 0 : dx
        dy = dy == undefined ? 0 : dy

        if(layer > this.layers.length-1){
            throw `No such layer exists.`
        }
        else if(asset == undefined || asset.type == undefined || !(asset.type != 'SHEET' || asset.type != 'STATIC')){
            throw `Object must be asset with type [SHEET, STATIC].`
        }

        const drawContext = this.layers[layer][1]
        
        if(asset.type == 'SHEET'){
            drawContext.drawImage(asset.element, dx, dy, asset.frameWidth, asset.frameHeight, x, y, asset.frameWidth, asset.frameHeight)
        }else{
            drawContext.drawImage(asset.element, x, y)
        }

    }

    erase(layer, x, y, width, height){
        const drawContext = this.layers[layer][1]

        drawContext.clearRect(x, y, width, height);
    }
}