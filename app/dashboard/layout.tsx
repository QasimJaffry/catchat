// app/dashboard/layout.tsx
import Navbar from "@/components/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow">{children}</div>
    </div>
  );
}
