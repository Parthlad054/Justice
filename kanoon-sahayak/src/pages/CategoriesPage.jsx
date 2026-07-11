import { useLang } from '../context/LanguageContext';
import CategoryCard from '../components/home/CategoryCard';
import categories from '../data/categories.json';

export default function CategoriesPage() {
  const { lang } = useLang();
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontWeight: 800, fontSize: 28, color: '#e2e8f0', marginBottom: 8 }}>
          {lang === 'en' ? 'Browse Categories' : 'श्रेणियां'}
        </h1>
        <p style={{ color: '#64748b', fontSize: 15 }}>
          {lang === 'en'
            ? 'Select a category to explore laws, rights and step-by-step guidance.'
            : 'कानून, अधिकार और चरण-दर-चरण मार्गदर्शन के लिए एक श्रेणी चुनें।'}
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {categories.categories.map(cat => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </main>
  );
}
