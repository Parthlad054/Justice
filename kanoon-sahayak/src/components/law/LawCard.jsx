import { Link } from 'react-router-dom';
import { ArrowRight, Gavel } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { t, ui } from '../../utils/translate';
import categories from '../../data/categories.json';

const COLOR_MAP = {
  traffic: '#f97316', consumer: '#22c55e', police: '#3b82f6',
  'women-safety': '#ec4899', 'cyber-crime': '#ef4444', employment: '#a855f7',
  'rent-property': '#14b8a6', 'marriage-family': '#eab308',
};

export default function LawCard({ law, compact = false }) {
  const { lang } = useLang();
  const cat = categories.categories.find(c => c.id === law.category);
  const color = COLOR_MAP[law.category] || '#f97316';

  return (
    <div
      className="hover-lift"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16, padding: compact ? '16px' : '20px',
        display: 'flex', flexDirection: 'column', gap: 12,
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
        position: 'relative', overflow: 'hidden',
        boxShadow: 'var(--card-shadow)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}60`;
        e.currentTarget.style.background = 'var(--bg-card-hover)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.background = 'var(--bg-card)';
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        opacity: 0.8,
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1 }}>
          {cat && (
            <span className={`chip-${cat.color}`} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, display: 'inline-block', marginBottom: 8 }}>
              {t(cat, 'title', lang)}
            </span>
          )}
          <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', lineHeight: 1.3 }}>
            {t(law, 'title', lang)}
          </h3>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Gavel size={16} color={color} />
        </div>
      </div>

      {!compact && (
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          {t(law, 'explanation', lang).slice(0, 120)}…
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>
          {law.act_section.split('—')[0].trim()}
        </span>
        <Link
          to={`/law/${law.id}`}
          className="btn-primary"
          style={{ padding: '6px 14px', fontSize: 12, borderRadius: 8 }}
        >
          {ui('view_details', lang)} <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
