import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t } from '../utils/translate';
import faqs from '../data/faqs.json';

export default function FAQPage() {
  const { lang } = useLang();
  const [open, setOpen] = useState(null);

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
      <div style={{ marginBottom: 36, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>❓</div>
        <h1 style={{ fontWeight: 800, fontSize: 28, color: '#e2e8f0', marginBottom: 8 }}>
          {lang === 'en' ? 'Frequently Asked Questions' : 'सामान्य प्रश्न'}
        </h1>
        <p style={{ color: '#64748b', fontSize: 15 }}>
          {lang === 'en'
            ? 'Common questions about your legal rights in India.'
            : 'भारत में आपके कानूनी अधिकारों के बारे में सामान्य प्रश्न।'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {faqs.faqs.map((faq, i) => (
          <div
            key={faq.id}
            style={{
              background: open === i ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
              border: open === i ? '1px solid rgba(249,115,22,0.3)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, overflow: 'hidden',
              transition: 'border-color 0.2s, background 0.2s',
            }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', background: 'none', border: 'none',
                padding: '18px 20px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <HelpCircle size={18} color={open === i ? '#f97316' : '#64748b'} style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14, lineHeight: 1.4 }}>
                  {lang === 'hi' ? faq.question_hi : faq.question_en}
                </span>
              </div>
              {open === i ? <ChevronUp size={18} color="#f97316" style={{ flexShrink: 0 }} /> : <ChevronDown size={18} color="#64748b" style={{ flexShrink: 0 }} />}
            </button>

            {open === i && (
              <div style={{ padding: '0 20px 20px 50px' }}>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
                  {lang === 'hi' ? faq.answer_hi : faq.answer_en}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
