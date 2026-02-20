import { authError, getUserSession } from "@/lib/authUtils";
import { getClients } from "@/services/client.service";
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

    const result = await getClients(role, page, limit, search, status);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}
