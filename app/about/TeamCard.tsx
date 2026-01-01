import { Facebook, Linkedin, MessageCircleMore } from "lucide-react"


interface TeamProps {
    name: string,
    position: string,
    imgSrc: string
}

const TeamCard = ({ name, position, imgSrc }: TeamProps) => {
    return (
        <div className="col-span-1 bg-white relative">
            <img src={imgSrc} alt={name} loading="lazy" />
            <div className="absolute h-20 w-[80%] bg-white -bottom-4 left-1/2 -translate-x-1/2 shadow-sm hover:bg-[#034460] transition-all duration-400 ease-in-out flex flex-col justify-center p-6 group cursor-pointer">
                <h4 className="text-[#034460] font-medium text-md group-hover:text-chart-5">{name}</h4>
                <div className="flex items-center justify-between group-hover:text-white">
                    <p className="text-sm text-black/50 group-hover:text-white">{position}</p>
                    <ul className="flex items-center list-none gap-x-2">
                        <li><Facebook strokeWidth={1} className="w-4 text-[#034460] fill-[#034460] group-hover:text-white group-hover:fill-white" /></li>
                        <li><Linkedin strokeWidth={1} className="w-4 text-[#034460] fill-[#034460] group-hover:text-white group-hover:fill-white" /></li>
                        <li><MessageCircleMore strokeWidth={1} className="w-4 text-[#034460] fill-[#034460] group-hover:text-white group-hover:fill-white" /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default function TeamGrid() {
    const team_data = [
        {
            name: "Rosalin William",
            position: "Founder / CEO",
            imgSrc: "/team1.png"
        },
        {
            name: "William James",
            position: "Dispatcher",
            imgSrc: "/team2.png"
        },
        {
            name: "John Smith",
            position: "Sales man",
            imgSrc: "/team3.png"
        },
        {
            name: "Leo Mark",
            position: "Store keeper",
            imgSrc: "/team4.png"
        },
        {
            name: "Smith William",
            position: "Dispatcher",
            imgSrc: "/team5.png"
        },
        {
            name: "Claude Kane",
            position: "Store keeper",
            imgSrc: "/team6.png"
        },
        {
            name: "Rosalina Kerry",
            position: "Store keeper",
            imgSrc: "/team7.png"
        },
        {
            name: "James Brad",
            position: "Dispatcher",
            imgSrc: "/team8.png"
        }
    ]
    return (
        <div className="grid grid-cols-4 gap-x-5 gap-y-11">
            {
                team_data.map((member, i) => (
                    <TeamCard {...member} key={i} />
                ))
            }

        </div>
    )
}