import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../services/socket";
import { X } from "lucide-react";
import { toast } from "react-toastify";

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

    socket.on("newAlert", (data) => {

      if(data.priority === "High" || data.priority === "Medium" || data.priority === "Low"){

        setAlert(data);
        setVisible(true);

        toast.warning(
          `🔔 New Alert: ${data.title}`,
          {
            position: "top-right",
            autoClose: 5000
          }
        );

      }

    });

    return () => socket.off("newAlert");

  },[]);

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

  /* priority styling */

  let bg = "bg-blue-600";
  let animate = "";

  if(alert.priority === "High"){
    bg = "bg-red-600";
    animate = "animate-pulse";
  }

  if(alert.priority === "Medium"){
    bg = "bg-yellow-500";
  }

  if(alert.priority === "Low"){
    bg = "bg-blue-600";
  }

  return(

    <div className={`${bg} ${animate} text-white rounded-md shadow mb-6`}>

      <div className="flex justify-between items-center px-6 py-3">

        <div>

          <span className="font-bold mr-2">
            🚨 {alert.title}
          </span>

          <span className="text-sm">
            {alert.message}
          </span>

          <span className="ml-3 text-xs opacity-80">
            ({alert.priority})
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