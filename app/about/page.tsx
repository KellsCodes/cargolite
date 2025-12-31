import Layout from "../components/Layout"

export default function AboutPage() {
    return (
        <div className="p-0">
            <Layout>
                <div
                    className="w-[72vw] mx-auto h-[350px] bg-[#034460] flex flex-col items-center justify-center gap-y-4"
                    style={{
                        backgroundImage: 'url("/banner.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <button className="h-8 w-28 flex items-center justify-center text-sm bg-chart-5">Who We are</button>
                    <h1 className="text-4xl font-bold text-chart-5">About Us</h1>
                    <p className="w-[40%] text-center text-white text-sm leading-7">
                        We have been pioneering the industry in Europe for 20 years, and delivering value products within given timeframe, every single time.
                    </p>
                </div>

            </Layout>

        </div>
    )
}