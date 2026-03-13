import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Menu, X } from "lucide-react";
import NotificationBell from "./NotificationBell";
import Sidebar from "./Sidebar";
import useCurrentUser from "../hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logoutUser } from "../services/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function SidebarInset({ title, eyebrow, description, actions, children }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isLoading } = useCurrentUser();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,107,107,0.14),_transparent_32%),linear-gradient(180deg,_#f6f2e8_0%,_#f3efe6_40%,_#f8f6f0_100%)] text-slate-900">
      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-4 md:px-6">
        <Sidebar user={user} />

        <main className="flex-1">
          <div className="rounded-[28px] border border-white/60 bg-white/75 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-6">
            <header className="mb-6 rounded-[24px] border border-slate-200/70 bg-[linear-gradient(135deg,_rgba(255,255,255,0.92),_rgba(243,239,230,0.78))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:p-6">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-3 lg:hidden">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-2xl"
                    onClick={() => setMobileOpen(true)}
                  >
                    <Menu size={18} />
                  </Button>

                  <div className="flex items-center gap-2">
                    <NotificationBell />
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-2xl"
                      onClick={() => navigate(-1)}
                    >
                      <ArrowLeft size={18} />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    {eyebrow && (
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.32em] text-teal-700">
                        {eyebrow}
                      </p>
                    )}

                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                      {title}
                    </h1>

                    {description && (
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                        {description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 self-start">
                    <Button
                      variant="outline"
                      className="hidden rounded-2xl lg:flex"
                      onClick={() => navigate(-1)}
                    >
                      <ArrowLeft size={16} />
                      Back
                    </Button>

                    <NotificationBell />

                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm transition hover:shadow-md">
                        <div className="flex items-center gap-3 px-2 py-1">
                          <Avatar className="h-10 w-10">
                            {user?.profileImage ? (
                              <AvatarImage src={user.profileImage} alt={user?.name || "User"} />
                            ) : null}
                            <AvatarFallback>
                              {user?.name?.[0] || "C"}
                            </AvatarFallback>
                          </Avatar>

                          <div className="hidden text-left sm:block">
                            <p className="text-sm font-semibold text-slate-900">
                              {isLoading ? "Loading..." : user?.name || "Campus Air"}
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-slate-500">
                                {user?.email || "Workspace account"}
                              </p>
                              {user?.role && (
                                <Badge variant="outline" className="text-[10px] uppercase tracking-[0.18em]">
                                  {user.role}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Account</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                          Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(-1)}>
                          Back
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate("/")}>
                          Home
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => logoutUser()}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {actions}
                  </div>
                </div>
              </div>
            </header>

            <div className="space-y-6">{children}</div>
          </div>
        </main>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm lg:hidden">
          <div className="h-full max-w-sm bg-transparent p-4">
            <div className="mb-3 flex justify-end">
              <Button
                variant="outline"
                size="icon"
                className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                <X size={18} />
              </Button>
            </div>

            <Sidebar
              user={user}
              isMobile
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export { SidebarInset };
