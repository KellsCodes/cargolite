import { Mail, Phone } from "lucide-react";
import GoogleMaps from "../components/GoogleMaps";
import Layout from "../components/Layout";
import BranchesGrid from "./ContactCard";
import TeamGrid from "../about/TeamCard";

export default function ContactUsPage() {
    return (
        <Layout>
            <div className="space-y-26">
                <div className="h-[64vh]">
                    <GoogleMaps />
                </div>

                <div className="w-[72vw] mx-auto flex items-stretch h-auto my-10">
                    <div className="w-[65%] bg-[#E0F0F6] p-15 space-y-4">
                        <h2 className="font-medium text-3xl text-[#034460]">Still have a question?</h2>
                        <p className="text-lg text-black/50">Can't find the answer you are looking for? Please chat to our friendly team.</p>
                        <form action="#" className="grid grid-cols-2 gap-y-8 gap-x-7 mt-6">
                            <input type="text" className="px-5 h-13 bg-white col-span-1 placeholder:text-xs" placeholder="Your name *" />
                            <input type="email" className="px-5 h-13 bg-white col-span-1 placeholder:text-xs" placeholder="Your email *" />
                            <input type="text" className="px-5 h-13 bg-white col-span-1 placeholder:text-xs" placeholder="Height *" />
                            <input type="text" className="px-5 h-13 bg-white col-span-1 placeholder:text-xs" placeholder="Weight *" />
                            <textarea name="" id="" className="resize-none col-span-2 h-36 bg-white p-5 placeholder:text-xs" placeholder="Message/ Note"></textarea>
                            <div className="col-span-2">
                                <button className="text-sm text-[#034460] bg-chart-5 h-13 w-30 hover:bg-[#034460] hover:text-white transition-all duration-500 ease-in-out cursor-pointer">Submit Now</button>
                            </div>

                        </form>
                    </div>
                    <div className="w-[35%] bg-[#FFE799] px-15 flex flex-col justify-center space-y-8">
                        <h2 className="text-2xl font-medium text-[#034460]">Headquarters</h2>
                        <div className="bg-white p-8 space-y-5">
                            <h1 className="text-chart-5 font-bold text-lg">CARGOLITE</h1>
                            <p className="text-sm text-[#034460]/60">24 Holborn Viaduct, London EC1A 2BN, United Kingdom</p>
                            <div className="space-y-2 mt-7 mb-10">
                                <div className="flex items-center gap-x-3">
                                    <Phone className="w-4 h-5 text-chart-5/60" />
                                    <p className="text-sm text-[#034460]/60">Phone: +44 20 7123 4567 (Any time 24/7)</p>
                                </div>

                                <div className="flex items-center gap-x-3">
                                    <Mail className="w-4 h-5 text-chart-5/70" />
                                    <p className="text-sm text-[#034460]/60">Email: contact@cargolite.com</p>
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-[#034460]/10" />
                            <div className="h-16 text-sm text-[#034460]/60 pt-3">
                                Hours: 8:00 - 17:00, Mon - Sat
                            </div>
                        </div>
                    </div>
                </div>

                {/* Branches */}
                <div className="w-[72vw] mx-auto my-24 space-y-10">
                    <h2 className="font-medium text-5xl w-xl text-header-top">We have branches in many regions of the world</h2>
                    <p className="text-md text-black/50 w-1/2 leading-7">We have experience in handling the formalities and documentation required for your imports and exports. We work with all international station to guarantee that your load will safely reach without any delays.</p>
                    <div className="my-22">
                        <BranchesGrid />
                    </div>
                </div>

                {/* Team */}
                <div className="w-[72vw] mx-auto my-16 space-y-6 mt-26">
                    <h3 className="text-5xl font-bold">Meet Our Team</h3>
                    <p className="text-md w-md text-black/50 mb-11">Welcome to our transportation services agency. We are the best at our transportation service ever</p>
                    <TeamGrid />
                </div>

            </div>
        </Layout>
    )
}