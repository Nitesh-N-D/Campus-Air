import { cn } from "@/lib/utils";

function Avatar({ className, ...props }) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }) {
  return (
    <img
      data-slot="avatar-image"
      className={cn("h-full w-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn(
        "flex h-full w-full items-center justify-center bg-slate-900 text-sm font-semibold text-white",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
