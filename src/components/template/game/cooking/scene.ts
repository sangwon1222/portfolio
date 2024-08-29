import gsap from 'gsap'
import toast from "react-hot-toast";
import Buns from './buns';
import BunsTray from './bunsTray';
import PanContainer from './PanContainer';
export default class MainScene extends Phaser.Scene{
    private mBunsTray!: BunsTray
    get bunsTray(): BunsTray{
        return this.mBunsTray
    }
    private mHotDogBunsTray!: BunsTray
    get hotDogBunsTray(): BunsTray{
        return this.mHotDogBunsTray
    }

    private mPanList!: PanContainer
    get panList(): PanContainer{
        return this.mPanList
    }
    private mGrilleList!: PanContainer
    get grilleList(): PanContainer{
        return this.mGrilleList
    }
    constructor (){
        super();
        console.log('create scene')
    }

    preload ()
    {
        // this.load.setBaseURL('https://lsw.kr/assets/rsc/cooking');
        this.load.setBaseURL('/assets/rsc/');
        
        this.load.image('touch-guide', 'common/image/touch-guide.png');
        this.load.image('mute', 'common/image/mute.png');
        this.load.image('unmute', 'common/image/unmute.png');
        this.load.image('playBtn', 'common/image/play.png');

        this.load.image('bg', 'cooking/image/bg.png');
        this.load.image('buns', 'cooking/image/buns.png');
        this.load.image('bun', 'cooking/image/bun.png');
        this.load.image('hotdog-bun', 'cooking/image/hotdog-bun.png');
        this.load.image('hotdog-buns', 'cooking/image/hotdog-buns.png');
        this.load.image('buns-ketchup', 'cooking/image/buns-ketchup.png');
        this.load.image('ketchup', 'cooking/image/ketchup.png');
        this.load.image('buns-mustard', 'cooking/image/buns-mustard.png');
        this.load.image('mustard', 'cooking/image/mustard.png');
        this.load.image('grille', 'cooking/image/grille.png');
        this.load.image('pan', 'cooking/image/pan.png');
        this.load.image('trash-cans', 'cooking/image/trash-cans.png');
        this.load.image('patty', 'cooking/image/patty.png');
        this.load.image('patty-rare', 'cooking/image/patty-rare.png');
        this.load.image('patty-burnt', 'cooking/image/patty-burnt.png');
        this.load.image('sausage', 'cooking/image/sausage.png');
        this.load.image('sausage-rare', 'cooking/image/sausage-rare.png');
        this.load.image('sausage-burnt', 'cooking/image/sausage-burnt.png');
        this.load.image('tomato', 'cooking/image/tomato.png');
        this.load.image('lettuce', 'cooking/image/lettuce.png');
        this.load.image('tray', 'cooking/image/tray.png');
        this.load.image('buns-tray', 'cooking/image/buns-tray.png');
        this.load.image('buns-up', 'cooking/image/buns-up.png');
        this.load.image('buns-down', 'cooking/image/buns-down.png');
        this.load.image('dispenser', 'cooking/image/dispenser.png');
        this.load.image('drink', 'cooking/image/drink.png');
        this.load.image('guest-menu', 'cooking/image/guest-menu.png');
        
        this.load.spritesheet("guest-in", "cooking/image/guest.png", {
            frameWidth: 200,
            frameHeight: 200,
            startFrame: 1
        });

        this.load.spritesheet("guest-wait", "cooking/image/guest.png", {
            frameWidth: 200,
            frameHeight: 200,
            startFrame: 2
        });

        this.load.spritesheet("guest-out", "cooking/image/guest.png", {
            frameWidth: 200,
            frameHeight: 200,
            startFrame: 3
        });

        this.load.audio('bgm','cooking/sound/bgm.mp3')
        this.load.audio('coin','cooking/sound/coin.mp3')
        this.load.audio('sizzle','cooking/sound/sizzle.mp3')
        this.load.audio('squeeze','cooking/sound/squeeze.mp3')
        this.load.audio('rustle','cooking/sound/rustle.mp3')
        
          
    }

