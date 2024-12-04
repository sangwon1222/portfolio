import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/constants/canvas';
import MainScene from '@/game/cooking/Scene';
import * as Phaser from 'phaser';

export const cookingPhaserConfig = {
  parent: 'phaser-app',
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  type: Phaser.AUTO,
  transparent: false,
  dom: { createContainer: true },
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { x: 0, y: 0 },
    },
  },
  scene: MainScene,
};
