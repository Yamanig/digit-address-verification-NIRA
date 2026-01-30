"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, Workflow, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/platform/dashboard" },
  { icon: MapPin, label: "Addresses", href: "/platform/addresses" },
  { icon: Workflow, label: "Workflows", href: "/platform/workflows" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: isCollapsed ? "80px" : "256px",
        transition: "width 0.3s ease",
        backdropFilter: "blur(4px)",
        backgroundColor: "rgb(255 255 255 / 0.8)",
        borderRight: "1px solid rgb(229 231 235 / 0.5)",
      }}
      className="h-screen flex flex-col"
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="font-heading font-bold text-xl text-primary">NIRA</h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:scale-105",
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                )}
                style={isActive ? { boxShadow: "var(--shadow-glow)" } : {}}
              >
                <Icon size={20} />
                {!isCollapsed && (
                  <span className="font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-gray-200/50">
        {!isCollapsed && (
          <div className="text-xs text-gray-500">
            <p>Digital Address</p>
            <p>Verification Platform</p>
          </div>
        )}
      </div>
    </aside>
  );
}
