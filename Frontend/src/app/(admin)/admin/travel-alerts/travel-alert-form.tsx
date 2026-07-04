"use client";
import { useState } from "react";
import type { TravelAlert } from "@/types";
import { EntityFormModal } from "@/components/dashboard/entity-form-modal";
import { Field, DistrictSelect } from "@/components/dashboard/form-fields";
import { Textarea } from "@/components/ui/textarea";
import { adminEntityService } from "@/services/adminEntityService";
import { useDistricts } from "@/hooks/use-content";

const LEVELS: TravelAlert["level"][] = ["Info", "Advisory", "Warning"];

interface TravelAlertFormProps {
  alert: TravelAlert | null;
  onClose: () => void;
  onSaved: (alert: TravelAlert) => void;
}

export function TravelAlertForm({ alert, onClose, onSaved }: TravelAlertFormProps) {
  const isEdit = !!alert;
  const { data: districts = [] } = useDistricts();
  const [level, setLevel] = useState<TravelAlert["level"]>(alert?.level ?? "Info");
  const [text, setText] = useState(alert?.text ?? "");
  const [districtId, setDistrictId] = useState(alert?.districtId ?? "");
  const [isActive, setIsActive] = useState(alert?.isActive ?? true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!text.trim()) {
      setError("Alert text is required.");
      return;
    }
    setSubmitting(true);
    try {
      const body = { level, text: text.trim(), districtId: districtId || undefined, isActive };
      const saved = isEdit
        ? await adminEntityService.update<TravelAlert>("travel-alerts", alert!.id, body)
        : await adminEntityService.create<TravelAlert>("travel-alerts", body);
      onSaved(saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save travel alert");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <EntityFormModal
      title={isEdit ? "Edit travel alert" : "Add travel alert"}
      onClose={onClose}
      onSubmit={submit}
      submitting={submitting}
      error={error}
    >
      <Field label="Severity" required>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as TravelAlert["level"])}
          className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </Field>

      <Field label="Message" required>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="e.g. Monsoon landslides can disrupt highland roads from June to August." />
      </Field>

      <Field label="District">
        <DistrictSelect value={districtId} onChange={setDistrictId} districts={districts} allowNone />
      </Field>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="accent-secondary"
        />
        Active (shown on the public weather page)
      </label>
    </EntityFormModal>
  );
}
