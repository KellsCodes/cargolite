import Link from "next/link"
import Layout from "../components/Layout"
import { ArrowRight, ChartColumn } from "lucide-react"
import GetInTouch from "../components/GetInTouch"
import TeamGrid from "./TeamCard"
import ReviewSlider from "../components/ReviewSlider"

export default function AboutPage() {
    return (
        <div className="p-0">
            <Layout>
                <div
                    className="w-[72vw] mx-auto h-[350px] bg-[#034460] flex flex-col items-center justify-center gap-y-4"
                    style={{
                        backgroundImage: 'url("/banner.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <button className="h-8 w-28 flex items-center justify-center text-sm bg-chart-5">Who We Are</button>
                    <h1 className="text-4xl font-bold text-chart-5">About Us</h1>
                    <p className="w-[40%] text-center text-white text-sm leading-7">
                        We have been pioneering the industry in Europe for 20 years, and delivering value products within given timeframe, every single time.
                    </p>
                </div>

                <div className="grid grid-cols-2 w-[72vw] h-[450px] mx-auto my-20 gap-x-10">
                    <div className="col-span-1 flex flex-col justify-center gap-y-6">
                        <h2 className="text-3xl font-semibold text-[#034460] w-lg">
                            Simplifying complex shipping challenges with innovative solutions
                        </h2>
                        <p className="text-md leading-7 text-black/50">
                            Logistics companies are essential to the smooth functioning of global supply chains. They offer a range of services such as transportation, warehousing, inventory management, and distribution to businesses across different industries. The role of logistics companies has become increasingly important in recent years due to the growth of e-commerce and global trade.
                        </p>
                    </div>
                    <div className="col-span-1 h-full relative space-x-3">
                        <div className="absolute bottom-0 left-0 right-[50%] top-15 flex flex-col gap-y-2">
                            <div
                                className="flex-1 min-h-0"
                            >
                                <img src="/img2-about.png" alt="." loading="lazy" className="h-full w-full contain" />
                            </div>
                            <div
                                className="flex-1 min-h-0"
                            >
                                <img src="/img3-about.png" alt="." loading="lazy" className="h-full w-full contain" />
                            </div>
                        </div>
                        <div
                            className="absolute right-0 bottom-0 top-0 left-[50%]"
                        >
                            <img src="/img1-about.png" alt="." loading="lazy" className="h-full w-full contain" />
                        </div>
                    </div>
                </div>

                <div className="w-[72vw] mx-auto grid grid-cols-2 my-16">
                    <div className="h-[500px] col-span-1 flex flex-col justify-center gap-y-6">
                        <button className="bg-chart-5 text-xs w-20 h-9 text-[#034460]">Mission</button>
                        <h2 className="text-3xl font-medium w-xs text-[#034460]">Globally Connected by Large Network</h2>
                        <p className="w-[90%] leading-7 text-black/70">
                            At Logistic Transp, our mission is to provide our clients with exceptional transportation services that meet and exceed their expectations. We aim to be the most reliable, efficient, and cost-effective transportation provider in the industry.
                        </p>

                        <div className="flex items-center gap-x-8 mt-6">
                            <Link href={"/contact-us"}>
                                <button className="h-10 w-28 bg-[#034460] text-white text-sm cursor-pointer hover:bg-chart-5 transition-all duration-500 ease-in-out">
                                    Contact us
                                </button>
                            </Link>
                            <Link href={"/about"}>
                                <button className="flex items-center gap-x-1 group cursor-pointer">
                                    Learn more
                                    <ArrowRight className="transition-transform duration-300 group-hover:rotate-[-30deg]" />
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="h-[500px] col-span-1">
                        <img src="/img-about-1.png" alt="." className="w-full h-full contain" loading="lazy" />
                    </div>
                    <div className="h-[500px] col-span-1">
                        <img src="/img-about-2.png" alt="." className="w-full h-full contain" loading="lazy" />
                    </div>
                    <div className="h-[500px] col-span-1 p-10 flex flex-col justify-center gap-y-5">
                        <button className="w-22 h-9 bg-chart-5 text-xs text-[#034460]">Our Partners</button>
                        <h3 className="text-3xl font-medium text-[#034460]">We have established strong relationships with our partners</h3>
                        <p className="text-md text-black/80">
                            We strive to become pioneers in the field, providing first quality and cost-effective service, and smart solutions to the market. Our 30 years’ experience in the shipping, transport and logistics industry is our strength, which support us to deliver our promises to our customers.
                        </p>
                    </div>
                </div>

                <GetInTouch />

                {/* Team */}
                <div className="w-[72vw] mx-auto my-16 space-y-6 mt-26">
                    <h3 className="text-5xl font-bold">Meet Our Team</h3>
                    <p className="text-md w-md text-black/50 mb-11">Welcome to our transportation services agency. We are the best at our transportation service ever</p>
                    <TeamGrid />
                </div>
                <div className="h-38 bg-[#E0F0F6]" />

                {/* Testimonials */}
                <div className="w-[72vw] mx-auto space-y-7 my-18">
                    <h3 className="text-5xl font-bold text-[#034460]">Testimonials</h3>
                    <p className="text-md w-md text-black/50">See what our clients say about how our data-driven logistics and seamless integration have transformed their supply chains and unlocked consistent growth.</p>
                    <ReviewSlider />
                </div>

                {/* Contact */}
                <div className="w-[72vw] mx-auto p-16 bg-[#FFE799] space-y-8">
                    <h3 className="text-3xl font-bold text-[#034460]">Get in Touch</h3>
                    <div className="flex items-stretched justify-between">
                        <div className="col-span-2 grid grid-cols-2 gap-6 w-[42%]">
                            <input type="text" className="h-12 col-span-1 bg-white py-2 px-4 placeholder:text-xs text-xs" placeholder="Your name *" />
                            <input type="text" className="h-12 col-span-1 bg-white py-2 px-4 placeholder:text-xs text-xs" placeholder="Your email *" />
                            <input type="text" className="h-12 col-span-1 bg-white py-2 px-4 placeholder:text-xs text-xs" placeholder="Weight *" />
                            <input type="text" className="h-12 col-span-1 bg-white py-2 px-4 placeholder:text-xs text-xs" placeholder="Height *" />
                            <textarea name="" id="" className="col-span-2 h-30 resize-none bg-white p-5 placeholder:text-xs text-xs" placeholder="Message/Note"></textarea>
                        </div>
                        <div className="w-[26%] bg-white p-[2px] rounded-xs">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.796131248732!2d-0.10728142308451513!3d51.51695611000486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b528e240a27%3A0xd4905ce18f3802f3!2s24%20Holborn%20Viaduct%2C%20London%20EC1A%202BN%2C%20UK!5e0!3m2!1sen!2sng!4v1767363067627!5m2!1sen!2sng"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                style={{ border: 0 }}
                                className="w-full h-full rounded-xs"
                            >
                            </iframe>
                        </div>
                        <div className="w-[26%] p-4 flex flex-col justify-between">
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
                    <button className="h-12 w-30 bg-chart-5 text-sm text-[#034460]">Submit Now</button>
                </div>

            </Layout>

        </div>
    )
}