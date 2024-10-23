import DispenserManager from "./dispenser";
import PanContainer from "./PanContainer";
import CustomerManager from "./Customer";
import BunsTray from "./bunsTray";
import BunStore from "./bunStore";
import * as Phaser from "phaser";
import Buns from "./buns";
import gsap from "gsap";

export default class MainScene extends Phaser.Scene {
  private mBunStore!: BunStore;
  get bunStore(): BunStore {
    return this.mBunStore;
  }

  private mCoinText!: Phaser.GameObjects.Text;
  private mCoin: number;
  private mCoinTimeline: gsap.core.Tween | null = null;
  get coin(): number {
    return this.mCoin;
  }

  private mCustomer!: CustomerManager;
  get customer(): CustomerManager {
    return this.mCustomer;
  }

  private mBunsTray!: BunsTray;
  get bunsTray(): BunsTray {
    return this.mBunsTray;
  }
  private mHotDogBunsTray!: BunsTray;
  get hotDogBunsTray(): BunsTray {
    return this.mHotDogBunsTray;
  }

  private mPanList!: PanContainer;
  get panList(): PanContainer {
    return this.mPanList;
  }
  private mGrilleList!: PanContainer;
  get grilleList(): PanContainer {
    return this.mGrilleList;
  }

  private mDispenserManager!: DispenserManager;

  constructor() {
    super();
    this.mCoin = 200;
  }

  preload() {
    // this.load.setBaseURL('https://lsw.kr/assets/rsc/cooking');
    this.load.setBaseURL("/assets/rsc/");

    this.load.image("touch-guide", "common/image/touch-guide.png");
    this.load.image("mute", "common/image/mute.png");
    this.load.image("unmute", "common/image/unmute.png");
    this.load.image("playBtn", "common/image/play.png");
    this.load.image("bg", "cooking/image/bg.png");
    this.load.image("buns", "cooking/image/buns.png");
    this.load.image("bun", "cooking/image/bun.png");
    this.load.image("bun-patty", "cooking/image/bun-patty.png");
    this.load.image("hotdog", "cooking/image/hotdog.png");
    this.load.image("hotdog-bun", "cooking/image/hotdog-bun.png");
    this.load.image("hotdog-buns", "cooking/image/hotdog-buns.png");
    this.load.image("buns-ketchup", "cooking/image/buns-ketchup.png");
    this.load.image("ketchup", "cooking/image/ketchup.png");
    this.load.image("buns-mustard", "cooking/image/buns-mustard.png");
    this.load.image("mustard", "cooking/image/mustard.png");
    this.load.image("grille", "cooking/image/grille.png");
    this.load.image("pan", "cooking/image/pan.png");
    this.load.image("trash-cans", "cooking/image/trash-cans.png");
    this.load.image("patty", "cooking/image/patty.png");
    this.load.image("patty-rare", "cooking/image/patty-rare.png");
    this.load.image("patty-burnt", "cooking/image/patty-burnt.png");
    this.load.image("sausage", "cooking/image/sausage.png");
    this.load.image("sausage-rare", "cooking/image/sausage-rare.png");
    this.load.image("sausage-burnt", "cooking/image/sausage-burnt.png");
    this.load.image("tomato", "cooking/image/tomato.png");
    this.load.image("lettuce", "cooking/image/lettuce.png");
    this.load.image("tray", "cooking/image/tray.png");
    this.load.image("buns-tray", "cooking/image/buns-tray.png");
    this.load.image("buns-up", "cooking/image/buns-up.png");
    this.load.image("buns-down", "cooking/image/buns-down.png");
    this.load.image("dispenser", "cooking/image/dispenser.png");
    this.load.image("drink", "cooking/image/drink.png");
    this.load.image("guest-menu", "cooking/image/guest-menu.png");
    this.load.image("customer-in", "cooking/image/customer-in.png");
    this.load.image("customer", "cooking/image/customer.png");
    this.load.image("customer-wait", "cooking/image/customer-wait.png");

    this.load.audio("bgm", "cooking/sound/bgm.mp3");
    this.load.audio("coin", "cooking/sound/coin.mp3");
    this.load.audio("sizzle", "cooking/sound/sizzle.mp3");
    this.load.audio("squeeze", "cooking/sound/squeeze.mp3");
    this.load.audio("rustle", "cooking/sound/rustle.mp3");
  }

