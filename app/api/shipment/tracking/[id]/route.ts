import { authError, getUserSession } from "@/lib/authUtils";
import { UpdateTrackingHistorySchema } from "@/schema/trackingHistory.schema";
import { updateTrackingRecord } from "@/services/tracking";
import { NextResponse } from "next/server";
import z from "zod";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserSession();
  if (!user) return authError();

  try {
    const resolvedParam = await params;
    const id = Number(resolvedParam.id);
    if (isNaN(id))
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    const body = await req.json();
    const validatedData = UpdateTrackingHistorySchema.parse(body);
    const updatedRecord = await updateTrackingRecord(id, validatedData);

    return NextResponse.json(updatedRecord);
  } catch (error: any) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Tracking record not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Tracking update failed." },
      { status: 500 }
    );
  }
}
