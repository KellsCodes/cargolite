import { MapPoint } from '@/app/track-parcel/ShipmentMap';
import opencage from 'opencage-api-client';

// export type MapPointCordinates = [number, number];

export async function getCoordsFromAddress(address: string): Promise<MapPoint | null> {
  try {
    const response = await opencage.geocode({ 
      q: address, 
      key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY 
    });

    if (response.results.length > 0) {
      const { lat, lng } = response.results[0].geometry;
      return [lat, lng]; // Returns [37.422, -122.084] format
    }
    return null;
  } catch (error) {
    console.error("Geocoding failed:", error);
    return null;
  }
}
