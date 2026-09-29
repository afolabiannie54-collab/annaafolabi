import { NextResponse } from "next/server";
import { buildEnquirySubject, buildEnquiryText, buildEnquiryHtml } from "@/lib/enquiry";

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (!data?.name?.trim() || !data?.email?.trim() || !data?.phone?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and phone are required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;

  if (!apiKey || !to) {
    console.error("Enquiry email is not configured: missing RESEND_API_KEY or ENQUIRY_TO_EMAIL.");
    return NextResponse.json(
      { ok: false, error: "Email delivery isn't configured yet." },
      { status: 500 }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Anna's Website <notifications@annaafolabi.online>",
      to,
      reply_to: data.email.trim(),
      subject: buildEnquirySubject(data),
      text: buildEnquiryText(data),
      html: buildEnquiryHtml(data),
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Resend request failed:", res.status, errorBody);
    return NextResponse.json({ ok: false, error: "Could not send the enquiry." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
