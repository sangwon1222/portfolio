"use client";
import { cookingPhaserConfig } from "@/config/cooking/phaserConfig";
import useLoading from "@/app/providers/loading/useLoading";
import { usePhaserGame } from "@/hooks/usePhaserGame";
import Loading from "@/components/loading";

export default function Cooking() {
  const { isLoading, setLoadingState } = useLoading();
  const handleOnLoading = () => setLoadingState(true);
  const handleLoaded = () => setLoadingState(false);

  usePhaserGame(cookingPhaserConfig, handleOnLoading, handleLoaded, true);

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
