import Image from "next/image";
import Layout from "./components/Layout";
import { HeroSection } from "./components/HeroSection";
import { OFFERS } from "@/lib/offer";

export default function Home() {
  return (
    <div className="p-0">
      <Layout>
        <div>
          <HeroSection />
          <div className="relative pt-16 pb-6">
            <div
              className="absolute inset-0 top-[30%] -z-10"
              style={{
                backgroundImage: `url("/bg-offer.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            <div className="w-[72vw] mx-auto space-y-6 relative z-10">
              <h2 className="font-bold text-5xl text-header-top">What We Offer</h2>
              <p className="text-sm opacity-70">Welcome to our transportation services agency. We are the best at our transportation service ever.</p>
            </div>

            <div className="w-[72vw] mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8 mt-12 relative z-10">
              {OFFERS.map((item, i) => (
                <div
                  key={i}
                  className="shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.05)] h-[400px] bg-white border-b-10 border-b-chart-5/70 p-16 transition-transform duration-500 ease-in-out hover:-translate-y-2"
                >
                  <Image alt={item.title} src={item.img} loading="lazy" width={90} height={90} className="" />
                  <h3 className="font-bold text-xl mt-6 mb-4 text-header-top">{item.title}</h3>
                  <p className="text-sm opacity-70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[72vw] mx-auto py-16">
          <h2 className="font-bold text-2xl">Heading again</h2>
        </div>
      </Layout>
    </div>
  );
}
