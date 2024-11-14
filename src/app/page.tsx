import About from "@/components/template/tAbout";
import Experience from "@/components/template/tExperience";
import { Metadata, ResolvingMetadata } from "next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export async function generateMetadata(
  { params, searchParams }: TypeMetaProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: `LSW-APP`,
    description: `LSW-APP`,
    openGraph: {
      title: `LSW-APP`,
      url: "https://lsw.kr",
      description: `LSW-APP`,
      publishedTime: "2023-01-01T00:00:00.000Z",
      images: ["https://www.lsw.kr/assets/thumbnail/home.png"],
    },
  };
}

export default async function Home({ params, searchParams }: { params: any; searchParams: any }) {
  return (
    <div className="overflow-hidden flex flex-col items-center gap-2 pb-20">
      <About />
      <Experience />
    </div>
  );
}
