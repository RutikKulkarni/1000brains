"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  Film,
  Box,
  BookOpen,
  FileText,
  MessageSquare,
  Mic,
  Settings,
  LogOut,
  Menu,
  X,
  Brain,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Films", href: "/admin/films", icon: Film },
  { label: "Projects", href: "/admin/projects", icon: Box },
  { label: "Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Research", href: "/admin/research", icon: FileText },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "Talks", href: "/admin/talks", icon: Mic },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg"
      >
        {collapsed ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-40 w-64 bg-[var(--surface)] border-r border-[var(--border)] flex flex-col transition-transform duration-300 lg:translate-x-0",
          collapsed ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[var(--border)]">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm">1000brains</span>
              <p className="text-[10px] text-muted font-body">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setCollapsed(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:text-foreground hover:bg-[var(--surface-alt)]"
                )}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-[var(--border)]">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium text-red-500 hover:bg-red-500/10 transition-colors w-full"
          >
            <LogOut className="w-4.5 h-4.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setCollapsed(false)}
        />
      )}
    </>
  );
}

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AdminSidebar />
      <main className="lg:ml-64 p-6 pt-16 lg:pt-6">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminGuard>{children}</AdminGuard>
    </SessionProvider>
  );
}
