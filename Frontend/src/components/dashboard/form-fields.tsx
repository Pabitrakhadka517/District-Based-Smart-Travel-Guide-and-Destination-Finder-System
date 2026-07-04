"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { District } from "@/types";

interface FieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}

export function Field({ label, children, required }: FieldProps) {
  return (
    <div>
      <Label className="mb-1 block text-xs">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}

/** Comma-separated text input bound to a string[] value. */
export function TagsInput({
  value, onChange, placeholder,
}: {
  value: string[]; onChange: (tags: string[]) => void; placeholder?: string;
}) {
  return (
    <Input
      defaultValue={value.join(", ")}
      onBlur={(e) =>
        onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))
      }
      placeholder={placeholder ?? "Comma-separated"}
    />
  );
}

/** Single-select district dropdown, grouped by province. Pass `allowNone` for optional (nullable) relations. */
export function DistrictSelect({
  value, onChange, districts, allowNone,
}: {
  value: string; onChange: (districtId: string) => void; districts: District[]; allowNone?: boolean;
}) {
  const byProvince = new Map<string, District[]>();
  for (const d of districts) {
    const list = byProvince.get(d.province) ?? [];
    list.push(d);
    byProvince.set(d.province, list);
  }
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <option value="">{allowNone ? "None (not location-specific)" : "Select a district…"}</option>
      {[...byProvince.entries()].map(([province, list]) => (
        <optgroup key={province} label={province}>
          {list.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </optgroup>
      ))}
    </select>
  );
}

/** Multi-select district list, grouped by province — for entities spanning multiple districts (e.g. treks). */
export function DistrictMultiSelect({
  value, onChange, districts,
}: {
  value: string[]; onChange: (districtIds: string[]) => void; districts: District[];
}) {
  const byProvince = new Map<string, District[]>();
  for (const d of districts) {
    const list = byProvince.get(d.province) ?? [];
    list.push(d);
    byProvince.set(d.province, list);
  }
  return (
    <select
      multiple
      value={value}
      onChange={(e) => onChange([...e.target.selectedOptions].map((o) => o.value))}
      size={6}
      className="w-full rounded-xl border border-border bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {[...byProvince.entries()].map(([province, list]) => (
        <optgroup key={province} label={province}>
          {list.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </optgroup>
      ))}
    </select>
  );
}

/** Lat/lng pair editor. */
export function CoordinatesFields({
  value, onChange,
}: {
  value: { lat: number; lng: number };
  onChange: (coords: { lat: number; lng: number }) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Field label="Latitude" required>
        <Input
          type="number" step="any"
          value={value.lat}
          onChange={(e) => onChange({ ...value, lat: Number(e.target.value) })}
        />
      </Field>
      <Field label="Longitude" required>
        <Input
          type="number" step="any"
          value={value.lng}
          onChange={(e) => onChange({ ...value, lng: Number(e.target.value) })}
        />
      </Field>
    </div>
  );
}
