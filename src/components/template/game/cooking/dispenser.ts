import gsap from "gsap"
import MainScene from "./scene"

export default class DispenserManager{
    private mScene: MainScene
    private mDispenserList: Array<Dispenser> = []
    private mText: Phaser.GameObjects.Text

    constructor(scene: MainScene){
        this.mScene = scene
        this.mDispenserList = [ new Dispenser(this.mScene, 120/2,500,'dispenser') ]
        this.mText = this.mScene.add.text(120/2,600,'+200원',{fontSize:'24px',backgroundColor:'#000',padding:{x:6,y:6}})
    }

    init(){
        this.mDispenserList[0].start()
        this.mText.setInteractive({cursor:'pointer'})
        this.mText.on('pointerdown',()=>{
            if(this.mScene.coin < 200)return 
            this.mScene.setCoin(this.mScene.coin-200)
            this.addDispenser()
            const { length } = this.mDispenserList
            if(length >= 3) this.mText.destroy(true)
        })
    }

    addDispenser(){
        const { length } = this.mDispenserList
        const dispenser = new Dispenser(this.mScene, 120/2 + (length)*100 ,500,'dispenser')
        this.mDispenserList.push(dispenser)
        dispenser.start()
    }
}

class Dispenser{
    private mScene: MainScene
    private mImage: Phaser.GameObjects.Image
    private mCoke!: Phaser.GameObjects.Image
    private mTimer!: Phaser.Time.TimerEvent
    constructor(scene: MainScene, x:number,y:number,img: string){
        this.mScene = scene
        this.mImage = scene.add.image(x,y,img)
        this.mCoke = this.mScene.add.image(x, y+20,'drink').setAlpha(0)

        this.mCoke.on('drag',async (_pointer:any,dragX:number,dragY:number)=>{
            this.mTimer.paused=true
            this.mCoke.setDepth(4)
            this.mCoke.x = dragX
            this.mCoke.y = dragY
        })
        this.mCoke.on('dragend',async (_pointer:any)=>{
            this.mTimer.paused=false
            if(this.mCoke.y > 268) {
                this.fail()
            } else {
                if(this.mCoke.x>=0 && this.mCoke.x<=400){
                    const pass = this.mScene.customer.drop(0, 'drink')
                    if(pass) this.success()
                    else this.fail()
                }
                else if(this.mCoke.x > 400 && this.mCoke.x <= 800){
                    const pass = this.mScene.customer.drop(1, 'drink')
                    if(pass) this.success()
                    else this.fail()
                }
                else if(this.mCoke.x > 800 && this.mCoke.x <= 1200){
                    const pass = this.mScene.customer.drop(2, 'drink')
                    if(pass) this.success()
                    else this.fail()
                }else {
                    this.fail()
                }
            }
        })

        this.mTimer = this.mScene.time.addEvent({
            delay:4000,
            callback:()=>{
                this.mCoke.setAlpha(1)
                this.mCoke.setInteractive({cursor:'pointer',draggable:true})
            },
            paused: true,
            loop:true
         })
    }

    start(){
        this.mCoke.setPosition(this.mImage.x, this.mImage.y+20)
        this.mTimer.paused=false
    }

    success(){
        this.mCoke.setAlpha(0)
        this.mCoke.setPosition(this.mImage.x,this.mImage.y+20)
        this.mScene.addCoin(10)
    }
    
    fail(){
        gsap.to(this.mCoke,{x: this.mImage.x,y: this.mImage.y+20,duration:0.25})
    }

}