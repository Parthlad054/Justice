import { ArrowDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { ui } from '../../utils/translate';

const CATEGORY_COLORS = {
  traffic: '#f97316',
  consumer: '#22c55e',
  police: '#3b82f6',
  'women-safety': '#ec4899',
  'cyber-crime': '#ef4444',
  employment: '#a855f7',
  'rent-property': '#14b8a6',
  'marriage-family': '#eab308',
};

export default function EscalationLadder({ law }) {
  const { lang } = useLang();
  const steps = lang === 'hi' && law.escalation_hi ? law.escalation_hi : law.escalation_en;
  const color = CATEGORY_COLORS[law.category] || '#f97316';

  if (!steps || steps.length === 0) return null;

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 16, padding: '20px 20px',
      marginBottom: 20,
      boxShadow: 'var(--card-shadow)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <AlertCircle size={18} color={color} />
        <h2 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', margin: 0 }}>
          {ui('escalation_ladder', lang)}
        </h2>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: '0 0 20px' }}>
        {ui('escalation_subtitle', lang)}
      </p>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          // Parse "Step N: text" or "चरण N: text"
          const colonIdx = step.indexOf(':');
          const prefix = colonIdx > -1 ? step.slice(0, colonIdx) : '';
          const text = colonIdx > -1 ? step.slice(colonIdx + 1).trim() : step;

          return (
            <div key={idx} style={{ display: 'flex', gap: 0 }}>
              {/* Connector column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 36, flexShrink: 0 }}>
                {/* Circle */}
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: isLast ? `${color}20` : 'var(--bg-subtle)',
                  border: `2px solid ${isLast ? color : 'var(--border-strong)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 13,
                  color: isLast ? color : 'var(--text-muted)',
                  zIndex: 1,
                }}>
                  {isLast ? <CheckCircle2 size={16} color={color} /> : idx + 1}
                </div>
                {/* Vertical line */}
                {!isLast && (
                  <div style={{
                    width: 2, flex: 1, minHeight: 24,
                    background: `linear-gradient(to bottom, var(--border-strong), ${color}40)`,
                    margin: '2px 0',
                  }} />
                )}
              </div>

              {/* Content */}
              <div style={{
                paddingLeft: 14, paddingBottom: isLast ? 0 : 20,
                flex: 1,
              }}>
                {prefix && (
                  <div style={{
                    fontSize: 10, fontWeight: 800, color,
                    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4,
                  }}>
                    {prefix}
                  </div>
                )}
                <p style={{
                  color: isLast ? 'var(--text)' : 'var(--text-muted)',
                  fontSize: 13, lineHeight: 1.6, margin: 0,
                  fontWeight: isLast ? 600 : 400,
                }}>
                  {text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
