"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAppStore } from "@/store";
import type { Decision } from "@/store";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";

const STATUS_COLORS: Record<Decision["status"], string> = {
  proposed: "var(--lunar-text-muted)",
  under_review: "var(--lunar-amber)",
  approved: "var(--lunar-green)",
  rejected: "var(--lunar-red)",
  deferred: "var(--lunar-violet)",
  superseded: "var(--lunar-text-muted)",
};

const EMPTY_DECISION: Omit<Decision, "id"> = {
  text: "",
  status: "proposed",
  owner: "",
  date: new Date().toISOString().slice(0, 10),
  rationale: "",
  evidence: "",
};

export default function DecisionsPage() {
  const { decisions, addDecision, updateDecision, removeDecision } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Decision, "id">>(EMPTY_DECISION);
  const t = useTranslations("decisions");

  const handleSubmit = () => {
    if (!form.text.trim()) return;
    if (editId) {
      updateDecision(editId, form);
      setEditId(null);
    } else {
      addDecision(form);
    }
    setForm(EMPTY_DECISION);
    setShowForm(false);
  };

  const handleEdit = (d: Decision) => {
    setForm({ text: d.text, status: d.status, owner: d.owner, date: d.date, rationale: d.rationale, evidence: d.evidence });
    setEditId(d.id);
    setShowForm(true);
  };

  const statusLabels: Record<Decision["status"], string> = {
    proposed: t("status.proposed"),
    under_review: t("status.underReview"),
    approved: t("status.approved"),
    rejected: t("status.rejected"),
    deferred: t("status.deferred"),
    superseded: t("status.superseded"),
  };

  return (
    <div className="space-y-6 max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
            {t("title")}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
            {t("subtitle")}
          </p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_DECISION); }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
          style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--lunar-cyan)" }}
          aria-label="Add new decision"
        >
          <Plus size={14} aria-hidden="true" />
          {t("addDecision")}
        </button>
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div className="lunar-card" style={{ border: "1px solid rgba(0,212,255,0.2)" }}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
            {editId ? t("editDecision") : t("newDecision")}
          </h2>
          <div className="space-y-3">
            <div>
              <label className="stat-label mb-1 block">{t("decisionLabel")} *</label>
              <textarea
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 rounded-lg text-sm resize-none"
                style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)", color: "var(--lunar-text-primary)" }}
                aria-label={t("decisionLabel")}
                aria-required="true"
                placeholder={t("decisionPlaceholder")}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="stat-label mb-1 block">{t("statusLabel")}</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Decision["status"] })}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)", color: "var(--lunar-text-primary)" }}
                >
                  {(["proposed", "under_review", "approved", "rejected", "deferred", "superseded"] as const).map((s) => (
                    <option key={s} value={s}>{statusLabels[s]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="stat-label mb-1 block">{t("ownerLabel")}</label>
                <input
                  type="text"
                  value={form.owner}
                  onChange={(e) => setForm({ ...form, owner: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)", color: "var(--lunar-text-primary)" }}
                  placeholder={t("ownerPlaceholder")}
                  aria-label={t("ownerLabel")}
                />
              </div>
            </div>
            <div>
              <label className="stat-label mb-1 block">{t("rationaleLabel")}</label>
              <textarea
                value={form.rationale}
                onChange={(e) => setForm({ ...form, rationale: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 rounded-lg text-sm resize-none"
                style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)", color: "var(--lunar-text-primary)" }}
                aria-label={t("rationaleLabel")}
                placeholder={t("rationalePlaceholder")}
              />
            </div>
            <div>
              <label className="stat-label mb-1 block">{t("evidenceLabel")}</label>
              <input
                type="text"
                value={form.evidence}
                onChange={(e) => setForm({ ...form, evidence: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)", color: "var(--lunar-text-primary)" }}
                placeholder={t("evidencePlaceholder")}
                aria-label={t("evidenceLabel")}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
                style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "var(--lunar-green)" }}
              >
                <Check size={14} aria-hidden="true" />
                {editId ? t("update") : t("saveDecision")}
              </button>
              <button
                onClick={() => { setShowForm(false); setEditId(null); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
                style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)", color: "var(--lunar-text-muted)" }}
              >
                <X size={14} aria-hidden="true" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decision list */}
      {decisions.length === 0 && !showForm ? (
        <div className="text-center py-16" style={{ color: "var(--lunar-text-muted)" }}>
          <div className="text-4xl mb-3" aria-hidden="true">📋</div>
          <div className="text-sm">{t("emptyState")}</div>
        </div>
      ) : (
        <div className="space-y-3">
          {decisions.map((d) => (
            <div
              key={d.id}
              className="lunar-card"
              style={{ borderLeft: `3px solid ${STATUS_COLORS[d.status]}` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full capitalize"
                      style={{ background: `${STATUS_COLORS[d.status]}15`, color: STATUS_COLORS[d.status] }}
                    >
                      {statusLabels[d.status]}
                    </span>
                    {d.date && (
                      <span className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>{d.date}</span>
                    )}
                    {d.owner && (
                      <span className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>{t("ownerPrefix")}: {d.owner}</span>
                    )}
                  </div>
                  <div className="text-sm font-medium" style={{ color: "var(--lunar-text-primary)" }}>
                    {d.text}
                  </div>
                  {d.rationale && (
                    <div className="text-xs mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
                      <span style={{ color: "var(--lunar-text-muted)" }}>{t("rationalePrefix")}:</span> {d.rationale}
                    </div>
                  )}
                  {d.evidence && (
                    <div className="text-xs mt-1" style={{ color: "var(--lunar-cyan)" }}>
                      {t("evidencePrefix")}: {d.evidence}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <select
                    value={d.status}
                    onChange={(e) => updateDecision(d.id, { status: e.target.value as Decision["status"] })}
                    className="text-xs px-2 py-1 rounded"
                    style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)", color: "var(--lunar-text-primary)" }}
                    aria-label={`Status for decision: ${d.text.slice(0, 20)}`}
                  >
                    {(["proposed", "under_review", "approved", "rejected", "deferred", "superseded"] as const).map((s) => (
                      <option key={s} value={s}>{statusLabels[s]}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleEdit(d)}
                    className="p-1.5 rounded hover:bg-white/5"
                    style={{ color: "var(--lunar-text-muted)" }}
                    aria-label="Edit decision"
                  >
                    <Edit2 size={13} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => removeDecision(d.id)}
                    className="p-1.5 rounded hover:bg-white/5"
                    style={{ color: "var(--lunar-red)" }}
                    aria-label="Delete decision"
                  >
                    <Trash2 size={13} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
