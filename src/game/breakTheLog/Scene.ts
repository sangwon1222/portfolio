import { getRankApi, registerRankApi } from '@/service/breakTheLog/rank';
import toast from 'react-hot-toast';
import * as Phaser from 'phaser';
import Log from '@game/breakTheLog/Log';
import gsap from 'gsap';
import { BREAK_THE_LOG_RESOURCE_LIST, INIT_LOG_COUNT, STATUS_LIST } from '@/constants/breakTheLog';
import { CANVAS_HEIGHT, CANVAS_WIDTH, CENTER_X, CENTER_Y } from '@/constants/canvas';

export default class MainScene extends Phaser.Scene {
  private mLogList: Array<Log>;
  private mLogContainer!: Phaser.GameObjects.Container;
  private rankBtn!: Phaser.GameObjects.Text;
  private againBtn!: Phaser.GameObjects.Text;
  private nameInput!: Phaser.GameObjects.DOMElement;
  private returnKey!: Phaser.Input.Keyboard.Key | undefined;
  constructor() {
    super();
    this.mLogList = [];
  }

  preload() {
    this.load.setBaseURL('/assets/rsc/');
    this.load.html('input', 'input.html');

    BREAK_THE_LOG_RESOURCE_LIST.image.forEach(([name, path]) => this.load.image(name, path));
    BREAK_THE_LOG_RESOURCE_LIST.audio.forEach(([name, path]) => this.load.audio(name, path));

    const SPRITE_SCALE = 140;

    this.load.spritesheet('attack-left', 'breakTheLog/image/attack-left.png', {
      frameWidth: SPRITE_SCALE,
      frameHeight: SPRITE_SCALE,
    });

    this.load.spritesheet('attack-right', 'breakTheLog/image/attack-right.png', {
      frameWidth: SPRITE_SCALE,
      frameHeight: SPRITE_SCALE,
    });
  }

  async create() {
    this.add.image(CENTER_X, CENTER_Y, 'bg');

    const X_POSITION = 80;
    const CHARACTER_Y_POSITION = CANVAS_HEIGHT - 160;
    this.add
      .sprite(CENTER_X + X_POSITION, CHARACTER_Y_POSITION, 'attack-left')
      .setName('attack-left')
      .setAlpha(1)
      .setDepth(1);
    this.add
      .sprite(CENTER_X - X_POSITION, CHARACTER_Y_POSITION, 'attack-right')
      .setName('attack-right')
      .setAlpha(0)
      .setDepth(1);

    this.mLogList = [];
    this.mLogContainer = this.add.container(0, 0);

    await this.makeLog();
    for (let i = 0; i < INIT_LOG_COUNT; i++) {
      this.makeRandomLogs();
    }
    await this.makeAnimation();
    await this.makeScoreText();
    await this.makeGuide();
  }

  update() {
    //
  }

  async makeGuide() {
    const dimmed = this.makeDimmed();

    const GUIDE_ICON_GAP = 120;

    // 가이드 아이콘 삽입
    const leftTouchIcon = this.add
      .sprite(CENTER_X - GUIDE_ICON_GAP, CENTER_Y, 'touch-guide')
      .setScale(0.5, 0.5)
      .setDepth(2);
    const rightTouchIcon = this.add
      .sprite(CENTER_X + GUIDE_ICON_GAP, CENTER_Y, 'touch-guide')
      .setScale(0.5, 0.5)
      .setDepth(2);

    // 가이드 아이콘 모션
    gsap
      .to(leftTouchIcon, { y: CENTER_Y - 20, duration: 0.5, repeat: -1, ease: 'none' })
      .yoyo(true);
    gsap
      .to(rightTouchIcon, { y: CENTER_Y - 20, duration: 0.5, repeat: -1, ease: 'none' })
      .yoyo(true);

    // 인터렉션 후, 가이드 제거
    this.input.on('pointerdown', () => {
      this.input.off('pointerdown');
      gsap.globalTimeline.clear();
      leftTouchIcon.destroy();
      rightTouchIcon.destroy();
      dimmed.setActive(false);
      dimmed.setVisible(false);
      this.setInterAct();
    });
  }

