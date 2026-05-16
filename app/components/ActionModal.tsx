"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ActionModalProps {
    isOpen: boolean;
    isLocked: boolean; // Optional prop to disable closing when true
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
}

export function ActionModal({
    isOpen,
    onClose,
    isLocked = false,
    title,
    description,
    children,
}: ActionModalProps) {
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open: boolean) => {
                // Only allow close event if the status is isLocked is false
                if (!open && !isLocked) onClose();
            }}
        >
            <DialogContent className="sm:max-w-[480px] p-0 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl rounded-xl gap-0 overflow-hidden">
                {/* Header Block with balanced padding */}
                <DialogHeader className="p-6 pb-4 text-left">
                    <DialogTitle className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                {/* Content Injector */}
                <div className="p-0">{children}</div>
            </DialogContent>
        </Dialog>
    );
}
