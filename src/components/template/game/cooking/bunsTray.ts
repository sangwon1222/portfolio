import { find } from "lodash-es"
import MainScene from "./scene"

export default class BunsTray{
    private mScene: MainScene
    private mTrayList: Tray[]
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
        this.mTrayList = []
        this.mActiveCount = activeCount
        this.mPosition = {x,y}
        this.mIsBun = isBun
    }

    async init(){
        for(let i=0; i<this.mActiveCount;i++){
            const tray = new Tray(this.mScene,this.mPosition.x,this.mPosition.y-(i*90),i)
            this.mTrayList.push(tray)
        }
    }

    async addBun(){
        if(this.mActiveIdx==this.mActiveCount) return 
        this.mScene.sound.play('rustle')
        const rsc = this.mIsBun?'bun':'hotdog-bun'
        this.mTrayList[this.mActiveIdx].addImage(rsc)
        const emptyTray = find(this.mTrayList,e=> e.isEmpty)
        this.mActiveIdx = emptyTray?emptyTray.idx:this.mActiveCount
    }
}

export class Tray {
    private mScene: MainScene
    private mContainer: Phaser.GameObjects.Container
    private mIdx: number
    get idx(): number{
        return this.mIdx
    }
    private mIsEmpty: boolean
    get isEmpty(): boolean{
        return this.mIsEmpty
    }
    constructor(scene: MainScene,x:number,y:number,idx:number){
        this.mScene = scene
        this.mContainer = scene.add.container(x,y)
        this.mContainer.add(scene.add.image(0,0,'buns-tray').setDepth(0))
        this.mIdx = idx
        this.mIsEmpty = true
    }

    addImage(texture: string){
        this.mContainer.add(this.mScene.add.image(0,0,texture).setDepth(1))
        this.mIsEmpty = false
    }

    empty(){
        this.mIsEmpty = true
        this.mContainer.removeAll(true)
        this.mContainer.add(this.mScene.add.image(0,0,'buns-tray').setDepth(0))
    }
}