import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t } from '../utils/translate';
import LawCard from '../components/law/LawCard';
import { EmptyState } from '../components/common/Common';
import categories from '../data/categories.json';
import laws from '../data/laws.json';

export default function CategoryDetailPage() {
  const { id } = useParams();
  const { lang } = useLang();
  const cat = categories.categories.find(c => c.id === id);
  const catLaws = laws.laws.filter(l => l.category === id);

  if (!cat) return <EmptyState title="Category not found" icon="🔍" />;

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
      <Link to="/categories" className="btn-ghost" style={{ padding: '8px 16px', fontSize: 13, display: 'inline-flex', marginBottom: 24 }}>
        <ArrowLeft size={15} /> {lang === 'en' ? 'Back to Categories' : 'श्रेणियों पर वापस'}
      </Link>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>
          {getCategoryEmoji(id)}
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 28, color: '#e2e8f0', marginBottom: 8 }}>
          {t(cat, 'title', lang)}
        </h1>
        <p style={{ color: '#64748b', fontSize: 15 }}>
          {t(cat, 'description', lang)}
        </p>
      </div>

      {catLaws.length === 0 ? (
        <EmptyState
          title={lang === 'en' ? 'No laws yet' : 'अभी कोई कानून नहीं'}
          subtitle={lang === 'en' ? 'Content coming soon.' : 'सामग्री जल्द आ रही है।'}
          icon="📋"
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {catLaws.map(law => (
            <LawCard key={law.id} law={law} />
          ))}
        </div>
      )}
    </main>
  );
}

function getCategoryEmoji(id) {
  const map = { 'traffic': '🚦', 'consumer': '🛒', 'police': '🛡️', 'women-safety': '👩‍⚖️', 'cyber-crime': '💻', 'employment': '💼', 'rent-property': '🏠', 'marriage-family': '👨‍👩‍👧' };
  return map[id] || '📋';
}
