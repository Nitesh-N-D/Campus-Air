import { SidebarInset } from "./SidebarInset";

function AdminShell({
  title,
  eyebrow,
  description,
  actions,
  children,
}) {
  return (
    <SidebarInset
      title={title}
      eyebrow={eyebrow}
      description={description}
      actions={actions}
    >
      {children}
    </SidebarInset>
  );
}

export default AdminShell;
