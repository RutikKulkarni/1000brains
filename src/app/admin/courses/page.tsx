"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, BookOpen, Search, Users, X } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface CourseItem {
  _id: string;
  title: string;
  platform: string;
  enrollments: number;
  description: string;
  url: string;
  featured: boolean;
}

export default function AdminCoursesPage() {
  const [items, setItems] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CourseItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    platform: "SWAYAM",
    enrollments: 0,
    description: "",
    url: "",
    featured: false,
  });

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/courses")
      .then((r) => (r.ok ? r.json() : []))
      .then(setItems)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      platform: "SWAYAM",
      enrollments: 0,
      description: "",
      url: "",
      featured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: CourseItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      platform: item.platform,
      enrollments: item.enrollments,
      description: item.description,
      url: item.url,
      featured: item.featured,
    });
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        editingItem ? `/api/courses/${editingItem._id}` : "/api/courses",
        {
          method: editingItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (editingItem) {
          setItems(items.map((i) => (i._id === editingItem._id ? data : i)));
        } else {
          setItems([data, ...items]);
        }
        setModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to save course", err);
    }
  };

  async function deleteItem(id: string) {
    if (!confirm("Delete this course?")) return;
    const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
    if (res.ok) setItems(items.filter((i) => i._id !== id));
  }

  const filtered = items.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Courses</h1>
          <p className="text-sm text-muted font-body">Manage MOOCs and courses</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-sm font-body font-medium hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search courses..."
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
          <BookOpen className="w-12 h-12 text-muted/30 mx-auto mb-3" />
          <p className="text-muted font-body">
            {search ? "No matches" : "No courses yet"}
          </p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-4 font-medium text-muted">Title</th>
                  <th className="text-left p-4 font-medium text-muted hidden md:table-cell">
                    Platform
                  </th>
                  <th className="text-left p-4 font-medium text-muted hidden md:table-cell">
                    Enrollments
                  </th>
                  <th className="text-right p-4 font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <motion.tr
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-alt)] transition-colors"
                  >
                    <td className="p-4 font-medium">{item.title}</td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs">
                        {item.platform}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="flex items-center gap-1 text-muted">
                        <Users className="w-3.5 h-3.5" />
                        {formatNumber(item.enrollments)}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteItem(item._id)}
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-md p-6 relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-heading font-bold mb-4">
              {editingItem ? "Edit Course" : "Add Course"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4 font-body">
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">
                    Platform
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) =>
                      setFormData({ ...formData, platform: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  >
                    <option value="SWAYAM">SWAYAM</option>
                    <option value="NPTEL">NPTEL</option>
                    <option value="IITBombayX">IITBombayX</option>
                    <option value="edX">edX</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">
                    Enrollments
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={formData.enrollments}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        enrollments: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">
                  Course URL
                </label>
                <input
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="rounded border-[var(--border)] text-accent focus:ring-accent cursor-pointer"
                />
                <label
                  htmlFor="featured"
                  className="text-xs font-semibold text-muted cursor-pointer"
                >
                  Featured
                </label>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
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
