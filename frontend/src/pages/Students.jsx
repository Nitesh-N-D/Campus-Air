import { useEffect, useState } from "react";
import API from "../services/api";

function Students() {

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    year: ""
  });

  const [editingId, setEditingId] = useState(null);

  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [filterDept, setFilterDept] = useState("");

  const fetchStudents = async () => {

    const res = await API.get("/students");

    setStudents(res.data);
    setFilteredStudents(res.data);

  };

  useEffect(() => {

    fetchStudents();

  }, []);

  /* SEARCH + FILTER */

  useEffect(() => {

    let result = students;

    if (searchName) {
      result = result.filter(s =>
        s.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchEmail) {
      result = result.filter(s =>
        s.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }

    if (filterDept) {
      result = result.filter(s =>
        s.department?.toLowerCase() === filterDept.toLowerCase()
      );
    }

    setFilteredStudents(result);

  }, [searchName, searchEmail, filterDept, students]);

  /* ADD OR UPDATE */

  const handleSubmit = async () => {

    if (editingId) {

      await API.put(`/students/update/${editingId}`, form);

      setEditingId(null);

    } else {

      await API.post("/students/add", form);

    }

    setForm({
      name: "",
      email: "",
      department: "",
      year: ""
    });

    fetchStudents();

  };

  /* DELETE */

  const deleteStudent = async (id) => {

    await API.delete(`/students/delete/${id}`);

    fetchStudents();

  };

  /* EDIT */

  const editStudent = (student) => {

    setForm({
      name: student.name,
      email: student.email,
      department: student.department,
      year: student.year
    });

    setEditingId(student._id);

  };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Students List
      </h1>

      {/* SEARCH + FILTER */}

      <div className="mb-6 flex gap-4 flex-wrap">

        <input
          placeholder="Search by Name"
          className="border p-2"
          value={searchName}
          onChange={(e)=>setSearchName(e.target.value)}
        />

        <input
          placeholder="Search by Email"
          className="border p-2"
          value={searchEmail}
          onChange={(e)=>setSearchEmail(e.target.value)}
        />

        <select
          className="border p-2"
          value={filterDept}
          onChange={(e)=>setFilterDept(e.target.value)}
        >

          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>

        </select>

      </div>

      {/* ADD / EDIT FORM */}

      <div className="mb-6 space-x-2">

        <input
          value={form.name}
          placeholder="Name"
          className="border p-2"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
          value={form.email}
          placeholder="Email"
          className="border p-2"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
          value={form.department}
          placeholder="Department"
          className="border p-2"
          onChange={(e)=>setForm({...form,department:e.target.value})}
        />

        <input
          value={form.year}
          placeholder="Year"
          className="border p-2"
          onChange={(e)=>setForm({...form,year:e.target.value})}
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Student" : "Add Student"}
        </button>

      </div>

      {/* STUDENTS TABLE */}

      <table className="w-full border">

        <thead className="bg-gray-200">

          <tr>
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredStudents.map((s)=>(
            <tr key={s._id} className="border">

              <td className="p-2">{s.name}</td>
              <td>{s.email}</td>
              <td>{s.department}</td>
              <td>{s.year}</td>

              <td className="space-x-2">

                <button
                  onClick={()=>editStudent(s)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={()=>deleteStudent(s._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Students;