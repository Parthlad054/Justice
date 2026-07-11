import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { t, ui } from '../../utils/translate';
import laws from '../../data/laws.json';

export default function LawOfTheDay() {
  const { lang } = useLang();
  const [law, setLaw] = useState(null);

  useEffect(() => {
    const idx = Math.floor(Date.now() / 86400000) % laws.laws.length;
    setLaw(laws.laws[idx]);
  }, []);

  if (!law) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(239,68,68,0.08) 50%, rgba(168,85,247,0.08) 100%)',
      border: '1px solid rgba(249,115,22,0.25)',
      borderRadius: 20, padding: '28px 28px 24px',
      position: 'relative', overflow: 'hidden',
      animation: 'fadeInUp 0.5s ease',
    }}>
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: '#f97316', opacity: 0.06, filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 120, height: 120, borderRadius: '50%', background: '#a855f7', opacity: 0.06, filter: 'blur(40px)' }} />

      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{
          background: 'linear-gradient(135deg, #f97316, #ef4444)',
          borderRadius: 8, padding: '4px 12px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Sparkles size={13} color="white" />
          <span style={{ color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em' }}>
            {ui('law_of_day', lang).toUpperCase()}
          </span>
        </div>
        <span style={{ fontSize: 11, color: '#64748b' }}>
          {new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>

      <h2 style={{ fontWeight: 800, fontSize: 22, color: '#e2e8f0', marginBottom: 10, lineHeight: 1.3, position: 'relative' }}>
        {t(law, 'title', lang)}
      </h2>

      <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginBottom: 20, position: 'relative' }}>
        {t(law, 'explanation', lang)}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
        <Link to={`/law/${law.id}`} className="btn-primary">
          {ui('view_details', lang)} <ArrowRight size={15} />
        </Link>
        <span className="act-badge">{law.act_section}</span>
      </div>
    </div>
  );
}
