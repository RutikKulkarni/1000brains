"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, FileText, Search, X } from "lucide-react";

interface ResearchItem {
  _id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract: string;
  doi?: string;
  pdfUrl?: string;
  tags: string[];
  status: string;
  fundingSource?: string;
}

export default function AdminResearchPage() {
  const [items, setItems] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ResearchItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    journal: "",
    year: new Date().getFullYear(),
    abstract: "",
    doi: "",
    pdfUrl: "",
    tags: "",
    status: "published",
    fundingSource: "",
  });

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/research")
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
      authors: "",
      journal: "",
      year: new Date().getFullYear(),
      abstract: "",
      doi: "",
      pdfUrl: "",
      tags: "",
      status: "published",
      fundingSource: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (item: ResearchItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      authors: item.authors.join(", "),
      journal: item.journal,
      year: item.year,
      abstract: item.abstract || "",
      doi: item.doi || "",
      pdfUrl: item.pdfUrl || "",
      tags: item.tags.join(", "),
      status: item.status,
      fundingSource: item.fundingSource || "",
    });
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      authors: formData.authors
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      tags: formData.tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    try {
      const res = await fetch(
        editingItem ? `/api/research/${editingItem._id}` : "/api/research",
        {
          method: editingItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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
      console.error("Failed to save paper", err);
    }
  };

  async function deleteItem(id: string) {
    if (!confirm("Delete this paper?")) return;
    const res = await fetch(`/api/research/${id}`, { method: "DELETE" });
    if (res.ok) setItems(items.filter((i) => i._id !== id));
  }

  const filtered = items.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Research</h1>
          <p className="text-sm text-muted font-body">Manage research papers</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-sm font-body font-medium hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Paper
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search research..."
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
          <FileText className="w-12 h-12 text-muted/30 mx-auto mb-3" />
          <p className="text-muted font-body">
            {search ? "No matches" : "No papers yet"}
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
                    Year
                  </th>
                  <th className="text-left p-4 font-medium text-muted hidden md:table-cell">
                    Status
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
                    <td className="p-4">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted mt-0.5">
                        {item.authors.join(", ")}
                      </p>
                    </td>
                    <td className="p-4 hidden md:table-cell text-muted">{item.year}</td>
                    <td className="p-4 hidden md:table-cell">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs capitalize ${
                          item.status === "published"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : item.status === "funded"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {item.status}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="glass-card w-full max-w-lg p-6 relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-heading font-bold mb-4">
              {editingItem ? "Edit Research Paper" : "Add Research Paper"}
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
                    Authors (comma-separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.authors}
                    placeholder="e.g. S. Sahasrabudhe, A. Iyer"
                    onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">
                    Journal / Publisher
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.journal}
                    onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">
                    Year
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: parseInt(e.target.value) || 2024 })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  >
                    <option value="published">Published</option>
                    <option value="in-progress">In Progress</option>
                    <option value="funded">Funded</option>
                  </select>
                </div>
              </div>
              {formData.status === "funded" && (
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">
                    Funding Source
                  </label>
                  <input
                    type="text"
                    value={formData.fundingSource}
                    placeholder="e.g. ICSSR"
                    onChange={(e) =>
                      setFormData({ ...formData, fundingSource: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">
                    DOI URL (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.doi}
                    onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted">
                    PDF URL (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.pdfUrl}
                    onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  placeholder="e.g. LCM, Pedagogy, EdTech"
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">
                  Abstract
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
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
