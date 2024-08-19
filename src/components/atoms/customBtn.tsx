export default function CustomBtn({ clickEvent, label, arg, customCss }: ICustomBtnProps) {
  const click = () => {
    if (arg) clickEvent(arg);
    else clickEvent();
  };
  return (
    <button onClick={click} className={`truncate border-main-2 border-b-4 duration-150 ${customCss}`}>
      {label}
    </button>
  );
}
