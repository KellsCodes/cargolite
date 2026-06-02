import Link from "next/link";
import AuthLayout from "../../../components/AuthLayout/AuthLayout";
import { ChevronLeft } from "lucide-react";
import UpdateShipmentForm from "./form";

// Define the type for the params
interface PageProps {
    params: Promise<{ trackingID: string }>; // Adjust 'id' to match your folder name [id]
}

export default async function saveShipment({ params }: PageProps) {
    const { trackingID } = await params;
    return (
        <AuthLayout>
            <div className="space-y-6 overflow-hidden p-4 md:p-6">
                <div>
                    <h1 className="font-semibold">Add New Shipping</h1>
                    <div className="flex items-center gap-x-[2px] text-xs opacity-50">
                        <Link href={"/shipping"}>Shipping</Link>
                        <ChevronLeft className="w-3 rotate-180" />
                        <button className="">Update Shipment-{trackingID}</button>
                    </div>

                </div>

                <div className="h-[74vh] bg-white rounded-lg py-5i">
                    <UpdateShipmentForm trackingID={trackingID} />
                    {/* <div className="h-full flex-1 flex flex-col overflow-y-auto">
                    </div> */}
                </div>
            </div>
        </AuthLayout>
    )
}