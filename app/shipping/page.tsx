import AddShipmentBtn from "../components/AddShipment";
import AuthLayout from "../components/AuthLayout";
import ShippingTable from "./ShippingTable";

export default function ShippingOrders() {
    return (
        <AuthLayout>
            <div className="space-y-6 overflow-hidden">
                <div className="flex items-center justify-between">
                    <h1 className="font-medium">Shipping</h1>
                    <AddShipmentBtn />
                </div>

                <div className="h-[74vh] bg-white rounded-lg">
                    <ShippingTable />
                </div>
            </div>
        </AuthLayout>
    )
}