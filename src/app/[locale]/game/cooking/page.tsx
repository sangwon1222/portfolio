import Cooking from "@/components/template/game/cooking/cooking";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({ params, searchParams }: TypeMetaProps, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: `LSW-APP-Cooking`,
    description: `LSW-APP-Cooking`,
    openGraph: {
      title: `LSW-APP-Break-The-Log`,
      description: `LSW-APP-Cooking`,
      type: "article",
      publishedTime: "2023-01-01T00:00:00.000Z",
      images: ["https://www.lsw.kr/assets/thumbnail/home.png"],
    },
  };
}

export default async function CookingLayout({ params, searchParams }: { params: any; searchParams: any }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black center-layout z-40">
      <Cooking />
    </div>
  );
}
