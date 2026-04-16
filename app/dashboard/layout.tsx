import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/sidebar/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full max-w-none px-10 py-6">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}