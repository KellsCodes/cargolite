"use client"
import { Box, CheckCircle2, Flag, History, MapPin, PackageSearch, Ruler, Scale, Truck, User } from "lucide-react";
import { MapPoint } from "./ShipmentMap";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ShipmentData } from "../types/shipment";
import { ShipmentStatus } from "@/generated/prisma/enums";
import { getCoordsFromAddress } from "../api/utils/MapPointCordinates";
import VividLoader from "../components/LoadingDots";

const ShipmentMap = dynamic(() => import('./ShipmentMap'), {
    ssr: false,
    loading: () => <div className="bg-header-top/30 h-full animate-pulse flex items-center justify-center text-white">Loading Route Map...</div>
});

const getProgress = (status: ShipmentStatus) => {
    const mapping = {
        RETURNED: 0,
        PICKED_UP: 10,
        DELAYED: 45,
        IN_TRANSIT: 50,
        WAREHOUSE_ARRIVED: 70,
        OUT_FOR_DELIVERY: 80,
        DELIVERED: 100,
        CANCELLED: 100
    };
    return mapping[status] ?? 0;
};

// Helper to format dates (Standard Intl API)
const formatDate = (dateStr: string | undefined) => {
    // Return a default object if dateStr is missing
    if (!dateStr) return { time: "--", date: "Pending" };

    const date = new Date(dateStr);
    return {
        time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
};


export default function TrackData({ data }: { data: ShipmentData | null }) {
    const history = data?.trackingHistory || [];
    const [originCoords, setOriginCoords] = useState<MapPoint | null>(null)
    const [currentCoords, setCurrentCoords] = useState<MapPoint | null>(null)
    const [destinationCoords, setDestinationCoords] = useState<MapPoint | null>(null)
    const currentUpdate = data?.trackingHistory?.[0];
    const currentStatus = (currentUpdate?.status as ShipmentStatus) || "PICKED_UP";
    const progress = getProgress(currentStatus);
    const isDelivered = currentStatus === "DELIVERED";
    const isPickedUp = history.length > 0;

    const { label, color, message } = getStatusDisplay(
        currentUpdate?.status as ShipmentStatus,
        currentUpdate?.location || "Unknown Location",
        data?.pickupLocation || "Origin"
    );

    useEffect(() => {
        // Item shipping location
        if (data?.pickupLocation) {
            getCoordsFromAddress(data?.pickupLocation).then(coords => {
                if (coords) setOriginCoords(coords)
            })
        }
        // Item shipping destination
        if (data?.dropLocation) {
            getCoordsFromAddress(data?.dropLocation).then(coords => {
                if (coords) setDestinationCoords(coords)
            })
        }
        // Current Item location
        if (data?.trackingHistory[0]?.location) {
            getCoordsFromAddress(data?.trackingHistory[0]?.location).then(coords => {
                if (coords) setCurrentCoords(coords)
            })
        }
    }, [])
    return (
        <div className="space-y-10 pb-20">
            {/* Top Navigation */}
            {/* <div className="flex items-center justify-between">
                <Link href="/track-parcel">
                    <button className="group flex items-center gap-x-2 font-semibold text-slate-500 hover:text-blue-600 transition-all cursor-pointer">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to tracking
                    </button>
                </Link>
                <button className="flex items-center font-bold text-blue-600 gap-x-2 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-all">
                    <Share2 className="w-4 h-4" /> Share Tracking
                </button>
            </div> */}

            {/* 1. HERO TRACKING CARD */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 lg:p-12 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-slate-900/95 z-0" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* Left: Parcel Info */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="space-y-2">
                            <div className="flex items-center gap-x-3">
                                <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md">
                                    <PackageSearch className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-3xl font-black text-white tracking-tight">{data?.shipmentID}</h2>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <span className={`${color} px-3 py-1 rounded-full text-[10px] font-black border border-emerald-500/30 uppercase tracking-tighter`}>
                                    {label}
                                </span>
                                <span className="text-white/40 text-xs font-bold uppercase tracking-widest italic">{message}</span>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-4 max-w-xl">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white uppercase tracking-widest opacity-60">Progress</span>
                                <span className="text-2xl font-black text-white">{currentStatus ? getProgress(currentStatus as ShipmentStatus) : 0}%</span>
                            </div>
                            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000" style={{ width: `${currentStatus ? getProgress(currentStatus as ShipmentStatus) : 0}%` }} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <HeroStat label="Origin" value={data?.dropLocation} icon={<MapPin className="text-blue-300" />} />
                            <HeroStat label="Current" value={data?.trackingHistory[0].location} icon={<Truck className="text-emerald-300" />} />
                            <HeroStat label="Destination" value={data?.pickupLocation} icon={<Flag className="text-rose-300" />} />
                        </div>
                    </div>

                    {/* Right: Parcel Image Preview */}
                    <div className="lg:col-span-4 flex justify-center lg:justify-end">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative w-64 h-64 bg-slate-800 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
                                {data?.packageImage ?
                                    <img src={data?.packageImage} alt="Parcel" className="w-full object-contain opacity-80 group-hover:scale-110 transition-transform duration-700" />
                                    :
                                    <div className="text-xs text-center text-white h-full flex items-center justify-center">No preview image</div>
                                }
                                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest text-center">Live Package Photo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    {/* Map */}
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden h-[500px]">
                        {originCoords && currentCoords && destinationCoords ?
                            <ShipmentMap origin={originCoords} current={currentCoords} destination={destinationCoords} />
                            :
                            <VividLoader />
                        }
                    </div>

                    {/* Party Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PartyCard type="Sender" name={data?.sender.name} location={data?.dropLocation} />
                        <PartyCard type="Receiver" name={data?.receiver.name} location={data?.pickupLocation} />
                    </div>

                    {/* Specs */}
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                            <Box className="w-4 h-4" /> Package Specifications
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <SpecItem icon={<Box className="w-4 h-4" />} label="Item Count" value={`${data?.packageCount} Package${data?.packageCount && data?.packageCount > 1 ? "s" : ""}`} />
                            <SpecItem icon={<Scale className="w-4 h-4" />} label="Total Weight" value={`${data?.weight}kg`} />
                            <SpecItem icon={<Ruler className="w-4 h-4" />} label="Dimensions" value="120 x 80 x 60 cm" />
                            <SpecItem icon={<Truck className="w-4 h-4" />} label="Service" value={data?.courierType} highlight />
                        </div>
                    </div>
                </div>

                {/* Right Column: Timeline with ACTIVE PULSE */}
                <div className="lg:col-span-4">
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden sticky top-8">
                        <div className="p-6 border-b border-slate-50 flex items-center gap-2 bg-slate-50/50">
                            <History className="w-4 h-4 text-slate-600" />
                            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Timeline</h3>
                        </div>
                        <div className="p-8 space-y-10">
                            {/* DROP LOCATION (The Goal) */}
                            {data?.pickupLocation && (
                                <TimelineStep
                                    title={isDelivered ? "DELIVERED" : "Final Destination"}
                                    location={data?.pickupLocation}
                                    {...formatDate(data?.arrival ?? "")}
                                    time="Estimated Arrival"
                                    isActive={isDelivered} // Glows only when actually delivered
                                    isCompleted={isDelivered}
                                />
                            )}

                            {/* CURRENT STATUS (The Live Update) */}
                            {!isDelivered && currentUpdate && (
                                <TimelineStep
                                    title={currentUpdate.status.replace(/_/g, ' ')}
                                    location={currentUpdate.location}
                                    {...formatDate(currentUpdate.createdAt)}
                                    isActive={true} // Always active if it's the middle "live" step
                                />
                            )}

                            {/* PICKUP LOCATION (The Start) */}
                            <TimelineStep
                                title="PICKED UP"
                                location={data?.dropLocation}
                                {...formatDate(data?.createdAt)}
                                isCompleted={isPickedUp}
                                isLast={true} // Ends the vertical line
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

// -- UPDATED TIMELINE COMPONENT WITH PULSE --
function TimelineStep({ title, location, time, date, isActive, isCompleted, isLast }: any) {
    return (
        <div className="flex gap-x-5 relative">
            {!isLast && <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-slate-100" />}
            <div className="relative z-10 w-6 h-6">
                {isActive && (
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-25" />
                )}
                <div className={`relative w-6 h-6 rounded-full flex items-center justify-center border-2 ${isActive ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-200' :
                    isCompleted ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-200'
                    }`}>
                    {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    {isActive && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </div>
            </div>
            <div className="pb-2">
                <p className={`text-sm font-bold leading-none mb-1 ${isActive ? 'text-blue-600' : 'text-slate-900'}`}>{title}</p>
                <p className="text-xs text-slate-500 font-semibold">{location}</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight">{date} • {time}</p>
            </div>
        </div>
    );
}

// (HeroStat, PartyCard, SpecItem remain same as previous version)
function HeroStat({ label, value, icon }: { label: string, value?: string, icon: any }) {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-[9px] uppercase font-black text-white/40 tracking-widest mb-0.5">{label}</p>
                <p className="text-xs font-bold text-white truncate">{value}</p>
            </div>
        </div>
    );
}

function PartyCard({ type, name, location }: { type: string, name?: string, location?: string }) {
    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-5 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${type === 'Sender' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                <User className="w-6 h-6" />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{type}</p>
                <p className="text-sm font-bold text-slate-900">{name}</p>
                <p className="text-xs text-slate-500 font-medium">{location}</p>
            </div>
        </div>
    );
}

function SpecItem({ icon, label, value, highlight }: { icon: any, label: string, value?: string, highlight?: boolean }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400">
                {icon}
                <p className="text-[10px] font-black uppercase tracking-widest">{label}</p>
            </div>
            <p className={`text-sm font-bold ${highlight ? 'text-blue-600' : 'text-slate-700'}`}>{value}</p>
        </div>
    );
}


const getStatusDisplay = (status: ShipmentStatus | undefined, location: string, pickupLocation: string) => {
    // Default fallback if data is missing
    if (!status) return { label: "N/A", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", message: "Updating..." };

    const styles: Record<ShipmentStatus, { label: string; color: string; message: string }> = {
        IN_TRANSIT: {
            label: "In Transit",
            color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
            message: `Moving through ${location}`
        },
        WAREHOUSE_ARRIVED: {
            label: "At Warehouse",
            color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
            message: `Moving through ${location}`
        },
        OUT_FOR_DELIVERY: {
            label: "Out for Delivery",
            color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
            message: `Delivered at ${location}`
        },
        DELIVERED: {
            label: "Delivered",
            color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
            message: `Delivered at ${location}`
        },
        CANCELLED: {
            label: "Cancelled",
            color: "bg-slate-500/20 text-slate-400 border-slate-500/30",
            message: `Cancelled at ${location}`
        },
        PICKED_UP: {
            label: "Picked Up",
            color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
            message: `Picked up at ${location}`
        },
        RETURNED: {
            label: "Returned",
            color: "bg-rose-500/20 text-rose-400 border-rose-500/30",
            message: `Returned to ${pickupLocation}`
        },
        DELAYED: {
            label: "Delayed",
            color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
            message: `Delayed at ${location}`
        },
    };

    return styles[status] ?? { label: status, color: "bg-gray-500/20", message: location };
};