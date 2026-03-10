import { useEffect, useState } from "react";
import API from "../services/api";

function AlertBanner(){

  const [alerts,setAlerts] = useState([]);

  useEffect(()=>{

    API.get("/alerts")
      .then(res=>setAlerts(res.data));

  },[]);

  return(

    <div>

      {alerts.map((a,i)=>{

        let color="bg-blue-500";

        if(a.priority==="High") color="bg-red-600";
        if(a.priority==="Medium") color="bg-yellow-500";

        return(

          <div key={i} className={`${color} text-white p-3 mb-2`}>
            <b>{a.title}</b> — {a.message}
          </div>

        )

      })}

    </div>

  )

}

export default AlertBanner;