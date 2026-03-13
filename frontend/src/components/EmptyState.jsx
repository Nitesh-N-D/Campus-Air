import { Card, CardContent } from "@/components/ui/card";

function EmptyState({ icon: Icon, title, description }) {
  return (
    <Card className="border-dashed border-slate-200 bg-slate-50/70 shadow-none">
      <CardContent className="flex flex-col items-center px-6 py-10 text-center">
        {Icon ? (
          <div className="rounded-2xl bg-white p-3 text-slate-400 shadow-sm">
            <Icon size={22} />
          </div>
        ) : null}
        <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-7 text-slate-500">{description}</p>
      </CardContent>
    </Card>
  );
}

export default EmptyState;
