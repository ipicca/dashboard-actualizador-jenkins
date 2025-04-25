import type React from "react";
import { cn } from "@/lib/utils";

export function DashboardShell({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid items-start gap-8 py-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