  async create() {
    this.add.image(1280 / 2, 720 / 2, "bg");

    const mute = this.add.image(1280 - 150 / 2, 150 / 2, "unmute").setScale(0.5, 0.5);
    mute.setInteractive({ cursor: "pointer" });
    mute.on("pointerdown", () => {
      mute.setTexture(this.sound.mute ? "unmute" : "mute");
      this.sound.mute = !this.sound.mute;
    });

    this.add.image(1210, 640, "trash-cans");

    this.mBunsTray = new BunsTray(this, 504, 520, 1, true);
    await this.mBunsTray.init();

    this.mHotDogBunsTray = new BunsTray(this, 624, 520, 1, false);
    await this.mHotDogBunsTray.init();

    new Buns(this, 516, 640, "buns");
    new Buns(this, 516 + 120, 640, "hotdog-buns");

    this.mPanList = new PanContainer(this, 984, 520, 1, true);
    await this.mPanList.init();

    this.mGrilleList = new PanContainer(this, 984 + 120, 520, 1, false);
    await this.mGrilleList.init();

    this.mBunStore = new BunStore(this, 984 + 120 + 120, 280);

    this.mDispenserManager = new DispenserManager(this);

    this.mCustomer = new CustomerManager(this);

    const graphic = this.add.graphics().setDepth(9).setName("dimmed");
    graphic.fillStyle(0x000000, 0.6);
    graphic.fillRect(0, 0, 1280, 720);
    graphic.setActive(true);
    const playBtn = this.add.sprite(1280 / 2, 720 / 2, "playBtn").setDepth(10);

    this.input.setDefaultCursor("pointer");

    this.input.on("pointerdown", () => {
      this.input.off("pointerdown");
      this.input.setDefaultCursor("");
      graphic.destroy();
      playBtn.destroy();
      this.sound.play("bgm", { loop: true, volume: 1 });
      this.mDispenserManager.init();
      this.mCustomer.init();
      this.mCoinText = this.add.text(140, 720 - 40, `수익: ${this.mCoin} 원`, {
        fontSize: "32px",
        color: "#fff",
        backgroundColor: "#000",
        padding: { y: 20 },
      });
      this.mCoinText.setOrigin(0.5, 0.5);
    });

    this.game.events.emit("loaded");
  }

  update() {
    if (window.location.pathname !== "/game/cooking/") this.game.destroy(true);
  }

  addPatty(idx: number, isBun: boolean, x: number, y: number) {
    const patty = new Patty(idx, this, isBun, x, y);
    patty.init();
  }

  setCoin(coin: number) {
    // 기존 코인 애니 kill
    this.mCoinTimeline?.kill();
    // 애니 전 상태로 복원
    this.mCoinText.setScale(1, 1);

    // 코인 사운드
    this.sound.play("coin");

    // 코인 업데이트
    this.mCoin = coin;
    this.mCoinText.setText(`수익: ${this.mCoin} 원`);

    // 코인 애니 설정
    this.mCoinTimeline = gsap
      .to(this.mCoinText, { scale: 1.1, duration: 0.15, onComplete: () => (this.mCoinTimeline = null) })
      .repeat(3)
      .yoyo(true);
  }
}

export class Patty {
  private mScene: MainScene;
  private mIdx: number;
  private mIsBun: boolean;
  private mTimer!: Phaser.Time.TimerEvent;
  private mImage: Phaser.GameObjects.Image;
  get image(): Phaser.GameObjects.Image {
    return this.mImage;
  }

  private mState: number = 0;
  get state(): number {
    return this.mState;
  }
  //0 => 'rare'
  //1 => 'well'
  //2 => 'burnt'
  private mDragStartX!: number;
  private mDragStartY!: number;
  // private mInStore: Boolean
  private mInStoreIndex: number;
  set inStoreIndex(v: number) {
    this.mInStoreIndex = v;
  }

  constructor(idx: number, scene: MainScene, isBun: boolean, x: number, y: number) {
    this.mScene = scene;
    this.mIdx = idx;
    this.mIsBun = isBun;
    this.mImage = scene.add.image(x, y, isBun ? "patty-rare" : "sausage-rare").setDepth(3);
    this.mDragStartX = x;
    this.mDragStartY = y;
    // this.mInStore= false
    this.mInStoreIndex = -1;
  }

  async init() {
    this.mState = 0;
    this.mScene.time.addEvent({
      delay: this.mIsBun ? 6000 : 8000,
      callback: () => {
        this.mState = 1;
        this.mScene.sound.play("sizzle");
        this.setDragEvent();
        this.mImage.setTexture(this.mIsBun ? "patty" : "sausage");
        this.burnt();
      },
      paused: false,
    });

    this.mTimer = this.mScene.time.addEvent({
      delay: 8000,
      callback: () => {
        this.mState = 2;
        this.mScene.sound.play("sizzle");
        this.mImage.setTexture(this.mIsBun ? "patty-burnt" : "sausage-burnt");
      },
      paused: true,
    });
  }

  destroy() {
    this.mImage.destroy();
    this.mScene.input.off("dragStart");
    this.mScene.input.off("drag");
    this.mScene.input.off("dragEnd");
  }

