"use client";

import { motion } from "framer-motion";
import {
  Film,
  Box,
  BookOpen,
  FileText,
  MessageSquare,
  Mic,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

const dashboardCards = [
  { label: "Films", href: "/admin/films", icon: Film, color: "from-rose-500 to-pink-600", count: 3 },
  { label: "Projects", href: "/admin/projects", icon: Box, color: "from-blue-500 to-indigo-600", count: 3 },
  { label: "Courses", href: "/admin/courses", icon: BookOpen, color: "from-emerald-500 to-teal-600", count: 4 },
  { label: "Research", href: "/admin/research", icon: FileText, color: "from-purple-500 to-violet-600", count: 3 },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare, color: "from-amber-500 to-orange-600", count: 4 },
  { label: "Talks", href: "/admin/talks", icon: Mic, color: "from-cyan-500 to-blue-600", count: 4 },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold mb-1">Dashboard</h1>
        <p className="text-sm text-muted font-body">
          Welcome back, Sameer Sir. Manage your portfolio content below.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Content", value: "21", icon: TrendingUp },
          { label: "Featured Items", value: "8", icon: Film },
          { label: "Blog Visits", value: "176K+", icon: Users },
          { label: "Learners", value: "100K+", icon: BookOpen },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-heading font-bold">{stat.value}</p>
                  <p className="text-xs text-muted font-body">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Content Cards */}
      <h2 className="text-lg font-heading font-semibold mb-4">Manage Content</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboardCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Link
                href={card.href}
                className="glass-card p-5 flex items-center gap-4 group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-heading font-semibold group-hover:text-accent transition-colors">
                    {card.label}
                  </p>
                  <p className="text-xs text-muted font-body">
                    {card.count} items
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
