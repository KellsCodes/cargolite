// app/dashboard/loading.tsx

export default function DashboardLoading() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
            {/* Tailwind Spinner */}
            <div className="w-10 h-10 border-4 border-[#034460] border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-sm font-semibold text-[#034460] tracking-wide">
                Loading Dashboard...
            </p>
        </div>
    );
}
