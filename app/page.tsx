"use client"
import Image from "next/image";
import Layout from "./components/Layout";
import { HeroSection } from "./components/HeroSection";
import { OFFERS, USER_REVIEWS } from "@/lib/offer";
import { ChartColumn, Check, MoveRight, Star } from "lucide-react";
import Link from "next/link";
import { motion } from 'framer-motion';
import ReviewSlider from "./components/ReviewSlider";
import ProjectsSlider from "./components/ProjectsSlider";
import StatsGrid from "./components/CounterCards";

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


        <div className="relative h-[600px] w-full mt-12">
          <div
            className="absolute left-0 top-0 bottom-0 w-[64%] bg-[#FFE799]"
            style={{ clipPath: 'polygon(0 0, calc(100% - 250px) 0, 100% 100%, 0 100%)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-[calc(36%+250px)]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 250px 100%)',
              backgroundImage: 'url("/port.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative z-10 w-[72vw] mx-auto space-y-6 text-header-top flex flex-col h-full justify-center">
            <button className="text-xs p-3 bg-chart-5 w-[100px] no-pointer-cursor">Get in touch</button>
            <h3 className="text-3xl font-medium w-xs">Proud to Deliver Excellence Every Time</h3>
            <p className="w-3xl text-md">We are committed to maintaining the highest standards of professional service for every client. Our dedicated team works tirelessly to ensure that every project reflects our core values of integrity, precision, and superior quality.</p>
            <div className="w-[50%] grid grid-cols-2 gap-x-8 mt-6">
              <div className="space-y-2">
                <p className="flex items-center gap-x-1 font-medium"><ChartColumn className="w-4" /><span>Strategic Growth</span></p>
                <p className="text-xs">Leverage data-driven insights to scale your operations with precision and long-term stability.</p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-x-1 font-medium"><ChartColumn className="w-4" /><span>Optimized Performance</span></p>
                <p className="text-xs">Our workflows are refined to deliver maximum efficiency without compromising our signature quality.</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-x-10">
              <Link href="/contact-us" className="bg-[#034460] hover:bg-[#FEC201] transition-all duration-500 ease-in-out text-white text-sm p-4 w-[130px]">Contact us</Link>
              <Link href="/about" className="text-sm font-medium">
                <motion.button
                  initial="initial"
                  whileHover="hover"
                  className="flex items-center gap-x-2 outline-none group cursor-pointer"
                >
                  Learn more
                  <motion.span
                    style={{ originX: 1, originY: 1 }}
                    variants={{
                      initial: { rotate: 0 },
                      hover: { rotate: -20 }
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }}
                  >
                    <MoveRight className="w-4 h-4" />
                  </motion.span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>


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
              <ReviewSlider>
                {[...USER_REVIEWS, ...USER_REVIEWS].map((review, i) => (
                  <div
                    key={i} className="px-3"
                  >
                    <div className="bg-white p-6 pb-4 shadow-[0_-8px_20px_2px_rgba(0,0,0,0.06)] space-y-8 min-h-[300px]">
                      <div className="flex items-center gap-x-4">
                        <img src={review.img} alt="." width={50} height={50} className="rounded-full" />
                        <div>
                          <h2 className="text-[#034460] text-md font-medium">{review?.name}</h2>
                          <p className="text-xs text-black/50">{review?.work}</p>
                        </div>
                      </div>

                      <p className="text-md text-black/50 leading-6">{review?.desc}</p>
                      <div className="h-15 bg-[#034460] grid grid-cols-3 px-4">
                        <div className="col-span-2 flex flex-col gap-y-0 justify-center">
                          <div className="flex gap-x-1">
                            {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} className={`w-3 text-chart-5 ${i + 1 <= review?.rating && "fill-chart-5"}`} />)}
                          </div>
                          <p className="text-white text-sm">{review?.reviewType}</p>
                        </div>
                        <div className="col-span-1 flex items-center justify-end text-white text-sm">Rating: {review?.rating}/5</div>
                      </div>
                    </div>

                  </div>
                ))}
              </ReviewSlider>
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
