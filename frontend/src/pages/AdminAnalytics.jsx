import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import API from "../services/api";
import AdminShell from "../components/AdminShell";
import AccessNotice from "../components/AccessNotice";
import useCurrentUser from "../hooks/useCurrentUser";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminAnalytics() {
  const { isAdmin, isLoading: userLoading } = useCurrentUser();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/analytics").then((res) => setData(res.data));
  }, []);

  if (!data) {
    return (
      <AdminShell title="Analytics" eyebrow="Insights" description="Loading the latest campus activity overview.">
        {!userLoading && !isAdmin ? (
          <AccessNotice description="Only the approved admin Gmail accounts should view analytics and management insights." />
        ) : (
          <section className="page-section text-sm text-slate-500">Loading analytics...</section>
        )}
      </AdminShell>
    );
  }

  const baseChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#334155",
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b" },
      },
      y: {
        grid: { color: "rgba(148, 163, 184, 0.18)" },
        ticks: { color: "#64748b" },
      },
    },
  };

  const eventChart = {
    labels: Object.keys(data.eventsPerMonth),
    datasets: [
      {
        label: "Events",
        data: Object.values(data.eventsPerMonth),
        backgroundColor: "rgba(13, 148, 136, 0.72)",
        borderRadius: 12,
      },
    ],
  };

  const announcementChart = {
    labels: Object.keys(data.announcementsPerMonth),
    datasets: [
      {
        label: "Announcements",
        data: Object.values(data.announcementsPerMonth),
        backgroundColor: "rgba(217, 119, 6, 0.72)",
        borderRadius: 12,
      },
    ],
  };

  const statCards = [
    { label: "Total students", value: data.totalStudents },
    { label: "Total events", value: data.totalEvents },
    { label: "Total announcements", value: data.totalAnnouncements },
  ];

  return (
    <AdminShell
      title="Analytics"
      eyebrow="Insights"
      description="A cleaner dashboard for campus activity trends, sized for executive-level scanning rather than dense reporting."
    >
      {!userLoading && !isAdmin ? (
        <AccessNotice description="Only the approved admin Gmail accounts should view analytics and management insights." />
      ) : (
      <>
      <section className="grid gap-4 md:grid-cols-3">
        {statCards.map((card) => (
          <div key={card.label} className="stat-tile">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {card.label}
            </p>
            <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
              {card.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="page-section">
          <h2 className="text-xl font-semibold text-slate-900">Events per month</h2>
          <div className="mt-6">
            <Bar data={eventChart} options={baseChartOptions} />
          </div>
        </div>

        <div className="page-section">
          <h2 className="text-xl font-semibold text-slate-900">Announcements per month</h2>
          <div className="mt-6">
            <Bar data={announcementChart} options={baseChartOptions} />
          </div>
        </div>
      </section>
      </>
      )}
    </AdminShell>
  );
}

export default AdminAnalytics;
