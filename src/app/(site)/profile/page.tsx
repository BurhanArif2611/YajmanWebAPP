import Image from "next/image";
import { Calendar, Camera, ChevronDown, Clock } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PROFILE_USER } from "@/lib/constants";

export const metadata = {
  title: "My Profile | Yajman",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-text-primary">{label}</span>
      {children}
    </label>
  );
}

function StaticField({
  icon: Icon,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
}) {
  return (
    <div className="flex min-h-[56px] items-center justify-between rounded-xl border border-border-dark bg-white px-4">
      <span className="flex items-center gap-2 text-base font-medium text-text-primary">
        <Icon size={18} className="text-brand-saffron-400" />
        {value}
      </span>
      <ChevronDown size={16} className="text-text-muted" />
    </div>
  );
}

export default function PersonalDataPage() {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-surface-peach p-6 md:p-10">
      <div className="flex items-center justify-between gap-4 border-b border-border-dark/30 pb-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              src={PROFILE_USER.avatar}
              alt={PROFILE_USER.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-sans text-2xl font-bold text-text-primary">
              My Profile
            </h1>
            <p className="text-sm text-text-muted">
              Real-time information and activities of your prototype.
            </p>
          </div>
        </div>
        <button className="flex shrink-0 items-center gap-2 text-sm font-medium text-text-secondary hover:text-brand-saffron-400">
          <Camera size={18} />
          Edit
        </button>
      </div>

      <form className="rounded-2xl bg-white p-6 shadow-card md:p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Name">
            <Input placeholder="Enter your name" />
          </Field>
          <Field label="Email">
            <Input type="email" placeholder="Enter your email" />
          </Field>

          <Field label="Whatsapp Number">
            <Input
              type="tel"
              defaultValue={PROFILE_USER.whatsapp}
              leading={
                <Image src="/icons/whatsapp.png" alt="" width={20} height={20} />
              }
            />
          </Field>
          <Field label="Calling Number">
            <Input type="tel" defaultValue={PROFILE_USER.callingNumber} />
          </Field>

          <Field label="Gender">
            <div className="relative flex min-h-[56px] items-center rounded-xl border border-border-dark px-4">
              <select
                defaultValue={PROFILE_USER.gender}
                className="w-full appearance-none bg-transparent text-base font-medium text-text-primary outline-none"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 text-text-muted"
              />
            </div>
          </Field>
          <Field label="Place of birth">
            <Input placeholder="Enter your place of birth" />
          </Field>

          <Field label="Date of birth">
            <StaticField icon={Calendar} value={PROFILE_USER.dateOfBirth} />
          </Field>
          <Field label="Time of birth">
            <StaticField icon={Clock} value={PROFILE_USER.timeOfBirth} />
          </Field>
        </div>

        <div className="mt-8 flex justify-end">
          <Button size="lg" className="rounded-full px-10">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
