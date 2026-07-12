import { useState } from 'react';
import {
  PhoneCall, Shield, HeartHandshake, ShieldAlert, Users, User,
  ShoppingCart, Scale, Stethoscope, Flame, Search, FileText,
  Calculator, Award, Sparkles, ArrowRight, CheckCircle2,
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t, ui } from '../utils/translate';
import helplinesData from '../data/helplines.json';

const ICON_MAP = {
  Shield: Shield,
  HeartHandshake: HeartHandshake,
  ShieldAlert: ShieldAlert,
  Users: Users,
  User: User,
  ShoppingCart: ShoppingCart,
  Scale: Scale,
  Stethoscope: Stethoscope,
  Flame: Flame,
};

const COLOR_GRADIENTS = {
  blue: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  pink: 'linear-gradient(135deg, #ec4899, #be185d)',
  rose: 'linear-gradient(135deg, #f43f5e, #be123c)',
  red: 'linear-gradient(135deg, #ef4444, #b91c1c)',
  yellow: 'linear-gradient(135deg, #eab308, #a16207)',
  teal: 'linear-gradient(135deg, #14b8a6, #0f766e)',
  green: 'linear-gradient(135deg, #22c55e, #15803d)',
  purple: 'linear-gradient(135deg, #a855f7, #6b21a8)',
  orange: 'linear-gradient(135deg, #f97316, #c2410c)',
  amber: 'linear-gradient(135deg, #f59e0b, #b45309)',
};

const EMPOWERMENT_TOOLS = [
  {
    id: 'rights-card',
    title_en: 'Rights Card Generator',
    title_hi: 'अधिकार कार्ड जेनरेटर',
    desc_en: 'Create a shareable, official Rights Card citing exact legal sections to show during disputes.',
    desc_hi: 'विवादों के समय दिखाने के लिए सटीक कानूनी धाराओं के साथ एक साझा करने योग्य अधिकार कार्ड बनाएं।',
    icon: Award,
    color: '#f97316',
    tag_en: 'Phase 2 Tool',
    tag_hi: 'चरण 2 टूल',
  },
  {
    id: 'complaint-gen',
    title_en: 'Complaint Letter Generator',
    title_hi: 'शिकायत पत्र जेनरेटर',
    desc_en: 'Auto-fill ready-to-submit formal complaint templates for consumer forums, police stations, and labour offices.',
    desc_hi: 'उपभोक्ता फोरम, पुलिस स्टेशन और श्रम कार्यालय के लिए तैयार शिकायत पत्र टेम्पलेट स्वतः भरें।',
    icon: FileText,
    color: '#22c55e',
    tag_en: 'Phase 2 Tool',
    tag_hi: 'चरण 2 टूल',
  },
  {
    id: 'fine-calc',
    title_en: 'Fine & Challan Calculator',
    title_hi: 'जुर्माना एवं चालान कैलकुलेटर',
    desc_en: 'Check official Motor Vehicles Act fine limits so you never get overcharged for minor violations.',
    desc_hi: 'मोटर वाहन अधिनियम के आधिकारिक जुर्माने की जांच करें ताकि आपसे कभी अधिक शुल्क न लिया जाए।',
    icon: Calculator,
    color: '#3b82f6',
    tag_en: 'Phase 2 Tool',
    tag_hi: 'चरण 2 टूल',
  },
];

