import { NextResponse } from "next/server";
import { getFirebaseWebConfig } from "@/lib/firebase";

export function GET() {
  return NextResponse.json(getFirebaseWebConfig());
}
