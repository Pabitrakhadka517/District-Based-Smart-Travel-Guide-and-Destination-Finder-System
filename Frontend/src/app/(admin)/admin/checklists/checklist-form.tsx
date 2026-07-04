"use client";
import { useState } from "react";
import type { PackingChecklist, Category } from "@/types";
import { EntityFormModal } from "@/components/dashboard/entity-form-modal";
import { Field } from "@/components/dashboard/form-fields";
import { Textarea } from "@/components/ui/textarea";
import { adminEntityService } from "@/services/adminEntityService";

const CATEGORIES: Category[] = [
  "Trekking", "Heritage", "Nature", "Religious", "Wildlife", "Adventure", "Cultural", "Lake", "City",
];

interface ChecklistFormProps {
  checklist: PackingChecklist | null;
  onClose: () => void;
  onSaved: (checklist: PackingChecklist) => void;
}

export function ChecklistForm({ checklist, onClose, onSaved }: ChecklistFormProps) {
  const isEdit = !!checklist;
  const [category, setCategory] = useState<string>(checklist?.category ?? CATEGORIES[0]);
  const [itemsText, setItemsText] = useState((checklist?.items ?? []).join("\n"));

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const items = itemsText.split("\n").map((s) => s.trim()).filter(Boolean);
    if (items.length === 0) {
      setError("Add at least one packing item.");
      return;
    }
    setSubmitting(true);
    try {
      const body = { category, items };
      const saved = isEdit
        ? await adminEntityService.update<PackingChecklist>("checklists", checklist!.id, body)
        : await adminEntityService.create<PackingChecklist>("checklists", body);
      onSaved(saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save checklist");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <EntityFormModal
      title={isEdit ? `Edit ${checklist!.category} checklist` : "Add checklist"}
      onClose={onClose}
      onSubmit={submit}
      submitting={submitting}
      error={error}
    >
      <Field label="Category" required>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isEdit}
          className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>

      <Field label="Packing items" required>
        <Textarea
          value={itemsText}
          onChange={(e) => setItemsText(e.target.value)}
          rows={8}
          placeholder={"One item per line, e.g.\nSturdy trekking boots\nTrekking poles"}
        />
      </Field>
    </EntityFormModal>
  );
}
