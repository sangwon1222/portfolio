import MainScene from './Scene';

export default class Buns {
  private mScene: MainScene;
  private mSprite: Phaser.GameObjects.Image;
  private mIsBun: boolean;
  private mPosition: { x: number; y: number };

  get x() {
    return this.mPosition.x;
  }
  get y() {
    return this.mPosition.y;
  }
  constructor(scene: MainScene, x: number, y: number, img: string) {
    this.mIsBun = img == 'buns';
    this.mScene = scene;
    this.mPosition = { x, y };
    this.mSprite = scene.add.image(x, y, img);
    this.mSprite.setInteractive({ cursor: 'pointer' });
    this.mSprite.on('pointerdown', async () => {
      await this.addBun();
    });
  }

  async addBun() {
    const tray = this.mIsBun ? this.mScene.bunsTray : this.mScene.hotDogBunsTray;
    await tray.addBun();
  }
}
