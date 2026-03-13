import { useState } from "react";
import { UploadCloud } from "lucide-react";
import API from "../services/api";
import AdminShell from "../components/AdminShell";
import AccessNotice from "../components/AccessNotice";
import useCurrentUser from "../hooks/useCurrentUser";
import { Button } from "@/components/ui/button";

function UploadStudents() {
  const { isAdmin, isLoading } = useCurrentUser();
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/students/upload", formData);
      alert("Students uploaded");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminShell
      title="Upload Students"
      eyebrow="Directory"
      description="A cleaner import experience for bringing your student list into the platform without friction."
    >
      {!isLoading && !isAdmin ? (
        <AccessNotice description="Only the approved admin Gmail accounts should import student records. Viewer accounts cannot use this area." />
      ) : (
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="page-section">
          <div className="soft-grid rounded-[24px] border border-dashed border-slate-300 bg-slate-50/60 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-white">
              <UploadCloud size={28} />
            </div>

            <h2 className="mt-5 text-2xl font-semibold text-slate-900">
              Import a CSV file
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Upload your latest directory export to keep student records current and searchable.
            </p>

            <div className="mx-auto mt-6 max-w-xl">
              <input
                type="file"
                className="premium-input file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <Button className="mt-5 h-12 rounded-2xl px-6" onClick={handleUpload}>
              Upload students
            </Button>
          </div>
        </div>

        <aside className="page-section">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">
            Import Tips
          </p>
          <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
            <li>Use clean columns for name, email, department, and year.</li>
            <li>Remove duplicate rows before importing for a smoother update.</li>
            <li>Run imports after major enrollment changes to keep communication reliable.</li>
          </ul>
        </aside>
      </section>
      )}
    </AdminShell>
  );
}

export default UploadStudents;
