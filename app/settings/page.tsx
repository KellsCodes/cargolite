import AuthLayout from "../components/AuthLayout"
import Settings from "./Settings";

export default function AccountSettingsPage() {
    return (
        <AuthLayout>
            <div className="space-y-6 overflow-hidden p-6">
                <div className="flex items-center justify-between">
                    <h1 className="font-medium">Settings</h1>
                </div>

                <div className="bg-white rounded-lg">
                    <Settings />
                </div>
            </div>
        </AuthLayout>
    );
}