import { ArrowDown, OctagonAlert, PackageCheck, Plus, Upload } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { statCardData } from "./statCardData";
import StatCard from "./StatCards";
import { data } from "./dummyData";

export default function DashBoard() {
    return (
        <AuthLayout>
            <div className="h-[150vh]">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col justify-center text-sm gap-y-1 h-12">
                        <p className="text-xs opacity-60">Hello Joshua Gueye</p>
                        <p className="font-medium">Good Morning!</p>
                    </div>
                    <div className="flex items-center gap-x-5">
                        <button className="cursor-pointer flex items-center justify-center gap-x-1 w-[140px] hover:w-[145px] hover:opacity-90 transition-all duration-300 ease-in-out h-12 bg-white text-sm p-5 rounded-sm">Export CSV <Upload className="w-4" /></button>
                        <button className="cursor-pointer flex items-center justify-center gap-x-1 w-[175px] hover:w-[178px] hover:opacity-90 transition-all duration-300 ease-in-out h-12 bg-main-primary text-sm p-5 text-white rounded-sm">Add New Shipping <Plus className="w-4" /></button>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-x-5 mt-10">
                    {statCardData.map((item, i) => {
                        const cardStat = data[item.id as keyof typeof data]
                        return (
                            <StatCard key={i} item={item} data={cardStat} />
                        )
                    })}
                </div>
            </div>
        </AuthLayout>
    )
}