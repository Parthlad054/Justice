import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { t, ui } from '../../utils/translate';
import categories from '../../data/categories.json';

const COLOR_MAP = {
  orange: '#f97316', green: '#22c55e', blue: '#3b82f6',
  pink: '#ec4899', red: '#ef4444', purple: '#a855f7',
  teal: '#14b8a6', yellow: '#eab308',
};

export default function CategoryCard({ category }) {
  const { lang } = useLang();
  const color = COLOR_MAP[category.color] || '#f97316';

  return (
    <Link
      to={`/category/${category.id}`}
      className="hover-lift"
      style={{
        display: 'block', textDecoration: 'none',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16, padding: '20px 20px 16px',
        transition: 'border-color 0.2s, background 0.2s',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}50`;
        e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      }}
    >
      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: -20, right: -20, width: 80, height: 80,
        borderRadius: '50%', background: color, opacity: 0.08, filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: 44, height: 44, borderRadius: 12, marginBottom: 14,
        background: `${color}18`, border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22,
      }}>
        {getCategoryEmoji(category.id)}
      </div>

      <h3 style={{ fontWeight: 700, fontSize: 15, color: '#e2e8f0', marginBottom: 6, lineHeight: 1.3 }}>
        {t(category, 'title', lang)}
      </h3>
      <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, marginBottom: 14 }}>
        {t(category, 'description', lang)}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color, fontSize: 12, fontWeight: 600 }}>
        {lang === 'en' ? 'Explore' : 'देखें'} <ArrowRight size={14} />
      </div>
    </Link>
  );
}

function getCategoryEmoji(id) {
  const map = {
    'traffic': '🚦',
    'consumer': '🛒',
    'police': '🛡️',
    'women-safety': '👩‍⚖️',
    'cyber-crime': '💻',
    'employment': '💼',
    'rent-property': '🏠',
    'marriage-family': '👨‍👩‍👧',
  };
  return map[id] || '📋';
}
