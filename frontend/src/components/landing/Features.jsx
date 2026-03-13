import { Card, CardContent } from "@/components/ui/card";
import { Bell, Calendar, Mail, Upload } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Event Management",
    desc: "Create event listings with stronger hierarchy, cleaner details, and better readability.",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    desc: "Push updates instantly without making the interface feel busy or overwhelming.",
  },
  {
    icon: Mail,
    title: "Email Escalation",
    desc: "Promote the messages that matter most with optional outreach to every student.",
  },
  {
    icon: Upload,
    title: "Student Import",
    desc: "Keep the directory current with simple CSV-based syncing and management.",
  },
];

function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
            Features
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Powerful, but restrained.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            The platform is designed to feel premium through clarity, hierarchy, and consistency rather than visual excess.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
            >
              <Card className="h-full rounded-[28px] border border-white/70 bg-white/82 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                <CardContent className="p-6">
                  <div className="mb-5 inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700">
                    <feature.icon size={22} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{feature.desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
