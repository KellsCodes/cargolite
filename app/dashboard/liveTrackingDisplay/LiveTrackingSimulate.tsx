import { ArrowRight, MapPin } from "lucide-react";

export default function LiveTrackingSimulate() {
    return (
        <div className="w-full h-full p-5 rounded-md relative">
            <p className="font-medium text-md">Live Tracking Delivery</p>
            <div className="my-3">
                <img src="/tracker.png" alt="tracking_img" loading="lazy" className="rounded" />
            </div>

            <div className="flex items-center justify-between my-5">
                <div className="space-y-1">
                    <p className="text-xs opacity-60 font-medium">TrackingID</p>
                    <p className="font-medium text-sm">AWP1234567890</p>
                </div>
                <button className="text-xs h-10 w-22 bg-gray-100/50 rounded-md">
                    On the way
                </button>
            </div>

            <div className="space-y-5">
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-x-3">
                        <div className="relative w-3 h-3 flex items-center justify-center shrink-0">
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full animate-ping opacity-75" />
                            <div className="w-2 h-2 rounded-full bg-blue-600" />
                        </div>
                        <div>
                            <p className="font-medium">Departure</p>
                            <p className="opacity-50">California</p>
                        </div>

                    </div>
                    <div>
                        <p className="font-medium">Shipping Date</p>
                        <p className="opacity-50">09/07/2025 - 10:30AM</p>
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-x-3">
                        <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                            <div className="absolute w-6 h-6 bg-main-primary/10 rounded-full" />
                            <MapPin className="w-4 fill-blue-600 stroke-2 stroke-white" />
                            {/* <div className="w-2 h-2 rounded-full bg-blue-600" /> */}
                        </div>
                        <div>
                            <p className="font-medium">Destination</p>
                            <p className="opacity-50">New York</p>
                        </div>

                    </div>
                    <div>
                        <p className="font-medium">Estimated Time Arrival</p>
                        <p className="opacity-50">09/08/2025 - 08:30AM</p>
                    </div>
                </div>
            </div>


            <div className="absolute bottom-6 left-0 right-0 px-5">
                <button className="h-10 w-full bg-white border rounded-sm text-sm font-medium cursor-pointer">
                    View details
                    <ArrowRight className="w-4 inline-block ml-2" />
                </button>
            </div>
        </div>
    )
}