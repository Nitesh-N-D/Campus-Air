import { useState } from "react";
import API from "../services/api";

function CreateAlert(){

  const [title,setTitle] = useState("");
  const [message,setMessage] = useState("");
  const [priority,setPriority] = useState("Low");

  const handleSubmit = async (e) => {

    e.preventDefault();

    await API.post("/alerts",{
      title,
      message,
      priority
    });

    alert("Alert created");

  };

  return(

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Send Alert
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Title"
          className="border p-2 w-full"
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          placeholder="Message"
          className="border p-2 w-full"
          onChange={(e)=>setMessage(e.target.value)}
        />

        <select
          className="border p-2"
          onChange={(e)=>setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button className="bg-red-600 text-white px-6 py-2 rounded">
          Send Alert
        </button>

      </form>

    </div>

  );

}

export default CreateAlert;