import { useEffect, useMemo, useState } from "react";
import { UploadCloud, Users } from "lucide-react";
import API from "../services/api";
import AdminShell from "../components/AdminShell";
import AccessNotice from "../components/AccessNotice";
import useCurrentUser from "../hooks/useCurrentUser";
import { Button } from "@/components/ui/button";

function Students() {
  const { isAdmin, isLoading } = useCurrentUser();
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    API.get("/students").then((res) => {
      if (isMounted) {
        setStudents(res.data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredStudents = useMemo(() => {
    let result = students;

    if (searchName) {
      result = result.filter((student) =>
        student.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchEmail) {
      result = result.filter((student) =>
        student.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }

    if (filterDept) {
      result = result.filter(
        (student) => student.department?.toLowerCase() === filterDept.toLowerCase()
      );
    }

    return result;
  }, [searchName, searchEmail, filterDept, students]);

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data);
  };

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
      year: "",
    });

    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await API.delete(`/students/delete/${id}`);
    fetchStudents();
  };

  const handleUpload = async () => {
    setUploadError("");
    setUploadSuccess("");

    if (!file) {
      setUploadError("Please choose a CSV file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      await API.post("/students/upload", formData);
      setUploadSuccess("Students imported successfully.");
      setFile(null);
      fetchStudents();
    } catch (error) {
      console.error(error);
      setUploadError("Unable to upload the CSV file right now.");
    } finally {
      setIsUploading(false);
    }
  };

  const editStudent = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      department: student.department,
      year: student.year,
    });

    setEditingId(student._id);
  };

  return (
    <AdminShell
      title="Students"
      eyebrow="Directory"
      description="Manage your student database with stronger search, cleaner editing surfaces, and a more modern administrative table."
    >
      {!isLoading && !isAdmin ? (
        <AccessNotice description="Only the approved admin Gmail accounts should manage student records. Viewer accounts stay limited to dashboard viewing." />
      ) : (
      <>
      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="page-section">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">
                CSV Import
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                Add students via CSV
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Import your student list here instead of using a separate page. This keeps both bulk upload and manual entry inside one management screen.
              </p>
            </div>

            <div className="rounded-2xl bg-teal-50 p-3 text-teal-700">
              <UploadCloud size={20} />
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-dashed border-slate-200 bg-slate-50/80 p-5">
            <input
              type="file"
              accept=".csv"
              className="premium-input file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setUploadError("");
                setUploadSuccess("");
              }}
            />

            {uploadError ? (
              <p className="mt-3 text-sm text-rose-600">{uploadError}</p>
            ) : null}

            {uploadSuccess ? (
              <p className="mt-3 text-sm text-emerald-600">{uploadSuccess}</p>
            ) : null}

            <Button
              className="mt-5 h-12 rounded-2xl px-6"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload students CSV"}
            </Button>
          </div>
        </div>

        <div className="page-section space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">
                Manual Entry
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                Add students one by one
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Use manual entry when you only need to add or update a few records quickly.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
              <Users size={20} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            <input
              value={form.name}
              placeholder="Name"
              className="premium-input"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              value={form.email}
              placeholder="Email"
              className="premium-input"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              value={form.department}
              placeholder="Department"
              className="premium-input"
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />

            <input
              value={form.year}
              placeholder="Year"
              className="premium-input"
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />

            <Button
              className="h-full min-h-12 rounded-2xl"
              onClick={handleSubmit}
            >
              {editingId ? "Update student" : "Add student"}
            </Button>
          </div>
        </div>
      </section>

      <section className="page-section space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            placeholder="Search by name"
            className="premium-input"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />

          <input
            placeholder="Search by email"
            className="premium-input"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />

          <select
            className="premium-select"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="">All departments</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
          </select>
        </div>
      </section>

      <section className="page-section overflow-hidden">
        <div className="overflow-x-auto">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-10 text-center text-sm text-slate-500">
                    No students match the current filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td className="font-medium text-slate-900">{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.department}</td>
                    <td>{student.year}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editStudent(student)}
                          className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteStudent(student._id)}
                          className="rounded-xl bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      </>
      )}
    </AdminShell>
  );
}

export default Students;
