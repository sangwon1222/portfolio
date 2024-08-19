"use client";
import { atom, selector } from "recoil";

// user-info____________________________________________
export const userAuthState = atom({
  key: "user-auth-state",
  default: { id: "", token: "" },
});
export const userAuthSelector = selector<{ id: string; token: string }>({
  key: "user-auth-selector",
  get: ({ get }) => {
    const userInfo = get(userAuthState);
    return userInfo;
  },
  set: ({ set }, newValue) => {
    set(userAuthState, newValue);
  },
});
// user-info____________________________________________

// FCM____________________________________________
export const fcmTokenState = atom({
  key: "fcm-token-state",
  default: "",
});
export const fcmTokenSelector = selector<string>({
  key: "fcm-token-selector",
  get: ({ get }) => {
    const fcmToken = get(fcmTokenState);
    return fcmToken;
  },
  set: ({ set }, newValue) => {
    set(fcmTokenState, newValue);
  },
});
// FCM____________________________________________

// Dark-Mode____________________________________________
export const darkModeState = atom({
  key: "dark-mode-state",
  default: true,
});
export const darkModeSelector = selector<boolean>({
  key: "dark-mode-selector",
  get: ({ get }) => {
    const darkmode = get(darkModeState);
    return darkmode;
  },
  set: ({ set }, newValue) => {
    set(darkModeState, newValue);
  },
});