import AuthLayout from "../components/AuthLayout/AuthLayout";
import ShipmentAnalytics from "./Analytics";
import RevenueDisplay from "./revenueSummary/RevenueDisplay";
import LiveTrackingSimulate from "./liveTrackingDisplay/LiveTrackingSimulate";
import AddShipmentBtn from "../components/AddShipment";
import { getRequiredSession } from "@/lib/auth-session";
import { getHours } from "date-fns";
import StatOverview from "./StatOverview";


export default async function DashBoard() {
    const userSession = await getRequiredSession()
    const currentHour = getHours(new Date())
    return (
        <AuthLayout>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col justify-center text-sm gap-y-1 h-12">
                        <p className="text-xs opacity-60">Hello {userSession?.name}</p>
                        <p className="font-medium">
                            {currentHour < 12 ? "Good Morning!" : currentHour < 18 ? "Good Afternoon!" : "Good Evening!"}
                        </p>
                    </div>
                    <AddShipmentBtn />
                </div>

                <StatOverview />

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