import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminAnalytics() {

  const [data, setData] = useState(null);

  useEffect(() => {

    API.get("/analytics")
      .then(res => setData(res.data));

  }, []);

  if (!data) return <div className="p-10">Loading...</div>;

  const eventChart = {

    labels: Object.keys(data.eventsPerMonth),

    datasets: [
      {
        label: "Events",
        data: Object.values(data.eventsPerMonth),
        backgroundColor: "rgba(54,162,235,0.6)"
      }
    ]
  };

  const announcementChart = {

    labels: Object.keys(data.announcementsPerMonth),

    datasets: [
      {
        label: "Announcements",
        data: Object.values(data.announcementsPerMonth),
        backgroundColor: "rgba(255,99,132,0.6)"
      }
    ]
  };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Campus Analytics Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-blue-500 text-white p-6 rounded shadow">
          <h2 className="text-lg">Total Students</h2>
          <p className="text-3xl font-bold">{data.totalStudents}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded shadow">
          <h2 className="text-lg">Total Events</h2>
          <p className="text-3xl font-bold">{data.totalEvents}</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded shadow">
          <h2 className="text-lg">Total Announcements</h2>
          <p className="text-3xl font-bold">{data.totalAnnouncements}</p>
        </div>

      </div>

      <div className="mb-10">

        <h2 className="text-xl font-semibold mb-4">
          Events Per Month
        </h2>

        <Bar data={eventChart} />

      </div>

      <div>

        <h2 className="text-xl font-semibold mb-4">
          Announcements Per Month
        </h2>

        <Bar data={announcementChart} />

      </div>

    </div>

  );

}

export default AdminAnalytics;