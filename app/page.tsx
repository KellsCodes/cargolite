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
import LogoText from "./components/LogoText";

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

            <div className="w-[95vw] 2xl:w-[72vw] mx-auto space-y-6 relative z-10">
              <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl text-header-top">What We Offer</h2>
              <p className="text-sm opacity-70">Welcome to our transportation services agency. We are the best at our transportation service ever.</p>
            </div>

            <div className="w-[95vw] 2xl:w-[72vw] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 lg:gap-x-6 gap-y-8 mt-12 relative z-10">
              {OFFERS.map((item, i) => (
                <div
                  key={i}
                  className="shadow-[0_-8px_20px_2px_rgba(0,0,0,0.06)] lg:h-[400px] bg-white border-b-10 border-b-chart-5/70 p-16 sm:p-6 md:p-16 transition-transform duration-500 ease-in-out hover:-translate-y-2"
                >
                  <Image alt={item.title} src={item.img} loading="lazy" width={90} height={90} className="" />
                  <h3 className="font-bold text-xl mt-6 mb-4 text-main-primary">{item.title}</h3>
                  <p className="text-sm opacity-70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[95vw] 2xl:w-[72vw] mx-auto py-16 space-y-12">
          <div className="text-center space-y-6 lg:max-w-xl mx-auto">
            <div>
              {/* <h2 className="font-bold text-xl text-chart-5/70 font-heading">CARGOLITE</h2> */}
              <LogoText />
              <p className="text-sm opacity-70 font-body">Delivering Results for Industry Leaders</p>
            </div>
            <h2 className="font-medium text-2xl md:text-3xl lg:text-4xl text-main-primary">We are proud of our workforce and have worked hard.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-0 2xl:gap-x-4">
            <div className="h-[450px] 2xl:h-[530px] relative overflow-hidden">
              <div className="absolute inset-y-0 bg-main-primary 
                /* Mobile (Default): Stick to right */
                right-0 w-full 

                /* SM & Mid-range (580px - 768px): Centered */
                min-[580px]:left-1/2 min-[580px]:-translate-x-1/2 
                min-[580px]:right-auto min-[580px]:w-[520px]
                
                /* LG & Desktop (1024px+): Slanted offset reset */
                lg:left-1/10 lg:translate-x-0 lg:w-[450px]       
                2xl:left-1/7 2xl:w-[480px]
                
                [clip-path:polygon(160px_0%,_100%_0%,_calc(100%-160px)_100%,_0%_100%)]"
              />


              <img
                src="/img1-1024x836.png"
                alt="overlay"
                className="absolute left-0 w-full object-cover z-10
                  top-1/2 -translate-y-1/2 h-[96%] 
                  lg:top-0 lg:translate-y-0 lg:h-full lg:p-6"
              />
            </div>


            <div className="lg:h-[530px] px-3 lg:px-8 py-5 space-y-4">
              <h3 className="font-heading font-medium text-main-primary text-2xl md:text-3xl">Fast shipping with the most modern technology</h3>
              <p className="text-sm md:text-md opacity-50 leading-7">Over the years, we have worked together to expand our network of partners to deliver reliability and consistency. We’ve also made significant strides to tightly integrate technology with our processes, giving our clients greater visibility into every engagement.</p>
              <ul className="list-none text-sm grid grid-cols-1 md:grid-cols-2 gap-y-4 pt-4">
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
