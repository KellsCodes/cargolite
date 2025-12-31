import { MoveLeft, MoveRight } from "lucide-react"
import { useRef } from "react"
import Slider from "react-slick"

export default function ReviewSlider({ children }: { children: React.ReactNode }) {
    const sliderRef = useRef<Slider | null>(null);

    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
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
            <Slider ref={sliderRef} {...settings} className="-mx-3">
                {children}
            </Slider>
            {/* Review Arrow */}
            <div className="mt-10 flex items-center gap-x-4">
                <button
                    onClick={() => sliderRef.current?.slickPrev()}
                    className="w-14 h-14 border rounded-full bg-white hover:bg-chart-5 transition-all ease-in-out duration-300 cursor-pointer flex items-center justify-center"
                >
                    <MoveLeft className="w-4 text-black/70" />
                </button>
                <button
                    className="w-14 h-14 border rounded-full bg-white hover:bg-chart-5 transition-all ease-in-out duration-300 cursor-pointer flex items-center justify-center"
                    onClick={() => sliderRef.current?.slickNext()}
                >
                    <MoveRight className="w-4 text-black/70" />
                </button>
            </div>
        </>
    )
}