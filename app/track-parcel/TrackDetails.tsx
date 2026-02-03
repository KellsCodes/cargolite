"use client"
import { ArrowLeft, Box, CheckCircle2, ChevronDown, ChevronUp, CircleDot, Flag, Goal, History, MapPin, Package2, PackageSearch, Plane, Ruler, Scale, Share2, Ship, Truck, User } from "lucide-react";
import Link from "next/link";
import { MapPoint } from "./ShipmentMap";
import dynamic from "next/dynamic";
import { useState } from "react";

const ShipmentMap = dynamic(() => import('./ShipmentMap'), {
    ssr: false,
    loading: () => <div className="bg-header-top/30 h-full animate-pulse flex items-center justify-center text-white">Loading Route Map...</div>
});

export default function TrackData() {
    const originCoords: MapPoint = [37.422, -122.084];
    const currentCoords: MapPoint = [53.381, -1.470];
    const destinationCoords: MapPoint = [51.519, -0.127];

    return (
        <div className="space-y-10 pb-20">
            {/* Top Navigation */}
            <div className="flex items-center justify-between">
                <Link href="/track-parcel">
                    <button className="group flex items-center gap-x-2 font-semibold text-slate-500 hover:text-blue-600 transition-all cursor-pointer">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to tracking
                    </button>
                </Link>
                <button className="flex items-center font-bold text-blue-600 gap-x-2 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-all">
                    <Share2 className="w-4 h-4" /> Share Tracking
                </button>
            </div>

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
                                <h2 className="text-3xl font-black text-white tracking-tight">AWP1234567890</h2>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black border border-emerald-500/30 uppercase tracking-tighter">
                                    In Transit
                                </span>
                                <span className="text-white/40 text-xs font-bold uppercase tracking-widest italic">Moving through Sheffield Hub</span>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-4 max-w-xl">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white uppercase tracking-widest opacity-60">Progress</span>
                                <span className="text-2xl font-black text-white">75%</span>
                            </div>
                            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000" style={{ width: '75%' }} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <HeroStat label="Origin" value="Mountain View, CA" icon={<MapPin className="text-blue-300" />} />
                            <HeroStat label="Current" value="Sheffield, UK" icon={<Truck className="text-emerald-300" />} />
                            <HeroStat label="Destination" value="London, UK" icon={<Flag className="text-rose-300" />} />
                        </div>
                    </div>

                    {/* Right: Parcel Image Preview */}
                    <div className="lg:col-span-4 flex justify-center lg:justify-end">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative w-64 h-64 bg-slate-800 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
                                <img src="/package2.png" alt="Parcel" className="w-full h-full object-contain opacity-80 group-hover:scale-110 transition-transform duration-700" />
                                {/* <div className="text-xs text-center text-white h-full flex items-center justify-center">No preview image</div> */}
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
                        <ShipmentMap origin={originCoords} current={currentCoords} destination={destinationCoords} />
                    </div>

                    {/* Party Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PartyCard type="Sender" name="Joshua Nikeldon" location="Leeds, United Kingdom" />
                        <PartyCard type="Receiver" name="Alex Smith" location="London, United Kingdom" />
                    </div>

                    {/* Specs */}
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                            <Box className="w-4 h-4" /> Package Specifications
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <SpecItem icon={<Box className="w-4 h-4" />} label="Item Count" value="12 Packages" />
                            <SpecItem icon={<Scale className="w-4 h-4" />} label="Total Weight" value="45.50 kg" />
                            <SpecItem icon={<Ruler className="w-4 h-4" />} label="Dimensions" value="120 x 80 x 60 cm" />
                            <SpecItem icon={<Truck className="w-4 h-4" />} label="Service" value="Express" highlight />
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
                            {/* Current (Active) Location */}
                            <TimelineStep
                                title="In Transit"
                                location="Sheffield Distribution Center, UK"
                                time="10:45 AM"
                                date="Feb 3, 2026"
                                isActive
                            />
                            <TimelineStep
                                title="Processed at Hub"
                                location="Manchester Gateway"
                                time="08:20 PM"
                                date="Feb 2, 2026"
                                isCompleted
                            />
                            <TimelineStep
                                title="Shipment Picked Up"
                                location="Mountain View, CA"
                                time="02:00 PM"
                                date="Jan 31, 2026"
                                isCompleted
                                isLast
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
function HeroStat({ label, value, icon }: { label: string, value: string, icon: any }) {
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

function PartyCard({ type, name, location }: { type: string, name: string, location: string }) {
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

function SpecItem({ icon, label, value, highlight }: { icon: any, label: string, value: string, highlight?: boolean }) {
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