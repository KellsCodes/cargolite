"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { ShipmentStatus } from "@/generated/prisma/enums";

const STATUS_OPTIONS: ShipmentStatus[] = [
    "PICKED_UP",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
    "RETURNED",
];

interface FormValues {
    status: ShipmentStatus;
    location: string;
    notes: string;
}

interface UpdateStatusFormProps {
    currentStatus?: ShipmentStatus;
    onSubmit: (values: FormValues) => Promise<void>;
    onCancel: () => void;
}

export function UpdateStatusForm({ currentStatus, onSubmit, onCancel }: UpdateStatusFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formValues, setFormValues] = useState<FormValues>({
        status: currentStatus as ShipmentStatus,
        location: "",
        notes: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

    const handleInputChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        // Clear errors inline as user types
        if (errors[name as keyof FormValues]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormValues, string>> = {};

        if (!formValues.status) {
            newErrors.status = "Please select a valid milestone status.";
        }
        if (!formValues.location.trim()) {
            newErrors.location = "Current terminal location is required.";
        } else if (formValues.location.trim().length < 3) {
            newErrors.location = "Location description must be at least 3 characters.";
        }
        if (!formValues.notes.trim()) {
            newErrors.notes = "Please provide internal operational notes.";
        } else if (formValues.notes.trim().length < 5) {
            newErrors.notes = "Notes must contain detailed context (min 5 characters).";
        }
        // Validate accurate status selection
        if (currentStatus === ShipmentStatus.IN_TRANSIT &&
            !([
                ShipmentStatus.CANCELLED,
                ShipmentStatus.DELIVERED,
                ShipmentStatus.OUT_FOR_DELIVERY,
                ShipmentStatus.DELAYED,
                ShipmentStatus.RETURNED,
                ShipmentStatus.WAREHOUSE_ARRIVED,
                ShipmentStatus.IN_TRANSIT
            ] as ShipmentStatus[]).includes(formValues.status)) {
            newErrors.status = "Invalid status transition from IN TRANSIT. You can't select picked up or in transit.";
        } else if (currentStatus === ShipmentStatus.OUT_FOR_DELIVERY &&
            !([
                ShipmentStatus.DELIVERED, ShipmentStatus.RETURNED
            ] as ShipmentStatus[]).includes(formValues.status)) {
            newErrors.status = "Invalid status transition from OUT FOR DELIVERY. Please select delivered or returned.";
        } else if (
            ([
                ShipmentStatus.DELIVERED, ShipmentStatus.RETURNED, ShipmentStatus.CANCELLED
            ] as ShipmentStatus[]).includes(currentStatus as ShipmentStatus)) {
                newErrors.status = "This status cannot be modified.";
            } else if (currentStatus === ShipmentStatus.PICKED_UP && formValues.status === ShipmentStatus.PICKED_UP) {
                newErrors.status = "Invalid status transition from PICKED UP. Please select a different status.";
            }



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm() || isSubmitting) return;
        setIsSubmitting(true);
        try {
            await onSubmit(formValues);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* Status Selection Dropdown */}
            <div className="space-y-1.5">
                <label htmlFor="status" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Shipment Tracking Status
                </label>
                <div className="relative">
                    <select
                        id="status"
                        name="status"
                        value={formValues.status}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs rounded-md shadow-none transition-colors focus:bg-white focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 appearance-none cursor-pointer"
                    >
                        {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status} className="py-2">
                                {status.replace(/_/g, " ")}
                            </option>
                        ))}
                    </select>
                    {/* Custom Select Indicator Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="w3.org" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
                {errors.status && <p className="text-[11px] text-red-500 font-medium">{errors.status}</p>}
            </div>

            {/* Terminal Location Input */}
            <div className="space-y-1.5">
                <label htmlFor="location" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Current Gateway / Facility Location
                </label>
                <textarea
                    id="location"
                    name="location"
                    rows={3}
                    value={formValues.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Hub 4 - Ikeja Sorting Facility, Lagos"
                    className="w-full resize-none bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs rounded-md shadow-none min-h-[50px] px-3 py-2.5 focus:bg-white focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950"
                />
                {errors.location && <p className="text-[11px] text-red-500 font-medium">{errors.location}</p>}
            </div>

            {/* Internal Operational Notes Input */}
            <div className="space-y-1.5">
                <label htmlFor="notes" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Internal Operational Notes
                </label>
                <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formValues.notes}
                    onChange={handleInputChange}
                    placeholder="Enter updates, clearance checkpoints, or specific transit issues..."
                    className="w-full resize-none bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs rounded-md shadow-none min-h-[80px] px-3 py-2.5 focus:bg-white focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950"
                />
                {errors.notes && <p className="text-[11px] text-red-500 font-medium">{errors.notes}</p>}
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-900 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="h-9 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-9 px-4 text-xs font-medium bg-main-primary hover:bg-main-primary/80 cursor-pointer text-white shadow-sm transition-colors rounded-md flex items-center justify-center min-w-[120px]"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        "Update Status"
                    )}
                </button>
            </div>
        </form>
    );
}
