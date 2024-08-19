import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "..";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    const mailOptions = {
      from: `LSW-APP <${process.env.NEXT_APP_ADMIN_EMAIL}>`,
      to: email,
      subject: `[LSW-APP 인증]`,
      html: `
    <table style="min-width: 320px; max-width: 700px; border: 2px solid #97282c; background: #fff">
    <thead>
      <tr>
        <td
          colspan="2"
          style="
            width: 192px;
            height: 192px;
            background: url(https://lsw.kr/assets/icon-192x192.png) center 100% no-repeat;
          "
        ></td>
      </tr>
      <tr>
        <td colspan="2" style="text-align: center; color: #97282c; font-weight: 800">LSW-APP</td>
      </tr>
    </thead>

    <tbody style="border: 2px #97282c solid">
    <tr>
        <td colspan="2" style="padding: 10px; white-space: pre-line; max-width: 700px;"> 인증 코드 입력란에 입력해주세요.  </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 10px; white-space: pre-line; max-width: 700px;">CODE [ ${code} ] </td>
      </tr>
    </tbody>
  </table>
      `,
    };
    const result = await sendMail(mailOptions);
    if (result.accepted.length > 0) {
      return NextResponse.json({ ok: true, msg: "전송 성공" }, { status: 200 });
    } else {
      return NextResponse.json({ ok: false, msg: "이메일을 확인해주세요. " }, { status: 404 });
    }
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ ok: false, msg: JSON.stringify(e) }, { status: e.responseCode });
  }
}
