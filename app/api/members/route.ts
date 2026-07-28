import { NextResponse } from "next/server";
import { getAllMembers, createNewMember } from "@/src/services/memberService";

export async function GET() {
  try {
    const members = await getAllMembers();
    return NextResponse.json({ success: true, count: members.length, data: members });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, github, linkedin, email, subsystem, year, role, image, alumniInfo } = body;

    if (!name || !subsystem || !year) {
      return NextResponse.json(
        {
          success: false,
          error: "Required fields missing: name, subsystem, and year are mandatory.",
        },
        { status: 400 }
      );
    }

    const result = await createNewMember({
      name,
      github,
      linkedin,
      email,
      subsystem,
      year,
      role,
      image,
      alumniInfo,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Member record successfully saved in MongoDB / Registry.",
        savedToMongoDb: result.savedToDb,
        data: result.member,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save member record" },
      { status: 500 }
    );
  }
}
