import { ArrowDown, OctagonAlert, PackageCheck, Plus, Upload } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { statCardData } from "./statCardData";
import StatCard from "./StatCards";
import { data } from "./dummyData";
import ShipmentAnalytics from "./Analytics";
import RevenueDisplay from "./revenueSummary/RevenueDisplay";
import LiveTrackingSimulate from "./liveTrackingDisplay/LiveTrackingSimulate";
import AddShipmentBtn from "../components/AddShipment";

export default function DashBoard() {
    return (
        <AuthLayout>
            <div className="">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col justify-center text-sm gap-y-1 h-12">
                        <p className="text-xs opacity-60">Hello Joshua Gueye</p>
                        <p className="font-medium">Good Morning!</p>
                    </div>
                    <AddShipmentBtn />
                </div>

                <div className="grid grid-cols-4 gap-x-5 mt-5">
                    {statCardData.map((item, i) => {
                        const cardStat = data[item.id as keyof typeof data]
                        return (
                            <StatCard key={i} item={item} data={cardStat} />
                        )
                    })}
                </div>

                <div className="grid grid-cols-4 gap-x-5 mt-5">
                    <div className="col-span-2 bg-white rounded-md">
                        <ShipmentAnalytics />
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-x-5">
                        <div className="bg-white rounded-md">
                            <LiveTrackingSimulate />
                        </div>
                        <div className="bg-white p-5 rounded-md">
                            <RevenueDisplay />
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}