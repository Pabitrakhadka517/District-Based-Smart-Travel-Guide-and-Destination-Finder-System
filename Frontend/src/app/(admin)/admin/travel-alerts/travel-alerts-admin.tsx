"use client";
import { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import type { TravelAlert } from "@/types";
import { AdminTable, type Column } from "@/components/dashboard/admin-table";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { apiGet, apiDelete } from "@/services/api-client";
import { TravelAlertForm } from "./travel-alert-form";

const LEVEL_VARIANT: Record<TravelAlert["level"], "default" | "secondary" | "accent"> = {
  Info: "default",
  Advisory: "secondary",
  Warning: "accent",
};

export function TravelAlertsAdmin() {
  const [rows, setRows] = useState<TravelAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<TravelAlert | null>(null);

  useEffect(() => {
    apiGet<TravelAlert[]>("/travel-alerts", true)
      .then(setRows)
      .catch(() => setError("Failed to load travel alerts. Please refresh."))
      .finally(() => setLoading(false));
  }, []);

  const openAdd = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (a: TravelAlert) => { setEditing(a); setFormOpen(true); };
  const closeForm = () => setFormOpen(false);
  const handleSaved = (saved: TravelAlert) => {
    setRows((prev) => {
      const exists = prev.some((a) => a.id === saved.id);
      return exists ? prev.map((a) => (a.id === saved.id ? saved : a)) : [saved, ...prev];
    });
    setFormOpen(false);
  };

  const handleDelete = async (alert: TravelAlert) => {
    setError(null);
    try {
      await apiDelete(`/travel-alerts/${alert.id}`);
      setRows((prev) => prev.filter((a) => a.id !== alert.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete travel alert");
    }
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((a) => a.text.toLowerCase().includes(q));
  }, [rows, search]);

  const columns: Column<TravelAlert>[] = [
    { key: "level", label: "Severity", render: (a) => <Badge variant={LEVEL_VARIANT[a.level]}>{a.level}</Badge> },
    { key: "text", label: "Message", render: (a) => <span className="line-clamp-2 text-sm">{a.text}</span> },
    { key: "districtId", label: "District", render: (a) => <span className="text-sm text-muted-foreground">{a.districtId ?? "Nationwide"}</span> },
    { key: "isActive", label: "Status", render: (a) => <Badge variant={a.isActive ? "success" : "outline"}>{a.isActive ? "Active" : "Inactive"}</Badge> },
  ];

  const showCount = filtered.length !== rows.length ? `${filtered.length} of ${rows.length}` : String(rows.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="h2 text-brand-600">Travel alert management</h1>
        <p className="lead mt-1">Publish advisories and warnings shown on the public weather page.</p>
      </div>

      {error && (
        <Alert variant="error" icon={false}>
          <div className="flex w-full items-center justify-between gap-2">
            {error}
            <button onClick={() => setError(null)} aria-label="Dismiss" className="text-destructive/60 hover:text-destructive"><X size={14} /></button>
          </div>
        </Alert>
      )}

      <AdminTable<TravelAlert>
        title={`Travel alerts (${showCount})`}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by message…"
        rows={loading ? [] : filtered}
        columns={columns}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyMessage={loading ? "Loading…" : search ? "No alerts match your search." : "No travel alerts found."}
      />

      {formOpen && (
        <TravelAlertForm alert={editing} onClose={closeForm} onSaved={handleSaved} />
      )}
    </div>
  );
}
