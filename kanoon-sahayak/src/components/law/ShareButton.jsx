import { useState } from 'react';
import { Copy, Check, MessageCircle, Eye, X, Send } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { shareLaw, whatsappShare, formatWhatsAppLawTemplate } from '../../utils/shareUtils';
import { ui } from '../../utils/translate';

export default function ShareButton({ law }) {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);
  const [templateCopied, setTemplateCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleShare = async () => {
    const result = await shareLaw(law, lang);
    if (result === 'copied') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    window.open(whatsappShare(law, lang), '_blank');
  };

  const handleCopyTemplate = async () => {
    const text = formatWhatsAppLawTemplate(law, lang);
    try {
      await navigator.clipboard.writeText(text);
      setTemplateCopied(true);
      setTimeout(() => setTemplateCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const templateText = formatWhatsAppLawTemplate(law, lang);

  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Primary WhatsApp Share CTA */}
        <button
          onClick={handleWhatsApp}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#25D366',
            border: 'none',
            color: '#ffffff',
            borderRadius: 10,
            padding: '9px 18px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(37, 211, 102, 0.25)',
            transition: 'transform 0.15s, opacity 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.92'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          <MessageCircle size={16} />
          {ui('share_whatsapp', lang)}
        </button>

        {/* Preview Template Modal Trigger */}
        <button
          onClick={() => setShowPreview(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            borderRadius: 10,
            padding: '9px 14px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'border-color 0.15s',
          }}
        >
          <Eye size={14} />
          {ui('share_template_preview', lang)}
        </button>

        {/* Standard Web Share / Copy Link */}
        <button
          onClick={handleShare}
          className="btn-ghost"
          style={{ padding: '9px 14px', fontSize: 12, fontWeight: 600 }}
        >
          {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
          {copied ? ui('copied', lang) : ui('copy_link', lang)}
        </button>
      </div>

      {/* WhatsApp Message Preview Modal */}
      {showPreview && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 20,
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 18,
            maxWidth: 480,
            width: '100%',
            padding: 24,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MessageCircle size={20} color="#25D366" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                  {ui('share_template_preview', lang)}
                </h3>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 4,
                }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
              {lang === 'hi'
                ? 'यह पूर्व-स्वरूपित संदेश आपके WhatsApp पर शेयर करने के लिए तैयार है:'
                : 'This pre-formatted card will be sent when you share on WhatsApp:'}
            </p>

            {/* Template Box */}
            <pre style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 16,
              fontSize: 12,
              lineHeight: 1.6,
              color: 'var(--text)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: 'inherit',
              margin: '0 0 18px',
            }}>
              {templateText}
            </pre>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={handleCopyTemplate}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  borderRadius: 10,
                  padding: '10px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {templateCopied ? <Check size={15} color="#4ade80" /> : <Copy size={15} />}
                {templateCopied ? ui('template_copied', lang) : ui('copy_template', lang)}
              </button>
              <button
                onClick={() => {
                  handleWhatsApp();
                  setShowPreview(false);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#25D366',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: 10,
                  padding: '10px 18px',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Send size={15} />
                {ui('send_whatsapp', lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
