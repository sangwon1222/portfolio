"use client";

import { calcScreen } from "@/util";
import { useEffect } from "react";

export default function Ladder() {
  useEffect(() => {
    window.addEventListener("resize", calcScreen, true);
    return () => window.removeEventListener("resize", calcScreen, true);
  }, []);
  return <canvas id="canvas" className="border"></canvas>;
}
