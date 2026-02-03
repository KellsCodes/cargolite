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
    const [trackError, setTrackError] = useState(false);

    return (
        <Layout>
            <div className="bg-white pt-20 pb-10">
                <div className="w-[72vw] mx-auto">
                    <TrackingParcel trackError={trackError} />
                </div>
            </div>

            {/* RESULTS SECTION: TRACKING DATA */}
            {/* <div className="w-[72vw] mx-auto -mt-5 mb-0 z-0 relative">
                <TrackData />
            </div> */}

            {/* INFO SECTION: GLOBAL SERVICE */}
            <section className="w-[72vw] mx-auto pb-24 pt-5 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-md border border-blue-100">
                            Enterprise Logistics
                        </span>
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                            The world's leading shipping service provider
                        </h2>
                        <p className="text-md text-slate-500 leading-relaxed">
                            Our global network combines proprietary technology with reliable physical infrastructure to provide the visibility required to scale your business.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                        <FeatureItem
                            icon={<ChartArea className="w-5 h-5" />}
                            title="Global Reach"
                            desc="Unlock new markets with our extensive cross-border network."
                        />
                        <FeatureItem
                            icon={<CircleStop className="w-5 h-5" />}
                            title="End-to-End Safety"
                            desc="Multi-layered security protocols protect your cargo at every point."
                        />
                        {/* ... other items same as previous ... */}
                    </div>

                    <div className="flex items-center gap-x-6 pt-4">
                        <Link href="/contact-us">
                            <button className="bg-slate-900 hover:bg-slate-800 text-white h-12 px-8 rounded-lg text-sm font-semibold transition-all">
                                Contact us
                            </button>
                        </Link>
                        <Link href="/about">
                            <button className="group flex items-center gap-x-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                                Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="relative justify-self-end">
                    <img src="/img-info.png" alt="Shipping Logistics" className="rounded-2xl shadow-xl w-full max-w-[500px] object-cover" />
                </div>
            </section>

            {/* 4. FAQ SECTION */}
            <section className="w-[72vw] mx-auto py-24 border-t border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <img src="/faq1.png" alt="FAQ" className="col-span-2 rounded-xl border border-slate-100 w-full" />
                            <img src="/faq2.png" alt="FAQ" className="rounded-xl border border-slate-100 h-40 w-full object-cover" />
                            <img src="/faq3.png" alt="FAQ" className="rounded-xl border border-slate-100 h-40 w-full object-cover" />
                        </div>
                    </div>

                    <div className="space-y-10">
                        <Accordion type="single" collapsible className="space-y-3">
                            <FAQItem value="item-1" question="How do I track my package?" answer="Enter your tracking number in the search field above." />
                            <FAQItem value="item-2" question="What if my package is delayed?" answer="Check the real-time feed for updated estimates." />
                        </Accordion>

                        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200/60">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Need more help?</h3>
                            <div className="flex gap-4">
                                <Link href="/contact-us">
                                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold">Contact Support</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}


// Sub-components for cleaner code
function FeatureItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="space-y-2">
            <div className="text-blue-600 bg-blue-50 w-10 h-10 flex items-center justify-center rounded-lg border border-blue-100">
                {icon}
            </div>
            <h4 className="font-bold text-slate-900">{title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
        </div>
    );
}

function FAQItem({ value, question, answer }: { value: string, question: string, answer: string }) {
    return (
        <AccordionItem value={value} className="border border-slate-200 bg-white rounded-2xl px-6 data-[state=open]:border-blue-300 transition-all shadow-sm">
            <AccordionTrigger className="text-left font-bold text-slate-900 hover:no-underline hover:text-blue-600">
                {question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-500 text-sm leading-relaxed pb-6">
                {answer}
            </AccordionContent>
        </AccordionItem>
    );
}