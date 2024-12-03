// /public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js");

// FIRE-BASE 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
const config = {
  apiKey: "AIzaSyCswEVuOYh0XSYH7gTX20AZ2cY-g6qBmX0",
  authDomain: "lsw-portfolio.firebaseapp.com",
  projectId: "lsw-portfolio",
  storageBucket: "lsw-portfolio.firebasestorage.app",
  messagingSenderId: "977425089024",
  appId: "1:977425089024:web:63450b586220c8abb94ee5",
  measurementId: "G-KRPLHM3RN1",
};

// Initialize Firebase
firebase.initializeApp(config);

// const messaging = firebase.messaging();
// messaging.onBackgroundMessage((payload) => {
//   console.log("[firebase-messaging-sw.js] Received background message ", payload);
//   const { title, body, image, click_action } = payload.data;
//   self.registration.showNotification(title, { body, icon: image, image, click_action });
// });

self.addEventListener("push", function (event) {
  if (event.data) {
    // 알림 메세지일 경우엔 event.data.json().notification;
    const { title, body, image, icon, badge, click_action } = event.data.json().data;
    event.waitUntil(self.registration.showNotification(title, { body, badge, icon, image, data: { click_action } }));
  } else {
    console.log("This push event has no data.");
  }
});

// 클릭 이벤트 처리
// 알림을 클릭하면 사이트로 이동한다.
self.addEventListener("notificationclick", function (event) {
  event.preventDefault();
  // 알림창 닫기
  event.notification.close();

  // 이동할 url
  // 아래의 event.notification.data는 위의 푸시 이벤트를 한 번 거쳐서 전달 받은 options.data에 해당한다.
  // api에 직접 전달한 데이터와 혼동 주의
  const urlToOpen = event.notification.data.click_action;

  // 클라이언트에 해당 사이트가 열려있는지 체크
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then(function (windowClients) {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(urlToOpen)) {
          matchingClient = windowClient;
          break;
        }
      }

      // 열려있다면 focus, 아니면 새로 open
      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});
