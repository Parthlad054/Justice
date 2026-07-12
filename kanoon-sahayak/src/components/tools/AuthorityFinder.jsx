import { useState } from 'react';
import { Shield, ShoppingCart, Briefcase, HeartHandshake, ShieldAlert, ExternalLink, PhoneCall, Search, MapPin } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

const AUTHORITIES = [
  {
    id: 'police',
    category: 'Police & FIR',
    title_en: 'Emergency Police / Citizen Portal',
    title_hi: 'आपातकालीन पुलिस / नागरिक पोर्टल',
    helpline: '112',
    portal: 'https://digitalpolice.gov.in',
    desc_en: 'File e-FIR for lost property, check FIR status, or locate your nearest police station.',
    desc_hi: 'खोए हुए सामान के लिए ई-एफआईआर दर्ज करें, एफआईआर की स्थिति जांचें या नजदीकी पुलिस स्टेशन खोजें।',
    color: '#3b82f6',
    icon: Shield,
  },
  {
    id: 'consumer',
    category: 'Consumer Forum',
    title_en: 'National Consumer Helpline & e-Daakhil',
    title_hi: 'राष्ट्रीय उपभोक्ता हेल्पलाइन एवं ई-दाखिल',
    helpline: '1915',
    portal: 'https://consumerhelpline.gov.in',
    desc_en: 'File online consumer grievances against defective products, e-commerce fraud, or refund refusal.',
    desc_hi: 'खराब उत्पादों, ई-कॉमर्स धोखाधड़ी या रिफंड से इनकार के खिलाफ ऑनलाइन शिकायत दर्ज करें।',
    color: '#22c55e',
    icon: ShoppingCart,
  },
  {
    id: 'cyber',
    category: 'Cyber Crime',
    title_en: 'National Cyber Crime Reporting Portal',
    title_hi: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल',
    helpline: '1930',
    portal: 'https://cybercrime.gov.in',
    desc_en: 'Report financial fraud, UPI scams, social media harassment, or phishing attacks immediately.',
    desc_hi: 'वित्तीय धोखाधड़ी, यूपीआई घोटाले, सोशल मीडिया उत्पीड़न या फिशिंग हमलों की तुरंत रिपोर्ट करें।',
    color: '#ef4444',
    icon: ShieldAlert,
  },
  {
    id: 'nalsa',
    category: 'Free Legal Aid',
    title_en: 'National Legal Services Authority (NALSA / DLSA)',
    title_hi: 'राष्ट्रीय कानूनी सेवा प्राधिकरण (NALSA / मुफ्त कानूनी सहायता)',
    helpline: '15100',
    portal: 'https://nalsa.gov.in',
    desc_en: 'Get free legal aid, pro-bono lawyers, and assistance from District Legal Services Authorities.',
    desc_hi: 'जिला कानूनी सेवा प्राधिकरण से मुफ्त कानूनी सहायता और सरकारी वकील प्राप्त करें।',
    color: '#a855f7',
    icon: HeartHandshake,
  },
  {
    id: 'labour',
    category: 'Labour & Wages',
    title_en: 'SAMADHAN — Ministry of Labour & Employment',
    title_hi: 'समाधान — श्रम एवं रोजगार मंत्रालय पोर्टल',
    helpline: '14434',
    portal: 'https://samadhan.labour.gov.in',
    desc_en: 'File industrial disputes, salary delay complaints, or Provident Fund (PF) grievances online.',
    desc_hi: 'औद्योगिक विवाद, वेतन में देरी की शिकायतें या भविष्य निधि (PF) शिकायतें ऑनलाइन दर्ज करें।',
    color: '#f97316',
    icon: Briefcase,
  },
];

export default function AuthorityFinder() {
  const { lang } = useLang();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = AUTHORITIES.filter(item => {
    const q = searchTerm.toLowerCase();
    return (
      item.title_en.toLowerCase().includes(q) ||
      item.title_hi.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.helpline.includes(q)
    );
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>
            {lang === 'hi' ? 'आधिकारिक सरकारी पोर्टल एवं शिकायत केंद्र' : 'Official Government Portals & Grievance Centers'}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
            {lang === 'hi' ? 'सीधे आधिकारिक चैनलों पर शिकायत दर्ज करें' : 'Direct links to official reporting & legal aid channels'}
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-strong)',
          borderRadius: 12,
          padding: '0 14px',
          width: '100%',
          maxWidth: 280,
          height: 40,
        }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder={lang === 'hi' ? 'पोर्टल या नंबर खोजें...' : 'Search portal or number...'}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              outline: 'none',
              padding: '0 10px',
              width: '100%',
              fontSize: 13,
            }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 16 }}>
        {filtered.map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 18,
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${item.color}18`,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon size={22} />
                  </div>
                  <a
                    href={`tel:${item.helpline}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'var(--bg-subtle)',
                      color: item.color,
                      border: `1px solid ${item.color}40`,
                      borderRadius: 10,
                      padding: '6px 12px',
                      fontSize: 13,
                      fontWeight: 800,
                      textDecoration: 'none',
                    }}
                  >
                    <PhoneCall size={14} />
                    <span>{item.helpline}</span>
                  </a>
                </div>

                <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 8px' }}>
                  {lang === 'hi' ? item.title_hi : item.title_en}
                </h4>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  {lang === 'hi' ? item.desc_hi : item.desc_en}
                </p>
              </div>

              <a
                href={item.portal}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '10px 16px',
                  color: 'var(--text)',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                <span>{lang === 'hi' ? 'आधिकारिक पोर्टल खोलें' : 'Open Official Portal'}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
