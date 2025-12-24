"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { motion, AnimatePresence } from "motion/react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const SLIDES = [
    { img: "/banner-min.png", alt: "Banner 1", title: "Digital & Trusted Transport Logistic Company", desc: "We provide reliable and efficient logistics solutions tailored to your needs." },
    { img: "/banner-2.png", alt: "Banner 2", title: "Real-time Tracking", desc: "Monitor your parcel 24/7" },
];

export function HeroSection() {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [api, setApi] = React.useState<any>();

    React.useEffect(() => {
        if (!api) return;
        const onSelect = () => {
            setActiveIndex(api.selectedScrollSnap());
        };
        api.on("select", onSelect);
        return () => api.off("select", onSelect);
    }, [api]);

    return (
        <section className="relative w-full h-[750px]">
            <Carousel
                setApi={setApi}
                plugins={[Autoplay({ delay: 5000 }), Fade()]}
                opts={{ loop: true }}
                className="w-full h-full"
            >
                <CarouselContent className="h-[750px] ml-0"> {/* ml-0 removes gap between slides */}
                    {SLIDES.map((slide, index) => (
                        <CarouselItem key={index} className="relative pl-0 basis-full h-full">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.img})` }}
                            />
                            <div className="absolute inset-0 bg-black/0" /> {/* Darkened for text readability */}
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
                    <div className="w-[72vw] mx-auto px-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-left text-white space-y-6 max-w-4xl"
                            >
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                                    {SLIDES[activeIndex].title}
                                </h1>
                                <p className="text-lg md:text-2xl font-light opacity-90 max-w-xl">
                                    {SLIDES[activeIndex].desc}
                                </p>
                                {/* Optional: Add a call to action button since it's now left-aligned */}
                                <div className="pt-4 pointer-events-auto">
                                    <button className="bg-chart-5 text-white px-8 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-all">
                                        Get Started
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Carousel>
        </section>
    );
}
