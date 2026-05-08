import AddShipmentBtn from "../components/AddShipment";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import ShippingTable from "./ShippingTable";

export default function ShippingOrders() {
    return (
        <AuthLayout>
            <div className="h-screen flex flex-col">
                <div className="p-2 2xl:p-6 overflow-y-auto flex-1">
                    <div className="flex items-center justify-between">
                        <h1 className="font-medium">Shipping</h1>
                        <AddShipmentBtn />
                    </div>

                    <div className="h-[74vh] bg-white rounded-lg">
                        <ShippingTable />
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}