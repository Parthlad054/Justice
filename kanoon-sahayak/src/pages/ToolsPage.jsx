import { useState } from 'react';
import {
  PhoneCall, Shield, HeartHandshake, ShieldAlert, Users, User,
  ShoppingCart, Scale, Stethoscope, Flame, Search, FileText,
  Calculator, Award, Sparkles, ArrowRight, CheckCircle2, MapPin, X, MessageSquare, Zap
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t, ui } from '../utils/translate';
import helplinesData from '../data/helplines.json';
import RightsCardGenerator from '../components/tools/RightsCardGenerator';
import ComplaintGenerator from '../components/tools/ComplaintGenerator';
import FineCalculator from '../components/tools/FineCalculator';
import AuthorityFinder from '../components/tools/AuthorityFinder';
import WhatToSayScripts from '../components/tools/WhatToSayScripts';

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
    tag_en: 'Live Interactive Tool',
    tag_hi: 'सक्रिय टूल',
    component: RightsCardGenerator,
  },
  {
    id: 'complaint-gen',
    title_en: 'Complaint Letter Generator',
    title_hi: 'शिकायत पत्र जेनरेटर',
    desc_en: 'Auto-fill ready-to-submit formal complaint templates for consumer forums, police stations, and labour offices.',
    desc_hi: 'उपभोक्ता फोरम, पुलिस स्टेशन और श्रम कार्यालय के लिए तैयार शिकायत पत्र टेम्पलेट स्वतः भरें।',
    icon: FileText,
    color: '#22c55e',
    tag_en: 'Live Interactive Tool',
    tag_hi: 'सक्रिय टूल',
    component: ComplaintGenerator,
  },
  {
    id: 'fine-calc',
    title_en: 'Fine & Challan Calculator',
    title_hi: 'जुर्माना एवं चालान कैलकुलेटर',
    desc_en: 'Check official Motor Vehicles Act fine limits so you never get overcharged for minor violations.',
    desc_hi: 'मोटर वाहन अधिनियम के आधिकारिक जुर्माने की जांच करें ताकि आपसे कभी अधिक शुल्क न लिया जाए।',
    icon: Calculator,
    color: '#3b82f6',
    tag_en: 'Live Interactive Tool',
    tag_hi: 'सक्रिय टूल',
    component: FineCalculator,
  },
  {
    id: 'authority-finder',
    title_en: 'Authority & Grievance Finder',
    title_hi: 'अधिकारी एवं शिकायत केंद्र खोजें',
    desc_en: 'Find direct portals and emergency helplines for Police, Consumer Forums, Cyber Crime, and Legal Aid.',
    desc_hi: 'पुलिस, उपभोक्ता फोरम, साइबर अपराध और कानूनी सहायता के लिए सीधे पोर्टल और आपातकालीन नंबर खोजें।',
    icon: MapPin,
    color: '#a855f7',
    tag_en: 'Live Interactive Tool',
    tag_hi: 'सक्रिय टूल',
    component: AuthorityFinder,
  },
  {
    id: 'what-to-say',
    title_en: '"What To Say" Scripts',
    title_hi: '"क्या कहें" स्क्रिप्ट',
    desc_en: 'Polite, legally-informed scripts for common confrontations — traffic stops, refund disputes, FIR refusals & more.',
    desc_hi: 'ट्रैफिक रुकावट, रिफंड विवाद, FIR से इनकार जैसी सामान्य विवाद स्थितियों के लिए विनम्र, कानूनी स्क्रिप्ट।',
    icon: MessageSquare,
    color: '#14b8a6',
    tag_en: 'Live Interactive Tool',
    tag_hi: 'सक्रिय टूल',
    component: WhatToSayScripts,
  },
];

export default function ToolsPage() {
  const { lang } = useLang();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState(null);

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
        <h1 style={{ color: 'var(--text)', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, margin: '0 0 10px', lineHeight: 1.2 }}>
          {ui('tools_title', lang)}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(14px, 2vw, 16px)', maxWidth: 640, margin: 0, lineHeight: 1.6 }}>
          {ui('tools_subtitle', lang)}
        </p>
      </div>

      {/* Emergency Helplines Section */}
      <section style={{ marginBottom: 52 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
          <div>
            <h2 style={{ color: 'var(--text)', fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>
              {ui('emergency_helplines', lang)}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0 }}>
              {lang === 'hi' ? 'तुरंत कॉल करने के लिए नंबर पर टैप करें' : 'Tap any number to call immediately'}
            </p>
          </div>

          {/* Search bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-strong)',
            borderRadius: 12,
            padding: '0 14px',
            width: '100%',
            maxWidth: 300,
            height: 42,
          }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder={ui('search_helplines', lang)}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
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

        {filteredHelplines.length === 0 ? (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: 40,
            textAlign: 'center',
            color: 'var(--text-muted)',
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
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: '16px 18px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--card-shadow)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = 'rgba(249,115,22,0.5)';
                    e.currentTarget.style.background = 'var(--bg-card-hover)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--bg-card)';
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
                    <div style={{ color: 'var(--text)', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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

      {/* Citizen Empowerment Suite (Interactive Live Tools) */}
      <section>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ color: 'var(--text)', fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>
            {ui('empowerment_tools', lang)}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0 }}>
            {lang === 'hi'
              ? 'आम नागरिकों के लिए कानूनी अधिकार एवं शिकायत निवारण टूल'
              : 'Interactive legal action & grievance tools built for everyday citizens'}
          </p>
        </div>

        {activeTool ? (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-strong)',
            borderRadius: 24,
            padding: 28,
            boxShadow: 'var(--card-shadow)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
              borderBottom: '1px solid var(--border)',
              paddingBottom: 18,
              marginBottom: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: `${activeTool.color}18`,
                  color: activeTool.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <activeTool.icon size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', margin: '0 0 4px' }}>
                    {lang === 'hi' ? activeTool.title_hi : activeTool.title_en}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
                    {lang === 'hi' ? activeTool.desc_hi : activeTool.desc_en}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTool(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  padding: '8px 14px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <X size={15} />
                <span>{lang === 'hi' ? 'बंद करें (टूल सूची)' : 'Close Tool'}</span>
              </button>
            </div>

            <activeTool.component onClose={() => setActiveTool(null)} />
          </div>
        ) : (
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
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 20,
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: 16 }}>
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
                        background: 'var(--bg-subtle)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                        marginLeft: 'auto',
                      }}>
                        {lang === 'hi' ? tool.tag_hi : tool.tag_en}
                      </span>
                    </div>

                    <h3 style={{ color: 'var(--text)', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>
                      {lang === 'hi' ? tool.title_hi : tool.title_en}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, margin: '0 0 20px' }}>
                      {lang === 'hi' ? tool.desc_hi : tool.desc_en}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTool(tool)}
                    style={{
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border)',
                      borderRadius: 12,
                      padding: '10px 16px',
                      color: 'var(--text)',
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
                    <span>{lang === 'hi' ? 'टूल खोलें' : 'Launch Tool'}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
