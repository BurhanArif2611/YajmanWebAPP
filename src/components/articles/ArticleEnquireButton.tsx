"use client";

import { useState } from "react";
import { MessageCircleQuestion } from "lucide-react";
import { EnquiryModal } from "@/components/articles/EnquiryModal";

export function ArticleEnquireButton({
  serviceId,
  category,
  serviceName,
}: {
  serviceId: string;
  category: string;
  serviceName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex min-h-[44px] items-center gap-2 rounded-full bg-brand-saffron-400 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-saffron-500"
      >
        <MessageCircleQuestion size={16} />
        Enquire Now
      </button>

      {open && (
        <EnquiryModal
          serviceId={serviceId}
          category={category}
          serviceName={serviceName}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
