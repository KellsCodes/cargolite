import { Plus, Upload } from "lucide-react";

export default function AddShipmentBtn() {
    return (
        <div className="flex items-center gap-x-5">
            <button className="cursor-pointer flex items-center justify-center gap-x-1 w-[140px] hover:opacity-70 transition-all duration-300 ease-in-out h-12 bg-white text-sm p-5 rounded-sm">Export CSV <Upload className="w-4" /></button>
            <button className="cursor-pointer flex items-center justify-center gap-x-1 w-[174px] hover:opacity-80 transition-all duration-300 ease-in-out h-12 bg-main-primary text-sm p-5 text-white rounded-sm">Add New Shipping <Plus className="w-4" /></button>
        </div>
    )
}