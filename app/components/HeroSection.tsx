"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { motion, AnimatePresence } from "motion/react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

const SLIDES = [
    { img: "/banner-min.png", alt: "Banner 1", title: "Digital & Trusted Transport Logistic Company", desc: "We provide reliable and efficient logistics solutions tailored to your needs." },
    { img: "/banner-2.png", alt: "Banner 2", title: "Transparent & Accountable Asset Tracking Hub", desc: "Monitor your high-value cargo with absolute precision and 24/7 live updates." },
];

export function HeroSection() {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [api, setApi] = React.useState<any>();
    const router = useRouter();

    React.useEffect(() => {
        if (!api) return;
        const onSelect = () => {
            setActiveIndex(api.selectedScrollSnap());
        };
        api.on("select", onSelect);
        return () => api.off("select", onSelect);
    }, [api]);

    return (
        <section className="relative w-full h-[85vh] 2xl:h-[780px] !bg-white isolation-isolate">

            <div className="absolute inset-0 bg-white z-0 pointer-events-none" />

            <Carousel
                setApi={setApi}
                plugins={[Autoplay({ delay: 5000 }), Fade()]}
                opts={{ loop: true }}
                className="w-full h-full relative z-10"
            >
                <CarouselContent className="h-[85vh] 2xl:h-[780px] ml-0 !bg-white">
                    {SLIDES.map((slide, index) => (
                        <CarouselItem key={index} className="relative pl-0 basis-full h-full !bg-white">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.img})` }}
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
                    <div className="w-[90vw] 2xl:w-[72vw] mx-auto px-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
                                    exit: { opacity: 0, transition: { duration: 0.5 } }
                                }}
                                className="text-left text-white space-y-4 md:space-y-6 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl"
                            >
                                {/* Word-by-word rising mask animation */}
                                <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-6xl font-bold tracking-tight leading-tight flex flex-wrap gap-x-2 overflow-hidden pb-1">
                                    {SLIDES[activeIndex].title.split(" ").map((word, i) => (
                                        <span key={i} className="inline-block overflow-hidden">
                                            <motion.span
                                                variants={{
                                                    hidden: { y: "100%" },
                                                    visible: { y: 0, transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } }
                                                }}
                                                className="inline-block"
                                            >
                                                {word}
                                            </motion.span>
                                        </span>
                                    ))}
                                </h1>

                                {/* Fade up description text */}
                                <div className="overflow-hidden">
                                    <motion.p
                                        variants={{
                                            hidden: { opacity: 0, y: 15 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                                        }}
                                        className="text-sm sm:text-base md:text-lg 2xl:text-2xl font-light opacity-90 max-w-xl leading-relaxed"
                                    >
                                        {SLIDES[activeIndex].desc}
                                    </motion.p>
                                </div>

                                {/* Smoothly fading button trigger */}
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                                    }}
                                    className="pt-2 md:pt-4 pointer-events-auto"
                                >
                                    <button
                                        onClick={() => {
                                            router.push("/contact-us");
                                        }}
                                        className="bg-chart-5 text-white px-5 md:px-6 2xl:px-8 py-2.5 md:py-3 rounded-sm font-medium hover:opacity-80 transition-all duration-500 ease-in-out text-sm md:text-base cursor-pointer"
                                    >
                                        Get Started
                                    </button>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Carousel>
        </section>
    );
}
