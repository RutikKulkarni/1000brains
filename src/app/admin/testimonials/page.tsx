"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, MessageSquare, Search, Star, X } from "lucide-react";

interface TestimonialItem {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating?: number;
  courseName?: string;
  featured: boolean;
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    courseName: "",
    featured: false,
  });

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/testimonials")
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
      name: "",
      role: "",
      content: "",
      rating: 5,
      courseName: "",
      featured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      content: item.content,
      rating: item.rating || 5,
      courseName: item.courseName || "",
      featured: item.featured,
    });
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        editingItem ? `/api/testimonials/${editingItem._id}` : "/api/testimonials",
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
      console.error("Failed to save testimonial", err);
    }
  };

  async function deleteItem(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) setItems(items.filter((i) => i._id !== id));
  }

  const filtered = items.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Testimonials</h1>
          <p className="text-sm text-muted font-body">Manage learner testimonials</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-sm font-body font-medium hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search testimonials..."
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
          <MessageSquare className="w-12 h-12 text-muted/30 mx-auto mb-3" />
          <p className="text-muted font-body">
            {search ? "No matches" : "No testimonials yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium font-body">{item.name}</p>
                  <p className="text-xs text-muted font-body">{item.role}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted font-body italic mb-2 line-clamp-3">
                &ldquo;{item.content}&rdquo;
              </p>
              {item.rating && (
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-3.5 h-3.5 ${
                        j < item.rating!
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted/20"
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="glass-card w-full max-w-md p-6 relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-heading font-bold mb-4">
              {editingItem ? "Edit Testimonial" : "Add Testimonial"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4 font-body">
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">
                  Role
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">
                  Course Name
                </label>
                <input
                  type="text"
                  value={formData.courseName}
                  onChange={(e) =>
                    setFormData({ ...formData, courseName: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    required
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: parseInt(e.target.value) || 5,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
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
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">
                  Content
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
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
