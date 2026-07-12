import { useState } from 'react';
import { Copy, Check, MessageCircle } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { shareLaw, whatsappShare } from '../../utils/shareUtils';
import { ui } from '../../utils/translate';

export default function ShareButton({ law }) {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

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

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button onClick={handleShare} className="btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }}>
        {copied ? <Check size={15} color="#4ade80" /> : <Copy size={15} />}
        {copied ? ui('copied', lang) : ui('copy_link', lang)}
      </button>
      <button onClick={handleWhatsApp} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)',
        color: '#25d366', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 500,
        cursor: 'pointer', transition: 'background 0.2s',
      }}>
        <MessageCircle size={15} />
        WhatsApp
      </button>
    </div>
  );
}
