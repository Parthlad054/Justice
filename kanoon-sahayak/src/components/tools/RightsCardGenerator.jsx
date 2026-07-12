import { useState } from 'react';
import { Award, Share2, Copy, Check, Printer, ShieldCheck, AlertCircle } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import lawsData from '../../data/laws.json';

export default function RightsCardGenerator({ onClose }) {
  const { lang } = useLang();
  const [selectedLawId, setSelectedLawId] = useState(lawsData.laws[0]?.id || 'traffic-001');
  const [copied, setCopied] = useState(false);
  const [cardLang, setCardLang] = useState(lang);

  const selectedLaw = lawsData.laws.find(l => l.id === selectedLawId) || lawsData.laws[0];

  const handleCopy = () => {
    const title = cardLang === 'hi' ? selectedLaw.title_hi : selectedLaw.title_en;
    const explanation = cardLang === 'hi' ? selectedLaw.explanation_hi : selectedLaw.explanation_en;
    const act = selectedLaw.act_section;
    const rights = selectedLaw.key_rights.map((r, i) => `${i + 1}. ${r}`).join('\n');

    const text = `⚖️ KANOON SAHAYAK — CITIZEN RIGHTS CARD\n\n` +
      `📌 SITUATION: ${title}\n` +
      `📜 LEGAL ACT & SECTION: ${act}\n\n` +
      `🛡️ MY LEGAL RIGHTS:\n${rights}\n\n` +
      `ℹ️ SUMMARY: ${explanation}\n\n` +
      `--- Know Your Rights • LawEasy India ---`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const title = cardLang === 'hi' ? selectedLaw.title_hi : selectedLaw.title_en;
    const act = selectedLaw.act_section;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Rights Card: ${title}`,
          text: `Know Your Rights under ${act}\nShared via Kanoon Sahayak`,
          url: window.location.href,
        });
      } catch (err) {
        // user cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Header Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {lang === 'hi' ? 'कानूनी स्थिति चुनें' : 'Select Situation / Violation'}
          </label>
          <select
            value={selectedLawId}
            onChange={e => setSelectedLawId(e.target.value)}
            style={{
              background: 'var(--bg-card)',
              color: 'var(--text)',
              border: '1px solid var(--border-strong)',
              borderRadius: 12,
              padding: '10px 14px',
              fontSize: 14,
              fontWeight: 600,
              minWidth: 260,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {lawsData.laws.map(law => (
              <option key={law.id} value={law.id}>
                {lang === 'hi' ? law.title_hi : law.title_en}
              </option>
            ))}
          </select>
        </div>

        {/* Card Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-subtle)', padding: 4, borderRadius: 12, border: '1px solid var(--border)' }}>
          <button
            onClick={() => setCardLang('en')}
            style={{
              background: cardLang === 'en' ? 'var(--accent)' : 'transparent',
              color: cardLang === 'en' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              borderRadius: 8,
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            English Card
          </button>
          <button
            onClick={() => setCardLang('hi')}
            style={{
              background: cardLang === 'hi' ? 'var(--accent)' : 'transparent',
              color: cardLang === 'hi' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              borderRadius: 8,
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            हिंदी कार्ड
          </button>
        </div>
      </div>

      {/* Official Shareable Rights Card Display */}
      <div
        id="rights-card-print-area"
        style={{
          background: 'linear-gradient(145deg, var(--bg-card), var(--bg-subtle))',
          border: '2px solid #f97316',
          borderRadius: 24,
          padding: 28,
          position: 'relative',
          boxShadow: '0 12px 32px rgba(249, 115, 22, 0.12)',
          overflow: 'hidden',
        }}
      >
        {/* Top Watermark Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
          paddingBottom: 16,
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#f97316', letterSpacing: 1, textTransform: 'uppercase' }}>
                CITIZEN LEGAL ASSERTION CARD
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Kanoon Sahayak — Know Your Rights
              </div>
            </div>
          </div>

          <span style={{
            fontSize: 11,
            fontWeight: 700,
            background: 'rgba(249,115,22,0.15)',
            color: '#f97316',
            padding: '4px 10px',
            borderRadius: 999,
          }}>
            OFFICIAL REFERENCE
          </span>
        </div>

        {/* Situation Title */}
        <h3 style={{
          fontSize: 22,
          fontWeight: 800,
          color: 'var(--text)',
          margin: '0 0 10px',
          lineHeight: 1.3,
        }}>
          {cardLang === 'hi' ? selectedLaw.title_hi : selectedLaw.title_en}
        </h3>

        {/* Act / Section Highlight Box */}
        <div style={{
          background: 'rgba(249,115,22,0.12)',
          borderLeft: '4px solid #f97316',
          padding: '10px 14px',
          borderRadius: '0 10px 10px 0',
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ea580c', textTransform: 'uppercase', marginBottom: 2 }}>
            {cardLang === 'hi' ? 'लागू अधिनियम एवं धारा' : 'APPLICABLE LAW & SECTION'}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
            {selectedLaw.act_section}
          </div>
        </div>

        {/* Key Rights List */}
        <div style={{ marginBottom: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, margin: '0 0 12px' }}>
            {cardLang === 'hi' ? 'मेरे कानूनी अधिकार (My Legal Rights)' : 'KEY LEGAL RIGHTS FOR CITIZENS'}
          </h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {selectedLaw.key_rights.map((right, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}>
                <span style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: '#22c55e',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 800,
                  flexShrink: 0,
                  marginTop: 1,
                }}>
                  ✓
                </span>
                <span>{right}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Official Penalty / Rule Note */}
        {selectedLaw.penalty && (
          <div style={{
            fontSize: 13,
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '10px 14px',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <AlertCircle size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
            <span>
              <strong style={{ color: 'var(--text)' }}>
                {cardLang === 'hi' ? 'निर्धारित प्रावधान/दंड: ' : 'Official Penalty / Provision: '}
              </strong>
              {selectedLaw.penalty}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Actions Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'flex-end' }}>
        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 12,
            background: copied ? '#22c55e' : 'var(--bg-subtle)',
            color: copied ? '#ffffff' : 'var(--text)',
            border: '1px solid var(--border-strong)',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>
            {copied
              ? (lang === 'hi' ? 'कार्ड कॉपी हो गया!' : 'Card Copied!')
              : (lang === 'hi' ? 'टेक्स्ट कॉपी करें' : 'Copy Card Text')}
          </span>
        </button>

        <button
          onClick={handlePrint}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 12,
            background: 'var(--bg-subtle)',
            color: 'var(--text)',
            border: '1px solid var(--border-strong)',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Printer size={16} />
          <span>{lang === 'hi' ? 'प्रिंट / PDF डाउनलोड' : 'Print / Save PDF'}</span>
        </button>

        <button
          onClick={handleShare}
          className="btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 22px',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
          }}
        >
          <Share2 size={16} />
          <span>{lang === 'hi' ? 'कार्ड शेयर करें' : 'Share Card'}</span>
        </button>
      </div>
    </div>
  );
}
