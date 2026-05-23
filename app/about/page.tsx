import Link from "next/link"
import Layout from "../components/Layout"
import { ArrowRight, ChartColumn } from "lucide-react"
import GetInTouch from "../components/GetInTouch"
import TeamGrid from "./TeamCard"
import ReviewSlider from "../components/ReviewSlider"
import GoogleMaps from "../components/GoogleMaps"
import { ContactForm } from "../components/ContactForm"

export default function AboutPage() {
    return (
        <div className="p-0">
            <Layout>
                <div
                    className="w-[95vw] 2xl:w-[72vw] mx-auto h-[350px] bg-[#034460] flex flex-col items-center justify-center gap-y-4"
                    style={{
                        backgroundImage: 'url("/banner.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <button className="h-8 w-28 flex items-center justify-center text-sm bg-chart-5">Who We Are</button>
                    <h1 className="text-4xl font-bold text-chart-5">About Us</h1>
                    <p className="w-[89%] md:w-[60%] w-[40%] text-center text-white text-sm leading-7">
                        We have been pioneering the industry in Europe for 20 years, and delivering value products within given timeframe, every single time.
                    </p>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-2 w-[95vw] 2xl:w-[72vw] h-auto md:h-[450px] mx-auto my-12 md:my-20 gap-y-12 md:gap-x-10">

                    {/* Left Content Column */}
                    <div className="flex flex-col justify-center gap-y-4 md:gap-y-6 text-center md:text-left">
                        <h2 className="text-2xl lg:text-3xl font-semibold text-[#034460] max-w-lg mx-auto md:mx-0">
                            Simplifying complex shipping challenges with innovative solutions
                        </h2>
                        <p className="text-sm md:text-md leading-6 md:leading-7 text-black/50 max-w-2xl mx-auto md:mx-0">
                            Logistics companies are essential to the smooth functioning of global supply chains. They offer a range of services such as transportation, warehousing, inventory management, and distribution to businesses across different industries. The role of logistics companies has become increasingly important in recent years due to the growth of e-commerce and global trade.
                        </p>
                    </div>

                    {/* Right Image Composition Column */}
                    <div className="grid grid-cols-2 gap-3 h-auto md:h-full md:relative md:flex md:gap-x-3 w-full group/container">

                        {/* Left Stack Container (Image 2 and Image 3) */}
                        <div className="col-span-1 flex flex-col gap-y-3 md:absolute md:bottom-0 md:left-0 md:right-[52%] md:top-15">
                            {/* Image 2 */}
                            <div className="aspect-[4/3] md:aspect-auto md:flex-1 min-h-0 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                                <img
                                    src="/img2-about.png"
                                    alt="Logistics operations"
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                                />
                            </div>
                            {/* Image 3 */}
                            <div className="aspect-[4/3] md:aspect-auto md:flex-1 min-h-0 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                                <img
                                    src="/img3-about.png"
                                    alt="Warehouse storage"
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                                />
                            </div>
                        </div>

                        {/* Right Feature Container (Image 1) */}
                        <div className="col-span-1 aspect-[2/3] md:aspect-auto md:absolute md:right-0 md:bottom-0 md:top-0 md:left-[50%] rounded-2xl overflow-hidden border border-slate-100 shadow-md">
                            <img
                                src="/img1-about.png"
                                alt="Global shipping infrastructure"
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                            />
                        </div>
                    </div>
                </div>



                <div className="w-[95vw] 2xl:w-[72vw] mx-auto grid grid-cols-1 lg:grid-cols-2 my-12 lg:my-20 gap-y-12 lg:gap-y-0">

                    {/* section 1: Mission Text */}
                    <div className="h-auto lg:h-[500px] flex flex-col justify-center gap-y-4 lg:gap-y-6 text-center lg:text-left order-1 px-2 lg:pr-12">
                        <div>
                            <span className="inline-flex items-center justify-center bg-chart-5 text-xs font-semibold px-4 py-2 text-[#034460] rounded-md tracking-wide">
                                Mission
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#034460] max-w-md mx-auto lg:mx-0 leading-tight">
                            Globally Connected by Large Network
                        </h2>
                        <p className="text-sm md:text-md leading-7 text-black/70 max-w-xl mx-auto lg:mx-0">
                            At Logistic Transp, our mission is to provide our clients with exceptional transportation services that meet and exceed their expectations. We aim to be the most reliable, efficient, and cost-effective transportation provider in the industry.
                        </p>

                        <div className="flex items-center justify-center lg:justify-start gap-x-6 mt-4">
                            <Link href="/contact-us">
                                <button className="h-11 px-6 bg-[#034460] text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-chart-5 hover:text-[#034460] transition-all duration-300 shadow-sm">
                                    Contact us
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

                    {/* section 2: Mission Image */}
                    <div className="h-[280px] sm:h-[360px] lg:h-[500px] order-2 overflow-hidden rounded-2xl lg:rounded-none">
                        <img
                            src="/img-about-1.png"
                            alt="Global logistics infrastructure network"
                            className="w-full h-full object-cover select-none transition-transform duration-700 hover:scale-105"
                            loading="lazy"
                        />
                    </div>

                    {/* section 3: Partners Image */}
                    {/* On mobile, this stacks perfectly under the first image. On desktop, it stays on the left. */}
                    <div className="h-[280px] sm:h-[360px] lg:h-[500px] order-4 lg:order-3 overflow-hidden rounded-2xl lg:rounded-none">
                        <img
                            src="/img-about-2.png"
                            alt="Business collaboration and freight services"
                            className="w-full h-full object-cover select-none transition-transform duration-700 hover:scale-105"
                            loading="lazy"
                        />
                    </div>

                    {/* section 4: Partners Text */}
                    <div className="h-auto lg:h-[500px] flex flex-col justify-center gap-y-4 lg:gap-y-6 text-center lg:text-left order-3 lg:order-4 px-2 lg:pl-12">
                        <div>
                            <span className="inline-flex items-center justify-center bg-chart-5 text-xs font-semibold px-4 py-2 text-[#034460] rounded-md tracking-wide">
                                Our Partners
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold text-[#034460] max-w-md mx-auto lg:mx-0 leading-tight">
                            We have established strong relationships with our partners
                        </h3>
                        <p className="text-sm md:text-md leading-7 text-black/70 max-w-xl mx-auto lg:mx-0">
                            We strive to become pioneers in the field, providing first quality and cost-effective service, and smart solutions to the market. Our 30 years’ experience in the shipping, transport and logistics industry is our strength, which supports us to deliver our promises to our customers.
                        </p>
                    </div>
                </div>


                <GetInTouch />

                {/* Team */}
                <div className="w-[95vw] 2xl:w-[72vw] mx-auto my-16 space-y-6 lg:mt-26">
                    <h3 className="text-2xl lg:text-5xl font-bold">Meet Our Team</h3>
                    <p className="text-md w-md text-black/50 mb-11">Welcome to our transportation services agency. We are the best at our transportation service ever</p>
                    <TeamGrid />
                </div>
                <div className="h-25 bg-[#E0F0F6]" />

                {/* Testimonials */}
                <div className="w-[95vw] 2xl:w-[72vw] mx-auto space-y-7 my-18">
                    <h3 className="text-2xl lg:text-5xl font-bold text-[#034460]">Testimonials</h3>
                    <p className="text-md w-full lg:w-3/4 xl:w-2/4 text-black/50">See what our clients say about how our data-driven logistics and seamless integration have transformed their supply chains and unlocked consistent growth.</p>
                    <ReviewSlider />
                </div>

                {/* Contact */}
                <div className="w-[95vw] 2xl:w-[72vw] mx-auto py-5 lg:py-16 px-5 xl:px-12 bg-[#FFE799] space-y-8">
                    <h3 className="text-xl lg:text-3xl font-bold text-[#034460]">Get in Touch</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-5 gap-y-3 md:gap-y-0 md:gap-x-3">
                        <ContactForm className="2xl:col-span-2 grid grid-cols-2 gap-y-5 gap-x-2" />
                        <div className="hidden md:block bg-white p-[2px] rounded-xs 2xl:col-span-2">
                            <GoogleMaps />
                        </div>
                        <div className="p-0 hidden 2xl:flex flex-col gap-y-8 col-span-1">
                            <div className="flex items-center gap-x-3">
                                <div className="min-h-14 min-w-14 bg-chart-5/80 rounded-full flex items-center justify-center">
                                    <img src="/address.png" alt="." loading="lazy" />
                                </div>
                                <div>
                                    <p className="font-medium">Address</p>
                                    <p className="text-xs">24 Holborn Viaduct, London EC1A 2BN, United Kingdom</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <div className="min-h-14 min-w-14 bg-chart-5/80 rounded-full flex items-center justify-center">
                                    <img src="/email.png" alt="." loading="lazy" />
                                </div>
                                <div>
                                    <p className="font-medium">Email</p>
                                    <p className="text-xs">contact@cargolite.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <div className="min-h-14 min-w-14 bg-chart-5/80 rounded-full flex items-center justify-center">
                                    <img src="/phone.png" alt="." loading="lazy" />
                                </div>
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <p className="text-xs">+44 20 7123 4567</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>

        </div>
    )
}