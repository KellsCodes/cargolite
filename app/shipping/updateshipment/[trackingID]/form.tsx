"use client"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { toast } from "react-toastify"
import axios from "axios"
import api from "@/lib/axios"
import { AnimateSpin } from "@/app/components/AnimateSpin"
import { ShipmentStatus } from "@/generated/prisma/enums"

interface ShipmentFormData {
    senderName: string;
    receiverName: string;
    senderEmail: string;
    receiverEmail: string;
    senderPhone: string;
    receiverPhone: string;
    weight: number;
    packageType: string;
    courierType: string;
    dropLocation: string;
    pickupLocation: string;
    arrival: Date;
    amount: number;
    paymentMethod: string;
    payerRole: string;
    packageImage: File | null;
    packageCount: number;
    id: number | null;
    status: string;
}


export default function UpdateShipmentForm({ trackingID }: { trackingID: string | null }) {
    const [isDragging, setIsDragging] = useState<Boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<Boolean>(false)
    const [updateData, setUpdateData] = useState<any>({})

    const [formData, setFormData] = useState<ShipmentFormData>({
        senderName: "",
        receiverName: "",
        senderEmail: "",
        receiverEmail: "",
        senderPhone: "",
        receiverPhone: "",
        pickupLocation: "",
        dropLocation: "",
        weight: 0,
        packageType: "",
        arrival: null as unknown as Date,
        courierType: "",
        packageImage: null,
        amount: 0,
        payerRole: "",
        paymentMethod: "",
        packageCount: 1,
        id: null,
        status: ""
    })

    const handleGetShipment = async () => {
        if (!trackingID) {
            toast.error("Tracking ID is not valid.");
            return
        }

        try {
            const response = await api.get(`/shipment/tracking?tracking_number=${trackingID}`)
            if (response.status === 200) {
                setFormData({
                    ...response.data,
                    senderName: response.data.sender.name,
                    receiverName: response.data.receiver.name,
                    senderPhone: response.data.sender.telephone,
                    receiverPhone: response.data.receiver.telephone,
                    senderEmail: response.data.sender.email,
                    receiverEmail: response.data.receiver.email,
                    packageImage: null,
                    amount: response.data.invoice.amount,
                    payerRole: response.data.invoice.payerRole,
                    paymentMethod: response.data.invoice.paymentMethod,
                    status: response.data.trackingHistory[0].status
                })
            } else {
                toast.error("Failed to fetch shipment details.");
            }
        } catch (error) {
            toast.error("Failed to fetch shipment details.");
        }
    }


    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!trackingID || !formData.id) {
            toast.error("Tracking ID is not valid.");
            return
        }

        if (formData.status !== ShipmentStatus.PICKED_UP) {
            toast.error("Shipment has already been processed and cannot be updated.");
            return;
        }

        if (isSubmitting) {
            toast.error("Please hold on, a request is ongoing.");
            return;
        }

        const isEmpty = Object.keys(updateData).length === 0 && updateData.constructor === Object;

        if (isEmpty) {
            toast.error(`Please make changes before submitting.`);
            return
        }

        const cleanedData = Object.fromEntries(
            Object.entries(updateData).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
        );

        setIsSubmitting(true)
        try {
            const payload = new FormData()
            Object.entries(cleanedData).forEach(([key, value]) => {
                if (value instanceof Date) {
                    payload.append(key, format(value, "yyyy-MM-dd"))
                }
                else if (value instanceof File) {
                    payload.append(key, value);
                }
                else {
                    // Append everything else (strings, numbers) as strings
                    payload.append(key, String(value));
                }
            })

            const response = await api.patch(`/shipment/${formData.id}`, payload)
            if (response.status === 200 || response.status === 201) {
                toast.success("Shipment updated successfully!");
            }

        } catch (error) {
            let errorMessage = "An unexpected error occurred";

            // Check if it's an Axios error (if using Axios)
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            }
            // Check if it's a standard JavaScript Error
            else if (error instanceof Error) {
                errorMessage = error.message;
            }

            toast.error(errorMessage.slice(0, 80));

        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        handleGetShipment()
    }, [])

    return (
        <div className="h-full flex-1 flex flex-col bg-slate-50/50">
            <form onSubmit={handleSubmitForm} className="h-full flex-1 flex flex-col">
                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto px-0 py-6 lg:p-10">
                    <div className="max-w-5xl mx-auto space-y-8 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">

                        {/* Section 1: Contact Information */}
                        <section>
                            <div className="border-b border-slate-100 pb-3 mb-6">
                                <h2 className="text-lg font-semibold text-slate-800">Contact Information</h2>
                                <p className="text-xs text-slate-500">Details for both sender and receiver</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Sender Name */}
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Sender Name</label>
                                    <input
                                        onChange={(e) => {
                                            setFormData({ ...formData, senderName: e.target.value })
                                            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
                                        }}
                                        name="senderName" value={formData.senderName} type="text"
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Receiver Name */}
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Receiver Name</label>
                                    <input
                                        onChange={(e) => {
                                            setFormData({ ...formData, receiverName: e.target.value })
                                            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
                                        }}
                                        name="receiverName" value={formData.receiverName} type="text"
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Jane Smith"
                                    />
                                </div>

                                {/* Emails */}
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Sender Email</label>
                                    <input
                                        onChange={(e) => {
                                            setFormData({ ...formData, senderEmail: e.target.value })
                                            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
                                        }}
                                        name="senderEmail" value={formData.senderEmail} type="email"
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="sender@example.com"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Receiver Email</label>
                                    <input
                                        onChange={(e) => {
                                            setFormData({ ...formData, receiverEmail: e.target.value })
                                            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
                                        }}
                                        name="receiverEmail" value={formData.receiverEmail} type="email"
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="receiver@example.com"
                                    />
                                </div>

                                {/* Phones */}
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Sender Phone</label>
                                    <input
                                        onChange={(e) => {
                                            setFormData({ ...formData, senderPhone: e.target.value })
                                            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
                                        }}
                                        name="senderPhone" value={formData.senderPhone} type="tel"
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Enter sender phone number"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Receiver Phone</label>
                                    <input
                                        onChange={(e) => {
                                            setFormData({ ...formData, receiverPhone: e.target.value })
                                            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
                                        }}
                                        name="receiverPhone" value={formData.receiverPhone} type="tel"
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Enter receiver phone number"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Package Logistics */}
                        <section>
                            <div className="border-b border-slate-100 pb-3 mb-6">
                                <h2 className="text-lg font-semibold text-slate-800">Package & Logistics</h2>
                                <p className="text-xs text-slate-500">Shipping route and package specifications</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Origin</label>
                                    <input
                                        onChange={(e) => {
                                            setFormData({ ...formData, pickupLocation: e.target.value })
                                            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
                                        }}
                                        name="dropLocation" value={formData.pickupLocation} type="text"
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Address or Terminal"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Destination</label>
                                    <input
                                        onChange={(e) => {
                                            setFormData({ ...formData, dropLocation: e.target.value })
                                            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
                                        }}
                                        name="pickupLocation" value={formData.dropLocation} type="text"
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Destination Address"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Package Weight (kg)</label>
                                    <input
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            setFormData({ ...formData, weight: isNaN(val) ? 0 : val });
                                            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
                                        }}
                                        name="weight" value={formData.weight} type="number" min={1} step="any"
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="0.00"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Package Type</label>
                                    <select
                                        name="packageType" value={formData.packageType}
                                        onChange={e => {
                                            setFormData({ ...formData, packageType: e.target.value })
                                            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
                                        }}
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                                    >
                                        <option value="" disabled hidden>Select type...</option>
                                        <option value="STANDARD">Standard</option>
                                        <option value="FRAGILE">Fragile</option>
                                        <option value="PERISHABLE">Perishable</option>
                                        <option value="HAZARDOUS">Hazardous</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Estimated Arrival</label>
                                    <input
                                        onChange={(e) => {
                                            setFormData({ ...formData, arrival: new Date(e.target.value) })
                                            setUpdateData({ ...updateData, [e.target.name]: new Date(e.target.value) })
                                        }}
                                        name="arrival" value={format(formData.arrival, "yyyy-MM-dd")} type="date"
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Courier Service Type</label>
                                    <select
                                        name="courierType" value={formData.courierType}
                                        onChange={e => {
                                            setFormData({ ...formData, courierType: e.target.value })
                                            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
                                        }}
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                                    >
                                        <option value="" disabled hidden>Select service...</option>
                                        <option value="BUS">Bus</option>
                                        <option value="AIRPLANE">Airplane</option>
                                        <option value="SHIP">Ship</option>
                                    </select>
                                </div>
                            </div>

                            {/* Full Width File Upload */}
                            <div className="mt-6 space-y-1.5">
                                <label className="text-[13px] font-medium text-slate-700">Package Image</label>
                                <div
                                    // Drag & Drop Handlers
                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setIsDragging(false);
                                        const file = e.dataTransfer.files?.[0] || null;
                                        if (file) {
                                            setFormData({ ...formData, packageImage: file });
                                            setUpdateData({ ...updateData, packageImage: file })
                                        }
                                    }}
                                    // Dynamic Styling
                                    className={`relative border-2 p-6 rounded-xl transition-all group ${formData.packageImage
                                        ? "border-dotted border-green-500 bg-green-50/40"
                                        : isDragging
                                            ? "border-solid border-blue-500 bg-blue-50/50"
                                            : "border-dashed border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            setFormData({ ...formData, packageImage: file });
                                            setUpdateData({ ...updateData, packageImage: file })
                                        }}
                                    />
                                    <div className="text-center pointer-events-none">
                                        <p className="text-sm text-slate-600">
                                            <span className={`font-semibold ${formData.packageImage ? "text-green-600" : "text-blue-600"}`}>
                                                {formData.packageImage ? "Image Uploaded" : isDragging ? "Drop it here!" : "Click to upload"}
                                            </span>
                                            {!formData.packageImage && !isDragging && " or drag and drop"}
                                        </p>
                                        <p className={`text-xs mt-1 ${formData.packageImage ? "text-green-700 font-medium" : "text-slate-400"}`}>
                                            {formData.packageImage ? `✓ ${formData.packageImage.name}` : "PNG, JPG up to 10MB"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </section>

                        {/* Section 3: Payment */}
                        <section>
                            <div className="border-b border-slate-100 pb-3 mb-6">
                                <h2 className="text-lg font-semibold text-slate-800">Billing</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Total Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                                        <input
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value);
                                                setFormData({ ...formData, amount: isNaN(val) ? 0 : val });
                                                setUpdateData({ ...updateData, amount: isNaN(val) ? 0 : val })
                                            }}
                                            name="amount" value={formData.amount} type="number" min={1} step="any"
                                            className="w-full pl-8 pr-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Who is paying?</label>
                                    <select
                                        name="payerRole" value={formData.payerRole}
                                        onChange={e => {
                                            setFormData({ ...formData, payerRole: e.target.value })
                                            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
                                        }}
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                                    >
                                        <option value="" disabled hidden>Select one...</option>
                                        <option value="SENDER">Sender</option>
                                        <option value="RECEIVER">Receiver</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Select payment option</label>
                                    <select
                                        name="paymentMethod" value={formData.paymentMethod}
                                        onChange={e => {
                                            setFormData({ ...formData, paymentMethod: e.target.value })
                                            setUpdateData({ ...updateData, [e.target.name]: e.target.value })
                                        }}
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                                    >
                                        <option value="" disabled hidden>Select one...</option>
                                        <option value="TRANSFER">Transfer</option>
                                        <option value="POS">POS</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-slate-700">Package Count</label>
                                    <input
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            setFormData({ ...formData, packageCount: isNaN(val) ? 0 : val });
                                            setUpdateData({ ...updateData, [e.target.name]: isNaN(val) ? 0 : val })
                                        }}
                                        name="packageCount" value={formData.packageCount} type="number" min={1} step="any"
                                        className="w-full px-4 h-11 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Sticky Footer Actions, the style errors are intentional to remove the look */}
                <div className="max-w-5xl mx-auto w-full bg-whitee py-4 px-0 lg:px-10 xl:px-10 2xl:px-0 rounded-xl borderr border-slate-200 shadow-smk flex justify-end gap-3">
                    <button
                        type="submit"
                        className={`px-10 h-11 text-sm font-medium text-white ${isSubmitting || ShipmentStatus.PICKED_UP !== formData.status ? "bg-gray-300 cursor-not-allowed " : "bg-main-primary hover:bg-main-primary/70 cursor-pointer"} rounded-lg shadow-sm transition-all active:scale-95`}
                    >
                        {isSubmitting ? <AnimateSpin /> : "Update Record"}
                    </button>

                </div>

            </form>
        </div>
    );

}
