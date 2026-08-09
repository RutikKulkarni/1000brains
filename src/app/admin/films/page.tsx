"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Film as FilmIcon, Award, Search, X } from "lucide-react";

interface FilmItem {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  year: number;
  featured: boolean;
  awards: string[];
  thumbnail?: string;
  videoUrl?: string;
}

export default function AdminFilmsPage() {
  const [films, setFilms] = useState<FilmItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FilmItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "documentary",
    year: new Date().getFullYear(),
    featured: false,
    awards: "",
    thumbnail: "",
    videoUrl: "",
  });

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

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      category: "documentary",
      year: new Date().getFullYear(),
      featured: false,
      awards: "",
      thumbnail: "",
      videoUrl: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (film: FilmItem) => {
    setEditingItem(film);
    setFormData({
      title: film.title,
      subtitle: film.subtitle || "",
      description: film.description || "",
      category: film.category,
      year: film.year,
      featured: film.featured,
      awards: film.awards.join(", "),
      thumbnail: film.thumbnail || "",
      videoUrl: film.videoUrl || "",
    });
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      awards: formData.awards
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    try {
      const res = await fetch(
        editingItem ? `/api/films/${editingItem._id}` : "/api/films",
        {
          method: editingItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (editingItem) {
          setFilms(films.map((f) => (f._id === editingItem._id ? data : f)));
        } else {
          setFilms([data, ...films]);
        }
        setModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to save film", err);
    }
  };

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
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-sm font-body font-medium hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Film
        </button>
      </div>

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
                      <div className="flex gap-1 flex-wrap">
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
                        <button
                          onClick={() => openEditModal(film)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteFilm(film._id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="glass-card w-full max-w-lg p-6 relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-heading font-bold mb-4">
              {editingItem ? "Edit Film" : "Add Film"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4 font-body">
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  >
                    <option value="documentary">Documentary</option>
                    <option value="educational">Educational</option>
                    <option value="short">Short Film</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">Year</label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 2024 })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">Video URL (optional)</label>
                  <input
                    type="text"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-[var(--border)] text-accent focus:ring-accent cursor-pointer"
                  />
                  <label htmlFor="featured" className="text-xs font-semibold text-muted cursor-pointer">Featured</label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">Awards (comma-separated)</label>
                <input
                  type="text"
                  value={formData.awards}
                  placeholder="e.g. Best Film - EdTech Awards, Helsinki Nominee"
                  onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm rounded-xl border border-[var(--border)] hover:bg-[var(--surface-alt)] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-xl bg-accent text-white hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20 cursor-pointer font-medium"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
