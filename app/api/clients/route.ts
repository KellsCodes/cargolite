import { authError, getUserSession } from "@/lib/authUtils";
import {
  clientSuspensionAndActivation,
  getClientsByRole,
} from "@/services/client.service";
import { NextResponse } from "next/server";
import { ClientType } from "@/generated/prisma/enums";

export async function GET(req: Request) {
  const user = await getUserSession();
  if (!user) return authError();

  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") as ClientType;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status")
      ? Number(searchParams.get("status"))
      : undefined;

    const result = await getClientsByRole(role, page, limit, search, status);
    return NextResponse.json(result);
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const user = await getUserSession();
  if (!user) return authError();

  try {
    const { clientId, status } = (await req.json()) as {
      clientId: number;
      status: number;
    };
    const result = await clientSuspensionAndActivation(clientId, status);
    return NextResponse.json(result);
  } catch (error: any) {
    // console.log(error);
    if (error.message === "CLIENT_NOT_FOUND") {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 }
    );
  }
}
