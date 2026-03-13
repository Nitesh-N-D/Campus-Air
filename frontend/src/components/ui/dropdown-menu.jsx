import { createContext, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DropdownMenuContext = createContext(null);

function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({ className, children, ...props }) {
  const { open, setOpen } = useContext(DropdownMenuContext);

  return (
    <button
      type="button"
      className={cn(className)}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownMenuContent({ className, align = "end", children }) {
  const { open } = useContext(DropdownMenuContext);

  if (!open) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute top-full z-50 mt-3 min-w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_50px_rgba(15,23,42,0.16)]",
        align === "end" ? "right-0" : "left-0",
        className
      )}
    >
      {children}
    </div>
  );
}

function DropdownMenuLabel({ className, ...props }) {
  return (
    <div
      className={cn("px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500", className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({ className }) {
  return <div className={cn("my-2 h-px bg-slate-100", className)} />;
}

function DropdownMenuItem({ className, inset = false, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
};
