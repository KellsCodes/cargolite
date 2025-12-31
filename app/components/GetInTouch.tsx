import { ArrowRight, ChartColumn } from "lucide-react";
import Link from "next/link";

export default function GetInTouch() {
    return (
        <div className="relative h-[600px] w-full mt-12">
            <div
                className="absolute left-0 top-0 bottom-0 w-[64%] bg-[#FFE799]"
                style={{ clipPath: 'polygon(0 0, calc(100% - 250px) 0, 100% 100%, 0 100%)' }}
            />
            <div
                className="absolute right-0 top-0 bottom-0 w-[calc(36%+250px)]"
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 250px 100%)',
                    backgroundImage: 'url("/port.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            <div className="relative z-10 w-[72vw] mx-auto space-y-6 text-header-top flex flex-col h-full justify-center">
                <button className="text-xs p-3 bg-chart-5 w-[100px] no-pointer-cursor">Get in touch</button>
                <h3 className="text-3xl font-medium w-xs">Proud to Deliver Excellence Every Time</h3>
                <p className="w-3xl text-md">We are committed to maintaining the highest standards of professional service for every client. Our dedicated team works tirelessly to ensure that every project reflects our core values of integrity, precision, and superior quality.</p>
                <div className="w-[50%] grid grid-cols-2 gap-x-8 mt-6">
                    <div className="space-y-2">
                        <p className="flex items-center gap-x-1 font-medium"><ChartColumn className="w-4" /><span>Strategic Growth</span></p>
                        <p className="text-xs">Leverage data-driven insights to scale your operations with precision and long-term stability.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="flex items-center gap-x-1 font-medium"><ChartColumn className="w-4" /><span>Optimized Performance</span></p>
                        <p className="text-xs">Our workflows are refined to deliver maximum efficiency without compromising our signature quality.</p>
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-x-10">
                    <Link href="/contact-us">
                        <button className="bg-[#034460] hover:bg-[#FEC201] transition-all duration-500 ease-in-out text-white text-sm p-4 w-[130px] cursor-pointer">Contact Us</button>
                    </Link>
                    <Link href="/about" className="text-sm font-medium">
                        <button className="flex items-center gap-x-1 group cursor-pointer">
                            Learn more
                            <ArrowRight className="transition-transform duration-300 group-hover:rotate-[-30deg]" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}