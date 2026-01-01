"use client"
import Image from "next/image";
import Layout from "./components/Layout";
import { HeroSection } from "./components/HeroSection";
import { OFFERS, USER_REVIEWS } from "@/lib/offer";
import { Check, Star } from "lucide-react";
import ReviewSlider from "./components/ReviewSlider";
import ProjectsSlider from "./components/ProjectsSlider";
import StatsGrid from "./components/CounterCards";
import GetInTouch from "./components/GetInTouch";

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
                  className="shadow-[0_-8px_20px_2px_rgba(0,0,0,0.06)] h-[400px] bg-white border-b-10 border-b-chart-5/70 p-16 transition-transform duration-500 ease-in-out hover:-translate-y-2"
                >
                  <Image alt={item.title} src={item.img} loading="lazy" width={90} height={90} className="" />
                  <h3 className="font-bold text-xl mt-6 mb-4 text-header-top">{item.title}</h3>
                  <p className="text-sm opacity-70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[72vw] mx-auto py-16 space-y-12">
          <div className="text-center space-y-6 max-w-xl mx-auto">
            <div>
              <h2 className="font-bold text-xl text-chart-5/70 font-heading">CARGOLITE</h2>
              <p className="text-sm opacity-70 font-body">Delivering Results for Industry Leaders</p>
            </div>
            <h2 className="font-bold text-4xl text-header-top">We are proud of our workforce and have worked hard.</h2>
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <div className="h-[530px] relative">
              <div className="absolute inset-y-0 left-1/7 w-[480px] bg-[#034460] [clip-path:polygon(160px_0%,_100%_0%,_calc(100%-160px)_100%,_0%_100%)]" />
              <img src="/img1-1024x836.png" alt="overlay" className="absolute inset-0 w-full h-full object-cover p-6" />
            </div>
            <div className="h-[530px] px-8 py-5 space-y-4">
              <h3 className="font-heading font-medium text-header-top text-3xl">Fast shipping with the most modern technology</h3>
              <p className="text-md opacity-50 leading-7">Over the years, we have worked together to expand our network of partners to deliver reliability and consistency. We’ve also made significant strides to tightly integrate technology with our processes, giving our clients greater visibility into every engagement.</p>
              <ul className="list-none list-['\2713'] list-inside text-sm grid grid-cols-2 gap-y-4 pt-4">
                <li className="flex items-center gap-x-2"><Check className="w-5 text-chart-2 stroke-[3px]" /><span className="opacity-50">Task tracking</span> </li>
                <li className="flex items-center gap-x-2"><Check className="w-5 text-chart-2 stroke-[3px]" /><span className="opacity-50">Task visualization</span></li>
                <li className="flex items-center gap-x-2"><Check className="w-5 text-chart-2 stroke-[3px]" /><span className="opacity-50">Meet deadlines faster</span></li>
                <li className="flex items-center gap-x-2"><Check className="w-5 text-chart-2 stroke-[3px]" /><span className="opacity-50">Create task dependencies</span></li>
                <li className="flex items-center gap-x-2"><Check className="w-5 text-chart-2 stroke-[3px]" /><span className="opacity-50">Share files, discuss</span></li>
                <li className="flex items-center gap-x-2"><Check className="w-5 text-chart-2 stroke-[3px]" /><span className="opacity-50">Track time spent on each project</span></li>
              </ul>
            </div>
          </div>
        </div>


        <GetInTouch />


        {/* Customers Review */}
        <div
          className="mt-0 mb-14 w-full h-[800px] bg-[#034460] relative"
          style={{

            backgroundImage: 'url("/ship.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div
            className="absolute right-0 bottom-0 top-[7px] w-[55%] bg-[#FFE799]"
            style={{
              clipPath: 'polygon(365px 0, 100% 0, 100% 100%, 0 100%)',
            }}
          />
          <div className="w-[72vw] mx-auto relative z-10 flex flex-col justify-center h-full">
            <div className="flex flex-col gap-y-4">
              <div className="w-full flex items-center gap-x-3">
                <h3 className="font-bold text-chart-5/90 text-lg">CARGOLITE</h3>
                <h3 className="font-medium text-white text-lg">What our customers are saying</h3>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-white w-lg">Join the businesses achieving faster delivery times and peak operational efficiency with our reliable, technology-first approach to logistics.</p>
                <img src="/quotation.png" alt="." loading="lazy" />
              </div>
            </div>
            <div className="w-full">
            </div>

            {/* Reviews */}
            <div className="mt-8 w-full overflow-hidden">
              <ReviewSlider />
            </div>
          </div>
        </div>

        {/* What we have done  */}
        <div className="h-[85vh] bg-white w-full relative">
          <div
            className="absolute top-[38%] left-0 bottom-0 w-[52%] bg-[#FFE799]"
            style={{ clipPath: 'polygon(0 0, calc(100% - 250px) 0, 100% 100%, 0 100%)' }}
          />
          <div className="w-[72vw] mx-auto h-full relative z-10 flex flex-col justify-center gap-y-6">
            <h2 className="text-3xl font-bold">What We Have Done</h2>
            <p className="text-md text-black/50">These are some the projects we've completed with our amazing partners</p>
            <div>
              <ProjectsSlider />
            </div>
          </div>
        </div>

        {/* Delivery Count */}
        <div
          className="w-full h-[80vh] bg-[#034460]"
          style={{

            backgroundImage: 'url("/container.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="w-[72vw] mx-auto h-full flex flex-col justify-center space-y-10">
            <h3 className="font-medium text-4xl text-chart-5 w-md mx-auto text-center">World’s Leading Company For Over 10 Years.</h3>
            <p className="text-white text-md w-2xl mx-auto text-center">A big opportunity for your business growth. Delivering Results for Industry Leaders. We are proud of our work for and have worked hard.</p>

            {/* Items */}
            <StatsGrid />
          </div>
        </div>


      </Layout>
    </div>
  );
}
