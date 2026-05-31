import { useState } from 'react';
import { Download, Trash2, Pencil, Check, X, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
}

function escapeCsv(value) {
  const cell = String(value ?? '');
  // Neutralize spreadsheet formula injection: a cell starting with =, +, -, @,
  // tab, or CR can be executed as a formula when opened in Excel/Sheets. Prefix
  // with a single quote so it's treated as literal text.
  const safe = /^[=+\-@\t\r]/.test(cell) ? `'${cell}` : cell;
  return `"${safe.replace(/"/g, '""')}"`;
}

function buildCsv(leads) {
  const headers = ['Name', 'Agency', 'Phone', 'Email', 'Location', 'Sales Rep', 'Captured At'];
  const rows = leads.map((l) => [
    l.name, l.agency, l.phone, l.email, l.location, l.agent, fmtDate(l.capturedAt),
  ]);
  return [headers, ...rows]
    .map((r) => r.map(escapeCsv).join(','))
    .join('\n');
}

function downloadCsv(leads) {
  const csv      = buildCsv(leads);
  const filename = `lehr-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  // data: URI works universally including localhost
  const uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  const a   = document.createElement('a');
  a.href     = uri;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function LeadsTab() {
  const leads      = useStore((s) => s.leads);
  const updateLead = useStore((s) => s.updateLead);
  const deleteLead = useStore((s) => s.deleteLead);
  const clearLeads = useStore((s) => s.clearLeads);

  const [editingId, setEditingId]   = useState(null);
  const [editFields, setEditFields] = useState({});
  const [confirmClear, setConfirmClear] = useState(false);

  function startEdit(lead) {
    setEditingId(lead.id);
    setEditFields({ name: lead.name, agency: lead.agency, phone: lead.phone, email: lead.email });
  }

  function saveEdit() {
    updateLead(editingId, editFields);
    setEditingId(null);
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <p className="text-3xl">📋</p>
        <p className="text-sm font-semibold text-[var(--text)]">No leads yet</p>
        <p className="text-xs text-[var(--text-muted)] text-center">Leads are captured automatically when someone fills out the lead-capture form.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-muted)]">
          {leads.length} lead{leads.length !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadCsv(leads)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer transition-colors text-xs font-semibold text-[var(--text)]"
            style={{ background: 'rgba(30,123,217,0.2)', border: '1px solid rgba(30,123,217,0.4)' }}
          >
            <Download size={12} /> Export CSV
          </button>
        </div>
      </div>

      {/* leads list */}
      <div className="flex flex-col gap-2">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="rounded-xl overflow-hidden"
            style={{ background: 'rgba(var(--ink),0.03)', border: '1px solid rgba(var(--ink),0.07)' }}
          >
            {editingId === lead.id ? (
              /* edit mode */
              <div className="p-3 flex flex-col gap-2">
                {[
                  { key: 'name',   label: 'Name' },
                  { key: 'agency', label: 'Agency' },
                  { key: 'phone',  label: 'Phone' },
                  { key: 'email',  label: 'Email' },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] w-12 flex-shrink-0">{label}</span>
                    <input
                      value={editFields[key] || ''}
                      onChange={(e) => setEditFields((f) => ({ ...f, [key]: e.target.value }))}
                      aria-label={label}
                      className="flex-1 px-2 py-1 rounded-lg text-xs text-[var(--text)] outline-none"
                      style={{ background: 'rgba(var(--ink),0.08)', border: '1px solid rgba(var(--ink),0.15)' }}
                    />
                  </div>
                ))}
                <div className="flex justify-end gap-2 mt-1">
                  <button
                    onClick={() => setEditingId(null)}
                    aria-label="Cancel edit"
                    className="px-3 py-1 rounded-lg text-xs text-[var(--text-dim)] cursor-pointer"
                    style={{ background: 'rgba(var(--ink),0.05)' }}
                  >
                    <X size={12} aria-hidden="true" />
                  </button>
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1 rounded-lg text-xs text-[var(--text)] cursor-pointer flex items-center gap-1"
                    style={{ background: 'rgba(30,123,217,0.3)', border: '1px solid rgba(30,123,217,0.4)' }}
                  >
                    <Check size={12} /> Save
                  </button>
                </div>
              </div>
            ) : (
              /* view mode */
              <div className="flex items-start justify-between p-3 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text)] leading-tight truncate">
                    {lead.name || <span className="text-[var(--text-muted)] italic">No name</span>}
                  </p>
                  <p className="text-[11px] text-[var(--text-dim)] mt-0.5 truncate">{lead.agency}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
                    {lead.phone && <span className="text-[10px] text-[var(--text-muted)]">{lead.phone}</span>}
                    {lead.email && <span className="text-[10px] text-[var(--text-muted)] truncate">{lead.email}</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[9px] text-[var(--text-muted)]">📍 {lead.location}</span>
                    <span className="text-[9px] text-[var(--text-muted)]">· 👤 {lead.agent}</span>
                    <span className="text-[9px] text-[var(--text-dim)]">· {fmtDate(lead.capturedAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => startEdit(lead)}
                    aria-label={`Edit lead${lead.name ? `: ${lead.name}` : ''}`}
                    className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                    style={{ background: 'rgba(var(--ink),0.06)' }}
                  >
                    <Pencil size={12} className="text-[var(--text-dim)]" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => deleteLead(lead.id)}
                    aria-label={`Delete lead${lead.name ? `: ${lead.name}` : ''}`}
                    className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                    style={{ background: 'rgba(227,38,54,0.1)' }}
                  >
                    <Trash2 size={12} className="text-[#E32636]" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* clear all */}
      {!confirmClear ? (
        <button
          onClick={() => setConfirmClear(true)}
          className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs text-[var(--text-muted)] cursor-pointer transition-colors mt-1"
          style={{ border: '1px solid rgba(var(--ink),0.05)' }}
        >
          <Trash2 size={11} /> Clear all leads
        </button>
      ) : (
        <div
          className="flex items-center justify-between px-4 py-3 rounded-xl"
          style={{ background: 'rgba(227,38,54,0.1)', border: '1px solid rgba(227,38,54,0.3)' }}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-[#E32636]" />
            <span className="text-xs text-[var(--text)]">Delete all {leads.length} leads?</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setConfirmClear(false)}
              className="px-3 py-1 rounded-lg text-xs text-[var(--text-dim)] cursor-pointer"
              style={{ background: 'rgba(var(--ink),0.07)' }}
            >
              Cancel
            </button>
            <button
              onClick={() => { clearLeads(); setConfirmClear(false); }}
              className="px-3 py-1 rounded-lg text-xs font-bold text-[var(--text)] cursor-pointer"
              style={{ background: '#E32636' }}
            >
              Delete All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
