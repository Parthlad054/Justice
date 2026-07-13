import { Link, NavLink } from 'react-router-dom';
import { Scale, Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLang } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { ui } from '../../utils/translate';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { lang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: ui('home', lang) },
    { to: '/categories', label: ui('categories', lang) },
    { to: '/tools', label: ui('tools', lang) },
    { to: '/quiz', label: ui('quiz', lang), badge: '🔥' },
    { to: '/faq', label: ui('faq', lang) },
    { to: '/about', label: ui('about', lang) },
  ];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', height: 64, gap: 16 }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Scale size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', lineHeight: 1.2 }}>Kanoon Sahayak</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1 }}>LawEasy India</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 4, marginLeft: 16, flex: 1 }} className="desktop-nav">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
            >
              {link.label}
              {link.badge && (
                <span style={{ fontSize: 12, lineHeight: 1 }}>{link.badge}</span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          <Link to="/search" style={{ color: 'var(--text-muted)', padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Search size={18} />
          </Link>

          {/* Language toggle */}
          <LanguageSwitcher />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'transparent', border: 'none',
              color: 'var(--text-muted)', cursor: 'pointer', padding: 8,
              borderRadius: 8, display: 'flex', alignItems: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none', background: 'transparent', border: 'none',
              color: 'var(--text)', cursor: 'pointer', padding: 8,
              borderRadius: 8, alignItems: 'center',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          padding: '12px 0 20px', borderTop: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 16px' }}
            >
              {link.label}
              {link.badge && <span style={{ fontSize: 13 }}>{link.badge}</span>}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
