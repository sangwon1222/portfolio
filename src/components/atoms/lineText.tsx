export default function LineText({ text, linePos, customCss }: ILineTextProps) {
  return (
    <p
      className={`
        text-main-2
        relative
        text-48
        font-bold
        before:content-['']
        before:block
        before:w-[134px]
        before:h-[10px]
        before:bg-main-2
        before:mb-[4px]
        ${customCss ? customCss : ""}
      `}
    >
      {text}
    </p>
  );
}
