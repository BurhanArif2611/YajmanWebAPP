import { Suspense } from "react";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-site px-4 py-10 md:px-8 lg:px-16 lg:py-14">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr] lg:items-start">
        <Suspense fallback={null}>
          <ProfileSidebar />
        </Suspense>
        {children}
      </div>
    </div>
  );
}
