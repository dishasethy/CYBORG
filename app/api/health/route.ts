import { NextResponse } from "next/server";
import { connectMongoDB, getMongoConnectionStatus } from "@/src/db/mongo";

export async function GET() {
  // Ensure we attempt MongoDB connection on request if not already connected
  await connectMongoDB();
  
  const dbStatus = getMongoConnectionStatus();
  
  return NextResponse.json({
    status: "ok",
    service: "CYBORG_LAB_MAINFRAME_API",
    timestamp: new Date().toISOString(),
    database: dbStatus,
  });
}
