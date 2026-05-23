import { ArrowRight, ChartColumn } from "lucide-react";
import Link from "next/link";

export default function GetInTouch() {
    return (
        <div className="relative h-auto lg:h-[600px] w-full mt-12 bg-[#FFE799] lg:bg-transparent overflow-hidden">
            <div
                className="hidden lg:block absolute left-0 top-0 bottom-0 w-[64%] bg-[#FFE799]"
                style={{ clipPath: 'polygon(0 0, calc(100% - 250px) 0, 100% 100%, 0 100%)' }}
            />
            <div
                className="hidden lg:block absolute right-0 top-0 bottom-0 w-[calc(36%+250px)]"
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 250px 100%)',
                    backgroundImage: 'url("/port.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            <div
                className="block lg:hidden w-full h-[240px] sm:h-[320px]"
                style={{
                    backgroundImage: 'url("/port.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            {/* Main Content Layout Container */}
            <div className="relative z-10 w-[95vw] 2xl:w-[72vw] mx-auto py-12 lg:py-0 flex flex-col h-full justify-center text-[#034460]">

                {/* Section Badge */}
                <div>
                    <span className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 bg-chart-5 text-[#034460] rounded-md tracking-wide select-none">
                        Get in touch
                    </span>
                </div>

                {/* Main Headings */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold max-w-md mt-5 leading-tight">
                    Proud to Deliver Excellence Every Time
                </h3>

                <p className="max-w-2xl text-sm md:text-md leading-7 text-[#034460]/80 mt-4">
                    We are committed to maintaining the highest standards of professional service for every client. Our dedicated team works tirelessly to ensure that every project reflects our core values of integrity, precision, and superior quality.
                </p>

                {/* Sub-features */}
                <div className="w-full lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 border-t border-[#034460]/10 pt-6">
                    <div className="space-y-2">
                        <p className="flex items-center gap-x-2 font-semibold text-sm md:text-base">
                            <ChartColumn className="w-4 h-4 text-[#034460]" />
                            <span>Strategic Growth</span>
                        </p>
                        <p className="text-xs md:text-sm text-[#034460]/80 leading-relaxed">
                            Leverage data-driven insights to scale your operations with precision and long-term stability.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="flex items-center gap-x-2 font-semibold text-sm md:text-base">
                            <ChartColumn className="w-4 h-4 text-[#034460]" />
                            <span>Optimized Performance</span>
                        </p>
                        <p className="text-xs md:text-sm text-[#034460]/80 leading-relaxed">
                            Our workflows are refined to deliver maximum efficiency without compromising our signature quality.
                        </p>
                    </div>
                </div>

                {/* Action Links & Triggers */}
                <div className="mt-8 flex items-center gap-x-8">
                    <Link href="/contact-us">
                        <button className="bg-[#034460] hover:bg-[#023348] text-white text-sm font-medium h-12 px-6 rounded-xl shadow-md transition-all duration-300 cursor-pointer">
                            Contact Us
                        </button>
                    </Link>
                    <Link href="/about">
                        <button className="flex items-center gap-x-2 text-sm font-semibold text-[#034460] group cursor-pointer py-2">
                            Learn more
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-[-30deg]" />
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}
