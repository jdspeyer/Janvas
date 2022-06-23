export class JAssetManager {
    constructor(){
        
        this.ids = []

        this.FILE_TYPES = {
            Sound: 'SOUND',
            Image: 'IMAGE'
        }

        this.ASSETS_HOLDER = document.createElement('div')
        this.ASSETS_HOLDER.className = 'janvas-style-hidden'
        document.body.appendChild(this.ASSETS_HOLDER)
    }
}