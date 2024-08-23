export default class Log extends Phaser.GameObjects.Sprite{
    private mKey:string
    get key():string{
        return this.mKey
    }
    constructor(scene: Phaser.Scene, x:number, y:number,key:string){
        super(scene, x,y,key)
        this.mKey = key
    }
    
    clear(){
        this.destroy()
    }
}