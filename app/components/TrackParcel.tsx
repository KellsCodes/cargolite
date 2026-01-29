import Link from "next/link";

export default function TrackingParcel({ trackError }: { trackError: boolean }) {
    return (
        <div className="w-full mx-auto h-auto bg-[#034460] p-14 mb-10 space-y-6 flex flex-col items-center relative"
            style={{
                backgroundImage: "url(/banner.png)",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <h1 className="font-bold text-4xl text-white">Track Your Shipment</h1>
            <p className="w-[40%] text-center text-white text-lg">Get real-time updates on your package location, estimated delivery date and current status</p>
            <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center justify-center gap-x-4 w-full">
                    <input type="text" className="h-14 w-[450px] bg-white py-4 px-5 rounded-md" placeholder="Enter tracking number (e.g., EDF123456789)" />
                    <button className="h-14 text-md bg-white w-34 rounded-md font-semibold text-[#034460] cursor-pointer">Track Parcel</button>
                </div>
                {!trackError ?
                    <p className="font-bold text-white/70 text-sm">Ready to track? Enter your ID above. Having trouble? <Link href={"/contact-us"} className="text-chart-5/90">Contact Support.</Link></p>
                    :
                    <p className="text-red-300 font-bold text-sm">Tracking ID not recognized. If you just shipped your item, please allow up to 24 hours for the status to update.</p>
                }
            </div>
        </div>
    )
}