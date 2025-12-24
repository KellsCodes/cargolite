import Image from "next/image";
import Layout from "./components/Layout";
import { HeroSection } from "./components/HeroSection";

export default function Home() {
  return (
    <div className="p-0">
      <Layout>
        <div>
          <HeroSection />
        </div>
      </Layout>
    </div>
  );
}
