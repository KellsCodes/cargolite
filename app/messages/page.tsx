import AddShipmentBtn from "../components/AddShipment";
import AuthLayout from "../components/AuthLayout";
import MessageTable from "./ClientsTable";

export default function Customers() {
    return (
        <AuthLayout>
            <div className="space-y-6 overflow-hidden">
                <div className="flex items-center justify-between">
                    <h1 className="font-medium">Messages</h1>
                    <AddShipmentBtn />
                </div>

                <div className="h-[74vh] bg-white rounded-lg">
                    <MessageTable />
                </div>
            </div>
        </AuthLayout>
    )
}