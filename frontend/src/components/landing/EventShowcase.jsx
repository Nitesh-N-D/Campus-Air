import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const events = [
  { title: "AI Hackathon", date: "March 25", location: "Auditorium", accent: "bg-teal-700" },
  { title: "Tech Symposium", date: "April 2", location: "Main Hall", accent: "bg-slate-900" },
  { title: "Placement Workshop", date: "April 10", location: "Seminar Hall", accent: "bg-amber-500" },
  { title: "Startup Pitch Day", date: "April 18", location: "Innovation Hub", accent: "bg-emerald-700" },
];

function EventShowcase() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
              Showcase
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              Upcoming campus moments
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-500">
            A more editorial preview of what students can expect next, with strong contrast and cleaner content blocks.
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3200 }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
        >
          {events.map((event) => (
            <SwiperSlide key={event.title}>
              <article className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                <div className={`h-2 w-24 rounded-full ${event.accent}`} />
                <h3 className="mt-6 text-2xl font-semibold text-slate-900">{event.title}</h3>
                <div className="mt-6 space-y-2 text-sm text-slate-500">
                  <p>{event.date}</p>
                  <p>{event.location}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default EventShowcase;
