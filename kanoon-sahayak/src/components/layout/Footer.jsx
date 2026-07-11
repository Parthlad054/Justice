import { Link } from 'react-router-dom';
import { Scale, Phone, ExternalLink } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { ui } from '../../utils/translate';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer style={{
      background: 'rgba(10,10,20,0.9)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '40px 24px 24px',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Disclaimer */}
        <div className="disclaimer-bar" style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
          <span>{ui('disclaimer', lang)}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 32 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, #f97316, #ef4444)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Scale size={16} color="white" />
              </div>
              <span style={{ fontWeight: 700, color: '#e2e8f0' }}>Kanoon Sahayak</span>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
              {lang === 'en'
                ? 'Making Indian law simple and accessible for every citizen.'
                : 'हर नागरिक के लिए भारतीय कानून को सरल और सुलभ बनाना।'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
              {lang === 'en' ? 'Quick Links' : 'त्वरित लिंक'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { to: '/', label: lang === 'en' ? 'Home' : 'होम' },
                { to: '/categories', label: lang === 'en' ? 'Categories' : 'श्रेणियां' },
                { to: '/faq', label: lang === 'en' ? 'FAQ' : 'सामान्य प्रश्न' },
                { to: '/about', label: lang === 'en' ? 'About' : 'हमारे बारे में' },
              ].map(link => (
                <Link key={link.to} to={link.to} style={{ color: '#64748b', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#f97316'}
                  onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Emergency */}
          <div>
            <h4 style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
              {lang === 'en' ? 'Emergency' : 'आपातकाल'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: lang === 'en' ? 'Police' : 'पुलिस', num: '112' },
                { label: lang === 'en' ? 'Women Helpline' : 'महिला हेल्पलाइन', num: '181' },
                { label: lang === 'en' ? 'Cyber Crime' : 'साइबर अपराध', num: '1930' },
                { label: 'NALSA', num: '15100' },
              ].map(h => (
                <a key={h.num} href={`tel:${h.num}`} style={{ color: '#64748b', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
                  onMouseEnter={e => e.currentTarget.style.color = '#4ade80'}
                  onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                >
                  <Phone size={12} />
                  {h.label} — {h.num}
                </a>
              ))}
            </div>
          </div>

          {/* Legal aid */}
          <div>
            <h4 style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
              {lang === 'en' ? 'Free Legal Aid' : 'निःशुल्क कानूनी सहायता'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'NALSA', url: 'https://nalsa.gov.in' },
                { label: 'e-Daakhil', url: 'https://edaakhil.nic.in' },
                { label: 'Cybercrime Portal', url: 'https://cybercrime.gov.in' },
                { label: 'Parivahan (Challan)', url: 'https://parivahan.gov.in' },
              ].map(link => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{ color: '#64748b', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
                  onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
                  onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                >
                  <ExternalLink size={12} /> {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 12, color: '#475569' }}>
            © 2024 Kanoon Sahayak — {lang === 'en' ? 'For informational purposes only.' : 'केवल सूचनात्मक उद्देश्यों के लिए।'}
          </p>
          <p style={{ fontSize: 12, color: '#475569' }}>
            {lang === 'en' ? 'Not a substitute for legal advice.' : 'कानूनी सलाह का विकल्प नहीं।'}
          </p>
        </div>
      </div>
    </footer>
  );
}
