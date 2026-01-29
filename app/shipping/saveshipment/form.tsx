"use client"
import { useState, useRef } from "react"
import { UploadCloud, FileText, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Ship, Plane, Bus } from "lucide-react"


export default function SaveShipmentForm() {
    const [file, setFile] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFile = (files: FileList | null) => {
        const uploadedFile = files?.[0]
        if (uploadedFile && uploadedFile.type.startsWith("image/")) {
            setFile(uploadedFile)
        }
    }
    return (
        <div className="h-full flex-1 flex flex-col">
            <form action={""} className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 overflow-y-auto">
                <div className="col-span-1 flex flex-col gap-1">
                    <label htmlFor="customer_name" className="text-sm opacity-60">Sender Name</label>
                    <input type="text" className="p-5 h-10 border rounded text-sm focus:outline-0" placeholder="Sender Name" />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                    <label htmlFor="customer_name" className="text-sm opacity-60">Receiver Name</label>
                    <input type="text" className="p-5 h-10 border rounded text-sm focus:outline-0" placeholder="Receiver Name" />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                    <label htmlFor="customer_name" className="text-sm opacity-60">Sender Email</label>
                    <input type="email" className="p-5 h-10 border rounded text-sm focus:outline-0" placeholder="Sender Email" />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                    <label htmlFor="customer_name" className="text-sm opacity-60">Receiver Email</label>
                    <input type="email" className="p-5 h-10 border rounded text-sm focus:outline-0" placeholder="Receiver Email" />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                    <label htmlFor="customer_name" className="text-sm opacity-60">Sender Phone</label>
                    <input type="tel" className="p-5 h-10 border rounded text-sm focus:outline-0" placeholder="Sender Phone" />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                    <label htmlFor="customer_name" className="text-sm opacity-60">Receiver Phone</label>
                    <input type="tel" className="p-5 h-10 border rounded text-sm focus:outline-0" placeholder="Receiver Phone" />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                    <label htmlFor="customer_name" className="text-sm opacity-60">Package Weight</label>
                    <input type="number" className="p-5 h-10 border rounded text-sm focus:outline-0" placeholder="Enter Package Weight" />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                    <label htmlFor="customer_name" className="text-sm opacity-60">Package Type</label>
                    <select
                        defaultValue={""}
                        name="packageType"
                        id="package-type"
                        className="h-10 w-full rounded border px-3 py-2 text-xs focus:outline-none focus:ring-0"
                    >
                        <option value="" disabled hidden>Select type...</option>
                        <option value="standard">Standard</option>
                        <option value="fragile">Fragile</option>
                        <option value="perishable">Perishable</option>
                        <option value="hazardous">Hazardous</option>
                    </select>
                </div>

                <div className="col-span-1 flex flex-col gap-1">
                    <label htmlFor="customer_name" className="text-sm opacity-60">Pickup Location</label>
                    <input type="text" className="p-5 h-10 border rounded text-sm focus:outline-0" placeholder="Enter Pickup Location" />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                    <label htmlFor="customer_name" className="text-sm opacity-60">Drop Location</label>
                    <input type="text" className="p-5 h-10 border rounded text-sm focus:outline-0" placeholder="Enter Drop Location" />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                    <label htmlFor="customer_name" className="text-sm opacity-60">Estimated Arrival</label>
                    <input type="date" className="px-5 h-11 border rounded text-sm focus:outline-0" />
                </div>
                <div className="col-span-1 flex flex-col gap-1">
                    <label htmlFor="customer_name" className="text-sm opacity-60">Amount</label>
                    <input type="number" className="p-5 h-10 border rounded text-sm focus:outline-0" placeholder="Enter Shipping Amount" />
                </div>

                {/* Status */}
                <div className="col-span-1 md:col-span-2 space-y-3">
                    <label htmlFor="courier_type" className="text-sm opacity-60">Courier Type</label>
                    <RadioGroup defaultValue="bus" className="grid grid-cols-3 gap-4" name="courierType">
                        <div>
                            <RadioGroupItem value="ship" id="ship" className="peer sr-only" />
                            <Label
                                htmlFor="ship"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-dashed peer-data-[state=checked]:border-main-primary/40 [&:has([data-state=checked])]:border-main-primary"
                            >
                                <Ship className="mb-2 h-6 w-6" />
                                <span className="text-xs font-normal">Ship</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="airplane" id="airplane" className="peer sr-only" />
                            <Label
                                htmlFor="airplane"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-dashed peer-data-[state=checked]:border-main-primary/40 [&:has([data-state=checked])]:border-main-primary"
                            >
                                <Plane className="mb-2 h-6 w-6" />
                                <span className="text-xs font-normal">Airplane</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="bus" id="bus" className="peer sr-only" />
                            <Label
                                htmlFor="bus"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-dashed peer-data-[state=checked]:border-main-primary/40 [&:has([data-state=checked])]:border-main-primary"
                            >
                                <Bus className="mb-2 h-6 w-6" />
                                <span className="text-xs font-normal">Bus</span>
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Image upload */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-sm opacity-60">Upload Photo</label>
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                            handleFile(e.dataTransfer.files);
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            "relative h-32 border-2 border-dashed rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center gap-y-2 bg-white",
                            isDragging ? "border-blue-500 bg-blue-50/50" : "border-gray-200 hover:border-gray-300",
                            file && "border-green-500 bg-green-50/10"
                        )}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleFile(e.target.files)}
                            accept="image/*"
                            className="hidden"
                        />

                        {!file ? (
                            <>
                                <div className="p-2 bg-gray-100 rounded-full">
                                    <UploadCloud className="w-5 h-5 text-gray-600" />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-medium">Click or drag image to upload</p>
                                    <p className="text-[10px] text-gray-400">PNG, JPG or WEBP (max. 5MB)</p>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-x-3 px-4 w-full">
                                <div className="p-2 bg-green-100 rounded-md">
                                    <FileText className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{file.name}</p>
                                    <p className="text-[10px] text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                    className="p-1 hover:bg-gray-200 rounded-full"
                                >
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </form>

            <div className="col-span-2 flex items-center justify-end gap-x-3 px-9">
                <button className="h-10 w-22 border rounded-sm text-xs p-2 hover:opacity-70 cursor-pointer transition-all duration-400 ease-in-out">Cancel</button>
                <button className="h-10 w-22 p-2 border border-main-primary bg-main-primary rounded-sm text-xs text-white font-medium hover:opacity-70 cursor-pointer transition-all duration-400 ease-in-out">Save</button>
            </div>
        </div>
    )
}