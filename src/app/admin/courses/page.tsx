"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, BookOpen, Search, Users } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface CourseItem { _id: string; title: string; platform: string; enrollments: number; featured: boolean; }

export default function AdminCoursesPage() {
  const [items, setItems] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { fetch("/api/courses").then(r => r.ok ? r.json() : []).then(setItems).finally(() => setLoading(false)); }, []);
  async function deleteItem(id: string) { if (!confirm("Delete this course?")) return; const res = await fetch(`/api/courses/${id}`, { method: "DELETE" }); if (res.ok) setItems(items.filter(i => i._id !== id)); }
  const filtered = items.filter(f => f.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-heading font-bold">Courses</h1><p className="text-sm text-muted font-body">Manage MOOCs and courses</p></div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-sm font-body font-medium hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"><Plus className="w-4 h-4" />Add Course</button>
      </div>
      <div className="relative mb-6"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" /><input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all" /></div>
      {loading ? (<div className="text-center py-12"><div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full mx-auto" /></div>
      ) : filtered.length === 0 ? (<div className="glass-card p-12 text-center"><BookOpen className="w-12 h-12 text-muted/30 mx-auto mb-3" /><p className="text-muted font-body">{search ? "No matches" : "No courses yet"}</p></div>
      ) : (
        <div className="glass-card overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm font-body"><thead><tr className="border-b border-[var(--border)]"><th className="text-left p-4 font-medium text-muted">Title</th><th className="text-left p-4 font-medium text-muted hidden md:table-cell">Platform</th><th className="text-left p-4 font-medium text-muted hidden md:table-cell">Enrollments</th><th className="text-right p-4 font-medium text-muted">Actions</th></tr></thead><tbody>
          {filtered.map((item, i) => (
            <motion.tr key={item._id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.03}} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-alt)] transition-colors">
              <td className="p-4 font-medium">{item.title}</td>
              <td className="p-4 hidden md:table-cell"><span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs">{item.platform}</span></td>
              <td className="p-4 hidden md:table-cell"><span className="flex items-center gap-1 text-muted"><Users className="w-3.5 h-3.5" />{formatNumber(item.enrollments)}</span></td>
              <td className="p-4 text-right"><div className="flex items-center justify-end gap-2"><button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-colors"><Edit2 className="w-4 h-4" /></button><button onClick={() => deleteItem(item._id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" /></button></div></td>
            </motion.tr>
          ))}
        </tbody></table></div></div>
      )}
    </div>
  );
}
