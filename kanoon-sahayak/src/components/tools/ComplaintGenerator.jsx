import { useState } from 'react';
import { FileText, Copy, Check, Printer, Sparkles, Building2, User, Calendar, FileQuestion } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

const COMPLAINT_TEMPLATES = [
  {
    id: 'consumer',
    title_en: 'Consumer Forum Complaint (Defective Product / Refund Refusal)',
    title_hi: 'उपभोक्ता फोरम शिकायत (खराब उत्पाद / रिफंड से इनकार)',
    authority_en: 'The Hon’ble District Consumer Disputes Redressal Commission',
    authority_hi: 'माननीय जिला उपभोक्ता विवाद निवारण आयोग',
    subject_en: 'Complaint under Section 35 of the Consumer Protection Act, 2019 regarding sale of defective product and deficiency in service.',
    subject_hi: 'खराब उत्पाद की बिक्री और सेवा में कमी के संबंध में उपभोक्ता संरक्षण अधिनियम, 2019 की धारा 35 के तहत शिकायत।',
    template_en: (data) => `To,
${data.authority}
${data.city || '[City/District Name]'}

Subject: Complaint under Section 35 of the Consumer Protection Act, 2019 regarding sale of defective product and deficiency in service.

Respected Sir/Madam,

I, ${data.name || '[Your Name]'}, residing at ${data.address || '[Your Address]'}, wish to formally file a consumer complaint against ${data.oppositeParty || '[Seller / Company Name]'}, located at ${data.oppositeAddress || '[Seller Address]'}.

1. TRANSACTION DETAILS:
On ${data.date || '[Incident Date]'}, I purchased/availed goods/services from the Opposite Party involving an amount of ₹${data.amount || '[Amount Paid]'}.

2. NATURE OF DEFECT / GRIEVANCE:
${data.details || 'The product supplied was defective/deficient in service and the opposite party refused to provide a valid refund, repair, or replacement despite repeated written requests.'}

3. RELIEF CLAIMED:
a) Direct the Opposite Party to refund the full purchase amount of ₹${data.amount || '[Amount]'} with interest.
b) Pay compensation for mental agony, harassment, and litigation costs.

I declare that the facts stated above are true to the best of my knowledge and belief.

Yours faithfully,
(Signature)
Name: ${data.name || '[Your Name]'}
Contact: ${data.phone || '[Your Phone/Email]'}
Date: ${new Date().toLocaleDateString()}`,
    template_hi: (data) => `सेवा में,
${data.authority}
${data.city || '[शहर/जिला का नाम]'}

विषय: खराब उत्पाद की बिक्री और सेवा में कमी के संबंध में उपभोक्ता संरक्षण अधिनियम, 2019 की धारा 35 के तहत शिकायत।

महोदय/महोदया,

मैं, ${data.name || '[आपका नाम]'}, निवासी ${data.address || '[आपका पता]'}, ${data.oppositeParty || '[विक्रेता/कंपनी का नाम]'}, पता: ${data.oppositeAddress || '[विक्रेता का पता]'} के विरुद्ध यह उपभोक्ता शिकायत प्रस्तुत करता/करती हूँ।

1. लेन-देन का विवरण:
दिनांक ${data.date || '[घटना की तारीख]'} को मैंने विपक्षी पक्ष से ₹${data.amount || '[भुगतान की गई राशि]'} के सामान/सेवा का क्रय किया था।

2. शिकायत का मुख्य कारण:
${data.details || 'प्रदान किया गया उत्पाद खराब था/सेवा में कमी थी और बार-बार अनुरोध करने के बावजूद विपक्षी पक्ष ने रिफंड, मरम्मत या बदलने से स्पष्ट रूप से इनकार कर दिया है।'}

3. मांगी गई राहत:
क) विपक्षी पक्ष को ₹${data.amount || '[राशि]'} की पूर्ण राशि ब्याज सहित वापस करने का निर्देश दिया जाए।
ख) मानसिक उत्पीड़न और कानूनी खर्च के लिए मुआवजा दिलाया जाए।

भवदीय,
(हस्ताक्षर)
नाम: ${data.name || '[आपका नाम]'}
संपर्क: ${data.phone || '[फोन नंबर]'}
दिनांक: ${new Date().toLocaleDateString()}`,
  },
  {
    id: 'police_fir',
    title_en: 'Police Station Written Complaint / Zero FIR Application',
    title_hi: 'पुलिस स्टेशन लिखित शिकायत / जीरो एफआईआर आवेदन',
    authority_en: 'The Station House Officer (SHO)',
    authority_hi: 'थाना प्रभारी (SHO)',
    subject_en: 'Application for registration of First Information Report (FIR) under Section 154 CrPC / BNSS.',
    subject_hi: 'धारा 154 दंड प्रक्रिया संहिता (CrPC) / BNSS के तहत प्राथमिकी (FIR) दर्ज करने हेतु आवेदन।',
    template_en: (data) => `To,
${data.authority}
Police Station: ${data.city || '[Police Station Name & District]'}

Subject: Application for registration of First Information Report (FIR) under Section 154 CrPC / Bharatiya Nagarik Suraksha Sanhita.

Respected Sir/Madam,

I, ${data.name || '[Your Name]'}, residing at ${data.address || '[Your Address]'}, wish to report a cognizable offence committed by ${data.oppositeParty || '[Accused / Unknown Persons]'}.

1. DATE & TIME OF INCIDENT:
${data.date || '[Date and exact time of incident]'}

2. DETAILED FACTS OF INCIDENT:
${data.details || 'Briefly narrate the sequence of events clearly and truthfully without exaggeration.'}

I request you to kindly register an FIR based on this written complaint and provide me with a free copy of the FIR as mandated under law.

Yours faithfully,
(Signature)
Name: ${data.name || '[Your Name]'}
Contact: ${data.phone || '[Your Phone/Email]'}
Date: ${new Date().toLocaleDateString()}`,
    template_hi: (data) => `सेवा में,
${data.authority}
पुलिस स्टेशन: ${data.city || '[थाना एवं जिला का नाम]'}

विषय: धारा 154 CrPC / भारतीय नागरिक सुरक्षा संहिता के तहत प्राथमिकी (FIR) दर्ज करने हेतु आवेदन।

महोदय/महोदया,

मैं, ${data.name || '[आपका नाम]'}, निवासी ${data.address || '[आपका पता]'}, निवेदन करता/करती हूँ कि ${data.oppositeParty || '[आरोपी का नाम या अज्ञात व्यक्ति]'} द्वारा एक संज्ञेय अपराध किया गया है।

1. घटना की तिथि एवं समय:
${data.date || '[घटना की तारीख एवं समय]'}

2. घटना का पूरा विवरण:
${data.details || 'घटना के तथ्यों को स्पष्ट रूप से संक्षेप में लिखें।'}

अतः आपसे विनम्र निवेदन है कि मेरी इस लिखित शिकायत के आधार पर प्राथमिकी (FIR) दर्ज करने की कृपा करें एवं कानूनन नियमानुसार मुझे FIR की निःशुल्क प्रति प्रदान करें।

भवदीय,
(हस्ताक्षर)
नाम: ${data.name || '[आपका नाम]'}
संपर्क: ${data.phone || '[फोन नंबर]'}
दिनांक: ${new Date().toLocaleDateString()}`,
  },
  {
    id: 'labour',
    title_en: 'Labour Commissioner Complaint (Non-Payment / Delayed Salary)',
    title_hi: 'श्रम आयुक्त शिकायत (वेतन न मिलना या देरी)',
    authority_en: 'The Labour Commissioner / Conciliation Officer',
    authority_hi: 'श्रम आयुक्त / सुलह अधिकारी',
    subject_en: 'Complaint under Payment of Wages Act, 1936 regarding non-payment / unlawful withholding of salary.',
    subject_hi: 'वेतन भुगतान अधिनियम, 1936 के तहत वेतन रोके जाने/भुगतान न करने के संबंध में शिकायत।',
    template_en: (data) => `To,
${data.authority}
${data.city || '[Labour Office Location]'}

Subject: Complaint under Payment of Wages Act, 1936 regarding non-payment / unlawful withholding of salary.

Respected Sir/Madam,

I, ${data.name || '[Your Name]'}, was employed with ${data.oppositeParty || '[Employer / Company Name]'} located at ${data.oppositeAddress || '[Company Address]'}.

1. CLAIM AMOUNT:
My earned salary amounting to ₹${data.amount || '[Pending Salary Amount]'} for the period around ${data.date || '[Month/Year]'} has been unlawfully withheld/delayed without valid reason.

2. GRIEVANCE DETAILS:
${data.details || 'Despite repeated written reminders and emails, the employer has failed to release my rightful dues.'}

I request your esteemed office to intervene and direct the employer to release my pending wages along with statutory interest.

Yours faithfully,
Name: ${data.name || '[Your Name]'}
Contact: ${data.phone || '[Your Phone/Email]'}
Date: ${new Date().toLocaleDateString()}`,
    template_hi: (data) => `सेवा में,
${data.authority}
${data.city || '[श्रम कार्यालय का स्थान]'}

विषय: वेतन भुगतान अधिनियम, 1936 के तहत वेतन रोके जाने/भुगतान न करने के संबंध में शिकायत।

महोदय/महोदया,

मैं, ${data.name || '[आपका नाम]'}, ${data.oppositeParty || '[नियोक्ता/कंपनी का नाम]'}, पता: ${data.oppositeAddress || '[कंपनी का पता]'} में कार्यरत था/हूँ।

1. बकाया राशि:
दिनांक/महीना ${data.date || '[महीना/वर्ष]'} का मेरा अर्जित वेतन कुल ₹${data.amount || '[बकाया वेतन राशि]'} बिना किसी उचित कारण के अवैध रूप से रोका गया है।

2. शिकायत का विवरण:
${data.details || 'बार-बार लिखित रिमाइंडर और ईमेल भेजने के बावजूद नियोक्ता ने मेरा वेतन जारी नहीं किया है।'}

अतः आपसे निवेदन है कि इस मामले में हस्तक्षेप कर नियोक्ता को मेरा बकाया वेतन वैधानिक ब्याज सहित जारी करने का निर्देश दें।

भवदीय,
नाम: ${data.name || '[आपका नाम]'}
संपर्क: ${data.phone || '[फोन नंबर]'}
दिनांक: ${new Date().toLocaleDateString()}`,
  },
];

