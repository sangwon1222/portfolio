"use client";
import Phaser, { Game } from "phaser";
import { calcScreen } from "@/util";
import { useEffect, useRef } from "react";
import MainScene from "./scene";

export async function getRankApi(): Promise<{ ok: boolean; data: any; msg: string }> {
  try {
    const response = await fetch(`/api/rank/breakTheLog`, {
      method: "GET",
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    const result = { ok: false, data: [], msg: JSON.stringify(e) };
    return result;
  }
}

export async function registerRankApi(gamename: string, nickname: string, score: number): Promise<{ ok: boolean; msg: string }> {
  try {
    const response = await fetch(`/api/rank`, {
      method: "POST",
      body: JSON.stringify({ gamename, nickname, score }),
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    const result = { ok: false, msg: JSON.stringify(e) };
    return result;
  }
}

export default function BreakTheLog() {
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
  }, []);
  return <div className="App" id="app" ref={gameRef}></div>;
}
