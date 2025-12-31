import { PROJECTS } from "@/lib/offer";
import { MoveLeft, MoveRight } from "lucide-react"
import { useRef } from "react"
import Slider from "react-slick"

export default function ProjectsSlider() {
    const sliderRef = useRef<Slider | null>(null);

    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 728,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <>
            <Slider ref={sliderRef} {...settings} className="-mx-4">
                {PROJECTS.map((project, index) => (
                    <div key={index} className="px-4">
                        <div className="w-[100%] min-h-[450px] bg-white relative border">
                            <img src={project.img} alt={project.title} className="w-full h-[300px] object-cover" />

                            <div className="absolute left-0 top-[55%] bottom-0 w-[90%] bg-white p-6 space-y-3">
                                <h3 className="text-lg text-[#034460] font-medium">{project.title}</h3>
                                <p className="text-xs leading-5 text-black/60">{project.desc}</p>
                            </div>
                        </div>

                    </div>
                ))}

            </Slider>
            {/* Review Arrow */}
            <div className="mt-10 flex items-center justify-center gap-x-4">
                <button
                    onClick={() => sliderRef.current?.slickPrev()}
                    className="w-14 h-14 border rounded-full bg-white hover:bg-chart-5 transition-all ease-in-out duration-300 cursor-pointer flex items-center justify-center"
                >
                    <MoveLeft className="w-4 text-[#034460]" />
                </button>
                <button
                    className="w-14 h-14 border rounded-full bg-white hover:bg-chart-5 transition-all ease-in-out duration-300 cursor-pointer flex items-center justify-center"
                    onClick={() => sliderRef.current?.slickNext()}
                >
                    <MoveRight className="w-4 text-[#034460]" />
                </button>
            </div>
        </>
    )
}