"use client";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import TrackData from "../track-parcel/TrackDetails";
import TrackingParcel from "../components/TrackParcel";
import { ShipmentData } from "../types/shipment";

export default function TrackingPage() {
    const [data, setData] = useState<ShipmentData | null>(null)
    return (
        <AuthLayout>
            <div className="space-y-6 p-6">
                <div>
                    <h1 className="font-medium">Tracking Shipments</h1>

                </div>

                <div className="bg-white rounded-[2.5rem] h-[76vh] overflow-hidden py-10">
                    <div className="flex flex-col h-full">

                        {/* The scrollable area */}
                        <div className="flex-1 overflow-y-auto custom-scroll px-6 space-y-10">
                            <TrackingParcel setData={setData} />
                            {/* RESULTS SECTION: TRACKING DATA */}
                            {data ?
                                <div className="w-full mx-auto mt-5 mb-0 z-0 relative">
                                    <TrackData data={data} />
                                </div> : null
                            }
                        </div>
                    </div>
                </div>

            </div>
        </AuthLayout>
    )
}