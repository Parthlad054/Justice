import { useLang } from '../../context/LanguageContext';

export default function StepsList({ steps, stepsHi }) {
  const { lang } = useLang();
  const list = lang === 'hi' && stepsHi ? stepsHi : steps;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {list.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div className="step-number">{i + 1}</div>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.6 }}>{step}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
