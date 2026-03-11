import { Card } from "@/components/ui/card";
import { Calendar, Bell, Mail, Upload } from "lucide-react";

const features = [
  { icon: Calendar, title: "Event Management" },
  { icon: Bell, title: "Real-time Notifications" },
  { icon: Mail, title: "Email Alerts" },
  { icon: Upload, title: "CSV Student Upload" }
];

function Features() {

  return (
    <section className="py-24">

      <h2 className="text-4xl font-bold text-center mb-16">
        Powerful Features
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">

        {features.map((f, i) => (

          <Card
            key={i}
            className="backdrop-blur-lg bg-white/30 border shadow-xl p-8 text-center hover:-translate-y-2 transition"
          >

            <f.icon size={32} className="mx-auto mb-4 text-blue-600"/>

            <h3 className="font-semibold">
              {f.title}
            </h3>

          </Card>

        ))}

      </div>

    </section>
  );
}

export default Features;