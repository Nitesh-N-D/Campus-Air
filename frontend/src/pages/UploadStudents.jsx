import { useState } from "react";
import API from "../services/api";

function UploadStudents() {

  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    const formData = new FormData();
    formData.append("file", file);

    try {

      await API.post("/students/upload", formData);

      alert("Students Uploaded");

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Upload Students CSV
      </h1>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-2 ml-4"
      >
        Upload
      </button>

    </div>

  );

}

export default UploadStudents;