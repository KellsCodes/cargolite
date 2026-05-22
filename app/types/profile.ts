import { Role } from "@/generated/prisma/enums";

export interface UserRelation {
  email: string;
  role: Role;
}

export interface UserProfileResponse {
  id: number;
  displayName: string | null;
  firstName: string;
  lastName: string;
  region: string;
  city: string | null;
  postalCode: string | null;
  telephone: string;
  profileImage: File | string | null;
  userId: number;
  user: UserRelation;
}

export interface UserProfileDataUpdate {
  displayName?: string | null;
  firstName?: string;
  lastName?: string;
  region?: string;
  city?: string | null;
  postalCode?: string | null;
  telephone?: string;
  profileImage?: string | File | null;
}
