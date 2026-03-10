import { useEffect, useState } from "react";
import API from "../services/api";

function Announcements() {

  const [announcements, setAnnouncements] = useState([]);

  useEffect(()=>{

    API.get("/announcements")
      .then(res => setAnnouncements(res.data))
      .catch(err => console.log(err));

  },[]);

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Campus Announcements
      </h1>

      <div className="space-y-6">

        {announcements.map(a => (

          <div key={a._id} className="border p-6 rounded shadow">

            {a.image && (
              <img
                src={a.image}
                className="w-full h-48 object-cover mb-4"
              />
            )}

            <h2 className="text-xl font-bold">
              {a.title}
            </h2>

            <p className="text-gray-700 mt-2">
              {a.content}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Announcements;