"use client";

import { map } from "lodash-es";
import HashTag from "@/components/atoms/hashtag";
import Link from "next/link";

interface PropsType {
  label: string;
  hashtagList: string[];
  projectLink?: string;
}

export const ProjectCard: React.FC<PropsType> = ({ label, hashtagList, projectLink = "" }) => {
  return (
    <>
      <div className="flex gap-2 ">
        {projectLink ? (
          <Link className="flex items-center gap-2" href={projectLink}>
            <p>
              <span className="px-1">👀</span> {label}
            </p>
            <span className="px-1 animate-bounce">📋</span>
          </Link>
        ) : (
          <p>
            <span className="px-1">👀</span> {label}
          </p>
        )}
      </div>
      <p className="flex flex-wrap gap-2">
        {map(hashtagList, (v, i) => (
          <HashTag text={v} key={`${i}th-hashtag-${v}`} />
        ))}
      </p>
    </>
  );
};