  makeDimmed() {
    const dimmed = this.add.graphics().setDepth(2).setName('dimmed');
    dimmed.fillStyle(0x000000, 0.6);
    dimmed.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    dimmed.setActive(true);
    return dimmed;
  }

  async makeAnimation() {
    const ANIMATION_LIST = [
      {
        key: 'attack-left',
        frames: this.anims.generateFrameNumbers('attack-left', {
          start: 0,
          end: 3,
          first: 0,
        }),
        frameRate: 16,
        repeat: 0,
      },
      {
        key: 'attack-right',
        frames: this.anims.generateFrameNumbers('attack-right', {
          start: 0,
          end: 3,
          first: 0,
        }),
        frameRate: 16,
        repeat: 0,
      },
    ];

    ANIMATION_LIST.forEach((options) => this.anims.create(options));
  }

  setInterAct() {
    this.input.setDefaultCursor('pointer');
    this.input.on(
      'pointerdown',
      (pointer: { downX: number }) => {
        const { downX } = pointer;
        const leftCharacter = this.children.getByName('attack-left') as Phaser.GameObjects.Sprite;
        const rightCharacter = this.children.getByName('attack-right') as Phaser.GameObjects.Sprite;

        const isClickLeft = downX < CENTER_X;
        const isClickRight = downX > CENTER_X;
        const isLeftTree =
          this.mLogList[0].key === 'tree-left' || this.mLogList[1].key === 'tree-left';
        const isRightTree =
          this.mLogList[0].key === 'tree-right' || this.mLogList[1].key === 'tree-right';

        // 왼쪽 트리 맞고 GAME OVER
        if (isClickLeft && isLeftTree) return this.theEnd();
        // 오른쪽 트리 맞고 GAME OVER
        if (isClickRight && isRightTree) return this.theEnd();

        // PASS
        if (isClickLeft) {
          leftCharacter.setAlpha(0);
          rightCharacter.setAlpha(1).play('attack-right');
        }

        // PASS
        if (isClickRight) {
          rightCharacter.setAlpha(0);
          leftCharacter.setAlpha(1).play('attack-left');
        }
        this.nextLog();
      },
      this
    );
  }

  async makeScoreText() {
    this.data.set('score', 0);
    this.add
      .text(CENTER_X, 16, 'score: 0', { fontSize: '32px', backgroundColor: '0x000' })
      .setName('scoreText')
      .setOrigin(0.5, 0);
  }

  // 기본 나무토막 만들기
  async makeLog() {
    const log = new Log(this, CENTER_X, CANVAS_HEIGHT - 150, 'tree');
    log.setDepth(0);
    this.mLogContainer.add(log);
    this.mLogList.push(log);
  }

  // 랜덤 나무토막 추가
  addLog(statusList: number[], y: number) {
    const randomIndex = statusList[Math.floor(Math.random() * statusList.length)];
    const log = new Log(this, CENTER_X, y, STATUS_LIST[randomIndex]);
    log.setDepth(0);
    this.mLogContainer.add(log);
    this.mLogList.push(log);
  }

  // 랜덤 나무토막 계산
  async makeRandomLogs() {
    const logsCount = this.mLogList.length;
    const prevStatus = logsCount ? this.mLogList[logsCount - 1].status : 0;
    const y = this.mLogList[logsCount - 1].y - 80;

    switch (prevStatus) {
      case 0:
        return this.addLog([1, 2], y);
      case 1:
        return this.addLog([1, 0], y);
      case 2:
        return this.addLog([2, 0], y);
      default:
        return this.makeLog();
    }
  }

