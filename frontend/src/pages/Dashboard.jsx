import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Bell,
  Calendar,
  Clock3,
  Megaphone,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";
import API from "../services/api";
import AlertBanner from "../components/AlertBanner";
import AdminShell from "../components/AdminShell";
import useCurrentUser from "../hooks/useCurrentUser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

function Dashboard() {
  const { user, isLoading: userLoading, isAdmin } = useCurrentUser();
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([API.get("/events"), API.get("/announcements")])
      .then(([eventsRes, announcementsRes]) => {
        if (!isMounted) {
          return;
        }

        setEvents(eventsRes.data || []);
        setAnnouncements(announcementsRes.data || []);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        if (isMounted) {
          setLoadingData(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const upcomingEvents = useMemo(() => {
    return [...events]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  }, [events]);

  const recentActivity = useMemo(() => {
    const eventItems = events.slice(0, 3).map((event) => ({
      id: `event-${event._id}`,
      title: event.title,
      type: "Event",
      detail: `Scheduled for ${new Date(event.date).toDateString()}`,
      icon: Calendar,
    }));

    const announcementItems = announcements.slice(0, 3).map((announcement) => ({
      id: `announcement-${announcement._id}`,
      title: announcement.title,
      type: "Announcement",
      detail: "Shared with the campus audience",
      icon: Megaphone,
    }));

    return [...eventItems, ...announcementItems].slice(0, 5);
  }, [announcements, events]);

  const stats = [
    {
      label: "Events",
      value: loadingData ? "--" : events.length,
      hint: "Published campus programs",
      icon: Calendar,
      accent: "bg-teal-50 text-teal-700",
    },
    {
      label: "Announcements",
      value: loadingData ? "--" : announcements.length,
      hint: "Active communication posts",
      icon: Bell,
      accent: "bg-amber-50 text-amber-700",
    },
    {
      label: "Role",
      value: userLoading ? "--" : isAdmin ? "Admin" : "Viewer",
      hint: isAdmin ? "Full publishing access" : "Read-only dashboard access",
      icon: isAdmin ? ShieldAlert : Users,
      accent: "bg-slate-100 text-slate-700",
    },
  ];

  const quickActions = isAdmin
    ? [
        {
          title: "Create Event",
          description: "Publish a new event with date, location, and campus-facing details.",
          path: "/create-event",
          icon: Calendar,
        },
        {
          title: "Post Announcement",
          description: "Share timely information in a cleaner, official format.",
          path: "/create-announcement",
          icon: Megaphone,
        },
        {
          title: "Send Alert",
          description: "Escalate urgent campus messaging with clear priority levels.",
          path: "/create-alert",
          icon: ShieldAlert,
        },
        {
          title: "Manage Students",
          description: "Update, review, and organize the student directory.",
          path: "/students",
          icon: Users,
        },
      ]
    : [
        {
          title: "Browse Events",
          description: "See what is happening next across the campus calendar.",
          path: "/events",
          icon: Calendar,
        },
        {
          title: "Read Announcements",
          description: "Review the latest official updates and notices.",
          path: "/announcements",
          icon: Megaphone,
        },
        {
          title: "Open Calendar",
          description: "Use the event calendar for a broader schedule view.",
          path: "/calendar",
          icon: Clock3,
        },
      ];

  return (
    <AdminShell
      title="Dashboard"
      eyebrow="Overview"
      description="A modern, role-aware workspace for campus communication. Admins can publish and manage. Student users can view cleanly without extra controls."
    >
      <AlertBanner />

      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <Card className="overflow-hidden border-none bg-[linear-gradient(135deg,_#0f172a_0%,_#124c55_58%,_#0f766e_100%)] text-white shadow-[0_28px_60px_rgba(15,23,42,0.22)]">
          <CardContent className="relative p-7 md:p-9">
            <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.22),_transparent_60%)] lg:block" />

            <div className="relative max-w-2xl">
              <Badge className="mb-4 border-white/15 bg-white/10 text-slate-50 hover:bg-white/10">
                Welcome back
              </Badge>

              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {userLoading
                  ? "Loading your workspace..."
                  : isAdmin
                    ? `${user?.name || "Admin"}, your control center is ready.`
                    : `${user?.name || "User"}, stay updated with confidence.`}
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 md:text-base">
                {isAdmin
                  ? "Manage events, announcements, and alerts from one calm dashboard with clearer hierarchy and faster access to your core workflows."
                  : "View the latest events, announcements, and calendar updates in a dashboard built to keep information clean and easy to scan."}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="h-11 rounded-2xl bg-white px-5 text-slate-900 hover:bg-slate-100">
                  <Link to={isAdmin ? "/create-event" : "/events"}>
                    {isAdmin ? "Publish event" : "View events"}
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-2xl border-white/20 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white"
                >
                  <Link to="/calendar">Open calendar</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="page-section border-none bg-white/82 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <CardHeader className="px-0">
            <Badge variant="outline" className="w-fit">
              Account
            </Badge>
            <CardTitle className="mt-3 text-2xl">Current Access</CardTitle>
            <CardDescription>
              {userLoading
                ? "Checking access level..."
                : isAdmin
                  ? "This account can publish, manage, and view all dashboard sections."
                  : "This account is limited to viewing announcements, events, and calendar data."}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0 pt-1">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Sparkles size={16} className="text-amber-500" />
                Access summary
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {userLoading
                  ? "Loading your profile information."
                  : `${user?.email || "This account"} is signed in as ${isAdmin ? "an admin user" : "a viewer user"}.`}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.label} className="stat-tile border-none">
              <CardContent className="flex items-start justify-between p-0">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">{stat.hint}</p>
                </div>

                <div className={`rounded-2xl p-3 ${stat.accent}`}>
                  <Icon size={20} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="page-section border-none">
          <CardHeader className="px-0">
            <Badge variant="outline" className="w-fit">
              Activity
            </Badge>
            <CardTitle className="mt-3 text-2xl">Recent activity</CardTitle>
            <CardDescription>
              Recent event publishing and announcement updates across the campus workspace.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0 pt-3">
            {loadingData ? (
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                ))}
              </div>
            ) : recentActivity.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
                <Activity className="mx-auto text-slate-400" size={24} />
                <p className="mt-3 text-base font-medium text-slate-900">No recent activity yet</p>
                <p className="mt-2 text-sm text-slate-500">
                  Published events and announcements will appear here once content starts flowing.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="rounded-2xl bg-teal-50 p-3 text-teal-700">
                        <Icon size={18} />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-slate-900">{item.title}</p>
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="page-section border-none">
          <CardHeader className="px-0">
            <Badge variant="outline" className="w-fit">
              Upcoming
            </Badge>
            <CardTitle className="mt-3 text-2xl">Upcoming events</CardTitle>
            <CardDescription>
              A quick preview of the next campus events in your schedule.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 px-0 pt-3">
            {loadingData ? (
              [1, 2, 3].map((item) => (
                <div key={item} className="h-36 animate-pulse rounded-[24px] bg-slate-100" />
              ))
            ) : upcomingEvents.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
                <Calendar className="mx-auto text-slate-400" size={24} />
                <p className="mt-3 text-base font-medium text-slate-900">No upcoming events</p>
                <p className="mt-2 text-sm text-slate-500">
                  {isAdmin
                    ? "Create your first event to populate this section."
                    : "Upcoming campus events will appear here when available."}
                </p>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div
                  key={event._id}
                  className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-36 w-full object-cover"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-900">{event.title}</p>
                      <Badge variant="secondary">Event</Badge>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      {new Date(event.date).toDateString()}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{event.location}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>

      <Card className="page-section border-none">
        <CardHeader className="px-0">
          <Badge variant="outline" className="w-fit">
            Actions
          </Badge>
          <CardTitle className="mt-3 text-2xl">
            {isAdmin ? "Admin controls" : "Recommended shortcuts"}
          </CardTitle>
          <CardDescription>
            {isAdmin
              ? "Only your admin Gmail accounts will see publishing and management controls here."
              : "Viewer accounts stay read-only and only see navigation that matches their access level."}
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 px-0 pt-3 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link key={action.title} to={action.path} className="dashboard-btn">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-teal-50 p-3 text-teal-700">
                    <Icon size={18} />
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-slate-900">{action.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {action.description}
                    </p>
                  </div>
                </div>

                <ArrowRight size={18} className="text-slate-400" />
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </AdminShell>
  );
}

export default Dashboard;
