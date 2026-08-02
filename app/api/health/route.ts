import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "CYBORG_LAB_MAINFRAME_API",
    timestamp: new Date().toISOString(),
  });
}
