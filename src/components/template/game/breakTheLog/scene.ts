import { DOMElement } from "react";
import Log from "./log";
import gsap from 'gsap'
import { getRankApi, registerRankApi } from "./breakTheLog";
export default class MainScene extends Phaser.Scene
{
    private mLogList: Array<Log>
    private mLogContainer!: Phaser.GameObjects.Container;
    private rankBtn!: Phaser.GameObjects.Text
    private againBtn!: Phaser.GameObjects.Text
    private nameInput!: Phaser.GameObjects.DOMElement
    private message!: Phaser.GameObjects.Text;
    private returnKey!: Phaser.Input.Keyboard.Key|undefined;
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
        
        this.load.html("input", "input.html");
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
        const {ok,data} = await getRankApi()
        console.log({ok,data})

        this.add.image(1280/2,720/2,'bg')
        this.add.sprite(1280/2+80,720-160,'attack-left').setName('attack-left').setAlpha(1).setDepth(1)
        this.add.sprite(1280/2-80,720-160,'attack-right').setName('attack-right').setAlpha(0).setDepth(1)
        
        this.mLogList = []
        this.mLogContainer = this.add.container(0,0)

        await this.makeLogs()
        await this.makeAnimation()
        await this.makeScoreText()
        await this.makeGuide()
    }

    update(){
        //
    }

    async makeGuide(){
        const graphic = this.add.graphics().setDepth(2).setName('dimmed')
        graphic.fillStyle(0x000000,0.6)
        graphic.fillRect(0,0,1280,720)
        graphic.setActive(true)
        const leftTouch = this.add.sprite(1280/2-(120) ,720/2, "touch-guide").setScale(0.5,0.5).setDepth(2)
        const rightTouch = this.add.sprite(1280/2+(120) ,720/2, "touch-guide").setScale(0.5,0.5).setDepth(2)

        gsap.to(leftTouch,{y:720/2-20,duration:0.5,repeat:-1,ease:'none'}).yoyo(true)
        gsap.to(rightTouch,{y:720/2-20,duration:0.5,repeat:-1,ease:'none'}).yoyo(true)

        this.input.on('pointerdown',()=>{
            this.input.off('pointerdown')
            gsap.globalTimeline.clear()
            leftTouch.destroy()
            rightTouch.destroy()
            graphic.setActive(false)
            graphic.setVisible(false)
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
        log.setDepth(0)
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
                log.setDepth(0)
                this.mLogContainer.add(log)
                this.mLogList.push(log)
                break;
            case 1:
                const list1 = [0,1]
                const random1 = list1[Math.floor(Math.random()*2)] 
                const log1 = new Log(this,x ,y ,keyList[random1])
                log1.setDepth(0)
                this.mLogContainer.add(log1)
                this.mLogList.push(log1)
                break;
            case 2:
                const list2 = [0,2]
                const random2 = list2[Math.floor(Math.random()*2)] 
                const log2 = new Log(this,x ,y ,keyList[random2])
                log2.setDepth(0)
                this.mLogContainer.add(log2)
                this.mLogList.push(log2)
                break;
        }
    }


    theEnd(){
        this.input.off('pointerdown')
        this.children.getByName("attack-right")?.destroy()
        this.children.getByName("attack-left")?.destroy()
        
        ;(this.children.getByName("scoreText") as Phaser.GameObjects.Text).setText('Score'+(this.data.get("score") as number));

        const dimmed = this.children.getByName('dimmed') as Phaser.GameObjects.Graphics
        dimmed?.setActive(true)
        dimmed?.setVisible(true)

        this.rankBtn = this.add.text(1280/2,720/2,"랭킹 등록",{fontSize:"32px", backgroundColor:"0x931C22",padding:{x:24,y:24}}).setOrigin(0.5,0.5)
        this.rankBtn.setInteractive().setDepth(3)
        this.rankBtn.on('pointerdown',async ()=> {
            await this.regiserRank()
        })
        

        this.againBtn = this.add.text(1280/2,720/2+100,"다시 하기",{fontSize:"32px", backgroundColor:"0x000",padding:{x:24,y:24}}).setOrigin(0.5,0.5)
        this.againBtn.setInteractive().setDepth(3)
        this.againBtn.on('pointerdown',()=> window.location.reload() )

        this.nameInput = this.add.dom(1280/2, 250).createFromCache("input").setDepth(4);
        const nameInput = this.nameInput.getChildByName("name") as HTMLInputElement;
        nameInput.focus()

        this.message = this.add.text(1280/2, 150, "NickName :", {
            color: "#FFFFFF",
            fontSize: 60,
            fontStyle: "bold"
        }).setOrigin(0.5).setDepth(3);
        
        this.returnKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        this.returnKey?.on("down", async () => {
            nameInput.blur()
            if(nameInput.value != "") {
                this.message.setText("NickName : " + nameInput.value.trim());
                await this.regiserRank()
            }
        });
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

    async regiserRank(){
        const nameInput = this.nameInput.getChildByName("name") as HTMLInputElement;
        this.message.setVisible(false)
        this.againBtn.setVisible(false)
        this.rankBtn.setVisible(false)
        this.message.setText("NickName : " + nameInput.value);
        const nickname = this.message.text.slice(10)
        const score = this.data.get("score") as number
        await registerRankApi("breakthelog",nickname, score)
        setTimeout(async () => {
            const {ok,data} = await getRankApi()
            if(ok){
                this.message.destroy()
                this.nameInput.destroy()
                this.rankBtn.destroy()
                
                for(let i=0; i<10; i++){
                    if(!data[i])break;
                    this.add.text(1280/2-140,(i*48)+24, `0${(i+1)}`.slice(-2),{fontSize: "24px", backgroundColor:"0x000", padding:{x:10,y:24},fixedWidth:48}).setOrigin(0.5,0.5).setDepth(10)
                    this.add.text(1280/2,(i*48)+24, `${data[i].nickname}`,{fontSize: "24px", backgroundColor:"0x000", padding:{x:10,y:24},fixedWidth:240}).setOrigin(0.5,0.5).setDepth(10)
                    this.add.text(1280/2+240,(i*48)+24, `score: ${data[i].score}`,{fontSize: "24px", backgroundColor:"0x000", padding:{x:10,y:24}}).setOrigin(0.5,0.5).setDepth(10)
                }
            }
            this.againBtn.setY(720-100)
            this.againBtn.setVisible(true)
        }, 1000);
    }

}