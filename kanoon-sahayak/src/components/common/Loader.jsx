import { Loader2 } from 'lucide-react';

export default function Loader({ text = 'Loading...', size = 32 }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '70px 24px',
      gap: 16,
      textAlign: 'center',
    }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          position: 'absolute',
          width: size * 1.6,
          height: size * 1.6,
          borderRadius: '50%',
          background: 'rgba(249,115,22,0.15)',
          filter: 'blur(12px)',
        }} />
        <Loader2 size={size} color="#f97316" style={{ animation: 'spin 1s linear infinite' }} />
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 500 }}>{text}</p>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
