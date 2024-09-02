"use client";
import Phaser, { Game } from "phaser";
import { calcScreen } from "@/util";
import { useEffect, useRef } from "react";
import MainScene from "./scene";

export default function Cooking() {
  const phaserConfig = {
    parent: "app",
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    width: 1280,
    height: 720,
    type: Phaser.AUTO,
    transparent: false,
    dom: { createContainer: true },
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
        gravity: { x: 0, y: 0 },
      },
    },
    scene: MainScene,
  };

  const gameRef = useRef<any>(null);
  useEffect(() => {
    const app = document.getElementById("app");
    app?.replaceChildren();
    gameRef.current = new Game(phaserConfig);
    calcScreen();
    window.addEventListener("resize", calcScreen, true);
    return () => {
      window.removeEventListener("resize", calcScreen, true);
    };
  }, []);
  return <div className="App" id="app" ref={gameRef}></div>;
}
