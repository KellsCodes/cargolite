const BRANCHDATA = [
    {
        img: "/branch4.png",
        cardImg: "/plane.png",
        title: "Cargolite UK Operations",
        address: "24 Holborn Viaduct, London EC1A 2BN, United Kingdom",
        phone: "+44 20 7922 1000",
        email: "contact@cargolite.com"
    },
    {
        img: "/branch1.png",
        cardImg: "/delivery.png",
        title: "Cargolite Logistics New York",
        address: "123 Maine Street, Suite 500, New York, NY 10001, USA",
        phone: "+1 (212) 555-0198",
        email: "contact@usa.cargolite.com"
    },
    {
        img: "/branch2.png",
        cardImg: "/plane.png",
        title: "Cargolite EuroHub Berlin",
        address: "Heidestraße 58, 10557 Berlin, Germany",
        phone: "+49 30 254320",
        email: "berlin@eu.cargolite.com"
    },
    {
        img: "/branch3.png",
        cardImg: "/delivery.png",
        title: "Cargolite Singapore Gateway",
        address: "10 Collyer Quay, Ocean Financial Centre, Singapore 049315",
        phone: "+65 6535 3211",
        email: "asia@sg.cargolite.com"
    },
];

interface BranchProps {
    img: string,
    cardImg: string,
    title: string,
    address: string,
    phone: string,
    email: string
}

const ContactCard = ({ img, cardImg, title, address, phone, email }: BranchProps) => {
    return (
        <div className="col-span-1 relative">
            <img src={img} alt={title} loading="lazy" />
            <div className="absolute h-auto w-[85%] bg-white -bottom-4 left-1/2 -translate-x-1/2 shadow-sm hover:bg-[#034460] transition-all duration-500 ease-in-out flex flex-col justify-center p-6 group cursor-pointer">
                <img src={cardImg} alt="." className="w-8" />
                <div className="space-y-3">
                    <p className="font-medium text-lg text-[#034460] group-hover:text-chart-5">{title}</p>
                    <p className="text-xs text-black/70 group-hover:text-white">Address: {address}</p>
                    <p className="text-xs text-black/70 group-hover:text-white">Phone: {phone}</p>
                    <p className="text-xs text-black/70 group-hover:text-white">Email: {email}</p>
                </div>
            </div>
        </div>
    )
}


export default function BranchesGrid() {
    return (
        <div className="grid grid-cols-4 gap-x-5">
            {BRANCHDATA.map((branch, i) => (
                <ContactCard {...branch} key={i} />
            ))}
        </div>
    )
}