    async create (){
        
        this.add.image(1280/2,720/2,'bg')

        const mute = this.add.image(1280-150/2,150/2,'unmute').setScale(0.5,0.5)
        mute.setInteractive({cursor:'pointer'})
        mute.on('pointerdown',()=>{
            mute.setTexture(this.sound.mute?'unmute':'mute')
            this.sound.mute=!this.sound.mute
        })

        this.add.image(984,640,'trash-cans')
        
        this.mBunsTray = new BunsTray(this,504,520,1,true)
        await this.mBunsTray.init()

        this.mHotDogBunsTray = new BunsTray(this,504+120,520,1,false)
        await this.mHotDogBunsTray.init()

        const buns = new Buns(this,516,640,'buns')
        const hotDogBuns = new Buns(this,516+120,640,'hotdog-buns')


        this.mPanList = new PanContainer(this,984,520,1,true)
        await this.mPanList.init()

        this.mGrilleList = new PanContainer(this,984+120,520,1,false)
        await this.mGrilleList.init()
        
        const tray = this.add.image(984+120+120,420,'tray').setDepth(1)
        
        this.add.image(120/2,500,'dispenser').setDepth(1)

        const graphic = this.add.graphics().setDepth(9).setName('dimmed')
        graphic.fillStyle(0x000000,0.6)
        graphic.fillRect(0,0,1280,720)
        graphic.setActive(true)
        const playBtn = this.add.sprite(1280/2,720/2,'playBtn').setDepth(10)

        this.input.setDefaultCursor('pointer')

        this.input.on('pointerdown',()=>{
            this.input.off('pointerdown')
            this.input.setDefaultCursor('')
            graphic.destroy()
            playBtn.destroy()
            this.sound.play('bgm',{loop:true,volume:1})
        })
    }

    update(){
        //
    }

    addPatty(idx:number, isBun:boolean, x:number,y:number){
        const patty = new Patty(this,idx,  isBun, x,y)
        patty.init()
    }


}

export class Patty{
    private mScene: MainScene
    private mIsBun: boolean
    private mActive: boolean
    private mIdx: number
    private mImage: Phaser.GameObjects.Image
    get image(): Phaser.GameObjects.Image{
        return this.mImage
    }
    constructor(scene: MainScene,idx: number, isBun: boolean,x:number,y:number){
        this.mScene = scene
        this.mIsBun = isBun
        this.mIdx = idx
        this.mActive = true
        this.mImage = scene.add.image(x,y,isBun?'patty-rare':'sausage-rare').setDepth(3)
    }

    async init(){
        this.mScene.time.addEvent({
            delay: 4000,
            callback: ()=>{
                this.setInteractive()
                this.mImage.setTexture(this.mIsBun?'patty':'sausage')
                this.burnt()
            },
            paused: false
        })
    }

    setInteractive(){
        this.mImage.setInteractive({cursor:'pointer',draggable:true})
        this.mScene.add.zone(984+120+120,420, 120, 300).setRectangleDropZone(120, 300);

        this.mScene.input.on('dragstart',(_pointer:any ,gameObject: Phaser.GameObjects.Image)=>{
            this.mScene.children.bringToTop(gameObject)
        },this.mScene)

        this.mScene.input.on('drag',(_pointer:any,gameObject:Phaser.GameObjects.Image,dragX:number,dragY:number)=>{
            gameObject.x = dragX
            gameObject.y = dragY
        },this.mScene)

        this.mScene.input.on('dragend',(_pointer:any,gameObject: any,dropped:boolean)=>{
            console.log(gameObject.x,gameObject.y)
            if (dropped){
                this.mActive = false
                const parent = this.mIsBun? this.mScene.panList: this.mScene.grilleList
                parent.setEmpty(this.mIdx)
            }else{
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        },this.mScene)
    }

    burnt(){
        this.mScene.time.addEvent({
            delay: 3000,
            callback: ()=>{
                if(this.mActive){
                    this.mScene.sound.play('sizzle')
                    this.mImage.setTexture(this.mIsBun?'patty-burnt':'sausage-burnt')
                }
            },
            paused: false
        })
    }
}