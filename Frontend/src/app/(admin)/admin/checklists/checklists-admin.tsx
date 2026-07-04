"use client";
import { useState, useMemo } from "react";
import { X } from "lucide-react";
import type { PackingChecklist } from "@/types";
import { AdminTable, type Column } from "@/components/dashboard/admin-table";
import { Alert } from "@/components/ui/alert";
import { apiDelete } from "@/services/api-client";
import { ChecklistForm } from "./checklist-form";

export function ChecklistsAdmin({ checklists: initial }: { checklists: PackingChecklist[] }) {
  const [rows, setRows] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<PackingChecklist | null>(null);

  const openAdd = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (c: PackingChecklist) => { setEditing(c); setFormOpen(true); };
  const closeForm = () => setFormOpen(false);
  const handleSaved = (saved: PackingChecklist) => {
    setRows((prev) => {
      const exists = prev.some((c) => c.id === saved.id);
      return exists ? prev.map((c) => (c.id === saved.id ? saved : c)) : [saved, ...prev];
    });
    setFormOpen(false);
  };

  const handleDelete = async (checklist: PackingChecklist) => {
    setError(null);
    try {
      await apiDelete(`/checklists/${checklist.id}`);
      setRows((prev) => prev.filter((c) => c.id !== checklist.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete checklist");
    }
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((c) => c.category.toLowerCase().includes(q));
  }, [rows, search]);

  const columns: Column<PackingChecklist>[] = [
    { key: "category", label: "Category", render: (c) => <span className="font-medium text-brand-600">{c.category}</span> },
    { key: "items", label: "Items", render: (c) => <span className="text-sm text-muted-foreground">{c.items.length} item{c.items.length !== 1 ? "s" : ""}</span> },
  ];

  const showCount = filtered.length !== rows.length ? `${filtered.length} of ${rows.length}` : String(rows.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="h2 text-brand-600">Packing checklist management</h1>
        <p className="lead mt-1">One checklist per destination category, shown on destination pages.</p>
      </div>

      {error && (
        <Alert variant="error" icon={false}>
          <div className="flex w-full items-center justify-between gap-2">
            {error}
            <button onClick={() => setError(null)} aria-label="Dismiss" className="text-destructive/60 hover:text-destructive"><X size={14} /></button>
          </div>
        </Alert>
      )}

      <AdminTable<PackingChecklist>
        title={`Checklists (${showCount})`}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by category…"
        rows={filtered}
        columns={columns}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyMessage={search ? "No checklists match your search." : "No checklists found."}
      />

      {formOpen && (
        <ChecklistForm checklist={editing} onClose={closeForm} onSaved={handleSaved} />
      )}
    </div>
  );
}
