import { Suspense } from "react";
import TrackContent from "./TrackContent";

// Sleek, mature designer preloader component
function TrackPreloader() {
    return (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-transparent px-4 animate-fade-in">
            <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute h-full w-full rounded-full border-[3px] border-muted/20" />
                <div className="absolute h-full w-full rounded-full border-[3px] border-transparent border-t-main-primary animate-spin" />
                <div className="h-2 w-2 rounded-full bg-main-primary animate-pulse" />
            </div>
            <div className="mt-6 flex flex-col items-center gap-1 text-center">
                <p className="heading text-sm font-semibold tracking-wider text-header-top uppercase">
                    Initializing System
                </p>
                <span className="text-xs font-medium text-muted-foreground/80 tracking-normal">
                    Retrieving secure parcel manifests...
                </span>
            </div>
        </div>
    );
}

export default async function TrackParcel() {
    return (
        <>
            <Suspense fallback={<TrackPreloader />}>
                <TrackContent />
            </Suspense>
        </>
    );
}
