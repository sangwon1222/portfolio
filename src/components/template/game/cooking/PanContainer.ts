import { find } from "lodash-es"
import MainScene from "./scene"


export default class PanContainer{
    private mScene: MainScene
    private mPanList: Pan[]
    private mPosition: {x:number,y:number}
    private mActiveIdx: number
    private mIsBun: boolean

    private mActiveCount: number
    get activeCount(): number{
        return this.mActiveCount
    }
    constructor(scene: MainScene,x:number,y:number,activeCount: number,isBun: boolean){
        this.mScene = scene
        this.mActiveIdx = 0
        this.mPanList = []
        this.mActiveCount = activeCount
        this.mPosition = {x,y}
        this.mIsBun = isBun
    }

    async init(){
        const pan = new Pan(0,this.mScene,this.mPosition.x,this.mPosition.y,this.mIsBun)
        this.mPanList.push(pan)

        const text = this.mScene.add.text(this.mPosition.x,this.mPosition.y+40,'+200원',{fontSize:'24px',backgroundColor:'#000',padding:{x:6,y:6}}).setOrigin(0.5,0)
        text.setInteractive({cursor:'pointer'})
        text.on('pointerdown',()=>{
            if(this.mScene.coin<200) return 
            this.mScene.setCoin(this.mScene.coin-200)
            this.addPan()
            const {length} = this.mPanList
            if(length>3) {
                text.destroy(true)
            }
        })
    }

    async addPan(){
        const {length} = this.mPanList
        if(length>3) return 
        const pan = new Pan(this.mPanList.length,this.mScene,this.mPosition.x,this.mPosition.y-(length*60),this.mIsBun)
        this.mPanList.push(pan)
    }

    setEmpty(idx:number){
        this.mPanList[idx]?.empty()
    }
}

class Pan {
    private mScene: MainScene
    private mIdx: number
    private mIsBun: boolean
    private mPanTexture: Phaser.GameObjects.Image
    private mPosition: {x:number,y:number}
    private mIsEmpty: boolean
    get isEmpty(): boolean{
        return this.mIsEmpty
    }
    constructor(idx:number, scene: MainScene,x:number,y:number,isBun:boolean){
        this.mScene = scene
        this.mIdx = idx
        this.mIsBun = isBun
        this.mIsEmpty = true
        this.mPosition = {x,y}
        this.mPanTexture = scene.add.image(x,y,isBun?'pan':'grille')
        this.mPanTexture.setInteractive({corsor: 'pointer'})
        this.mPanTexture.on('pointerdown',()=>{
            if(this.mIsEmpty){
                scene.sound.play('sizzle')
                this.addPatty()
            }
        })
    }

    addPatty(){
        this.mIsEmpty = false
        this.mScene.addPatty(this.mIdx, this.mIsBun, this.mPosition.x,this.mPosition.y)
    }

    empty(){
        this.mIsEmpty = true
    }
}

