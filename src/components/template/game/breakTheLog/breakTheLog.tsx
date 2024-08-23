"use client";
import Phaser, { Game } from "phaser";
import { calcScreen } from "@/util";
import { useEffect, useRef } from "react";
import MainScene from "./scene";

export default function BreakTheLog() {
  const game = useRef(null);
  const phaserConfig = {
    parent: "app",
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    width: 1280,
    height: 720,
    type: Phaser.AUTO,
    transparent: false,
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
        gravity: { x: 0, y: 0 },
      },
    },
    scene: MainScene,
  };

  useEffect(() => {
    const app = document.getElementById("app");
    app.replaceChildren();
    // game 레퍼런스에 phaserConfig 로 씬을 생성
    // 씬은 game 레퍼런스에 HTMLcanvas를 그리는 식으로 생성된다.
    game.current = new Game(phaserConfig);

    window.addEventListener("resize", calcScreen, true);
    return () => window.removeEventListener("resize", calcScreen, true);
  }, []);
  return <div className="App" id="app" ref={game}></div>;
}
