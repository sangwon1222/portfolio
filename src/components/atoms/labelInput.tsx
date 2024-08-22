"use client";

import React, { useRef, useState } from "react";

export default function LabelInput({
  inputId,
  label,
  type = "text",
  placeholder = "",
  customWrapCss = "",
  customLabelCss = "",
  customInputWrapCss = "",
  customInputCss = "",
  customGuideCss = "",
  customButtonCss = "",
  buttonEvent = () => null,
  onChangeEvent = () => null,
  onEnter = () => null,
  validFc = () => true,
  guide = "",
  validText = "",
  customValidTextCss = "",
  buttonLabel = "",
  required = false,
  whiteSpace = true,
  initValue = "",
  disabled = false,
}: ILabelInputProps) {
  const refInput = useRef<HTMLInputElement | null>(null);
  const [isValid, setValid] = useState(validText ? Boolean(refInput.current?.value && validFc(refInput.current?.value)) : true);

  const checkValid = () => {
    const check = Boolean(refInput.current?.value && validFc(refInput.current?.value));
    if (isValid != check) setValid(check);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") onEnter(e);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeEvent(e.target.value);
    if (!whiteSpace) e.target.value = e.target.value.replaceAll(" ", "");
    if (validText) checkValid();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.trim();
    if (validText) checkValid();
  };

  return (
    <div className={`flex flex-col gap-8 ${customWrapCss}`}>
      {/* 라벨 */}
      <p className={`flex items-center text-24 text-main-2 ${customLabelCss}`}>
        {label} {required ? "*" : ""}
      </p>

      {/* /* 가이드 문구 (선택) */}
      {guide ? <p className={customGuideCss}>{guide}</p> : null}

      {/* /* 유효성 문구 (선택) */}
      <p className={`${customValidTextCss} ${isValid ? "opacity-0" : "opacity-100"}`}>{validText}</p>

      {/* 인풋 WRAP */}
      <div className={customInputWrapCss ? customInputWrapCss : `w-full flex gap-24`}>
        {/* 인풋 */}
        <input
          ref={refInput}
          type={type}
          id={inputId}
          defaultValue={initValue}
          className={`p-6 rounded border border-main-2 ${customInputCss} ${isValid ? "" : "!bg-red-50"}`}
          placeholder={placeholder}
          required={required}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={disabled}
        />

        {/* 버튼이벤트 */}
        {buttonLabel ? (
          <button className={customButtonCss} onClick={buttonEvent}>
            {buttonLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
