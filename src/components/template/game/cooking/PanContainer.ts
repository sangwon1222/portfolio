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
        for(let i=0; i<this.mActiveCount;i++){
            const pan = new Pan(this.mScene,this.mPosition.x,this.mPosition.y-(i*90),this.mIsBun,i)
            this.mPanList.push(pan)
        }
    }

    setEmpty(idx: number){
        this.mPanList[idx].empty()
    }
}

export class Pan {
    private mScene: MainScene
    private mIdx: number
    private mIsBun: boolean
    private mPanTexture: Phaser.GameObjects.Image
    private mPosition: {x:number,y:number}
    get idx(): number{
        return this.mIdx
    }
    private mIsEmpty: boolean
    get isEmpty(): boolean{
        return this.mIsEmpty
    }
    constructor(scene: MainScene,x:number,y:number,isBun:boolean, idx:number){
        this.mScene = scene
        this.mIsBun = isBun
        this.mIdx = idx
        this.mIsEmpty = true
        this.mPosition = {x,y}
        this.mPanTexture = scene.add.image(x,y,isBun?'pan':'grille')
        this.mPanTexture.setInteractive({corsor: 'pointer'})
        this.mPanTexture.on('pointerdown',()=>{
            console.log(this.mIsBun,this.mIdx,this.mIsEmpty)
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

