import api from "../axios";
// AWP8484923256
export const TrackingAPI = {
  trackPackage: (tracking_number: string, config: { signal: AbortSignal }) =>
    api.get(`/shipment/tracking?tracking_number=${tracking_number}`, config),
};