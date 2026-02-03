"use client";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import TrackData from "../track-parcel/TrackDetails";
import TrackingParcel from "../components/TrackParcel";

export default function TrackingPage() {
    const [trackError, setTrackError] = useState(false)
    return (
        <AuthLayout>
            <div className="space-y-6 p-6">
                <div>
                    <h1 className="font-medium">Tracking Shipments</h1>

                </div>

                <div className="bg-white rounded-[2.5rem] h-[76vh] overflow-hidden py-10">
                    <div className="flex flex-col h-full">

                        {/* The scrollable area */}
                        <div className="flex-1 overflow-y-auto custom-scroll px-6">
                            <TrackingParcel trackError={trackError} />
                            <TrackData />
                        </div>
                    </div>
                </div>

            </div>
        </AuthLayout>
    )
}