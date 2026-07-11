import { Loader2 } from 'lucide-react';

export function Loader({ text = 'Loading...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 16 }}>
      <Loader2 size={32} color="#f97316" style={{ animation: 'spin 1s linear infinite' }} />
      <p style={{ color: '#94a3b8', fontSize: 14 }}>{text}</p>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function EmptyState({ title = 'Nothing here', subtitle = '', icon = '📭' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 12, textAlign: 'center' }}>
      <div style={{ fontSize: 48 }}>{icon}</div>
      <h3 style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 600 }}>{title}</h3>
      {subtitle && <p style={{ color: '#94a3b8', fontSize: 14, maxWidth: 300 }}>{subtitle}</p>}
    </div>
  );
}
