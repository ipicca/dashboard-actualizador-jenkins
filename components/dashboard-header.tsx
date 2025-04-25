import { ModeToggle } from "@/components/mode-toggle";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="max-w-7xl mx-auto w-full flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            Implementación del Actualizador de versiones Jenkins
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
