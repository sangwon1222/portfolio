"use client";
import { breakTheLogPhaserConfig } from "@/config/breakTheLog/phaserConfig";
import useLoading from "@/app/providers/loading/useLoading";
import { usePhaserGame } from "@/hooks/usePhaserGame";
import Loading from "@/components/loading";

export default function BreakTheLog() {
  const { isLoading, setLoadingState } = useLoading();
  const handleOnLoading = () => setLoadingState(true);
  const handleLoaded = () => setLoadingState(false);

  usePhaserGame(breakTheLogPhaserConfig, handleOnLoading, handleLoaded, false);

  return (
    <div className="flex flex-col justify-center w-full h-screen bg-black">
      {isLoading ? <Loading /> : null}
      <div id="phaser-app" />
    </div>
  );
}
