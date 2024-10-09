"use client";
import useLoading from "@/app/[locale]/providers/loding/useLoading";
import Loading from "@/components/loading";
import { calcScreen } from "@/util";
import { useEffect } from "react";
import * as Phaser from "phaser";
import MainScene from "./scene";
import { Game } from "phaser";

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

export default function Cooking() {
  const { isLoading, setLoadingState } = useLoading();

  const handleLoaded = () => setLoadingState(false);

  useEffect(() => {
    setLoadingState(true);

    const app = document.getElementById("app");
    app?.replaceChildren();

    const gameRef = new Game(phaserConfig) as Phaser.Game;
    gameRef.events.on("loaded", handleLoaded);

    calcScreen(gameRef);
    const calcCanvas = () => calcScreen(gameRef);
    window.addEventListener("resize", calcCanvas, true);

    return () => {
      gameRef.events.off("loaded", handleLoaded);
      window.removeEventListener("resize", calcCanvas, true);
      gameRef.destroy(true);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center w-full h-screen bg-black">
      {isLoading ? <Loading /> : null}
      <div id="phaser-app" />
      <div
        id="canvas-scale-guide"
        className={`desktop:hidden tablet:hidden w-full ${window.innerWidth > window.innerHeight ? "!hidden" : ""} bottom-0 w-screen`}
      >
        <p className="text-white w-full text-center text-2xl py-10">가로로 돌려서 플레이 하세요.</p>
      </div>
    </div>
  );
}
