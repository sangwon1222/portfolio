import * as Phaser from 'phaser';

export default class Log extends Phaser.GameObjects.Sprite {
  private mKey: string;
  get key(): string {
    return this.mKey;
  }
  private mStatus: number;
  get status(): number {
    return this.mStatus;
  }
  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);
    this.mKey = key;

    const keyList = ['tree', 'tree-left', 'tree-right'];
    this.mStatus = keyList.indexOf(key);
  }

  clear() {
    this.destroy();
  }
}
