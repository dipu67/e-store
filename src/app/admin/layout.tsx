import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Geist, Geist_Mono } from "next/font/google";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard layout",
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col  bg-opacity-10 bg-green-900 text-gray-900 antialiased font-sans`}
      >
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >

        <AppSidebar variant="inset" />
         <SidebarInset>
           <SiteHeader />
          
        <main>{children}</main>
         </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
