"use client";
import useLoading from "@/app/providers/loding/useLoading";
import Loading from "@/components/loading";
import { useEffect } from "react";
import * as Phaser from "phaser";
import MainScene from "./scene";
import { Game } from "phaser";

// 공통 API 호출 함수
async function apiRequest(url: string, options: RequestInit): Promise<any> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return { ok: false, msg: error instanceof Error ? error.message : String(error) };
  }
}

export const getRankApi = () => apiRequest("/api/rank/breakTheLog", { method: "GET" });

export const registerRankApi = (gamename: string, nickname: string, score: number) =>
  apiRequest("/api/rank", {
    method: "POST",
    body: JSON.stringify({ gamename, nickname, score }),
  });

const phaserConfig = {
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

export default function BreakTheLog() {
  const { isLoading, setLoadingState } = useLoading();

  const handleOnLoading = () => setLoadingState(true);
  const handleLoaded = () => setLoadingState(false);

  useEffect(() => {
    const app = document.getElementById("phaser-app");
    app?.replaceChildren();

    const gameRef = new Game(phaserConfig) as Phaser.Game;
    gameRef.events.on("onLoading", handleOnLoading);
    gameRef.events.on("loaded", handleLoaded);

    return () => {
      gameRef.events.off("onLoading", handleOnLoading);
      gameRef.events.off("loaded", handleLoaded);
      gameRef.destroy(true);
    };
  }, []);
  return (
    <div className="flex flex-col justify-center w-full h-screen bg-black">
      {isLoading ? <Loading /> : null}
      <div id="phaser-app" />
    </div>
  );
}
