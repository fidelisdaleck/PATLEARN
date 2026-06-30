import { ReactNode } from "react";
import Header from "./header";
import AdminSidebar from "./sidebar";;

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Section */}
      <div className="ml-72 flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}