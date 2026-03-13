import { ArrowRight, Bell, CalendarDays, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-36 md:pb-28 md:pt-40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-16 h-80 w-80 rounded-full bg-teal-200/50 blur-3xl" />
        <div className="absolute right-[10%] top-24 h-96 w-96 rounded-full bg-amber-200/45 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex rounded-full border border-white/70 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-teal-700 shadow-sm">
            Professional Campus Platform
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-slate-900 md:text-7xl">
            Elegant communication for modern campuses.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Campus Air helps teams announce events, publish updates, and handle alerts in a workspace that feels calm, credible, and built for real operations.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/signup">
              <Button size="lg" className="h-12 rounded-full px-6">
                Create account
                <ArrowRight size={16} />
              </Button>
            </Link>

            <Link to="/login">
              <Button variant="outline" size="lg" className="h-12 rounded-full px-6">
                Sign in
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-[36px] border border-white/70 bg-white/78 p-6 shadow-[0_28px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          <div className="rounded-[28px] bg-[linear-gradient(135deg,_#0f172a_0%,_#134e4a_100%)] p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-100">
              Executive View
            </p>
            <h3 className="mt-3 text-3xl font-semibold">
              Designed for clarity, not noise.
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              Replace scattered notices and improvised updates with a system that looks intentional across every touchpoint.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { icon: CalendarDays, label: "Event publishing", text: "Structured listings that feel official." },
              { icon: Bell, label: "Real-time updates", text: "Notifications without interface clutter." },
              { icon: ShieldCheck, label: "Priority alerts", text: "Urgent messaging with calm hierarchy." },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="mb-3 inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700">
                    <Icon size={18} />
                  </div>
                  <p className="font-semibold text-slate-900">{item.label}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
