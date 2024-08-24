import Log from "./log";
import gsap from 'gsap'
export default class MainScene extends Phaser.Scene
{
    private mLogList: Array<Log>
    private mLogContainer!: Phaser.GameObjects.Container;
    constructor ()
    {
        super();
        console.log('create scene')
        this.mLogList = []
    }

    preload ()
    {
        // this.load.setBaseURL('https://lsw.kr/assets/rsc/breakTheLog');
        this.load.setBaseURL('/assets/rsc/');

        this.load.image('touch-guide', 'common/image/touch-guide.png');
        this.load.image('bg', 'breakTheLog/image/bg.png');
        this.load.image('ground', 'breakTheLog/image/ground.png');
        this.load.image('tree', 'breakTheLog/image/tree.png');
        this.load.image('tree-left', 'breakTheLog/image/tree-left.png');
        this.load.image('tree-right', 'breakTheLog/image/tree-right.png');

        this.load.spritesheet("attack-left", "breakTheLog/image/attack-left.png", {
            frameWidth: 140,
            frameHeight: 140
        });

          this.load.spritesheet("attack-right", "breakTheLog/image/attack-right.png", {
            frameWidth: 140,
            frameHeight: 140
          });
          
    }

    async create (){
        this.add.image(1280/2,720/2,'bg')
        this.add.sprite(1280/2+80,720-160,'attack-left').setName('attack-left').setAlpha(1)
        this.add.sprite(1280/2-80,720-160,'attack-right').setName('attack-right').setAlpha(0)
        
        this.mLogList = []
        this.mLogContainer = this.add.container(0,0)

        await this.makeLogs()
        await this.makeAnimation()
        await this.makeScoreText()
        await this.makeGuide()}
    update(){
        //
    }

    async makeGuide(){
        const rect = new Phaser.Geom.Rectangle(0, 0, 1280, 720);
        const pointer = this.input.activePointer

        const graphic = this.add.graphics()
        graphic.fillStyle(0x000000,0.6)
        graphic.fillRect(0,0,1280,720)
        graphic.setActive(true)
        const leftTouch = this.add.sprite(1280/2-(140) ,720/2, "touch-guide").setScale(0.5,0.5)
        const rightTouch = this.add.sprite(1280/2+(140) ,720/2, "touch-guide").setScale(0.5,0.5)

        gsap.to(leftTouch,{y:720/2-20,duration:0.5,repeat:-1,ease:'none'}).yoyo(true)
        gsap.to(rightTouch,{y:720/2-20,duration:0.5,repeat:-1,ease:'none'}).yoyo(true)

        this.input.on('pointerdown',()=>{
            this.input.off('pointerdown')
            console.log('clicked');
            gsap.globalTimeline.clear()
            leftTouch.destroy()
            rightTouch.destroy()
            graphic.destroy()
            this.setInterAct()
        })

    }



    async makeAnimation(){
        this.anims.create({
            key:"attack-left",
            frames:this.anims.generateFrameNumbers("attack-left",{
                start:0,
                end:3,
                first:0
            }),
            frameRate:16,
            repeat:0
        })
        this.anims.create({
            key:"attack-right",
            frames:this.anims.generateFrameNumbers("attack-right",{
                start:0,
                end:3,
                first:0,
            }),
            frameRate:16,
            repeat:0
        })
    }
    setInterAct(){
        this.input.setDefaultCursor('pointer')
        this.input.on('pointerdown',  (pointer: { downX: number; }) => {

            const leftCharacter = (this.children.getByName("attack-left") as Phaser.GameObjects.Sprite)
            const rightCharacter = (this.children.getByName("attack-right") as Phaser.GameObjects.Sprite)
            
            if(pointer.downX<1280/2){
                if(this.mLogList[0].key==='tree-left'||this.mLogList[1].key==='tree-left'){
                    this.theEnd()
                    return 
                }

                leftCharacter.setAlpha(0)
                if(rightCharacter) rightCharacter.setAlpha(1).play('attack-right') 
                
            }else{
                if(this.mLogList[0].key==='tree-right'||this.mLogList[1].key==='tree-right'){
                    this.theEnd()
                    return 
                }
                rightCharacter.setAlpha(0)
                if(leftCharacter) leftCharacter.setAlpha(1).play('attack-left')
                
            }
            this.nextLog()
        }, this);

    }
    async makeScoreText(){
        this.data.set("score",0)
        this.add.text(1280/2,16,'score: 0',{fontSize:'32px', backgroundColor:"0x000"}).setName("scoreText").setOrigin(0.5,0)
    }
    // 0 중
    // 1 좌
    // 2 우
    async makeLogs(){
        const log = new Log(this,1280/2,(720-150),'tree')
        this.mLogContainer.add(log)
        this.mLogList.push(log)

        for(let i=0; i<8; i++){
            this.makeRandomLogs()
        }
    }

    async makeRandomLogs(){
        const keyList = ['tree','tree-left','tree-right']
        const logsCount = this.mLogList.length
        const prevStatus = logsCount? this.mLogList[logsCount-1].status : 0
        const x = 1280/2
        const y = this.mLogList[logsCount-1].y -  80 
        switch(prevStatus){
            case 0:
                const list = [1,2]
                const random = list[Math.floor(Math.random()*2)] 
                const log = new Log(this,x ,y ,keyList[random])
                this.mLogContainer.add(log)
                this.mLogList.push(log)
                break;
            case 1:
                const list1 = [0,1]
                const random1 = list1[Math.floor(Math.random()*2)] 
                const log1 = new Log(this,x ,y ,keyList[random1])
                this.mLogContainer.add(log1)
                this.mLogList.push(log1)
                break;
            case 2:
                const list2 = [0,2]
                const random2 = list2[Math.floor(Math.random()*2)] 
                const log2 = new Log(this,x ,y ,keyList[random2])
                this.mLogContainer.add(log2)
                this.mLogList.push(log2)
                break;
        }
    }


    theEnd(){
        this.input.off('pointerdown');
        (this.children.getByName("scoreText") as Phaser.GameObjects.Text).setText('The End' + '/' + 'Score'+(this.data.get("score") as number));
        this.children.getByName("attack-right")?.destroy()
        this.children.getByName("attack-left")?.destroy()

        const text = this.add.text(1280/2,720/2,"다시 하기",{fontSize:"32px", backgroundColor:"0x000",padding:{x:24,y:24}}).setOrigin(0.5,0.5)
        text.setInteractive()
        text.on('pointerdown',()=> window.location.reload() )
    }

    nextLog(){
        if(!this.mLogList[0]){
            console.error('LogList',this.mLogList);
            (this.children.getByName("scoreText") as Phaser.GameObjects.Text).setText('The End');
            return 
        }
        
        this.mLogList[0].clear()
        this.mLogList.splice(0,1)
        this.data.set("score", this.data.get("score") as number + 10);
        (this.children.getByName("scoreText") as Phaser.GameObjects.Text).setText('Score: ' + (this.data.get("score") as number));
        this.mLogContainer.y+=80

        this.makeRandomLogs()
    }

}