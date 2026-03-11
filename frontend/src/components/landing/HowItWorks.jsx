import { Card, CardContent } from "@/components/ui/card";
import { Bell, Calendar, Upload, Mail } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Event Management",
    desc: "Admins can create and manage campus events easily."
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    desc: "Students instantly receive updates via notifications."
  },
  {
    icon: Mail,
    title: "Email Alerts",
    desc: "Important announcements are automatically emailed."
  },
  {
    icon: Upload,
    title: "CSV Student Import",
    desc: "Upload and manage student lists quickly."
  }
];

function Features() {

  return (
    <section id="features" className="py-24 bg-white">

      <h2 className="text-4xl font-bold text-center mb-16">
        Powerful Features
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">

        {features.map((f, i) => (
          <Card key={i} className="hover:shadow-xl transition">

            <CardContent className="p-6 text-center">

              <f.icon className="mx-auto mb-4 text-blue-600" size={32} />

              <h3 className="font-semibold mb-2">
                {f.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {f.desc}
              </p>

            </CardContent>

          </Card>
        ))}

      </div>

    </section>
  );
}

export default Features;