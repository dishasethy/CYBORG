import { NextResponse } from "next/server";
import { getSegregatedMembers } from "@/src/services/memberService";

export async function GET() {
  try {
    const segregatedData = await getSegregatedMembers();
    return NextResponse.json({
      success: true,
      schema: "Static_MemberModel_v1",
      description: "Segregated hierarchically: Year -> Subsystem -> Members",
      data: segregatedData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
