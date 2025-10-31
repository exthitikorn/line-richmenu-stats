import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const events = body.events || [];

  for (const event of events) {
    if (event.type === "postback") {
      const userId = event.source?.userId || "unknown";
      const richMenuId = event.source?.richMenuId || "default";
      const actionKey = event.postback?.data || "none";

      await prisma.lineClickLog.create({
        data: { userId, richMenuId, actionKey },
      });
    }
  }

  return NextResponse.json({ status: "ok" });
}
