import MainScene from "@/components/template/game/breakTheLog/scene";
import * as Phaser from "phaser";

export const breakTheLogPhaserConfig = {
  parent: "phaser-app",
  width: 1280,
  height: 720,
  type: Phaser.AUTO,
  transparent: false,
  dom: { createContainer: true },
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { x: 0, y: 0 },
    },
  },
  scene: MainScene,
};
