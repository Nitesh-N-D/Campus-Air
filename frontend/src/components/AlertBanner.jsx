import { useEffect, useState } from "react";
import API from "../services/api";
import { X } from "lucide-react";

function AlertBanner(){

  const [alert,setAlert] = useState(null);
  const [visible,setVisible] = useState(true);

  useEffect(()=>{

    const closed = localStorage.getItem("alertClosed");

    if(closed === "true"){
      setVisible(false);
      return;
    }

    API.get("/alerts")
      .then(res => {

        const highAlerts = res.data.filter(a => a.priority === "High");

        if(highAlerts.length){
          setAlert(highAlerts[0]);
        }

      });

  },[]);

  // auto hide after 10 seconds
  useEffect(()=>{

    if(alert){
      const timer = setTimeout(()=>{
        setVisible(false);
      },10000);

      return ()=>clearTimeout(timer);
    }

  },[alert]);

  const handleClose = () => {

    setVisible(false);
    localStorage.setItem("alertClosed","true");

  };

  if(!alert || !visible) return null;

  return(

    <div className="bg-red-600 text-white rounded-md shadow mb-6">

      <div className="flex justify-between items-center px-6 py-3">

        <div>

          <span className="font-bold mr-2">
            🚨 {alert.title}
          </span>

          <span className="text-sm">
            {alert.message}
          </span>

        </div>

        <button
          onClick={handleClose}
          className="hover:opacity-70"
        >
          <X size={20}/>
        </button>

      </div>

    </div>

  )

}

export default AlertBanner;