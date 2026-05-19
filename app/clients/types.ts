import { ClientType } from "@/generated/prisma/enums";

export interface UserActivityData {
  id: number;
  name: string;
  email: string;
  lastActivity: string; // ISO 8601 Date string
  lastLocation: string;
  role: ClientType;
  shipmentCount: number;
  status: number; // e.g., 1 for Active, 2 for Inactive, 3 for Suspended
  telephone: string;
}

export interface PaginationData {
  currentPage: number;
  pageLength: number;
  totalItems: number;
  totalPages: number;
  from: number;
  to: number;
}

export interface PaginatedUserResponse {
  data: UserActivityData[];
  pagination: PaginationData;
}
