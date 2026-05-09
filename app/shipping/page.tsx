import AddShipmentBtn from "../components/AddShipment";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import ShippingTable from "./ShippingTable";

export default function ShippingOrders() {
    return (
        <AuthLayout>
            <div className="h-screen flex flex-col overflow-hidden">
                <div className="py-2 px-4 md:px-6 2xl:p-6 overflow-y-auto overflow-x-hidden flex-1">
                    <div className="flex items-center justify-between my-2">
                        <h1 className="font-medium">Shipping</h1>
                        <AddShipmentBtn />
                    </div>

                    <div className="h-[76vh] bg-white rounded-lg overflow-hidden">
                        <ShippingTable />
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}