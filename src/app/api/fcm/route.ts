import admin, { ServiceAccount } from 'firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

// api 호출할 때 함께 전달할 데이터
interface INotificationData {
  title: string;
  body: string;
  image: string;
  icon: string;
  badge: string;
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
    /**새로 구해온 서비스 계정 = firebase => 프로젝트 설정 => 서비스 계정 => 비공개 키 생성 => 다운로드 된 json 파일에 있는 데이터
     * projectId: 새로 구해온 서비스 계정 project Id
     * privateKey: 새로 구해온 서비스 계정 private_key
     * clientEmail: 새로 구해온 서비스 계정 client email
     */

    if (!admin.apps.length) {
      const serviceAccount: ServiceAccount = {
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replaceAll('\\n', '\n'),
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      };

      admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    }

    const notificationDataList: any = fcmTokenList.map((e) => {
      return { data, token: e };
    });

    // 푸시 알림 전송
    const response = await admin.messaging().sendEach(notificationDataList);
    const ok = fcmTokenList.length == response.successCount;
    return {
      ok,
      msg: ok ? '전송 성공' : `${fcmTokenList.length}중 ${response.successCount}개 전송 성공`,
    };
  } catch (e: any) {
    return { ok: false, msg: e };
  }
};
