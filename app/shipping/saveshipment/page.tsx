import Link from "next/link";
import AuthLayout from "../../components/AuthLayout";
import { ChevronLeft } from "lucide-react";
import SaveShipmentForm from "./form";

export default function saveShipment() {
    return (
        <AuthLayout>
            <div className="space-y-6 overflow-hidden">
                <div>
                    <h1 className="font-semibold">Add New Shipping</h1>
                    <div className="flex items-center gap-x-[2px] text-xs opacity-50">
                        <Link href={"/shipping"}>Shipping</Link>
                        <ChevronLeft className="w-3 rotate-180" />
                        <button className="">Add New Shipping</button>
                    </div>

                </div>

                <div className="h-[74vh] bg-white rounded-lg py-5">
                    <div className="h-full flex-1 flex flex-col overflow-y-auto">
                        <SaveShipmentForm />
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}