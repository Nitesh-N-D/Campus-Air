import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,_#0f172a_0%,_#134e4a_60%,_#176b6b_100%)] px-8 py-12 text-white shadow-[0_28px_70px_rgba(15,23,42,0.18)] md:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
          Ready to start
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Bring your campus experience into one polished system.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">
          From event promotion to urgent alerts, Campus Air gives your team a professional interface that students can trust.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/signup">
          <Button
            size="lg"
            variant="secondary"
            className="h-12 rounded-full px-8 text-sm font-semibold text-slate-900"
          >
            Get Started
          </Button>
        </Link>
        <Link to="/login">
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-white/20 bg-white/10 px-8 text-sm font-semibold text-white hover:bg-white/15 hover:text-white"
          >
            Login
          </Button>
        </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
