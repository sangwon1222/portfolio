import MainScene from "./scene"

export default class Buns{
    private mScene: MainScene
    private mSprite: Phaser.GameObjects.Image
    private mIsBun: boolean
    constructor(scene: MainScene, x:number,y:number,img: string){
        this.mIsBun = img=='buns'
        this.mScene = scene
        this.mSprite = scene.add.image(x,y,img)
        this.mSprite.setInteractive({cursor:'pointer'})
        this.mSprite.on('pointerdown',async ()=>{
            await this.addBun()
        })
    }

    async addBun(){
        const tray = this.mIsBun?this.mScene.bunsTray:this.mScene.hotDogBunsTray
        await tray.addBun()
    }
}