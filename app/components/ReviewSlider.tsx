"use client"

import { USER_REVIEWS } from "@/lib/offer"
import { MoveLeft, MoveRight, Star } from "lucide-react"
import { useRef } from "react"
import Slider from "react-slick"

interface Review {
    img: string;
    name: string;
    work: string;
    desc: string;
    rating: number;
    reviewType: string;
}
interface ReviewCardProps {
    review: Review
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    return (
        <div
            className="px-3"
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
    )
}

export default function ReviewSlider() {
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
                breakpoint: 768,
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
                {[...USER_REVIEWS, ...USER_REVIEWS].map((review, i) => (
                    <ReviewCard review={review} key={i} />
                ))}
            </Slider>
            {/* Review Arrow */}
            <div className="mt-10 flex items-center gap-x-4">
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