import { Link } from 'react-router-dom';
import { ArrowRight, Phone, BookOpen } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { ui } from '../utils/translate';
import LawOfTheDay from '../components/home/LawOfTheDay';
import SearchBar from '../components/home/SearchBar';
import CategoryCard from '../components/home/CategoryCard';
import categories from '../data/categories.json';
import helplines from '../data/helplines.json';

export default function HomePage() {
  const { lang } = useLang();

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', marginBottom: 48, position: 'relative' }}>
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 200, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(249,115,22,0.12), transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)',
          borderRadius: 100, padding: '6px 16px', fontSize: 13, color: '#fb923c',
          marginBottom: 20, fontWeight: 500,
        }}>
          <BookOpen size={14} />
          {lang === 'en' ? 'Know Your Rights · Stand Up Legally' : 'अपने अधिकार जानें · कानूनी रूप से खड़े हों'}
        </div>

        <h1 className="gradient-text" style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
          {lang === 'en' ? 'Kanoon Sahayak' : 'कानून सहायक'}
        </h1>

        <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.7 }}>
          {lang === 'en'
            ? 'Your bilingual guide to Indian law — understand your rights, know what to do, and act through the right official channels.'
            : 'भारतीय कानून के लिए आपकी द्विभाषी मार्गदर्शिका — अपने अधिकार समझें, जानें क्या करना है, और सही सरकारी चैनल से कार्रवाई करें।'}
        </p>

        {/* Search */}
        <div style={{ maxWidth: 560, margin: '0 auto 24px' }}>
          <SearchBar />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          {['FIR', lang === 'en' ? 'Salary dispute' : 'वेतन विवाद', lang === 'en' ? 'Cyber fraud' : 'साइबर धोखाधड़ी', 'Helmet challan'].map(tag => (
            <Link key={tag} to={`/search?q=${encodeURIComponent(tag)}`} className="tag-pill" style={{ cursor: 'pointer', textDecoration: 'none' }}>
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* Law of the Day */}
      <section style={{ marginBottom: 48 }}>
        <LawOfTheDay />
      </section>

      {/* Emergency Helplines strip */}
      <section style={{ marginBottom: 48 }}>
        <div style={{
          background: 'rgba(239,68,68,0.06)',
          border: '1px solid rgba(239,68,68,0.15)',
          borderRadius: 16, padding: '16px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Phone size={16} color="#ef4444" />
            <span style={{ color: '#ef4444', fontWeight: 700, fontSize: 14 }}>
              {ui('helplines', lang)}
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {helplines.helplines.slice(0, 6).map(h => (
              <a
                key={h.number}
                href={`tel:${h.number}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '6px 14px',
                  color: 'var(--text)', textDecoration: 'none', fontSize: 13, fontWeight: 600,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
              >
                <Phone size={12} color="#22c55e" />
                <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>{h.name_en}</span>
                <strong style={{ color: '#22c55e' }}>{h.number}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 22, color: 'var(--text)', marginBottom: 4 }}>
              {lang === 'en' ? 'Browse by Category' : 'श्रेणी अनुसार ब्राउज़ करें'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              {lang === 'en' ? '8 areas of Indian law explained simply' : 'भारतीय कानून के 8 क्षेत्र सरलता से समझाए गए'}
            </p>
          </div>
          <Link to="/categories" className="btn-ghost" style={{ padding: '8px 16px', fontSize: 13, flexShrink: 0 }}>
            {lang === 'en' ? 'See all' : 'सभी देखें'} <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {categories.categories.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>
    </main>
  );
}
