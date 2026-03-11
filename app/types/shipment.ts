export interface TrackingEvent {
    id: number;
    status: string;
    location: string;
    notes: string;
    createdAt: string;
}

export interface ShipmentData {
    id: number;
    shipmentID: string;
    weight: number;
    packageType: string;
    courierType: string;
    packageImage: string;
    dropLocation: string;
    pickupLocation: string;
    arrival: string;
    trackingHistory: TrackingEvent[];
    sender: { name: string };
    receiver: { name: string };
    // Using [key: string]: any allows the "more later" fields to be added
    [key: string]: any;
}