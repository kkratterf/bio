import Image from "next/image";
import { FrameCard } from "@/components/frame-card";
import { StatusDot } from "@/components/project-card";
import type { Company } from "@/lib/profile";

/**
 * A past company, drawn exactly like an archived project card (domain under
 * the name, Archived badge); the card links to the company's LinkedIn page.
 */
export function CompanyCard({ company }: { company: Company }) {
  return (
    <FrameCard
      href={company.href}
      title={company.name}
      subtitle={company.domain}
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
      badge={
        <>
          <StatusDot status="Archived" />
          Archived
        </>
      }
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
