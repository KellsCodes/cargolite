import api from "../axios";

export const EnquiryAPI = {
  // Public
  send: (data: any) => api.post("/contact-us", data),
};
