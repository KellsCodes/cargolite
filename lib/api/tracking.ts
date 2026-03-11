import api from "../axios";
// AWP8484923256
export const TrackingAPI = {
  trackPackage: (tracking_number: string) =>
    api.get(`/shipment/tracking?tracking_number=${tracking_number}`),
};