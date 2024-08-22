import toast from "react-hot-toast";
import CryptoJS from "crypto-js";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const host = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://www.lsw.kr";

export const fcmNotification = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return "";
  // FIRE-BASE 앱 등록할때 받은 'firebaseConfig' 값
  const firebaseApp = initializeApp({
    apiKey: "AIzaSyDDDxWxe9pKzcrM-gbXttZho2uUZbgkIj4",
    authDomain: "think-tag-app.firebaseapp.com",
    projectId: "think-tag-app",
    storageBucket: "think-tag-app.appspot.com",
    messagingSenderId: "1019901849670",
    appId: "1:1019901849670:web:660db75f384d0a63bf1a47",
    measurementId: "G-52M7CDXLVC",
  });

  const messaging = getMessaging(firebaseApp);

  const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY;
  // // vapidKey 값 = console.firebase의
  getToken(messaging, { vapidKey })
    .then((fcmToken) => {
      if (fcmToken) {
        // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.
        return fcmToken;
      } else {
        console.log("No registration token available. Request permission to generate one.");
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });

  // 메세지가 수신되면 역시 콘솔에 출력합니다.
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
  });
};

export const encodeParameter = (params: { [key: string]: string | number | boolean }) => encodeAES(JSON.stringify(params));

// 이메일 정규식
export const regexEmail = (email: string) => /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(email);

// 클립보드 복사
export const copy = (text: string) => {
  window.navigator.clipboard.writeText(text);
  toast("copy", { icon: "📋", id: "copy-text" });
};

// 텍스트 길이 유효성 검사
export const lengthValid = (text: string, min?: number, max?: number) => {
  if (min && !max) return text.length >= min;
  if (!min && max) return text.length <= max;
  if (min && max) return text.length >= min && text.length <= max;

  return false;
};

// 숫자 & 영어 정규식
export const onlyNumberAndEnglish = (text: string) => {
  return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(text);
};

// 8글자 이상, 영문, 숫자, 특수문자 사용
export const strongPassword = (text: string) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,}$/.test(text);
  return regex;
};

// 랜덤 문자열 <영문 대문자, 영문 소문자, 숫자 >
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const getRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * characters.length);
    result += characters[random];
  }
  return result;
};

export const focusInput = (inputId: string) => {
  const input: HTMLElement | null = document.getElementById(inputId);
  input?.focus();
};

export const wiggleInput = (el: HTMLInputElement, scroll: boolean = true, focus: boolean = true) => {
  el.onanimationend = () => el.classList.remove("animate-wiggle");
  if (scroll) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => el.classList.add("animate-wiggle"), 500);
  }
  if (focus) el?.focus();
};

export const encodeAES = (text: string) => {
  const secret = process.env.NEXT_PUBLIC_CRYPTO_SECRET!;

  if (!secret) return "";
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), secret).toString();
  return encrypted;
};

export const decodeAES = (text: string) => {
  const secret = process.env.NEXT_PUBLIC_CRYPTO_SECRET!;
  const bytes = CryptoJS.AES.decrypt(text, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};
