"use client";

export default function ClipBoard({ label, text, copyFc }: IClipBoardProps) {
  return (
    <p className="flex gap-16 cursor-pointer" onClick={() => copyFc(text)}>
      {label ? <span>{label}</span> : null} {text}
    </p>
  );
}
