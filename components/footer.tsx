import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-6 border-t w-full">
      <div className="w-full flex justify-center items-center text-sm text-muted-foreground">
        <p className="flex items-center gap-1">
          con <Heart className="h-4 w-4 fill-red-500 text-red-500" /> por ipicca
        </p>
      </div>
    </footer>
  );
}
