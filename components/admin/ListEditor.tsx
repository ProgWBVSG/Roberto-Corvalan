"use client";

import type { ReactNode } from "react";

export function ListEditor<T extends { id: string }>({
  items,
  onChange,
  newItem,
  renderItem,
  addLabel,
  minItems = 0,
  maxItems = 50,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
  addLabel: string;
  minItems?: number;
  maxItems?: number;
}) {
  function update(index: number, patch: Partial<T>) {
    onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  }
  function remove(index: number) {
    if (items.length <= minItems) return;
    onChange(items.filter((_, i) => i !== index));
  }
  function move(index: number, dir: -1 | 1) {
    const j = index + dir;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[index], copy[j]] = [copy[j], copy[index]];
    onChange(copy);
  }
  function add() {
    if (items.length >= maxItems) return;
    onChange([...items, newItem()]);
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={item.id}
          className="rounded-xl border border-[color:var(--navy-line)] bg-white/[0.02] p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-white/35">#{i + 1}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                aria-label="Subir"
                className="flex h-7 w-7 items-center justify-center rounded-md text-white/40 transition-colors hover:text-white disabled:opacity-20"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === items.length - 1}
                aria-label="Bajar"
                className="flex h-7 w-7 items-center justify-center rounded-md text-white/40 transition-colors hover:text-white disabled:opacity-20"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                disabled={items.length <= minItems}
                aria-label="Eliminar"
                className="flex h-7 w-7 items-center justify-center rounded-md text-white/40 transition-colors hover:text-[#e0a4a4] disabled:opacity-20"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="space-y-3">{renderItem(item, (patch) => update(i, patch))}</div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        disabled={items.length >= maxItems}
        className="w-full rounded-xl border border-dashed border-[color:var(--navy-line)] py-3 text-sm text-white/45 transition-colors hover:text-gold-2 hover:border-gold-2/40 disabled:opacity-30"
      >
        + {addLabel}
      </button>
    </div>
  );
}