export default function ToolsPage() {
  const { lang } = useLang();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPreview, setSelectedPreview] = useState(null);

  const filteredHelplines = helplinesData.helplines.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.name_en.toLowerCase().includes(q) ||
      item.name_hi.toLowerCase().includes(q) ||
      item.number.includes(q)
    );
  });

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Page Hero */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(239,68,68,0.06), transparent)',
        border: '1px solid rgba(249,115,22,0.22)',
        borderRadius: 24,
        padding: '36px 32px',
        marginBottom: 40,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: '#f97316',
          opacity: 0.08,
          filter: 'blur(40px)',
        }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(249,115,22,0.18)', color: '#f97316', padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
          <Sparkles size={14} />
          <span>{ui('tools', lang)} &amp; {ui('helplines', lang)}</span>
        </div>
        <h1 style={{ color: '#e2e8f0', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, margin: '0 0 10px', lineHeight: 1.2 }}>
          {ui('tools_title', lang)}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 'clamp(14px, 2vw, 16px)', maxWidth: 640, margin: 0, lineHeight: 1.6 }}>
          {ui('tools_subtitle', lang)}
        </p>
      </div>

      {/* Emergency Helplines Section */}
      <section style={{ marginBottom: 52 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
          <div>
            <h2 style={{ color: '#e2e8f0', fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>
              {ui('emergency_helplines', lang)}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
              {lang === 'hi' ? 'तुरंत कॉल करने के लिए नंबर पर टैप करें' : 'Tap any number to call immediately'}
            </p>
          </div>

          {/* Search bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12,
            padding: '0 14px',
            width: '100%',
            maxWidth: 300,
            height: 42,
          }}>
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder={ui('search_helplines', lang)}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#e2e8f0',
                outline: 'none',
                padding: '0 10px',
                width: '100%',
                fontSize: 13,
              }}
            />
          </div>
        </div>

        {filteredHelplines.length === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            padding: 40,
            textAlign: 'center',
            color: '#94a3b8',
          }}>
            {ui('no_results', lang)}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 16,
          }}>
            {filteredHelplines.map(item => {
              const IconComp = ICON_MAP[item.icon] || PhoneCall;
              const bgGradient = COLOR_GRADIENTS[item.color] || COLOR_GRADIENTS.blue;
              return (
                <a
                  key={item.number}
                  href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: 16,
                    padding: '16px 18px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: bgGradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}>
                    <IconComp size={20} color="#ffffff" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {t(item, 'name', lang)}
                    </div>
                    <div style={{ color: '#f97316', fontSize: 16, fontWeight: 800, fontFamily: 'monospace', letterSpacing: 0.5 }}>
                      {item.number}
                    </div>
                  </div>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(249,115,22,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f97316',
                    flexShrink: 0,
                  }}>
                    <PhoneCall size={14} />
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      {/* Citizen Empowerment Suite (Phase 2 Preview Showcase) */}
      <section>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ color: '#e2e8f0', fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>
            {ui('empowerment_tools', lang)}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
            {lang === 'hi'
              ? 'आम नागरिकों के लिए कानूनी अधिकार सुरक्षित करने वाले उपकरण (चरण 2 में आ रहे हैं)'
              : 'Interactive legal action tools built for everyday citizens (Coming in Phase 2)'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: 20,
        }}>
          {EMPOWERMENT_TOOLS.map(tool => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                style={{
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: `${tool.color}18`,
                      border: `1px solid ${tool.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: tool.color,
                    }}>
                      <Icon size={24} />
                    </div>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.07)',
                      color: '#cbd5e1',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                      {lang === 'hi' ? tool.tag_hi : tool.tag_en}
                    </span>
                  </div>

                  <h3 style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>
                    {lang === 'hi' ? tool.title_hi : tool.title_en}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: '0 0 20px' }}>
                    {lang === 'hi' ? tool.desc_hi : tool.desc_en}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPreview(tool)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 12,
                    padding: '10px 16px',
                    color: '#e2e8f0',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${tool.color}20`;
                    e.currentTarget.style.borderColor = tool.color;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  }}
                >
                  <span>{ui('preview_tool', lang)}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Preview Modal */}
      {selectedPreview && (
        <div
          onClick={() => setSelectedPreview(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            zIndex: 1000,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#131320',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 24,
              padding: 32,
              maxWidth: 480,
              width: '100%',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
            }}
          >
            <div style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              background: `${selectedPreview.color}20`,
              color: selectedPreview.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <selectedPreview.icon size={28} />
            </div>

            <h3 style={{ color: '#e2e8f0', fontSize: 20, fontWeight: 700, margin: '0 0 10px' }}>
              {lang === 'hi' ? selectedPreview.title_hi : selectedPreview.title_en}
            </h3>

            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              {lang === 'hi' ? selectedPreview.desc_hi : selectedPreview.desc_en}
            </p>

            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
            }}>
              <CheckCircle2 size={18} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.5 }}>
                {lang === 'hi'
                  ? 'यह टूल चरण 2 में जारी किया जाएगा और पूर्ण रूप से बिना इंटरनेट (ऑफलाइन) काम करेगा।'
                  : 'This tool is scheduled for Phase 2 release and will run completely offline inside your browser.'}
              </div>
            </div>

            <button
              onClick={() => setSelectedPreview(null)}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {lang === 'hi' ? 'समझ गया' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
