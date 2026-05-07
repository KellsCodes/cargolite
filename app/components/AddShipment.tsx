"use client";
import { Plus, Upload } from "lucide-react";

export default function AddShipmentBtn() {
    return (
        <div className="flex items-center gap-x-5">
            <button
                className="cursor-pointer flex items-center justify-center gap-x-1 w-auto 2xl:w-[140px] hover:opacity-70 transition-all duration-300 ease-in-out h-12 bg-white text-sm p-5 rounded-sm"
            >
                <span className="hidden xl:inline-block">
                    Export CSV
                </span>
                <Upload className="w-5 2xl:w-4" />
            </button>
            <button
                className="cursor-pointer flex items-center justify-center gap-x-1 w-auto 2xl:w-[175px] hover:opacity-80 transition-all duration-300 ease-in-out h-12 bg-main-primary text-sm p-5 text-white rounded-sm"
                onClick={() => { window.location.href = "/shipping/saveshipment" }}
            >
                <span className="hidden xl:inline-block">
                    Add New Shipping
                </span>
                <Plus className="w-4" />
            </button>
        </div>
    )
}