  setDragEvent() {
    this.mImage.setInteractive({ cursor: "pointer", draggable: true });

    this.mImage.on(
      "dragstart",
      (_pointer: any, gameObject: Phaser.GameObjects.Image) => {
        this.mDragStartX = this.mImage.x;
        this.mDragStartY = this.mImage.y;
        this.mScene.children.bringToTop(gameObject);
      },
      this.mScene,
    );

    this.mImage.on(
      "drag",
      (_pointer: any, dragX: number, dragY: number) => {
        this.mTimer.timeScale = 0;
        this.mImage.setDepth(4);
        this.mImage.x = dragX;
        this.mImage.y = dragY;
      },
      this.mScene,
    );

    this.mImage.on(
      "dragend",
      (_pointer: any) => {
        const gameObject = this.mImage;
        const { hasEmpty } = this.mScene.bunStore;
        if (gameObject.x <= 570 && gameObject.x >= 440 && this.mIsBun && this.mState == 1) {
          if (gameObject.y > 475 && gameObject.y <= 590) {
            const pass = this.mScene.bunsTray.isPass(0);
            if (pass) this.mScene.bunsTray.addPatty(0);
            else return this.fail();
          }
          if (gameObject.y > 385 && gameObject.y <= 475) {
            const pass = this.mScene.bunsTray.isPass(1);
            if (pass) this.mScene.bunsTray.addPatty(1);
            else return this.fail();
          }
          if (gameObject.y > 295 && gameObject.y <= 385) {
            const pass = this.mScene.bunsTray.isPass(2);
            if (pass) this.mScene.bunsTray.addPatty(2);
            else return this.fail();
          }
          // 햄버거
          if (this.mInStoreIndex != -1) this.mScene.bunStore.remove(this.mInStoreIndex);
          this.mTimer.destroy();
          const parent = this.mScene.panList;
          parent.setEmpty(this.mIdx);
          this.mImage.destroy();
          return;
        }
        if (gameObject.x <= 690 && gameObject.x > 560 && !this.mIsBun && this.mState == 1) {
          if (gameObject.y > 475 && gameObject.y <= 590) {
            const pass = this.mScene.hotDogBunsTray.isPass(0);
            if (pass) this.mScene.hotDogBunsTray.addPatty(0);
            else return this.fail();
          }
          if (gameObject.y > 385 && gameObject.y <= 475) {
            const pass = this.mScene.hotDogBunsTray.isPass(1);
            if (pass) this.mScene.hotDogBunsTray.addPatty(1);
            else return this.fail();
          }
          if (gameObject.y > 295 && gameObject.y <= 385) {
            const pass = this.mScene.hotDogBunsTray.isPass(2);
            if (pass) this.mScene.hotDogBunsTray.addPatty(2);
            else return this.fail();
          }
          // 핫도그
          if (this.mInStoreIndex != -1) this.mScene.bunStore.remove(this.mInStoreIndex);
          this.mTimer.destroy();
          const parent = this.mScene.grilleList;
          parent.setEmpty(this.mIdx);
          this.mImage.destroy();
          return;
        }
        if (
          this.mInStoreIndex == -1 &&
          hasEmpty &&
          gameObject.x < 1280 &&
          gameObject.x > 1160 &&
          gameObject.y > 290 &&
          gameObject.y < 560 &&
          this.mState == 1
        ) {
          // 보관함
          this.mTimer.destroy();
          this.mInStoreIndex = this.mScene.bunStore.getEmptyIdx();
          const parent = this.mIsBun ? this.mScene.panList : this.mScene.grilleList;
          parent.setEmpty(this.mIdx);
          this.mScene.bunStore.add();
          gameObject.x = this.mScene.bunStore.x;
          gameObject.y = this.mScene.bunStore.y + 45 + this.mInStoreIndex * 60;
          return;
        }
        // 휴지통
        if (gameObject.x <= 1280 && gameObject.x >= 1100 && gameObject.y >= 584 && gameObject.y <= 720) {
          if (this.mInStoreIndex != -1) {
            this.mScene.bunStore.remove(this.mInStoreIndex);
          } else {
            const parent = this.mIsBun ? this.mScene.panList : this.mScene.grilleList;
            parent.setEmpty(this.mIdx);
          }
          this.mTimer.destroy();
          this.mImage.destroy();
          return;
        }

        this.fail();
      },
      this.mScene,
    );
  }

  fail() {
    this.mTimer.timeScale = 1;
    const x = this.mDragStartX;
    const y = this.mDragStartY;
    gsap.to(this.mImage, {
      x,
      y,
      duration: 0.25,
      onComplete: () => {
        this.mImage.setPosition(x, y);
      },
    });
  }

  burnt() {
    this.mTimer.paused = false;
  }
}
