"use client"
import React from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import L from "leaflet"
import 'leaflet/dist/leaflet.css'

// Define the shape of a coordinate point
export type MapPoint = [number, number];

interface ShipmentMapProps {
    origin: MapPoint;
    current: MapPoint;
    destination: MapPoint;
}

// Fix for Leaflet default marker icons in Next.js
const DefaultIcon = L.icon({
    iconUrl: 'unpkg.com',
    shadowUrl: 'unpkg.com',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const ShipmentMap: React.FC<ShipmentMapProps> = ({ origin, current, destination }) => {
    const routePath: MapPoint[] = [origin, current, destination];

    return (
        <MapContainer 
            center={current as L.LatLngExpression}
            zoom={4} 
            scrollWheelZoom={false}
            className="h-full w-full"
        >
            <TileLayer
                attribution='&copy; <a href="www.openstreetmap.org">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* The Path Line */}
            <Polyline 
                positions={routePath} 
                pathOptions={{ color: '#034460', weight: 4, dashArray: '10, 10', opacity: 0.6 }} 
            />

            {/* Markers */}
            <Marker position={origin}>
                <Popup>Origin: Package Received</Popup>
            </Marker>
            
            <Marker position={current}>
                <Popup>Current Status: In Transit</Popup>
            </Marker>

            <Marker position={destination}>
                <Popup>Final Destination</Popup>
            </Marker>
        </MapContainer>
    )
}

export default ShipmentMap;