  theEnd() {
    // 이벤트 끄기
    this.input.off('pointerdown');

    // 리소스 destroy
    this.children.getByName('attack-right')?.destroy();
    this.children.getByName('attack-left')?.destroy();

    // 점수 최신화
    (this.children.getByName('scoreText') as Phaser.GameObjects.Text).setText(
      'Score' + (this.data.get('score') as number)
    );

    // 딤드 생성
    const dimmed = this.children.getByName('dimmed') as Phaser.GameObjects.Graphics;
    dimmed?.setActive(true);
    dimmed?.setVisible(true);

    this.nameInput = this.add
      .dom(window.innerWidth / 2, window.innerHeight / 4)
      .createFromCache('input')
      .setDepth(4);
    const nameInputElement = this.nameInput.getChildByName('name') as HTMLInputElement;
    nameInputElement.focus();

    // 랭킹 등록 버튼 생성
    this.rankBtn = this.add
      .text(CENTER_X, CENTER_Y + 100, '랭킹 등록', {
        fontSize: '32px',
        backgroundColor: '0x931C22',
        padding: { x: 24, y: 24 },
      })
      .setOrigin(0.5, 0.5);
    this.rankBtn.setInteractive().setDepth(3);
    this.rankBtn.on('pointerdown', async () => {
      const nickname = nameInputElement.value.trim();
      if (nickname) {
        await this.registerRank();
      } else {
        toast.error('닉네임을 작성해주세요.');
      }
    });

    // 다시하기 버튼 생성

    this.againBtn = this.add
      .text(CENTER_X, CENTER_Y + 200, '다시 하기', {
        fontSize: '32px',
        backgroundColor: '0x000',
        padding: { x: 24, y: 24 },
      })
      .setOrigin(0.5, 0.5);
    this.againBtn.setInteractive().setDepth(3);
    this.againBtn.on('pointerdown', () => window.location.reload());

    this.returnKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.returnKey?.on('down', async () => {
      nameInputElement.blur();
      if (nameInputElement.value != '') await this.registerRank();
    });
  }

  nextLog() {
    if (this.mLogList.length === 0) {
      (this.children.getByName('scoreText') as Phaser.GameObjects.Text).setText('The End');
      return;
    }

    // 통과한 나무토막 제거
    this.mLogList[0].clear();
    this.mLogList.splice(0, 1);
    this.mLogContainer.y += 80;

    // 점수 업데이트
    this.data.set('score', (this.data.get('score') as number) + 10);
    (this.children.getByName('scoreText') as Phaser.GameObjects.Text).setText(
      'Score: ' + (this.data.get('score') as number)
    );

    this.makeRandomLogs();
  }

  async registerRank() {
    this.game.events.emit('onLoading');
    this.againBtn.setVisible(false);
    this.rankBtn.setVisible(false);

    const nameInput = this.nameInput.getChildByName('name') as HTMLInputElement;
    const nickname = nameInput.value.trim();
    const score = this.data.get('score') as number;
    try {
      await registerRankApi('breakthelog', nickname, score);
      const { ok, data } = await getRankApi();
      if (ok) {
        this.nameInput.destroy();
        this.rankBtn.destroy();
        for (let i = 0; i < 10; i++) {
          if (!data[i]) break;
          const backgroundColor =
            data[i].nickname == nickname && data[i].score == score ? '#931C22' : '0x000';

          const rankX = CENTER_X - 160;
          const nameX = rankX + 48;
          const scoreX = nameX + 120;
          // 순위 text
          this.makeText(rankX, i * 48, `0${i + 1}`.slice(-2), backgroundColor);
          // 닉네임 text
          this.makeText(nameX, i * 48, `${data[i].nickname}`, backgroundColor);
          // 점수 text
          this.makeText(scoreX, i * 48, `${data[i].score}점`, backgroundColor);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.game.events.emit('loaded');
    }
    this.againBtn.setVisible(true);
  }

  makeText(
    x: number,
    y: number,
    text: string,
    backgroundColor: string,
    depth: number = 0,
    originX: number = 0,
    originY: number = 0
  ) {
    this.add
      .text(x, y, text, {
        fontSize: '24px',
        backgroundColor,
        padding: { x: 10, y: 10 },
      })
      .setOrigin(originX, originY)
      .setDepth(depth);
  }
}
