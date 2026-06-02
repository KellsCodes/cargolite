import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import SendMessageUI from "./MessageUI";

export default function Customers() {
    return (
        <AuthLayout>
            {/* Added h-screen and flex-col to the wrapper */}
            <div className="h-screen bg-slate-50/50 p-4 flex flex-col overflow-y-auto">
                {/* Header Section */}
                <div className="flex flex-col gap-1 border-b border-slate-200 pb-5 flex-shrink-0">
                    <h1 className="text-xl lg:text-2xl font-semibold tracking-tight text-slate-900">
                        Communications
                    </h1>
                    <p className="text-xs lg:text-sm text-slate-500">
                        Compose and dispatch email broadcasts to your customer registry.
                    </p>
                </div>

                {/* Main Action Container - Takes up remaining space and scrolls */}
                <div className="w-full py-5 lg:flex-1 lg:overflow-y-auto">
                    <SendMessageUI />
                </div>
            </div>
        </AuthLayout>
    );
}