export default function ComplaintGenerator() {
  const { lang } = useLang();
  const [selectedCategory, setSelectedCategory] = useState(COMPLAINT_TEMPLATES[0].id);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    city: '',
    oppositeParty: '',
    oppositeAddress: '',
    amount: '',
    date: '',
    details: '',
  });
  const [letterLang, setLetterLang] = useState(lang);
  const [copied, setCopied] = useState(false);

  const activeTemplate = COMPLAINT_TEMPLATES.find(t => t.id === selectedCategory) || COMPLAINT_TEMPLATES[0];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatedText = letterLang === 'hi'
    ? activeTemplate.template_hi({ ...formData, authority: activeTemplate.authority_hi })
    : activeTemplate.template_en({ ...formData, authority: activeTemplate.authority_en });

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 24 }}>
      {/* Form Editor Section */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: 24,
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileText size={20} color="#22c55e" />
          <span>{lang === 'hi' ? '1. शिकायत का प्रकार और विवरण भरें' : '1. Fill Incident & Complaint Details'}</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
              {lang === 'hi' ? 'शिकायत की श्रेणी' : 'Complaint Category'}
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-subtle)',
                color: 'var(--text)',
                border: '1px solid var(--border-strong)',
                borderRadius: 12,
                padding: '10px 14px',
                fontSize: 14,
                fontWeight: 600,
                outline: 'none',
              }}
            >
              {COMPLAINT_TEMPLATES.map(item => (
                <option key={item.id} value={item.id}>
                  {lang === 'hi' ? item.title_hi : item.title_en}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                {lang === 'hi' ? 'आपका पूरा नाम' : 'Your Full Name'}
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '9px 12px',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                {lang === 'hi' ? 'शहर / जिला' : 'City / District'}
              </label>
              <input
                type="text"
                placeholder="e.g. New Delhi"
                value={formData.city}
                onChange={e => handleInputChange('city', e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '9px 12px',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                {lang === 'hi' ? 'विपक्षी / कंपनी का नाम' : 'Opposite Party / Company'}
              </label>
              <input
                type="text"
                placeholder="e.g. XYZ Electronics Store"
                value={formData.oppositeParty}
                onChange={e => handleInputChange('oppositeParty', e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '9px 12px',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                {lang === 'hi' ? 'राशि (यदि लागू हो ₹)' : 'Amount Involved (₹)'}
              </label>
              <input
                type="text"
                placeholder="e.g. 15,000"
                value={formData.amount}
                onChange={e => handleInputChange('amount', e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '9px 12px',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
              {lang === 'hi' ? 'घटना की तारीख' : 'Incident Date'}
            </label>
            <input
              type="text"
              placeholder="e.g. 10th July 2026"
              value={formData.date}
              onChange={e => handleInputChange('date', e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-subtle)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '9px 12px',
                fontSize: 13,
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
              {lang === 'hi' ? 'घटना का संक्षिप्त विवरण' : 'Brief Description of Facts'}
            </label>
            <textarea
              rows={4}
              placeholder={lang === 'hi' ? 'अपनी शिकायत या घटना का विवरण लिखें...' : 'Explain what happened and why you are seeking relief...'}
              value={formData.details}
              onChange={e => handleInputChange('details', e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-subtle)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '10px 12px',
                fontSize: 13,
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>
      </div>

      {/* Generated Letter Preview Section */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            {lang === 'hi' ? '2. तैयार शिकायत पत्र' : '2. Ready Complaint Letter'}
          </h3>

          <div style={{ display: 'flex', gap: 6, background: 'var(--bg-subtle)', padding: 4, borderRadius: 10, border: '1px solid var(--border)' }}>
            <button
              onClick={() => setLetterLang('en')}
              style={{
                background: letterLang === 'en' ? 'var(--accent)' : 'transparent',
                color: letterLang === 'en' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: 6,
                padding: '4px 10px',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              English
            </button>
            <button
              onClick={() => setLetterLang('hi')}
              style={{
                background: letterLang === 'hi' ? 'var(--accent)' : 'transparent',
                color: letterLang === 'hi' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: 6,
                padding: '4px 10px',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Letter Preview Box */}
        <pre style={{
          flex: 1,
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: 18,
          fontSize: 13,
          lineHeight: 1.6,
          color: 'var(--text)',
          whiteSpace: 'pre-wrap',
          fontFamily: 'inherit',
          overflowY: 'auto',
          maxHeight: 420,
          margin: '0 0 16px',
        }}>
          {generatedText}
        </pre>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button
            onClick={handleCopy}
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: copied ? '#22c55e' : 'var(--accent)',
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>
              {copied
                ? (lang === 'hi' ? 'पत्र कॉपी हो गया!' : 'Letter Copied!')
                : (lang === 'hi' ? 'पूरा पत्र कॉपी करें' : 'Copy Letter')}
            </span>
          </button>

          <button
            onClick={handlePrint}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 12,
              background: 'var(--bg-subtle)',
              color: 'var(--text)',
              border: '1px solid var(--border-strong)',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Printer size={16} />
            <span>{lang === 'hi' ? 'प्रिंट / PDF' : 'Print PDF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
