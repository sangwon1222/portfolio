import Log from "./log";

export default class MainScene extends Phaser.Scene
{
    private mIndex: number
    private mLogList: Array<Log>
    private mLogContainer: Phaser.GameObjects.Container
    private mGround: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    // private mGround: Phaser.GameObjects.Graphics
    constructor ()
    {
        super();
        console.log('create scene')
        this.mLogList = []
        this.mIndex=0
    }

    preload ()
    {
        this.load.setBaseURL('https://lsw.kr/assets/rsc/breakTheLog');
        // this.load.setBaseURL('http://localhost:3001');

        this.load.image('bg', 'image/bg.png');
        this.load.image('ground', 'image/ground.png');
        this.load.image('tree', 'image/tree.png');
        this.load.image('tree-left', 'image/tree-left.png');
        this.load.image('tree-right', 'image/tree-right.png');

        this.load.spritesheet("attack-left", "image/attack-left.png", {
            frameWidth: 140,
            frameHeight: 140
        });

          this.load.spritesheet("attack-right", "image/attack-right.png", {
            frameWidth: 140,
            frameHeight: 140
          });
          
    }

    async create (){
        this.add.image(1280/2,720/2,'bg')

        await this.makeLogs()
        

        this.input.on('pointerdown', function (pointer) {
            if(pointer.downX<1280/2){
                if(this.mLogList[1].key==='tree-left'){
                    this.theEnd()
                    return 
                }
                
                this.children.getByName("attack-left")?.setAlpha(0)
                if(this.children.getByName("attack-right")){
                    this.children.getByName("attack-right").setAlpha(1).play('attack-right')
                }else{
                    this.add.sprite(1280/2-80,720-160,'attack-right').setName('attack-right').play('attack-right')
                }
                
            }else{
                if(this.mLogList[1].key==='tree-right'){
                    this.theEnd()
                    return 
                }
                this.children.getByName("attack-right")?.setAlpha(0)
                if(this.children.getByName("attack-left")){
                    this.children.getByName("attack-left")?.setAlpha(1).play('attack-left')
                }else{
                    this.add.sprite(1280/2+80,720-160,'attack-left').setName('attack-left').play('attack-left')
                }
            }
            this.nextLog()
        }, this);

        this.data.set("score",0)
        this.add.text(16,16,'score: 0',{fontSize:'32px', backgroundColor:"0x000"}).setName("scoreText")

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

        this.add.sprite(1280/2-80,720-160,'attack-right').setName('attack-right')
    }
    update(){
        //
    }

    // 0 중
    // 1 좌
    // 2 우
    async makeLogs(){
        this.mLogList = []
        this.mLogContainer = this.add.container(0,0)

        let prevRandom = 1
        for(let i=0; i<100; i++){
            const list = prevRandom?[0]:[0,1,2,1,2]
            const random = list[Math.floor(Math.random()*list.length)] 
            prevRandom = random
            switch (random){
                case 0:
                    const log = new Log(this,1280/2,(720-150)-i*80,'tree')
                    this.mLogContainer.add(log)
                    this.mLogList.push(log)
                    break;
                case 1:
                    const log1 = new Log(this,1280/2,(720-150)-i*80,'tree-left')
                    this.mLogContainer.add(log1)
                    this.mLogList.push(log1)
                    break;
                case 2:
                    const log2 = new Log(this,1280/2,(720-150)-i*80,'tree-right')
                    this.mLogContainer.add(log2)
                    this.mLogList.push(log2)
                    break;
            }
            
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
    }

}