import { useEffect, useState } from "react";
import API from "../services/api";
import { X } from "lucide-react";

function AlertBanner(){

  const [alerts,setAlerts] = useState([]);
  const [visible,setVisible] = useState(true);

  useEffect(()=>{

    API.get("/alerts")
      .then(res => {

        // show only HIGH priority globally
        const highAlerts = res.data.filter(a => a.priority === "High");
        setAlerts(highAlerts);

      });

  },[]);
if(!alerts.length || !visible) return null;

const latestAlert = alerts[0];

return(

  <div className="fixed top-0 left-0 w-full bg-red-600 text-white z-50 shadow-md animate-slideDown">

    <div className="flex justify-between items-center px-6 py-3">

      <div>

        <span className="font-bold mr-2">
          🚨 {latestAlert.title}
        </span>

        <span className="text-sm">
          {latestAlert.message}
        </span>

      </div>

      <button
        onClick={()=>setVisible(false)}
        className="hover:opacity-70"
      >
        <X size={18}/>
      </button>

    </div>

  </div>

)
}

export default AlertBanner;