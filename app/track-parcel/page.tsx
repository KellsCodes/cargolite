"use client"
import { useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { ArrowRight, ChartArea, ChartLine, CircleStop, Rocket } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import TrackData from "./TrackDetails";
import TrackingParcel from "../components/TrackParcel";

export default function TrackParcel() {
    const [trackError, setTrackError] = useState(false)
    return (
        <Layout>
            <div className="w-[72vw] mx-auto">
                <TrackingParcel trackError={trackError} />

            </div>

            <div className="w-[72vw] mx-auto mt-20">
                <TrackData />
            </div>

            <div className="w-[72vw] mx-auto grid grid-cols-2 gap-x-20 my-24">
                <div className="flex flex-col justify-center space-y-9">
                    <div className="space-y-5">
                        <p className="w-22 p-2 bg-chart-5 text-xs text-center">Get in touch</p>
                        <h2 className="text-4xl font-semibold ">We are the world's leading shipping service provider</h2>
                        <p className="leading-7 text-md">Our global network combines proprietary technology with reliable physical infrastructure.
                            From automated real-time tracking to seamless API integrations, we provide the visibility
                            and speed required to scale your business across borders with complete confidence.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-7">
                        <div className="col-span-1 space-y-1">
                            <p className="flex items-center gap-x-1 font-medium"><ChartArea className="w-5" /> Global Reach</p>
                            <p className="text-sm">Unlock new markets with our extensive cross-border logistics network.</p>
                        </div>
                        <div className="col-span-1 space-y-1">
                            <p className="flex items-center gap-x-1 font-medium"><CircleStop className="w-5" /> End-to-End Safety</p>
                            <p className="text-sm">Multi-layered security protocols ensure your cargo is protected at every transit point.</p>
                        </div>
                        <div className="col-span-1 space-y-1">
                            <p className="flex items-center gap-x-1 font-medium"><ChartLine className="w-5" /> Data-Driven Insights</p>
                            <p className="text-sm">Optimize your supply chain with advanced analytics and performance reporting.</p>
                        </div>
                        <div className="col-span-1 space-y-1">
                            <p className="flex items-center gap-x-1 font-medium"><Rocket className="w-5" /> Express Delivery</p>
                            <p className="text-sm">Priority handling and route optimization for your most time-sensitive shipments.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-6">
                        <Link href={"/contact-us"}>
                            <button className="bg-[#034460] hover:bg-chart-5 text-sm text-white h-12 w-28 transition-all duration-500 ease-in-out cursor-pointer">Contact us</button>
                        </Link>
                        <Link href={"/about"}>
                            <button className="h-12 w-28 cursor-pointer flex items-center gap-x-1 group">
                                Learn more <ArrowRight className="w-5 group-hover:rotate-[-30deg] transition-all duration-300 ease-in-out" />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="">
                    <img src="/img-info.png" alt="." loading="lazy" className="" />
                </div>
            </div>

            <div className="w-[72vw] mx-auto grid grid-cols-2 gap-x-8 mb-[1px]">
                <div className="space-y-6">
                    <h2 className="Font-bold text-4xl">FAQs</h2>
                    <p className="text-black/50">Feeling inquisitive? Have a read through some of our FAQs or contact our support for help</p>
                    <div className="grid grid-cols-2 gap-x-5">
                        <div className="col-span-2" >
                            <img src="/faq1.png" alt="faq1" loading="lazy" />
                        </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-x-5">
                        <img src="/faq2.png" alt="faq2" loading="lazy" className="col-span-1" />
                        <img src="/faq3.png" alt="faq2" loading="lazy" className="col-span-1 h-full cover" />
                    </div>
                </div>

                <div className="col-span-1">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full space-y-2"
                        defaultValue="item-1"
                    >
                        <AccordionItem value="item-1" className="bg-[#034460] text-white px-4">
                            <AccordionTrigger className="[&>svg]:text-white">How do I track my package</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    You can track your package by entering your tracking number in the search field above. Your tracking number is provided in your shipping confirmation email or receipt.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="bg-[#034460] text-white px-4">
                            <AccordionTrigger className="[&>svg]:text-white">What if my package is delayed?</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    If your package is experiencing delays, you'll see updated delivery estimates in your tracking information. For additional assistance, please contact our customer support team.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="bg-[#034460] text-white px-4">
                            <AccordionTrigger className="[&>svg]:text-white">Can I change my delivery address?</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Yes, in most cases you can change your delivery address by contacting our customer support team with your tracking number and the new delivery details.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="h-[1px] bg-black/10 my-10" />
                    <div className="space-y-10">
                        <h2 className="text-4xl font-medium text-[#034460]">Need more help?</h2>
                        <div className="flex items-center gap-x-6">
                            <Link href={"/contact-us"}>
                                <button className="bg-chart-5 hover:bg-[#034460] text-sm text-white h-12 w-28 transition-all duration-500 ease-in-out cursor-pointer">Contact us</button>
                            </Link>
                            <Link href={"/about"}>
                                <button className="h-12 w-28 cursor-pointer flex items-center gap-x-1 group">
                                    Learn more <ArrowRight className="w-5 group-hover:rotate-[-30deg] transition-all duration-300 ease-in-out" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}