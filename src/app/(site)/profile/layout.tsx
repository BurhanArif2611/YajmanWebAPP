import { ProfileSidebar } from "@/components/profile/ProfileSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-site px-4 py-6 md:px-8 md:py-10 lg:px-16 lg:py-14">
      <div className="flex flex-col gap-4 md:gap-6 lg:grid lg:grid-cols-[300px_1fr] lg:items-start lg:gap-8">
        <ProfileSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
