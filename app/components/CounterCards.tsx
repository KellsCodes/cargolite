"use client";

import CountUp from "react-countup";

interface CounterProps {
    initial: number,
    target: number,
    label: string,
    imgSrc: string
}

const CounterCard = ({ initial, target, label, imgSrc }: CounterProps) => {
    return (
        <div
            className="p-4 col-span-1 flex flex-col items-center justify-center bg-[#034460] border border-[#2C7DA1] hover:bg-[#1C6180] h-64 group transition-all duration-400 ease-in-out cursor-pointer"
        >
            <div className="w-16 h-16 flex items-center justify-center rounded-full border border-chart-5 p-3 bg-white group-hover:bg-chart-5 transition-all duration-400 ease-in-out">
                <img src={imgSrc} alt={label} loading="lazy" />
            </div>
            <div className="text-center mt-6 space-y-1">
                <p className="text-chart-5 font-bold text-3xl">
                    <CountUp
                        start={initial}
                        end={target}
                        duration={1.5}
                        separator=","
                        prefix="+"
                        enableScrollSpy={true}
                    >
                        {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                </p>
                <p className="text-sm text-white">{label}</p>
            </div>
        </div>

    )

}

export default function StatsGrid() {
    const stats = [
        { initial: 250, target: 38000, label: "Parcels Shipped Safely", imgSrc: "/handover.png" },
        { initial: 80, target: 6000, label: "Cities Served Worldwide", imgSrc: "/cities.png" },
        { initial: 150, target: 2280, label: "Satisfied Customers", imgSrc: "/client.png" },
        { initial: 80, target: 800, label: "Companies We Helped", imgSrc: "/company.png" },
    ];

    return (
        <div className="grid grid-cols-4 gap-x-5">
            {stats.map((stat, index) => (
                <CounterCard
                    key={index}
                    initial={stat.initial}
                    target={stat.target}
                    label={stat.label}
                    imgSrc={stat.imgSrc}
                />
            ))}
        </div>
    )
}