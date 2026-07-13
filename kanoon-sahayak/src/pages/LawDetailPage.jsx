import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Scale, CheckCircle2, Gavel, TriangleAlert } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t, ui } from '../utils/translate';
import StepsList from '../components/law/StepsList';
import ShareButton from '../components/law/ShareButton';
import EscalationLadder from '../components/law/EscalationLadder';
import { EmptyState } from '../components/common/Common';
import laws from '../data/laws.json';
import categories from '../data/categories.json';

const COLOR_MAP = {
  traffic: '#f97316', consumer: '#22c55e', police: '#3b82f6',
  'women-safety': '#ec4899', 'cyber-crime': '#ef4444', employment: '#a855f7',
  'rent-property': '#14b8a6', 'marriage-family': '#eab308',
};

export default function LawDetailPage() {
  const { id } = useParams();
  const { lang } = useLang();
  const law = laws.laws.find(l => l.id === id);
  const cat = law ? categories.categories.find(c => c.id === law.category) : null;

  if (!law) return <EmptyState title="Law not found" icon="🔍" />;

  const color = COLOR_MAP[law.category] || '#f97316';
  const rights = lang === 'hi' && law.key_rights_hi ? law.key_rights_hi : law.key_rights;

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Back */}
      <Link
        to={`/category/${law.category}`}
        className="btn-ghost"
        style={{ padding: '8px 16px', fontSize: 13, display: 'inline-flex', marginBottom: 28 }}
      >
        <ArrowLeft size={15} /> {ui('back', lang)}
      </Link>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${color}10, transparent)`,
        border: `1px solid ${color}25`, borderRadius: 20,
        padding: '28px 28px 24px', marginBottom: 24,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: color, opacity: 0.07, filter: 'blur(30px)' }} />

        {cat && (
          <span className={`chip-${cat.color}`} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, display: 'inline-block', marginBottom: 12 }}>
            {t(cat, 'title', lang)}
          </span>
        )}

        <h1 style={{ fontWeight: 800, fontSize: 'clamp(20px, 4vw, 28px)', color: 'var(--text)', marginBottom: 16, lineHeight: 1.3 }}>
          {t(law, 'title', lang)}
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.8 }}>
          {t(law, 'explanation', lang)}
        </p>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 24 }}>
        {law.tags.map(tag => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>

      {/* Key Rights */}
      <Section title={ui('key_rights', lang)} icon={<CheckCircle2 size={18} color="#22c55e" />} style={{ marginBottom: 20 }}>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rights.map((right, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 3 }} />
              <span style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.6 }}>{right}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* What to do */}
      <Section title={ui('what_to_do', lang)} icon={<Scale size={18} color="#f97316" />} style={{ marginBottom: 20 }}>
        <StepsList steps={law.what_to_do} stepsHi={law.what_to_do_hi} />
      </Section>

      {/* Escalation Ladder */}
      <EscalationLadder law={law} />

      {/* Act/Penalty */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Gavel size={16} color="#3b82f6" />
            <span style={{ color: '#3b82f6', fontWeight: 700, fontSize: 13 }}>{ui('act_section', lang)}</span>
          </div>
          <p style={{ color: 'var(--text)', fontSize: 13, lineHeight: 1.5 }}>{law.act_section}</p>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <TriangleAlert size={16} color="#ef4444" />
            <span style={{ color: '#ef4444', fontWeight: 700, fontSize: 13 }}>{ui('penalty', lang)}</span>
          </div>
          <p style={{ color: 'var(--text)', fontSize: 13, lineHeight: 1.5 }}>{law.penalty}</p>
        </div>
      </div>

      {/* Share */}
      <Section title={ui('share', lang)} icon={null}>
        <ShareButton law={law} />
      </Section>

      {/* Disclaimer */}
      <div className="disclaimer-bar" style={{ marginTop: 28 }}>
        <span>⚠️</span>
        <span style={{ fontSize: 12 }}>{ui('disclaimer', lang)}</span>
      </div>
    </main>
  );
}

function Section({ title, icon, children, style = {} }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 16, padding: '20px 20px', marginBottom: 20,
      boxShadow: 'var(--card-shadow)',
      ...style,
    }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          {icon}
          <h2 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}
