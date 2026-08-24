import Image from "@/components/ui/AppImage";

const AVATARS = [
  "/images/testimonials/avatar-1.png",
  "/images/testimonials/avatar-2.png",
  "/images/testimonials/avatar-3.png",
];

export function AvatarCluster({
  count,
  label,
  ringClassName = "ring-white",
  labelClassName = "text-text-primary",
}: {
  count: string;
  label: string;
  ringClassName?: string;
  labelClassName?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {AVATARS.map((src, i) => (
          <div
            key={i}
            className={`relative h-9 w-9 overflow-hidden rounded-full ring-2 ${ringClassName}`}
          >
            <Image src={src} alt="" fill sizes="36px" className="object-cover" />
          </div>
        ))}
        <span
          className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-brand-magenta text-xs font-bold text-white ring-2 ${ringClassName}`}
        >
          {count}
        </span>
      </div>
      <span className={`text-sm font-medium ${labelClassName}`}>{label}</span>
    </div>
  );
}
