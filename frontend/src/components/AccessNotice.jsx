import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function AccessNotice({
  title = "Admin access required",
  description = "This section is available only to the approved admin accounts.",
}) {
  return (
    <Card className="page-section border-none">
      <CardContent className="flex flex-col items-center px-0 py-8 text-center">
        <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
          <Lock size={20} />
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 max-w-lg text-sm leading-7 text-slate-500">{description}</p>
        <Button asChild className="mt-6 rounded-2xl">
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default AccessNotice;
