import { ClipboardList } from "lucide-react";

export function EmptyAssignments() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <ClipboardList size={56} className="text-brand-saffron-400" />
      <div>
        <p className="font-sans text-xl font-bold text-text-primary">
          No assignments yet.
        </p>
        <p className="mt-1 text-sm text-text-muted">
          New puja assignments will show up here.
        </p>
      </div>
    </div>
  );
}
