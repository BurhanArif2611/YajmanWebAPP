import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";
import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS = {
  Facebook: FacebookIcon,
  YouTube: YoutubeIcon,
  Instagram: InstagramIcon,
} as const;

export function SocialLinks({
  className,
  iconClassName,
  iconSize = 18,
}: {
  className?: string;
  iconClassName?: string;
  iconSize?: number;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {SOCIAL_LINKS.map(({ label, href }) => {
        const Icon = SOCIAL_ICONS[label];
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Yajman on ${label}`}
            className={cn(
              "transition-colors hover:text-brand-saffron-400",
              iconClassName
            )}
          >
            <Icon size={iconSize} />
          </a>
        );
      })}
    </div>
  );
}
