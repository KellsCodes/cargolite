import { NextResponse } from "next/server";
import { CreateShipmentSchema } from "@/schema/shipment.schema";
import {
  getAllShipments,
  processNewShipment,
} from "@/services/shipments.service";
import { Prisma } from "@/generated/prisma/client";
import { z } from "zod";
import { authError, getUserSession } from "@/lib/authUtils";
import { processImage } from "@/services/image.service";

export async function POST(req: Request) {
  const user = await getUserSession();
  if (!user) return authError();
  try {
    const formData = await req.formData();

    // Extract file
    const imageFile = formData.get("packageImage") as File | null;
    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
      imageUrl = await processImage(imageFile, user.id, "shipment");
    }

    // Extract and validate text Data
    const rawData = Object.fromEntries(formData.entries());
    const formattedData = {
      ...rawData,
      weight: Number(rawData.weight),
      amount: Number(rawData.amount),
      packageImage: imageUrl,
    };

    //  Validate input with Zod
    const validatedData = CreateShipmentSchema.parse(formattedData);

    //  Process Transaction (Clients + Invoice + Shipment)
    const result = await processNewShipment(validatedData);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    // Catch Zod Validation Errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Catch Prisma Unique Constraints (e.g., ShipmentID collision)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Duplicate tracking or transaction ID." },
          { status: 409 }
        );
      }
    }

    console.error("Shipment Creation Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const user = await getUserSession();
  if (!user) return authError();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || undefined;
    const result = await getAllShipments(page, limit, search);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch shipments" },
      { status: 500 }
    );
  }
}
