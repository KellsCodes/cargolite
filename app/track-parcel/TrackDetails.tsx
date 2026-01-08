import { ArrowLeft, CircleDot, Flag, Goal, MapPin, PackageSearch, RotateCcw, Share2, Ship, User } from "lucide-react";
import Link from "next/link";
import { MapPoint } from "./ShipmentMap";
import dynamic from "next/dynamic";

const ShipmentMap = dynamic(() => import('./ShipmentMap'), {
    ssr: false,
    loading: () => <div className="bg-header-top/30 h-full animate-pulse flex items-center justify-center text-white">Loading Route Map...</div>
});

export default function TrackData() {
    const originCoords: MapPoint = [37.422, -122.084];
    const currentCoords: MapPoint = [53.381, -1.470];
    const destinationCoords: MapPoint = [51.519, -0.127];
    return (
        <div className="space-y-20">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Link href={"/tract-parcel"}>
                        <button className="flex items-center font-medium text-[#034460] cursor-pointer"><ArrowLeft /> Back to tracking</button>
                    </Link>
                    <button className="flex items-center font-medium text-main-primary gap-x-2"><Share2 className="w-4" /> Share</button>
                </div>

                <div className="px-10 py-7 bg-[#034460] rounded-lg space-y-7"
                    style={{
                        backgroundImage: `linear-gradient(rgba(3, 68, 96, 0.7), rgba(3, 68, 96, 0.7)), url(/bg-offer.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="flex items-center gap-x-2 text-white"><PackageSearch color="#ffffff" /> AWP1234567890</p>
                            <p className="font-bold"><span className="text-white/50">Status:</span> <span className="text-white">In Transit</span></p>
                        </div>
                        <div className="text-center p-2 w-48 bg-header-top/30 rounded-sm text-white">
                            <p>Estimated Delivery</p>
                            <p>23rd January, 2026</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm font-medium text-white">
                            <p className="bg-header-top/30 py-2 px-3 rounded-xl">Shipment Progress</p>
                            <p>75%</p>
                        </div>
                        <div className="w-full h-2 bg-header-top/40 rounded-full">
                            <div className="h-full bg-white transition-all duration-700 ease-in-out w-[75%] rounded-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-x-6">
                        <div className="min-h-24 col-span-1 bg-header-top/40 rounded-md flex flex-col justify-center p-5 space-y-2">
                            <p className="text-white/60">Origin</p>
                            <p className="text-white flex items-center gap-x-1">
                                <MapPin color="#ffffff" className="w-[19px]" />
                                1600 Amphitheatre Parkway, Mountain View, CA
                            </p>
                        </div>
                        <div className="min-h-24 col-span-1 bg-header-top/40 rounded-md flex flex-col justify-center p-5 space-y-2">
                            <p className="text-white/60">Current Location</p>
                            <p className="text-white flex items-center gap-x-1">
                                <MapPin color="#ffffff" className="w-[19px]" />
                                42 Willow Crescent Shefield S10 3LT
                            </p>
                        </div>
                        <div className="min-h-24 col-span-1 bg-header-top/40 rounded-md flex flex-col justify-center p-5 space-y-2">
                            <p className="text-white/60">Destination</p>
                            <p className="text-white flex items-center gap-x-1">
                                <Flag color="#ffffff" className="w-[19px]" />
                                Great Russel St, London, WCLB 3DG, United Kingdom
                            </p>
                        </div>

                    </div>
                </div>
            </div>


            {/* Shipment route */}
            <div className="flex items-start gap-x-5">
                <div className="w-[65%] space-y-4">
                    <div className="w-full space-y-0 shadow-md rounded-b-md bg-white">
                        <div className="p-5 bg-black/2">
                            <p className="flex items-center gap-x-1 text-main-primary font-bold"><Ship className="w-5" /> Shipment Route</p>
                        </div>
                        <div className="h-130 relative z-5">
                            <ShipmentMap
                                origin={originCoords}
                                current={currentCoords}
                                destination={destinationCoords}
                            />
                        </div>
                    </div>

                    <div className="w-full shadow-md rounded-b-md bg-white">
                        <div className="p-5 bg-black/2">
                            <p className="flex items-center gap-x-1 text-main-primary font-bold"><MapPin className="w-5" /> Location Information</p>
                        </div>
                        <div className="grid grid-cols-3 gap-x-4 p-5">
                            <div className="col-span-1 space-y-2">
                                <p className="text-sm text-main-primary/70 font-medium">Origin</p>
                                <div className="flex items-center gap-x-2">
                                    <CircleDot className="w-5 text-main-primary" />
                                    <p className="text-sm text-black/60 font-bold">1600 Amphitheatre Parkway, Mountain View, CA</p>
                                </div>
                            </div>
                            <div className="col-span-1 space-y-2">
                                <p className="text-sm text-main-primary/70 font-medium">Current Location</p>
                                <div className="flex items-center gap-x-2">
                                    <CircleDot className="w-5 text-main-primary" />
                                    <p className="text-sm text-black/60 font-bold">42 Willow Crescent Shefield S10 3LT</p>
                                </div>
                            </div>
                            <div className="col-span-1 space-y-2">
                                <p className="text-sm text-main-primary/70 font-medium">Destination</p>
                                <div className="flex items-center gap-x-2">
                                    <CircleDot className="w-5 text-main-primary" />
                                    <p className="text-sm text-black/60 font-bold">Great Russell St, London, WC1B 3DG, United Kingdom</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="w-full shadow-md rounded-b-md bg-white">
                        <div className="p-5 bg-black/[0.02] border-b">
                            <p className="flex items-center gap-x-1 text-main-primary font-bold">
                                <RotateCcw className="w-5" /> Shipment Timeline
                            </p>
                        </div>

                        {/* The Timeline Container */}
                        <div className="p-8 space-y-0">

                            {/* Step 1: Origin */}
                            <div className="flex gap-x-6">
                                <div className="relative flex flex-col items-center">
                                    {/* Dot */}
                                    <div className="z-10 w-6 h-6 bg-white border-2 border-main-primary rounded-full flex items-center justify-center shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-main-primary" />
                                    </div>
                                    {/* Vertical Line Segment */}
                                    <div className="w-[2px] h-full bg-main-primary/10" />
                                </div>

                                <div className="pb-10 w-full">
                                    <div className="p-4 rounded-sm bg-main-primary/5 space-y-1 border border-main-primary/10">
                                        <div className="flex items-center justify-between">
                                            <p className="text-main-primary font-bold">Dispatched from Origin</p>
                                            <p className="text-sm opacity-60">Dec 17, 2026</p>
                                        </div>
                                        <p className="py-1 px-3 w-fit text-main-primary text-[10px] bg-main-primary/10 rounded-full font-bold uppercase tracking-wider">Dispatched</p>
                                        <p className="text-sm opacity-70">1600 Amphitheatre Parkway, Mountain View, CA</p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Current Location (Dynamic Height) */}
                            <div className="flex gap-x-6">
                                <div className="relative flex flex-col items-center">
                                    {/* Ping Dot */}
                                    <div className="z-10 flex items-center justify-center shrink-0">
                                        <div className="absolute w-5 h-5 bg-chart-5 rounded-full animate-ping opacity-75" />
                                        <div className="relative w-5 h-5 bg-white border-2 border-chart-5 rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-chart-5" />
                                        </div>
                                    </div>
                                    {/* Vertical Line Segment */}
                                    <div className="w-[2px] h-full bg-main-primary/10" />
                                </div>

                                <div className="pb-10 w-full">
                                    <div className="p-4 rounded-sm bg-chart-5/10 space-y-1 border border-chart-5/20">
                                        <div className="flex items-center justify-between">
                                            <p className="text-black font-bold">Current Location</p>
                                            <p className="text-sm opacity-60">Jan 08, 2026</p>
                                        </div>
                                        <p className="py-1 px-3 w-fit text-chart-5 text-[10px] bg-chart-5/20 rounded-full font-bold uppercase tracking-wider">In Transit</p>
                                        <p className="text-sm opacity-70">42 Willow Crescent, Sheffield S10 3LT</p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3: Destination */}
                            <div className="flex gap-x-6">
                                <div className="relative flex flex-col items-center">
                                    {/* Goal Dot */}
                                    <div className="z-10 w-6 h-6 bg-white border-2 border-green-500 rounded-full flex items-center justify-center shrink-0">
                                        <Goal className="w-3.5 text-green-500" />
                                    </div>
                                    <div className="w-[2px] h-full bg-main-primary/10" />
                                </div>

                                <div className="w-full">
                                    <div className="p-4 rounded-sm bg-green-50 space-y-1 border border-green-100">
                                        <div className="flex items-center justify-between">
                                            <p className="text-black font-bold">Delivery Destination</p>
                                            <p className="text-sm opacity-60">Pending</p>
                                        </div>
                                        <p className="py-1 px-3 w-fit text-green-600 text-[10px] bg-green-100 rounded-full font-bold uppercase tracking-wider">Upcoming</p>
                                        <p className="text-sm opacity-70">Great Russell St, London WC1B 3DG</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="w-[35%] space-y-5">

                    <div className="w-full space-y-3 shadow-md rounded-b-md bg-white">
                        <div className="p-5 bg-black/2">
                            <p className="flex items-center gap-x-1 text-main-primary font-bold"><User className="w-5 fill-main-primary" />Receiver Information</p>
                        </div>
                        <div className="space-y-4 p-5 pt-0">
                            <div>
                                <p className="text-main-primary/70 text-sm">Name</p>
                                <p className="text-main-primary font-bold">May D. Rivas</p>
                            </div>

                            <div>
                                <p className="text-main-primary/70 text-sm">Email</p>
                                <p className="text-main-primary font-bold">may***@gmail.com</p>
                            </div>

                            <div>
                                <p className="text-main-primary/70 text-sm">Contact</p>
                                <p className="text-main-primary font-bold">901***004</p>
                            </div>

                            <div>
                                <p className="text-main-primary/70 text-sm">Delivery Address</p>
                                <p className="text-main-primary font-bold">355 Lightning Point Drive Memphis</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full space-y-3 shadow-md rounded-b-md bg-white">
                        <div className="p-5 bg-black/2">
                            <p className="flex items-center gap-x-1 text-main-primary font-bold"><User className="w-5 fill-main-primary" />Sender Information</p>
                        </div>
                        <div className="space-y-4 p-5 pt-0">
                            <div>
                                <p className="text-main-primary/70 text-sm">Name</p>
                                <p className="text-main-primary font-bold">Lorreta D. Greer</p>
                            </div>

                            <div>
                                <p className="text-main-primary/70 text-sm">Email</p>
                                <p className="text-main-primary font-bold">lorr***@gmail.com</p>
                            </div>

                            <div>
                                <p className="text-main-primary/70 text-sm">Delivery Address</p>
                                <p className="text-main-primary font-bold">2888 Kelly Drive Summersville</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}