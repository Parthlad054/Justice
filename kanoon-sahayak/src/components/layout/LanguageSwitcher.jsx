import { useLang } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ variant = 'segmented' }) {
  const { lang, setLang } = useLang();

  if (variant === 'button') {
    return (
      <button
        onClick={() => setLang(prev => (prev === 'en' ? 'hi' : 'en'))}
        aria-label="Toggle language between English and Hindi"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8,
          padding: '6px 12px',
          color: '#e2e8f0',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 600,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
          e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
        }}
      >
        <Globe size={15} color="#f97316" />
        <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Select Language / भाषा चुनें"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        borderRadius: 999,
        padding: 3,
        gap: 2,
      }}
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        style={{
          background: lang === 'en' ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'transparent',
          color: lang === 'en' ? '#ffffff' : 'var(--text-muted)',
          border: 'none',
          borderRadius: 999,
          padding: '4px 11px',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: lang === 'en' ? '0 2px 8px rgba(249,115,22,0.35)' : 'none',
        }}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('hi')}
        style={{
          background: lang === 'hi' ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'transparent',
          color: lang === 'hi' ? '#ffffff' : 'var(--text-muted)',
          border: 'none',
          borderRadius: 999,
          padding: '4px 11px',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: lang === 'hi' ? '0 2px 8px rgba(249,115,22,0.35)' : 'none',
        }}
      >
        हिंदी
      </button>
    </div>
  );
}
