#  계정:  

id: hkbvc1222@gmail.com  

참고: [Nextjs-FCM]


# Postgres DB  
TABLE

## AUTH

| Field          | Type         | Null  | Key   | Default   | Extra |
|      :---      |     :---     | :---: | :---: |   :---:   | :---: |
| idx            | SERIAL       | NOT   |       |           |       |
| id             | VARCHAR      | NOT   |       |           |       |
| name           | VARCHAR      | NOT   |       |           |       |
| email          | VARCHAR      | NOT   |       |           |       |
| password       | VARCHAR      | NOT   |       |           |       |
| refreshToken   | VARCHAR      | NULL  |       | NULL      |       |
| fcmToken       | VARCHAR      | NULL  |       | NULL      |       |
| CREATED_TIME   | TIMESTAMP    | NOT   |       |           |       |
| UPDATED_TIME   | TIMESTAMP    | NOT   |       |           |       |


#### CREATE
``` javascript
CREATE TABLE auth (
  idx SERIAL PRIMARY KEY,
  id VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  fcmToken VARCHAR default NULL,
  refreshToken VARCHAR default NULL,
  CREATED_TIME  TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UPDATED_TIME  TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
```

#### INSERT
``` javascript
INSERT INTO auth 
  (
      id,
      name,
      password,
      email
    )
    VALUES
    (
      admin,
      admin-name,
      ${hashPassword},
      ${email}
    )
    `;
