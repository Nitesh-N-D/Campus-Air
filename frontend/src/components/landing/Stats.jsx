import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    { value: 100, suffix: "+", label: "Students Connected" },
    { value: 35, suffix: "+", label: "Events Coordinated" },
    { value: 50, suffix: "+", label: "Announcements Shared" },
  ];

  return (
    <section ref={ref} className="px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[28px] border border-white/70 bg-white/82 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <p className="text-5xl font-semibold tracking-tight text-slate-900">
              {inView && <CountUp end={stat.value} duration={2} />}
              {stat.suffix}
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.22em] text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
