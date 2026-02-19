import { authError, getUserSession } from "@/lib/authUtils";
import { TrackingHistorySchema } from "@/schema/trackingHistory.schema";
import { trackShipment } from "@/services/shipments.service";
import { trackingHistory } from "@/services/tracking";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(req: Request) {
  const user = await getUserSession();
  if (!user) return authError();

  try {
    const body = await req.json();
    const validatedData = TrackingHistorySchema.parse(body);
    const newUpdate = await trackingHistory(validatedData, user.id);

    return NextResponse.json(newUpdate, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    if (error.message === "INVALID_SHIPMENT") {
      return NextResponse.json(
        {
          error: "Invalid tracking ID",
        },
        { status: 400 }
      );
    }

    if (error.message === "CANNOT_UPDATE_DELIVERED_SHIPMENT" || error.message === "CANNOT_UPDATE_CANCELLED_SHIPMENT") {
      return NextResponse.json(
        {
          error: "Invalid tracking status",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Tracking update failed." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const shipmentID = searchParams.get("tracking_number");
    if (!shipmentID) {
      return NextResponse.json(
        { error: "Tracking number is required." },
        { status: 400 }
      );
    }

    const shipment = await trackShipment(shipmentID);
    if (!shipment) {
      return NextResponse.json(
        { error: "Shipment not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(shipment);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve shipment." },
      { status: 500 }
    );
  }
}