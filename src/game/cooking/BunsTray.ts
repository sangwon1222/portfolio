import { findIndex } from 'lodash-es';
import MainScene from './Scene';
import gsap from 'gsap';

export default class BunsTray {
  private mScene: MainScene;
  private mTrayList: Tray[];
  private mTray!: Tray;
  private mPosition: { x: number; y: number };
  private mStoreState: Array<number> = [1, 1, 1];
  get hasEmpty(): boolean {
    return findIndex(this.mStoreState, (e) => e == 1) != -1;
  }
  private mIsBun: boolean;

  private mActiveCount: number;
  get activeCount(): number {
    return this.mActiveCount;
  }
  get tray(): Phaser.GameObjects.Image {
    return this.mTray.image;
  }

  get x(): number {
    return this.mPosition.x;
  }
  get y(): number {
    return this.mPosition.y;
  }

  constructor(scene: MainScene, x: number, y: number, activeCount: number, isBun: boolean) {
    this.mScene = scene;
    this.mTrayList = [];
    this.mActiveCount = activeCount;
    this.mPosition = { x, y };
    this.mIsBun = isBun;
  }

  async init() {
    this.mTrayList = [
      new Tray(this.mScene, this.mPosition.x, this.mPosition.y, 0, this.mIsBun),
      new Tray(this.mScene, this.mPosition.x, this.mPosition.y - 90, 1, this.mIsBun),
      new Tray(this.mScene, this.mPosition.x, this.mPosition.y - 90 * 2, 2, this.mIsBun),
    ];
  }

  async addBun() {
    const emptyIdx = findIndex(this.mStoreState, (e) => e == 1);
    if (emptyIdx == -1) return;
    const rsc = this.mIsBun ? 'bun' : 'hotdog-bun';
    this.mTrayList[emptyIdx].addBun(rsc);
    this.mStoreState[emptyIdx] = 0;
  }

  async addPatty(idx: number) {
    const bun = this.mIsBun ? 'bun' : 'hotdog-bun';
    if (this.mTrayList[idx].textureName !== bun) return;
    const rsc = this.mIsBun ? 'bun-patty' : 'hotdog';
    this.mTrayList[idx].changeImage(rsc);
    this.mStoreState[idx] = 0;
  }

  remove(idx: number) {
    this.mStoreState[idx] = 1;
  }

  isPass(idx: number) {
    const rsc = this.mIsBun ? 'bun-patty' : 'hotdog';
    const pass = this.mTrayList[idx].textureName && this.mTrayList[idx].textureName != rsc;
    return pass;
  }
}

export class Tray {
  private mScene: MainScene;
  private mContainer: Phaser.GameObjects.Container;
  private mDragStartX!: number;
  private mDragStartY!: number;
  private mIsBun: boolean;
  private mImage!: Phaser.GameObjects.Image;
  get image(): Phaser.GameObjects.Image {
    return this.mImage;
  }
  private mIdx: number;
  get idx(): number {
    return this.mIdx;
  }
  private mIsEmpty: boolean;
  get isEmpty(): boolean {
    return this.mIsEmpty;
  }
  get textureName(): string {
    return this.mImage ? this.mImage.texture.key : '';
  }
  constructor(scene: MainScene, x: number, y: number, idx: number, isBun: boolean) {
    this.mScene = scene;
    this.mContainer = scene.add.container(x, y);
    scene.add.image(x, y, 'buns-tray').setDepth(0);
    this.mIdx = idx;
    this.mIsEmpty = true;
    this.mDragStartX = x;
    this.mDragStartY = y;
    this.mIsBun = isBun;
  }

  addBun(texture: string) {
    if (!this.mIsEmpty) return;
    this.mScene.sound.play('rustle');
    this.mImage = this.mScene.add.image(this.mContainer.x, this.mContainer.y, texture).setDepth(1);
    this.mIsEmpty = false;
  }

  changeImage(texture: string) {
    this.mImage.setTexture(texture);
    this.mIsEmpty = false;
    this.setDragEvent(texture);
  }

  setDragEvent(texture: string) {
    if (!this.mImage) return;
    this.mImage.setInteractive({ cursor: 'pointer', draggable: true });
    this.mImage.on('dragStart', () => {
      this.mDragStartX = this.mImage.x;
      this.mDragStartY = this.mImage.y;
    });
    this.mImage.on('drag', (_pointer: any, dragX: number, dragY: number) => {
      this.mImage.setDepth(4);
      this.mImage.x = dragX;
      this.mImage.y = dragY;
    });
    this.mImage.on('dragend', (_pointer: any) => {
      if (this.mImage.y > 268) {
        this.fail();
      } else {
        if (this.mImage.x >= 0 && this.mImage.x <= 400) {
          const pass = this.mScene.customer.drop(0, texture);
          if (pass) this.success();
          else this.fail();
        } else if (this.mImage.x > 400 && this.mImage.x <= 800) {
          const pass = this.mScene.customer.drop(1, texture);
          if (pass) this.success();
          else this.fail();
        } else if (this.mImage.x > 800 && this.mImage.x <= 1200) {
          const pass = this.mScene.customer.drop(2, texture);
          if (pass) this.success();
          else this.fail();
        } else {
          this.fail();
        }
      }
    });
  }

  empty() {
    this.mIsEmpty = true;
    this.mContainer.removeAll(true);
    this.mContainer.add(this.mScene.add.image(0, 0, 'buns-tray').setDepth(0));
  }

  success() {
    this.mIsEmpty = true;
    this.mImage.destroy(true);
    const coin = this.mIsBun ? 20 : 30;
    this.mScene.setCoin(this.mScene.coin + coin);
    const parent = this.mIsBun ? this.mScene.bunsTray : this.mScene.hotDogBunsTray;
    parent.remove(this.mIdx);
  }

  fail() {
    gsap.to(this.mImage, {
      x: this.mDragStartX,
      y: this.mDragStartY,
      duration: 0.25,
      onComplete: () => {
        this.mImage.setPosition(this.mDragStartX, this.mDragStartY);
      },
    });
  }
}
