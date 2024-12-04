import { find, findIndex } from 'lodash-es';
import MainScene, { Patty } from './Scene';
import Buns from './Buns';

export default class BunStore {
  private mScene: MainScene;
  private mPosition: { x: number; y: number };
  get x(): number {
    return this.mPosition.x;
  }
  get y(): number {
    return this.mPosition.y;
  }
  private mStoreState: Array<number> = [1, 1, 1, 1];
  get hasEmpty(): boolean {
    return findIndex(this.mStoreState, (e) => e == 1) != -1;
  }

  constructor(scene: MainScene, x: number, y: number) {
    this.mScene = scene;
    this.mPosition = { x, y };
    scene.add.image(x, y, 'tray').setDepth(1).setOrigin(0.5, 0);
  }

  async init() {
    //
  }

  getEmptyIdx() {
    return findIndex(this.mStoreState, (e) => e == 1);
  }

  async add() {
    const emptyIdx = findIndex(this.mStoreState, (e) => e == 1);
    if (emptyIdx == -1) return;
    this.mStoreState[emptyIdx] = 0;
  }

  remove(idx: number) {
    this.mStoreState[idx] = 1;
  }

  reset() {
    this.mStoreState = [1, 1, 1, 1];
  }
}
