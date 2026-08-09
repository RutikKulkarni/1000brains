"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Brain, Search, X, Link as LinkIcon } from "lucide-react";

interface TraitItem {
  _id: string;
  name: string;
  description: string;
  icon: string;
  targetUrl: string;
  order?: number;
}

export default function AdminTraitsPage() {
  const [items, setItems] = useState<TraitItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TraitItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "Palette",
    targetUrl: "/visual-narrative",
    order: 0,
  });

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/traits")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setItems(data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      icon: "Palette",
      targetUrl: "/visual-narrative",
      order: items.length,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: TraitItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      icon: item.icon,
      targetUrl: item.targetUrl,
      order: item.order || 0,
    });
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        editingItem ? `/api/traits/${editingItem._id}` : "/api/traits",
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
          setItems([...items, data]);
        }
        setModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to save trait", err);
    }
  };

  async function deleteItem(id: string) {
    if (!confirm("Are you sure you want to delete this trait?")) return;
    const res = await fetch(`/api/traits/${id}`, { method: "DELETE" });
    if (res.ok) setItems(items.filter((i) => i._id !== id));
  }

  const filtered = items.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const availableIcons = [
    "Palette",
    "Film",
    "Box",
    "FlaskConical",
    "GraduationCap",
    "PenTool",
    "Mic",
    "Music",
    "Lightbulb",
    "Brush",
  ];

  const availableRedirects = [
    { label: "Visual Narrative & Design", value: "/visual-narrative" },
    { label: "EdTech & Pedagogy Lab", value: "/edtech-lab" },
    { label: "The Global Classroom", value: "/global-classroom" },
    { label: "Interdisciplinary Expression", value: "/interdisciplinary" },
    { label: "About Page", value: "/about" },
    { label: "Home Page", value: "/" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Traits Settings</h1>
          <p className="text-sm text-muted font-body">
            Manage the traits displayed in your Home Constellation Grid
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-sm font-body font-medium hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Trait
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search traits..."
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
          <Brain className="w-12 h-12 text-muted/30 mx-auto mb-3" />
          <p className="text-muted font-body">
            {search ? "No matches found" : "No dynamic traits yet. Start by adding one."}
          </p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-4 font-medium text-muted w-1/4">Name</th>
                  <th className="text-left p-4 font-medium text-muted w-2/5">Description</th>
                  <th className="text-left p-4 font-medium text-muted hidden md:table-cell">
                    Redirect Target
                  </th>
                  <th className="text-left p-4 font-medium text-muted">Order</th>
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
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent font-semibold">
                          {item.icon}
                        </span>
                        <p className="font-semibold">{item.name}</p>
                      </div>
                    </td>
                    <td className="p-4 text-muted text-xs truncate max-w-xs">
                      {item.description}
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                        <LinkIcon className="w-3.5 h-3.5" />
                        {item.targetUrl}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs">{item.order ?? 0}</td>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="glass-card w-full max-w-md p-6 relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-heading font-bold mb-4">
              {editingItem ? "Edit Constellation Trait" : "Add Constellation Trait"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4 font-body">
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">Trait Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="e.g. Calligrapher"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted font-body">
                    Lucide Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  >
                    {availableIcons.map((ico) => (
                      <option key={ico} value={ico}>
                        {ico}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted font-body">
                    Display Order
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-muted font-body">
                  Target Portfolio Redirect
                </label>
                <select
                  value={formData.targetUrl}
                  onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
                  {availableRedirects.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label} ({opt.value})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-muted font-body">
                  Brief Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
                  placeholder="Fine arts & calligraphy..."
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
