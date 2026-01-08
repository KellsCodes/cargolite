import { ArrowLeft, Flag, MapPin, PackageSearch, Share2 } from "lucide-react";
import Link from "next/link";

export default function TrackData() {
    return (
        <div>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Link href={"/tract-parcel"}>
                        <button className="flex items-center font-medium text-[#034460] cursor-pointer"><ArrowLeft /> Back to tracking</button>
                    </Link>
                    <button className="flex items-center font-medium text-[#034460] gap-x-2"><Share2 className="w-4" /> Share</button>
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
            {/* <h2>Hello Tracking...</h2> */}
        </div>
    )
}