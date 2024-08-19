import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "..";

export async function POST(req: NextRequest) {
  const { companyName, position, name, email, phone, how } = await req.json();
  const mailOptions = {
    from: `LSW-APP <${process.env.NEXT_APP_ADMIN_EMAIL}>`,
    to: process.env.NEXT_APP_RECEIVE_EMAIL,
    cc: process.env.NEXT_APP_CC, // 참조
    bcc: process.env.NEXT_APP_BCC, // 비밀 참조
    subject: `[LSW-APP 문의]`,
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
        <td style="padding: 10px">회사명</td>
        <td style="padding: 10px">${companyName}</td>
      </tr>
      <tr>
        <td style="padding: 10px">직함</td>
        <td style="padding: 10px">${position ? position : "내용 없음"}</td>
      </tr>
      <tr>
        <td style="padding: 10px">이름</td>
        <td style="padding: 10px">${name}</td>
      </tr>
      <tr>
        <td style="padding: 10px">이메일</td>
        <td style="padding: 10px">${email}</td>
      </tr>
      <tr>
        <td style="padding: 10px">전화번호</td>
        <td style="padding: 10px">${phone}</td>
      </tr>
      <tr style="box-shadow:2px 2px 10px #bcbcbc">
        <td colspan="2" style="padding: 10px">문의 사항</td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 10px; white-space: pre-line; max-width: 700px;">${how ? how : "내용 없음"}</td>
      </tr>
    </tbody>
  </table>
      `,
    // attachments:["첨부파일"]
  };

  try {
    const result = await sendMail(mailOptions);
    if (result.accepted.length > 0) return NextResponse.json({ ok: true, data: [], msg: "문의 메일 전송 성공" }, { status: 200 });
    else return NextResponse.json({ ok: false, data: [], msg: "문의 메일 전송 실패" }, { status: 404 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, data: [], msg: JSON.stringify(e) }, { status: e.responseCode });
  }
}
