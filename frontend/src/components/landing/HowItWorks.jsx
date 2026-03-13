import { Calendar, Bell, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "Admins publish with structure",
    desc: "Create events, updates, and alerts from a cleaner system designed for administrative confidence.",
  },
  {
    icon: Bell,
    title: "Students receive updates instantly",
    desc: "Notifications and announcements appear quickly without compromising the calm feel of the product.",
  },
  {
    icon: CheckCircle,
    title: "The campus stays aligned",
    desc: "Communication becomes easier to trust because it looks polished, consistent, and easy to follow.",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="px-6 py-24">
      <div className="mx-auto max-w-7xl rounded-[36px] border border-white/70 bg-[linear-gradient(180deg,_rgba(255,255,255,0.8),_rgba(245,241,232,0.82))] p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] md:p-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
            How It Works
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Simple flow, stronger presence.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-[28px] border border-white/70 bg-white/88 p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-slate-900 p-3 text-white">
                  <Icon size={18} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
