import { useState } from "react";
import API from "../services/api";

function CreateAnnouncement() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("isImportant", isImportant);
    try {

      await API.post("/announcements/create", formData);

      alert("Announcement Posted");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Post Announcement
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Announcement Title"
          className="border p-2 w-full"
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          placeholder="Announcement Content"
          className="border p-2 w-full"
          onChange={(e)=>setContent(e.target.value)}
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
        <button className="bg-green-600 text-white px-6 py-2 rounded">
          Post Announcement
        </button>

      </form>

    </div>
  );
}

export default CreateAnnouncement;