import { useState } from 'react';
import { Calculator, ShieldAlert, CheckCircle2, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

const TRAFFIC_VIOLATIONS = [
  {
    id: 'helmet',
    title_en: 'Driving Two-Wheeler Without Helmet',
    title_hi: 'बिना हेलमेट दोपहिया वाहन चलाना',
    section: 'Section 129 / 194D MV Act',
    fine: 1000,
    note_en: '₹1,000 fine + License suspension for 3 months',
    note_hi: '₹1,000 जुर्माना + 3 महीने के लिए लाइसेंस सस्पेंड',
  },
  {
    id: 'seatbelt',
    title_en: 'Driving Without Seat Belt',
    title_hi: 'बिना सीट बेल्ट के गाड़ी चलाना',
    section: 'Section 194B MV Act',
    fine: 1000,
    note_en: '₹1,000 fine for driver or passenger without seat belt',
    note_hi: 'ड्राइवर या यात्री द्वारा बिना सीट बेल्ट गाड़ी चलाने पर ₹1,000 जुर्माना',
  },
  {
    id: 'license',
    title_en: 'Driving Without Valid Driving License (DL)',
    title_hi: 'बिना वैध ड्राइविंग लाइसेंस (DL) के वाहन चलाना',
    section: 'Section 3 / 181 MV Act',
    fine: 5000,
    note_en: '₹5,000 fine (Digital DL via DigiLocker / mParivahan is legally valid)',
    note_hi: '₹5,000 जुर्माना (डिजीलॉकर / एम-परिवहन पर डिजिटल DL कानूनी रूप से मान्य है)',
  },
  {
    id: 'insurance',
    title_en: 'Driving Without Valid Insurance',
    title_hi: 'बिना वैध बीमा (Insurance) के वाहन चलाना',
    section: 'Section 196 MV Act',
    fine: 2000,
    note_en: '₹2,000 fine (1st offense) / ₹4,000 (subsequent offenses)',
    note_hi: '₹2,000 जुर्माना (पहली बार) / ₹4,000 (दूसरी बार)',
  },
  {
    id: 'puc',
    title_en: 'Driving Without Valid Pollution Certificate (PUC)',
    title_hi: 'बिना वैध प्रदूषण प्रमाण पत्र (PUC) के वाहन चलाना',
    section: 'Section 190(2) MV Act',
    fine: 10000,
    note_en: '₹10,000 fine + possible disqualification of license',
    note_hi: '₹10,000 जुर्माना + लाइसेंस निरस्त होने का प्रावधान',
  },
  {
    id: 'overspeed',
    title_en: 'Over-speeding / Exceeding Speed Limit',
    title_hi: 'तय गति सीमा से अधिक तेज गाड़ी चलाना',
    section: 'Section 183 MV Act',
    fine: 2000,
    note_en: '₹1,000 to ₹2,000 (Light vehicles) / ₹2,000 to ₹4,000 (Medium/Heavy)',
    note_hi: '₹1,000 से ₹2,000 (छोटे वाहन) / ₹2,000 से ₹4,000 (बड़े वाहन)',
  },
  {
    id: 'mobile',
    title_en: 'Using Mobile Phone While Driving',
    title_hi: 'ड्राइविंग करते समय मोबाइल फोन का उपयोग',
    section: 'Section 184 MV Act',
    fine: 5000,
    note_en: '₹1,000 to ₹5,000 fine (hands-free navigation in holder allowed)',
    note_hi: '₹1,000 से ₹5,000 जुर्माना (होल्डर में नेविगेशन देखने की अनुमति)',
  },
  {
    id: 'minor',
    title_en: 'Underage / Minor Driving Vehicle',
    title_hi: 'नाबालिग द्वारा वाहन चलाना',
    section: 'Section 199A MV Act',
    fine: 25000,
    note_en: '₹25,000 fine on guardian/owner + 3 years imprisonment + RC cancelled',
    note_hi: 'अभिभावक/वाहन मालिक पर ₹25,000 जुर्माना + 3 साल जेल + RC रद्द',
  },
];

export default function FineCalculator() {
  const { lang } = useLang();
  const [selectedViolations, setSelectedViolations] = useState([]);

  const toggleViolation = (id) => {
    setSelectedViolations(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedViolations([]);

  const totalFine = TRAFFIC_VIOLATIONS
    .filter(v => selectedViolations.includes(v.id))
    .reduce((sum, v) => sum + v.fine, 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
      {/* Violations Checklist */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calculator size={20} color="#3b82f6" />
            <span>{lang === 'hi' ? 'उल्लंघन चुनें (आधिकारिक जुर्माना जांचें)' : 'Select Violations to Check Official Fine'}</span>
          </h3>

          {selectedViolations.length > 0 && (
            <button
              onClick={clearSelection}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '4px 10px',
                fontSize: 12,
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <RefreshCw size={12} />
              <span>{lang === 'hi' ? 'रीसेट' : 'Reset'}</span>
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TRAFFIC_VIOLATIONS.map(item => {
            const isSelected = selectedViolations.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleViolation(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  background: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-subtle)',
                  border: `1px solid ${isSelected ? '#3b82f6' : 'var(--border)'}`,
                  borderRadius: 14,
                  padding: '14px 16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  style={{ marginTop: 3, cursor: 'pointer', accentColor: '#3b82f6' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                      {lang === 'hi' ? item.title_hi : item.title_en}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#3b82f6' }}>
                      ₹{item.fine.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                    {item.section}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {lang === 'hi' ? item.note_hi : item.note_en}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary & Citizen Rights Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Total Calculation Panel */}
        <div style={{
          background: 'linear-gradient(145deg, var(--bg-card), var(--bg-subtle))',
          border: '2px solid #3b82f6',
          borderRadius: 20,
          padding: 24,
          boxShadow: '0 10px 25px rgba(59, 130, 246, 0.12)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', marginBottom: 4 }}>
            {lang === 'hi' ? 'अनुमानित आधिकारिक चालान सीमा' : 'ESTIMATED OFFICIAL CHALLAN LIMIT'}
          </div>
          <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>
            ₹{totalFine.toLocaleString('en-IN')}
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 16px', lineHeight: 1.5 }}>
            {lang === 'hi'
              ? 'यह जुर्माना मोटर वाहन अधिनियम 1988 (संशोधित 2019) पर आधारित है। कोई भी पुलिस अधिकारी बिना आधिकारिक रसीद के आपसे नकद जुर्माना नहीं मांग सकता।'
              : 'These amounts are strictly per Motor Vehicles Act 1988 (Amended 2019). No police officer can demand arbitrary cash without an official printed receipt / e-Challan.'}
          </p>

          <a
            href="https://echallan.parivahan.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#3b82f6',
              color: '#ffffff',
              padding: '10px 18px',
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <span>{lang === 'hi' ? 'ई-चालान ऑनलाइन जांचें' : 'Check / Dispute e-Challan Online'}</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Traffic Stop Rights Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: 22,
        }}>
          <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={18} color="#22c55e" />
            <span>{lang === 'hi' ? 'ट्रैफिक पुलिस के सामने आपके अधिकार' : 'Your Legal Rights During Traffic Stop'}</span>
          </h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>
              • <strong>{lang === 'hi' ? 'डिजिटल दस्तावेज़ मान्य:' : 'DigiLocker is Valid:'}</strong> {lang === 'hi' ? 'डिजीलॉकर या एम-परिवहन ऐप पर दिखाए गए DL और RC कानूनन मान्य हैं (IT Act Sec 4)।' : 'DL and RC shown in DigiLocker or mParivahan app are legally valid (IT Act Sec 4).'}
            </li>
            <li style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>
              • <strong>{lang === 'hi' ? 'चाबी नहीं छीन सकते:' : 'Cannot Seize Vehicle Keys:'}</strong> {lang === 'hi' ? 'ट्रैफिक पुलिस अधिकारी आपकी गाड़ी की चाबी नहीं निकाल सकता या दुर्व्यवहार नहीं कर सकता।' : 'No traffic constable can snatch your vehicle keys or use abusive language.'}
            </li>
            <li style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>
              • <strong>{lang === 'hi' ? 'रसीद का अधिकार:' : 'Right to Receipt:'}</strong> {lang === 'hi' ? 'जुर्माना अदा करने पर आधिकारिक प्रिंटेड या ई-चालान रसीद लेना आपका अधिकार है।' : 'Always insist on an official e-Challan or printed receipt if paying on the spot.'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