```

## QA

| Field         | Type         | Null | Key | Default   | Extra |
|:---|:---|:---:|:---:|:---:|:---:|
| BOARD_NO      | SERIAL       | NOT  |     |           |       |
| BOARD_TYPE    | VARCHAR      | NOT  |     |           |       |
| TITLE         | VARCHAR      | NOT  |     |           |       |
| QUESTION      | VARCHAR      | NOT  |     |           |       |
| ANSWER        | VARCHAR      | YES  |     | NULL      |       |
| USER_ID       | VARCHAR      | YES  |     | NULL      |       |
| CREATED_TIME  | TIMESTAMP    | NOT  |     |           |       |
| UPDATED_TIME  | TIMESTAMP    | NOT  |     |           |       |

#### CREATE
```javascript
CREATE TABLE qa (
  BOARD_NO      SERIAL PRIMARY KEY,
  BOARD_TYPE    VARCHAR NOT NULL,
  TITLE         VARCHAR NOT NULL,
  QUESTION      VARCHAR NOT NULL,
  ANSWER        VARCHAR NOT NULL,
  USER_ID       VARCHAR DEFAULT NULL,
  CREATED_TIME  TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UPDATED_TIME  TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

# Next-pwa

```javascript
  //라이브러리
  yarn add next-pwa
  yarn add @types/next-pwa

  // PWA 옵션
  next.config.mjs

  // App 설치 유도 컴포넌트 경로.
  src/components/pwa/installPrompt.tsx
```

# Firebase
#### Firebase  프로젝트 설정
FCM(Firebase Cloud Messaging) [Firebase]


1. Firebase 프로젝트 시작하기  
![](https://velog.velcdn.com/images/hkbvc1222/post/6063207a-ed86-431a-979b-28a3b3ab6ba9/image.png)

2. 프로젝트 이름 생성  
![](https://velog.velcdn.com/images/hkbvc1222/post/006c904b-b321-47cc-98f8-76fa65450745/image.png)

3. 동의 후, 프로젝트 만들기  
![](https://velog.velcdn.com/images/hkbvc1222/post/d56ae22a-35ef-4602-a0dc-55b20cefddee/image.png)

![](https://velog.velcdn.com/images/hkbvc1222/post/7f9f197d-2882-4371-a565-27b2275bdca8/image.png)

4. 프로젝트 개요 => 프로젝트 설정 클릭  
![](https://velog.velcdn.com/images/hkbvc1222/post/41003086-5d9f-4dff-9c8d-1cc1fb670392/image.png)


5. 일반 탭 => 하단 내 앱 -> 코드 모양 버튼 클릭  
![](https://velog.velcdn.com/images/hkbvc1222/post/279cd458-631f-47d9-9541-418ab3cab3ab/image.png)

6. 앱 닉네임 설정 후, 앱 생성 클릭하면  
![](https://velog.velcdn.com/images/hkbvc1222/post/106351ea-70d0-4d69-9afb-fbc4798ef29c/image.png)

7. SDK 코드 생성  
![](https://velog.velcdn.com/images/hkbvc1222/post/641ceb09-9452-4eee-91d9-cc05d97094c9/image.png)

8. 호스팅 설정, 콘솔로 이동  
![](https://velog.velcdn.com/images/hkbvc1222/post/b29865ca-67ec-49a7-ac3e-32f8b481f7ba/image.png)

![](https://velog.velcdn.com/images/hkbvc1222/post/3487fe49-87fb-488b-9e82-a394b0653493/image.png)


9. 웹 푸시 인증서 발급  
![](https://velog.velcdn.com/images/hkbvc1222/post/0f13fe30-d9ef-4800-a283-039739340709/image.png)

![](https://velog.velcdn.com/images/hkbvc1222/post/02feb296-b9a6-440b-b613-5a119f0d9443/image.png)

#### nextjs 알림 수신
1. public/firebase-messaging-sw.js
```javascript
	// Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "firebase에서 발급받은 firebaseConfig.apiKey",
      authDomain: "firebase에서 발급받은 firebaseConfig.authDomain",
      projectId: "firebase에서 발급받은 firebaseConfig.projectId",
      storageBucket: "firebase에서 발급받은 firebaseConfig.storageBucket",
      messagingSenderId: "firebase에서 발급받은 firebaseConfig.messagingSenderId",
      appId: "firebase에서 발급받은 firebaseConfig.appId",
      measurementId: "firebase에서 발급받은 firebaseConfig.measurementId"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
```




# FCM 설정 예시

src/components/template/nav/nav.tsx
``` javascript
  // src/components/template/nav/nav.tsx
  export default function Nav() {
  useEffect(()=>{
       Notification.requestPermission().then((permission) => {
        if (permission !== "granted") return "";
        // FIRE-BASE 앱 등록할때 받은 'firebaseConfig' 값
        const firebaseApp = initializeApp({
          apiKey: "firebaseConfig-apiKey 값",
          authDomain: "firebaseConfig-authDomain 값",
          projectId: "firebaseConfig-projectId 값",
          storageBucket: "firebaseConfig-storageBucket 값",
          messagingSenderId: "firebaseConfig-messagingSenderId 값",
          appId: "firebaseConfig-appId 값",
          measurementId: "firebaseConfig-measurementId 값",
        });

        const messaging = getMessaging(firebaseApp);

        const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY;
        getToken(messaging, { vapidKey })
          .then((fcmToken) => {
            if (fcmToken) {
              // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.
              if (fcmToken) setFcmToken(fcmToken);
            } else {
              // "No registration token available. Request permission to generate one."
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
          });

        // 메세지가 수신되면 역시 콘솔에 출력합니다.
        onMessage(messaging, (payload) => {
          console.log("Message received. ", payload);
        });
      });
  })
  return (
    <nav> Navigation</nav>
  )
```

web push 이벤트 콜하는 컴포넌트
```javascript
// fcm 보내는 components
const sendFcmMessage = async (fcmTokenList: string[]) => {
  try {
    const response = await fetch(`/api/fcm`, {
      method: "POST",
      body: JSON.stringify({
        data: {
          title: "알림 제목",
          body: "알림 내용_CONTENTS",
          image: "https://www.lsw.kr/assets/icon-96x96.png",
          click_action: "https://www.lsw.kr",
        },
        fcmTokenList,
      }),
    });

    const toJson = await response.json();
    return toJson;
  } catch (e) {
    const result = { ok: false, data: [], msg: JSON.stringify(e) };
    console.log("path: /components/fcmNotification.tsx , api: api/fcm");
    console.error(e);
    return result;
  }
};
```

api/fcm
```javascript
  // api/fcm
  import admin, { ServiceAccount } from "firebase-admin";
  import { NextRequest, NextResponse } from "next/server";

  // 웹푸시 이벤트 파라미터 타입
  interface INotificationData {
    title: string;
    body: string;
    image: string;
    click_action: string;
  }

  export async function POST(req: NextRequest) {
    const { data, fcmTokenList } = await req.json();
    try {
      const sendFCM = await sendFCMNotification(data, fcmTokenList);
      return NextResponse.json({ ok: sendFCM.ok, msg: sendFCM.msg }, { status: 200 });
    } catch (e) {
      return NextResponse.json({ ok: false, msg: e });
    }
  }

  // Firebase Admin SDK 초기화
  const sendFCMNotification = async (data: INotificationData, fcmTokenList: string[]) => {
    try {
      /**
       * 새로 구해온 서비스 계정 = firebase => 프로젝트 설정 => 서비스 계정 => 비공개 키 생성
       * => 다운로드 된 json 파일
       * {
       *    projectId: 새로 구해온 서비스 계정 project Id
       *    privateKey: 새로 구해온 서비스 계정 private_key
       *    clientEmail: 새로 구해온 서비스 계정 client email
       * }
       * 
       * !! private_key .replaceAll("\\n", "\n") 하는 이유!
       *  vercel 배포 시, failed to parse private key: Error: Invalid PEM formatted message  에러 발생.
       *  Firebase의 private key 는 아래와 같이 \n를 여러개 가지고 있는 key 값!
       *  vercel 배포과정에서 개행이 제대로 적용되지 않으면서 발생한다.
       */

      if (!admin.apps.length) {
        // Firebase Service ACCOUNT 세팅
        const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
        const privateKey = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replaceAll("\\n", "\n")
        const clientEmail = process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL
        const serviceAccount: ServiceAccount = { projectId, privateKey, clientEmail };

        // Firebase ADMIN 초기화
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
      }

      const notificationDataList: any = fcmTokenList.map((e) => {
        return { data, token: e };
      });
      // 푸시 알림 전송
      const response = await admin.messaging().sendEach(notificationDataList);
      const ok = fcmTokenList.length == response.successCount;
      return { ok, msg: ok ? "전송 성공" : `${fcmTokenList.length}중 ${response.successCount}개 전송 성공` };
    } catch (e: any) {
      return { ok: false, msg: e };
    }
  };

```
## nodemailer

[nodemailer]
[메일_비즈니스계정]
![alt text](image.png)


##### 구글 앱 비밀번호 발급

구글 계정 설정 => [Google-Account]
![](https://velog.velcdn.com/images/hkbvc1222/post/eadb342d-c4d3-43f1-85e0-9436b55935bf/image.png)

2단계 인증

![](https://velog.velcdn.com/images/hkbvc1222/post/5247eab0-0547-4f5e-b19b-81aa77d0f08a/image.png)

구글 앱 비밀번호 발급

#### 예시
```javascript
// api/transporter.ts
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 465, // SSL 
  // port: 587, // TLS
  secure: true, // SSL은 true TLS는 false
  requireTLS: false,
  auth: {
    user: "TEST_SENDER@gmail.com", //구글 메일 주소
    pass: "", //구글 앱 비밀번호
  },
});

```
```javascript
// api/mail.ts
import { NextRequest, NextResponse } from "next/server";
import { transporter } from "..";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html } = await req.json();

    const mailOptions = {
      from: `발신자 이름 <TEST_SENDER@gmail.com>`, // 발신자
      to: to, // 수신자
      subject: subject, // 제목 ex) '인증 메일 도착!'
      html: html, // mail의 내용을 html형식으로 작성
      // attachments:["첨부파일"]
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ ok: true, msg: "인증 메일 전송 성공" }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, msg: "인증 메일 전송 실패!" }, { status: e.responseCode });
  }
}

```


## env 설정:
```javascript
  // FCM 웹 인터페이스는 '자발적 애플리케이션 서버 ID' 또는 'VAPID' 키라고 하는 웹 사용자 인증 정보를 사용하여 지원되는 웹 푸시 서비스에 대한 보내기 요청을 승인합니다.
  NEXT_PUBLIC_VAPID_KEY

  /**
   * firebase console 사이트 => 프로젝트 설정 => 서비스 계정 => 비공개 키 생성 => 다운로드 된 json 파일 => { projectId, privateKey, clientEmail }
   * Firebase Service ACCOUNT
   */
  NEXT_PUBLIC_PROJECT_ID
  NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL
  NEXT_PUBLIC_FIREBASE_PRIVATE_KEY

  // api 파라미터 은닉 encode secret 키
  NEXT_PUBLIC_CRYPTO_SECRET

  // 메일 서버
  NEXT_APP_HOST
  // 메일 발신자 구글 앱 비밀번호
  NEXT_APP_PWD
  // 싱크태그 문의 메일, 회원가입 인증 코드 메일 발신자.
  NEXT_APP_ADMIN_EMAIL
  // 싱크태그 문의 메일 수신자.
  NEXT_APP_RECEIVE_EMAIL
  // 싱크태그 문의 메일 참조자.
  NEXT_APP_CC
  // 싱크태그 문의 메일 숨은 참조자.
  NEXT_APP_BCC
  

  // TOKEN 관련 secret 키
  JWT_SECRET
```
FCM-Vapid 도큐먼트: [FCM-Vapid]

#### Naver Maps

Ncloud 링크 => [Ncloud]
Ncloud Console 링크 => [NcloudConsole]

Ncloud Console 로그인 후 => Services 클릭 => AI.NAVER API 클릭

env 설정:
  NEXT_PUBLIC_NCP_CLIENT_ID


## node emailer
env 설정:
  NEXT_APP_HOST
  NEXT_APP_ADMIN_EMAIL
  NEXT_APP_PWD

  NEXT_APP_RECEIVE_EMAIL
  NEXT_APP_BCC
  NEXT_APP_CC

[Firebase]: https://console.firebase.google.com/
[FCM-Vapid]: https://firebase.google.com/docs/cloud-messaging/js/client?hl=ko#web-modular-api
[Ncloud]: https://www.ncloud.com/
[NcloudConsole]: https://console.ncloud.com/dashboard
[Nextjs-FCM]: https://velog.io/@hkbvc1222/Nextjs-FCM
[Google-Account]: https://myaccount.google.com/
[nodemailer]:https://nodemailer.com/about/
[메일_비즈니스계정]:https://www.moonkorea.dev/Tutorial-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%A0%84%EC%86%A1%ED%95%98%EA%B8%B0-nodemailer