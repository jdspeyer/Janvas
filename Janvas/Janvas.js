// Janvas Version Information DO NOT CHANGE
const VERSION = 0.1;
const PAGE_ID = "janvas";
console.group(`Janvas Version ${VERSION}`)

// Objects
const CanvasManager = new JCanvasManager(PAGE_ID);
const AssetManager = new JAssetManager();

// Object Exports
export { CanvasManager, AssetManager }

// Classes
import { JCanvasManager } from './Core/CanvasManager.js'
import { JAssetManager } from './Core/AssetManager.js'
import { Asset } from './Objects/Asset.js'

import { Character } from './Objects/Character.js'
import { Stance } from './Objects/Stance.js'
import { Animation } from './Objects/Animation.js'

// Class Exports
export { Asset, Character, Stance, Animation }

// Styles
const STYLE_SHEET = document.createElement('link')
STYLE_SHEET.rel = 'stylesheet'
STYLE_SHEET.href = './Janvas/Janvas.css'
document.head.appendChild(STYLE_SHEET)