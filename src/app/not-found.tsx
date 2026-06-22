import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="bg-slate-50 py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <EmptyState
          description="Stranica ili proizvod koji tražite ne postoji u trenutnom RO-TEA katalogu."
          title="Stranica nije pronađena"
        />
      </div>
    </div>
  );
}
