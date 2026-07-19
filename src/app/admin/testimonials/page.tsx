"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, MessageSquare, Search, Star } from "lucide-react";

interface TestimonialItem { _id: string; name: string; role: string; content: string; rating?: number; courseName?: string; featured: boolean; }

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { fetch("/api/testimonials").then(r => r.ok ? r.json() : []).then(setItems).finally(() => setLoading(false)); }, []);
  async function deleteItem(id: string) { if (!confirm("Delete this testimonial?")) return; const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" }); if (res.ok) setItems(items.filter(i => i._id !== id)); }
  const filtered = items.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.content.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-heading font-bold">Testimonials</h1><p className="text-sm text-muted font-body">Manage learner testimonials</p></div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-sm font-body font-medium hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"><Plus className="w-4 h-4" />Add Testimonial</button>
      </div>
      <div className="relative mb-6"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" /><input type="text" placeholder="Search testimonials..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all" /></div>
      {loading ? (<div className="text-center py-12"><div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full mx-auto" /></div>
      ) : filtered.length === 0 ? (<div className="glass-card p-12 text-center"><MessageSquare className="w-12 h-12 text-muted/30 mx-auto mb-3" /><p className="text-muted font-body">{search ? "No matches" : "No testimonials yet"}</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item, i) => (
            <motion.div key={item._id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}} className="glass-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div><p className="font-medium font-body">{item.name}</p><p className="text-xs text-muted font-body">{item.role}</p></div>
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => deleteItem(item._id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-sm text-muted font-body italic mb-2 line-clamp-3">&ldquo;{item.content}&rdquo;</p>
              {item.rating && <div className="flex gap-0.5">{Array.from({length:5}).map((_,j) => <Star key={j} className={`w-3 h-3 ${j < item.rating! ? 'text-amber-400 fill-amber-400' : 'text-muted/20'}`} />)}</div>}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
