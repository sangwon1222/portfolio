"use client";

import { map } from "lodash-es";
import HashTag from "@/components/atoms/hashtag";

export default function ProjectCard({ label, hashtagList }: { label: string; hashtagList: string[] }) {
  return (
    <div className="pl-4">
      <span>👀 {label}</span>
      <p className="flex gap-10 pl-20">
        {map(hashtagList, (v, i) => (
          <HashTag text={v} key={`${i}th-hashtag-${v}`} />
        ))}
      </p>
    </div>
  );
}
