import AuthLayout from "../components/AuthLayout";
import Profile from "./Profile";
import { User } from "lucide-react";

export default function ProfilePage() {
    return (
        <AuthLayout>
            <div className="h-[91vh] overflow-y-auto w-full">
                <div className="max-w-5xl mx-auto space-y-8 pb-0 h-full">
                    {/* Refined Header */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Profile</h1>
                            <p className="text-sm text-slate-500">Manage your personal information and addresses.</p>
                        </div>
                        <div className="hidden sm:block text-xs font-medium px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
                            Active Account
                        </div>
                    </div>

                    <Profile />
                </div>

            </div>
        </AuthLayout>
    );
}
