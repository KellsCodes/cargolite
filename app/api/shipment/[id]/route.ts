import { authError, getUserSession } from "@/lib/authUtils";
import { processImage } from "@/services/image.service";
import {
  getShipmentByID,
  updateShipmentRecord,
} from "@/services/shipments.service";
import { NextResponse } from "next/server";
import { deleteCloudImage } from "../../utils/uploadImage.utils";
import { UpdateShipmentSchema } from "@/schema/shipment.schema";

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

    const formData = await req.formData();

    // Extract file
    const imageFile = formData.get("packageImage") as File | null;
    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
      imageUrl = await processImage(imageFile, user.id, "shipment");

      if (imageUrl) {
        const imgUrl = await getShipmentByID(id);
        imgUrl?.packageImage && (await deleteCloudImage(imgUrl.packageImage));
        formData.append("packageImage", imageUrl);
      }
    }

    // Extract and validate text Data
    const formattedData: any = Object.fromEntries(formData.entries());
    if (formattedData.weight) {
      formattedData.weight = Number(formattedData.weight);
    }

    if (formattedData.amount) {
      formattedData.amount = Number(formattedData.amount);
    }

    // Partial Validation (Allows updating just one field)
    const validatedData = UpdateShipmentSchema.partial().parse(formattedData);

    // Perform nested update
    const updated = await updateShipmentRecord(id, validatedData);

    return NextResponse.json(updated);
  } catch (error: any) {
    // Record Not Found (P2025)
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Shipment not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update record." },
      { status: 500 }
    );
  }
}
