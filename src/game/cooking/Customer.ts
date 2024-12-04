import gsap from "gsap";
import MainScene from "./Scene";
import { find, map } from "lodash-es";

export default class CustomerManager {
  private mScene: MainScene;
  private mCustomers: Array<Customer>;
  constructor(scene: MainScene) {
    this.mScene = scene;
    this.mCustomers = [new Customer(scene, 0), new Customer(scene, 1), new Customer(scene, 2)];
  }

  init() {
    map(this.mCustomers, (e) => e.init());

    this.mScene.time.addEvent({
      delay: 20000,
      callback: () => {
        map(this.mCustomers, (e) => (e.complete ? e.init() : null));
      },
      paused: false,
      loop: true,
    });
  }

  drop(idx: number, what: string) {
    const menu = this.mCustomers[idx].menu;
    const texture = find(menu, (e) => e == what);
    if (texture) this.mCustomers[idx].remove(texture);
    return !!texture;
  }
}

class Customer {
  private mScene: MainScene;
  private mIdx: number;
  private mContainer!: Phaser.GameObjects.Container;
  private mImage!: Phaser.GameObjects.Image;
  private mMenu!: Phaser.GameObjects.Image;
  private mMenuList!: Array<Phaser.GameObjects.Image>;
  get menuList(): Array<Phaser.GameObjects.Image> {
    return this.mMenuList;
  }
  set menuList(v: Array<Phaser.GameObjects.Image>) {
    this.mMenuList = v;
  }
  get menu(): Array<string> {
    return map(this.mMenuList, (e) => e.texture.key);
  }
  private mIsComplete: boolean = false;
  get complete(): boolean {
    return this.mIsComplete;
  }

  constructor(scene: MainScene, idx: number) {
    this.mScene = scene;
    this.mIdx = idx;
  }

  init() {
    this.mContainer = this.mScene.add.container(-300, 0);
    this.mImage = this.mScene.add.image(0, 0, "customer-in").setOrigin(0.5, 0).setDepth(0);
    this.mMenu = this.mScene.add.image(-200, 0, "guest-menu").setOrigin(0, 0).setAlpha(0).setDepth(1);
    this.mContainer.add(this.mImage);
    this.mContainer.add(this.mMenu);

    const menu = ["drink", "bun-patty", "hotdog"];
    this.mMenuList = [
      this.mScene.add
        .image(this.mMenu.x + 60, 10, menu[Math.floor(Math.random() * 3)])
        .setDepth(2)
        .setOrigin(0.5, 0)
        .setScale(0.8, 0.8)
        .setAlpha(0),
      this.mScene.add
        .image(this.mMenu.x + 60, 10 + 80, menu[Math.floor(Math.random() * 3)])
        .setDepth(2)
        .setOrigin(0.5, 0)
        .setScale(0.8, 0.8)
        .setAlpha(0),
      this.mScene.add
        .image(this.mMenu.x + 60, 10 + 160, menu[Math.floor(Math.random() * 3)])
        .setDepth(2)
        .setOrigin(0.5, 0)
        .setScale(0.8, 0.8)
        .setAlpha(0),
    ];
    map(this.mMenuList, (e: Phaser.GameObjects.Image) => this.mContainer.add(e));

    const position = [1280 / 2 - 400, 1280 / 2, 1280 / 2 + 400];
    gsap.to(this.mContainer, {
      x: position[this.mIdx],
      duration: 3,
      ease: "none",
      onComplete: () => {
        this.mImage.setTexture("customer");
        this.mMenu.setAlpha(1);
        map(this.mMenuList, (e) => e?.setAlpha(1));
      },
    });
  }

  remove(texture: string) {
    for (let i = 0; i < this.mMenuList.length; i++) {
      if (texture == this.mMenuList[i].texture.key) {
        this.mMenuList[i].destroy(true);
        this.mMenuList.splice(i, 1);
        break;
      }
    }

    if (!this.mMenuList.length) {
      this.mImage.setTexture("customer-in");
      this.mMenu.destroy(true);
      gsap.to(this.mImage, {
        x: 1400,
        duration: 3,
        onComplete: () => {
          gsap.delayedCall(Math.ceil(Math.random() * 2), () => {
            this.mContainer.destroy(true);
            this.init();
          });
        },
      });
    }
  }
}
