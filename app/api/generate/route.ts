import { NextResponse } from "next/server";
import { MOCK_QUESTIONS } from "@/lib/mockQuestions";

export const runtime = "nodejs";

export async function GET() {
  let questions: unknown = MOCK_QUESTIONS;
  try {
    const real = (await import("@/lib/questions.json")).default as unknown[];
    if (Array.isArray(real) && real.length) questions = real;
  } catch {}
  return NextResponse.json({ questions });
}

export async function POST() {
  return NextResponse.json(
    { ok: true, message: "V0.1 mock — 실제 PDF→Claude 호출은 V2" },
    { status: 200 },
  );
}
