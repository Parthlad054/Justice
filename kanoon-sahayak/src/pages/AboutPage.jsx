import { Phone } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import helplines from '../data/helplines.json';

export default function AboutPage() {
  const { lang } = useLang();

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>⚖️</div>
        <h1 className="gradient-text" style={{ fontWeight: 800, fontSize: 32, marginBottom: 14 }}>
          {lang === 'en' ? 'About Kanoon Sahayak' : 'कानून सहायक के बारे में'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
          {lang === 'en'
            ? 'A free, bilingual legal awareness platform helping everyday Indian citizens understand their rights — with zero jargon.'
            : 'एक निःशुल्क, द्विभाषी कानूनी जागरूकता मंच जो आम भारतीय नागरिकों को शून्य जटिल शब्दावली के साथ उनके अधिकार समझने में मदद करता है।'}
        </p>
      </div>

      {/* Mission */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 40 }}>
        {[
          { icon: '📖', title: lang === 'en' ? 'Know Your Rights' : 'अपने अधिकार जानें', desc: lang === 'en' ? 'Plain language explanations of laws that affect everyday life.' : 'रोजमर्रा की जिंदगी को प्रभावित करने वाले कानूनों की सरल भाषा में व्याख्या।' },
          { icon: '🚀', title: lang === 'en' ? 'Take Action' : 'कार्रवाई करें', desc: lang === 'en' ? 'Step-by-step guidance to file complaints through the right official channels.' : 'सही सरकारी चैनलों के माध्यम से शिकायत दर्ज करने के लिए चरण-दर-चरण मार्गदर्शन।' },
          { icon: '🛡️', title: lang === 'en' ? 'Stay Safe' : 'सुरक्षित रहें', desc: lang === 'en' ? 'Emergency helplines and legal aid resources always within reach.' : 'आपातकालीन हेल्पलाइन और कानूनी सहायता संसाधन हमेशा आपकी पहुंच में।' },
        ].map(card => (
          <div key={card.title} className="glass" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{card.icon}</div>
            <h3 style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontSize: 16 }}>{card.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6 }}>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="disclaimer-bar" style={{ marginBottom: 40, borderRadius: 14 }}>
        <span style={{ fontSize: 20 }}>⚠️</span>
        <div>
          <p style={{ fontWeight: 700, marginBottom: 6, fontSize: 14, color: '#d97706' }}>
            {lang === 'en' ? 'Important Disclaimer' : 'महत्वपूर्ण अस्वीकरण'}
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: '#b45309' }}>
            {lang === 'en'
              ? '"Kanoon Sahayak provides general legal information in simple language to help you understand your rights. It is not a substitute for professional legal advice. For serious legal matters, please consult a licensed lawyer or contact your nearest District Legal Services Authority (DLSA) for free legal aid."'
              : '"कानून सहायक आपके अधिकारों को समझने में मदद करने के लिए सरल भाषा में सामान्य कानूनी जानकारी प्रदान करता है। यह पेशेवर कानूनी सलाह का विकल्प नहीं है। गंभीर कानूनी मामलों के लिए, कृपया एक लाइसेंस प्राप्त वकील से परामर्श करें या मुफ्त कानूनी सहायता के लिए अपने निकटतम जिला कानूनी सेवा प्राधिकरण (DLSA) से संपर्क करें।"'}
          </p>
        </div>
      </div>

      {/* All helplines */}
      <h2 style={{ fontWeight: 700, color: 'var(--text)', fontSize: 20, marginBottom: 16 }}>
        {lang === 'en' ? '📞 All Emergency Helplines' : '📞 सभी आपातकालीन हेल्पलाइन'}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {helplines.helplines.map(h => (
          <a key={h.number} href={`tel:${h.number}`} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '14px 16px', textDecoration: 'none',
            transition: 'background 0.2s',
            boxShadow: 'var(--card-shadow)',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Phone size={14} color="#22c55e" />
              <span style={{ color: 'var(--text)', fontSize: 13, fontWeight: 600 }}>
                {lang === 'hi' ? h.name_hi : h.name_en}
              </span>
            </div>
            <span style={{ color: '#22c55e', fontWeight: 700, fontSize: 15 }}>{h.number}</span>
          </a>
        ))}
      </div>
    </main>
  );
}
