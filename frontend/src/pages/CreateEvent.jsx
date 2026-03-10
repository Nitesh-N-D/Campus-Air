import { useState } from "react";
import API from "../services/api";

function CreateEvent() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("image", image);
    formData.append("isImportant", isImportant);
    try {

      await API.post("/events/create", formData);

      alert("Event Created Successfully");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Create Event
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Event Title"
          className="border p-2 w-full"
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          placeholder="Event Description"
          className="border p-2 w-full"
          onChange={(e)=>setDescription(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 w-full"
          onChange={(e)=>setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="border p-2 w-full"
          onChange={(e)=>setLocation(e.target.value)}
        />

        <input
          type="file"
          onChange={(e)=>setImage(e.target.files[0])}
        />
        <label className="flex items-center gap-2 mt-4">
  <input
    type="checkbox"
    onChange={(e)=>setIsImportant(e.target.checked)}
  />
  Send Email to All Students
</label>
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Create Event
        </button>

      </form>

    </div>
  );
}

export default CreateEvent;