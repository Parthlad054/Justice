import { useState } from 'react';
import { Copy, Check, MessageSquare, Car, ShoppingCart, Shield, HeartHandshake, Laptop, Briefcase, Home, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { ui } from '../../utils/translate';
import scriptsData from '../../data/scripts.json';

const CATEGORY_META = {
  traffic: { label_en: 'Traffic', label_hi: 'ट्रैफिक', icon: Car, color: '#f97316' },
  consumer: { label_en: 'Consumer', label_hi: 'उपभोक्ता', icon: ShoppingCart, color: '#22c55e' },
  police: { label_en: 'Police', label_hi: 'पुलिस', icon: Shield, color: '#3b82f6' },
  'women-safety': { label_en: 'Women Safety', label_hi: 'महिला सुरक्षा', icon: HeartHandshake, color: '#ec4899' },
  'cyber-crime': { label_en: 'Cyber Crime', label_hi: 'साइबर अपराध', icon: Laptop, color: '#ef4444' },
  employment: { label_en: 'Employment', label_hi: 'रोजगार', icon: Briefcase, color: '#a855f7' },
  'rent-property': { label_en: 'Rent', label_hi: 'किराया', icon: Home, color: '#14b8a6' },
  'marriage-family': { label_en: 'Family', label_hi: 'परिवार', icon: Users, color: '#eab308' },
};

const ALL_CATS = ['all', ...Object.keys(CATEGORY_META)];

export default function WhatToSayScripts({ onClose }) {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const scripts = scriptsData.scripts;
  const filtered = activeCategory === 'all'
    ? scripts
    : scripts.filter(s => s.category === activeCategory);

  function handleCopy(script) {
    const text = lang === 'hi' ? script.script_hi : script.script_en;
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedId(script.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  return (
    <div>
      {/* Category filter chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {ALL_CATS.map(cat => {
          const meta = CATEGORY_META[cat];
          const isActive = activeCategory === cat;
          const color = meta?.color || '#f97316';
          const label = cat === 'all'
            ? ui('all_categories', lang)
            : (lang === 'hi' ? meta.label_hi : meta.label_en);

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                border: `1.5px solid ${isActive ? color : 'var(--border)'}`,
                background: isActive ? `${color}18` : 'var(--bg-subtle)',
                color: isActive ? color : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Scripts list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map(script => {
          const meta = CATEGORY_META[script.category] || { color: '#f97316' };
          const Icon = meta.icon || MessageSquare;
          const color = meta.color;
          const situation = lang === 'hi' ? script.situation_hi : script.situation_en;
          const scriptText = lang === 'hi' ? script.script_hi : script.script_en;
          const tip = lang === 'hi' ? script.tip_hi : script.tip_en;
          const isExpanded = expandedId === script.id;
          const isCopied = copiedId === script.id;

          return (
            <div
              key={script.id}
              style={{
                background: 'var(--bg-subtle)',
                border: `1px solid ${isExpanded ? `${color}40` : 'var(--border)'}`,
                borderRadius: 16, overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              {/* Header row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : script.id)}
                style={{
                  width: '100%', textAlign: 'left',
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '16px 16px', background: 'transparent',
                  border: 'none', cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: `${color}18`, border: `1px solid ${color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color,
                }}>
                  <Icon size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: 'var(--text)', fontWeight: 700, fontSize: 14, margin: '0 0 2px', lineHeight: 1.4 }}>
                    {situation}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                    {script.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{
                        fontSize: 10, fontWeight: 600, padding: '2px 8px',
                        borderRadius: 100, background: `${color}15`, color,
                        border: `1px solid ${color}30`,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 2 }}>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${color}20` }}>
                  {/* Script box */}
                  <div style={{
                    background: `${color}08`, border: `1px solid ${color}20`,
                    borderRadius: 12, padding: '14px 16px', marginTop: 14,
                    position: 'relative',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                      <MessageSquare size={13} color={color} />
                      <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {lang === 'hi' ? 'आप कह सकते हैं' : 'You can say'}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text)', fontSize: 13, lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>
                      {scriptText}
                    </p>

                    {/* Copy button */}
                    <button
                      onClick={() => handleCopy(script)}
                      style={{
                        position: 'absolute', top: 12, right: 12,
                        display: 'flex', alignItems: 'center', gap: 4,
                        background: isCopied ? 'rgba(34,197,94,0.15)' : `${color}15`,
                        border: `1px solid ${isCopied ? '#22c55e40' : `${color}30`}`,
                        color: isCopied ? '#22c55e' : color,
                        padding: '5px 10px', borderRadius: 8,
                        fontSize: 11, fontWeight: 600, cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {isCopied ? <Check size={11} /> : <Copy size={11} />}
                      {isCopied ? ui('script_copied', lang) : ui('copy_script', lang)}
                    </button>
                  </div>

                  {/* Tip */}
                  {tip && (
                    <div style={{
                      marginTop: 10, padding: '10px 14px', borderRadius: 10,
                      background: 'var(--bg-card)', border: '1px solid var(--border)',
                      display: 'flex', gap: 8, alignItems: 'flex-start',
                    }}>
                      <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
                      <p style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                        {tip}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
          {lang === 'hi' ? 'इस श्रेणी में कोई स्क्रिप्ट नहीं मिली' : 'No scripts found in this category'}
        </div>
      )}
    </div>
  );
}
