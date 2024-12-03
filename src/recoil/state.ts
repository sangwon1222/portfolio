'use client';
import { atom, selector } from 'recoil';

// FCM____________________________________________
export const fcmTokenState = atom({
  key: 'fcm-token-state',
  default: '',
});
export const fcmTokenSelector = selector<string>({
  key: 'fcm-token-selector',
  get: ({ get }) => {
    const fcmToken = get(fcmTokenState);
    return fcmToken;
  },
  set: ({ set }, newValue) => {
    set(fcmTokenState, newValue);
  },
});
// FCM____________________________________________
