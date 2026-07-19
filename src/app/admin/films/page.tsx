"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Film as FilmIcon, Award, Search } from "lucide-react";

interface FilmItem {
  _id: string;
  title: string;
  subtitle: string;
  category: string;
  year: number;
  featured: boolean;
  awards: string[];
}

export default function AdminFilmsPage() {
  const [films, setFilms] = useState<FilmItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchFilms();
  }, []);

  async function fetchFilms() {
    try {
      const res = await fetch("/api/films");
      if (res.ok) setFilms(await res.json());
    } catch (e) {
      console.error("Failed to fetch films", e);
    } finally {
      setLoading(false);
    }
  }

  async function deleteFilm(id: string) {
    if (!confirm("Are you sure you want to delete this film?")) return;
    try {
      const res = await fetch(`/api/films/${id}`, { method: "DELETE" });
      if (res.ok) setFilms(films.filter((f) => f._id !== id));
    } catch (e) {
      console.error("Failed to delete film", e);
    }
  }

  const filtered = films.filter(
    (f) =>
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Films</h1>
          <p className="text-sm text-muted font-body">Manage film portfolio</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-sm font-body font-medium hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20">
          <Plus className="w-4 h-4" />
          Add Film
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search films..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full mx-auto" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <FilmIcon className="w-12 h-12 text-muted/30 mx-auto mb-3" />
          <p className="text-muted font-body">
            {search ? "No films match your search" : "No films yet. Add your first film."}
          </p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-4 font-medium text-muted">Title</th>
                  <th className="text-left p-4 font-medium text-muted hidden md:table-cell">Category</th>
                  <th className="text-left p-4 font-medium text-muted hidden md:table-cell">Year</th>
                  <th className="text-left p-4 font-medium text-muted hidden lg:table-cell">Awards</th>
                  <th className="text-right p-4 font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((film, i) => (
                  <motion.tr
                    key={film._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-alt)] transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{film.title}</p>
                        <p className="text-xs text-muted">{film.subtitle}</p>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="px-2 py-1 rounded-lg bg-primary/8 text-primary text-xs capitalize">
                        {film.category}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell text-muted">{film.year}</td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex gap-1">
                        {film.awards.slice(0, 2).map((a) => (
                          <span key={a} className="inline-flex items-center gap-0.5 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <Award className="w-2.5 h-2.5" />
                            {a.length > 20 ? a.slice(0, 20) + "…" : a}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteFilm(film._id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
