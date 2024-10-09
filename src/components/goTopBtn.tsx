"use client";
import { debounce } from "lodash-es";
import { useEffect, useState } from "react";

export default function GoTopBtn() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => setShowBtn(window.scrollY > 60), 300, {
      trailing: true,
      leading: false,
    });
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTop = async () => {
    setShowBtn(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <button
      className={`
      fixed
      flex
      justify-center
      items-center
      bottom-10
      right-10
      z-10
      rounded
      font-bold
      ${showBtn ? "w-80 h-80" : "w-0 h-0"}`}
      style={{ background: "center / 80px 80px no-repeat url(/assets/top-button.png)" }}
      onClick={goTop}
      aria-label="top button"
    />
  );
}
