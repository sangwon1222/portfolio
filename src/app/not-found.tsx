import type { Metadata } from "next";
import { NotFoundTemplate } from "@/components/template/tNotFound";

export const metadata: Metadata = {
  title: "LSW-APP|404",
  description: "LSW-APP NOT Found PAGE",
};

export default function NotFound() {
  return (
    <div className="center-layout flex-col gap-32 font-black py-160 text-2xl">
      <NotFoundTemplate />
    </div>
  );
}
