"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Menu, Search, X, Link as LinkIcon, CheckCircle2, XCircle } from "lucide-react";

interface NavItem {
  _id: string;
  label: string;
  href: string;
  order: number;
  active: boolean;
}

export default function AdminNavigationPage() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavItem | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    href: "/",
    order: 0,
    active: true,
  });

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/navigation")
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
      label: "",
      href: "/",
      order: items.length,
      active: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: NavItem) => {
    setEditingItem(item);
    setFormData({
      label: item.label,
      href: item.href,
      order: item.order || 0,
      active: item.active !== false,
    });
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        editingItem ? `/api/navigation/${editingItem._id}` : "/api/navigation",
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
      console.error("Failed to save menu link", err);
    }
  };

  async function deleteItem(id: string) {
    if (!confirm("Are you sure you want to delete this navigation link?")) return;
    const res = await fetch(`/api/navigation/${id}`, { method: "DELETE" });
    if (res.ok) setItems(items.filter((i) => i._id !== id));
  }

  const filtered = items.filter((f) =>
    f.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Top Navigation Options</h1>
          <p className="text-sm text-muted font-body">
            Manage links, page menus, and re-order elements in your top Navbar and Footer
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-sm font-body font-medium hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Nav Item
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search links..."
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
          <Menu className="w-12 h-12 text-muted/30 mx-auto mb-3" />
          <p className="text-muted font-body">
            {search ? "No matches found" : "No custom nav links seeded yet. Add one or run seed."}
          </p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-4 font-medium text-muted">Link Label</th>
                  <th className="text-left p-4 font-medium text-muted">Path (Href)</th>
                  <th className="text-left p-4 font-medium text-muted">Sort Order</th>
                  <th className="text-left p-4 font-medium text-muted">Status</th>
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
                    <td className="p-4 font-semibold">{item.label}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                        <LinkIcon className="w-3.5 h-3.5" />
                        {item.href}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs">{item.order}</td>
                    <td className="p-4">
                      {item.active ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Visible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-semibold bg-red-500/10 px-2 py-0.5 rounded-lg">
                          <XCircle className="w-3.5 h-3.5" />
                          Hidden
                        </span>
                      )}
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
          <div className="glass-card w-full max-w-sm p-6 relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-heading font-bold mb-4">
              {editingItem ? "Edit Navigation Link" : "Add Navigation Link"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4 font-body">
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted">Link Text</label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="e.g. Publications"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-muted font-body">
                  Target Path (Href)
                </label>
                <input
                  type="text"
                  required
                  value={formData.href}
                  onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="e.g. /publications or http://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-muted font-body">
                    Sorting Order
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
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="rounded border-[var(--border)] text-accent focus:ring-accent cursor-pointer"
                  />
                  <label htmlFor="active" className="text-xs font-semibold text-muted cursor-pointer">
                    Visible
                  </label>
                </div>
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
