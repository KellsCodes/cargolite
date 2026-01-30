import AddShipmentBtn from "../components/AddShipment";
import AuthLayout from "../components/AuthLayout";
import ClientsTable from "./ClientsTable";

export default function Customers() {
    return (
        <AuthLayout>
            <div className="space-y-6 overflow-hidden">
                <div className="flex items-center justify-between">
                    <h1 className="font-medium">Clients</h1>
                    <AddShipmentBtn />
                </div>

                <div className="h-[74vh] bg-white rounded-lg">
                    <ClientsTable />
                </div>
            </div>
        </AuthLayout>
    )
}