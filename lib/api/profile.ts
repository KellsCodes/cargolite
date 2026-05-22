import api from "../axios";


export const ProfileAPI = {
  // Public
  updateUserProfile: (data: any) => api.patch("/profile", data),
  getUserProfile: () => api.get("/profile"),
};
