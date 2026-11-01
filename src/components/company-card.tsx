import Image from "next/image";
import { FrameCard } from "@/components/frame-card";
import type { Company } from "@/lib/profile";

/**
 * A past company in the same Frame as the project cards: the role sits under
 * the name, the years take the place of the status badge, and the card links
 * to the company's LinkedIn page.
 */
export function CompanyCard({ company }: { company: Company }) {
  return (
    <FrameCard
      href={company.href}
      title={company.name}
      subtitle={company.role}
      description={company.description}
      icon={
        <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-border bg-content shadow-card">
          <Image
            src={company.icon.src}
            alt=""
            width={36}
            height={36}
            className="size-full animate-reveal object-cover"
            draggable={false}
          />
        </div>
      }
      badge={<span className="tabular-nums">{company.years}</span>}
      preview={
        <Image
          src={company.preview.src}
          alt={company.preview.alt}
          fill
          sizes="(min-width: 1280px) 356px, 340px"
          className="animate-reveal object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          draggable={false}
        />
      }
    />
  );
}
