import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { ui } from '../utils/translate';
import { useSearch } from '../hooks/useSearch';
import SearchBar from '../components/home/SearchBar';
import LawCard from '../components/law/LawCard';
import { EmptyState } from '../components/common/Common';
import categoriesData from '../data/categories.json';

const CATEGORY_COLORS = {
  traffic: '#f97316', consumer: '#22c55e', police: '#3b82f6',
  'women-safety': '#ec4899', 'cyber-crime': '#ef4444', employment: '#a855f7',
  'rent-property': '#14b8a6', 'marriage-family': '#eab308',
};

export default function SearchResultsPage() {
  const { lang } = useLang();
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const results = useSearch(query);
  const [activeFilter, setActiveFilter] = useState('all');

  // Get categories that appear in results
  const presentCategories = useMemo(() => {
    const cats = [...new Set(results.map(r => r.category))];
    return cats;
  }, [results]);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return results;
    return results.filter(r => r.category === activeFilter);
  }, [results, activeFilter]);

  const categories = categoriesData.categories;

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
      <div style={{ marginBottom: 24, maxWidth: 600 }}>
        <SearchBar initialValue={query} autoFocus />
      </div>

      {query && (
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>
          {ui('search_results_for', lang)}: <strong style={{ color: 'var(--text)' }}>"{query}"</strong>
          {' · '}
          <span style={{ color: 'var(--text-muted)' }}>{results.length} {lang === 'en' ? 'results' : 'परिणाम'}</span>
        </p>
      )}

      {/* Category filter chips */}
      {results.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          <button
            onClick={() => setActiveFilter('all')}
            style={{
              padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
              border: `1.5px solid ${activeFilter === 'all' ? '#f97316' : 'var(--border)'}`,
              background: activeFilter === 'all' ? 'rgba(249,115,22,0.12)' : 'var(--bg-subtle)',
              color: activeFilter === 'all' ? '#f97316' : 'var(--text-muted)',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {ui('all_results', lang)} ({results.length})
          </button>
          {presentCategories.map(catId => {
            const cat = categories.find(c => c.id === catId);
            if (!cat) return null;
            const color = CATEGORY_COLORS[catId] || '#f97316';
            const isActive = activeFilter === catId;
            const count = results.filter(r => r.category === catId).length;
            const label = lang === 'hi' ? cat.title_hi : cat.title_en;

            return (
              <button
                key={catId}
                onClick={() => setActiveFilter(catId)}
                style={{
                  padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                  border: `1.5px solid ${isActive ? color : 'var(--border)'}`,
                  background: isActive ? `${color}15` : 'var(--bg-subtle)',
                  color: isActive ? color : 'var(--text-muted)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
      )}

      {query && filtered.length === 0 && results.length > 0 ? (
        <EmptyState
          title={lang === 'en' ? 'No results in this category' : 'इस श्रेणी में कोई परिणाम नहीं'}
          subtitle={lang === 'en' ? 'Try selecting a different filter' : 'अलग फ़िल्टर चुनें'}
          icon="🔍"
        />
      ) : query && results.length === 0 ? (
        <EmptyState
          title={ui('no_results', lang)}
          subtitle={ui('try_different', lang)}
          icon="🔍"
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {filtered.map(law => (
            <LawCard key={law.id} law={law} />
          ))}
        </div>
      )}

      {!query && (
        <EmptyState
          title={lang === 'en' ? 'Start searching' : 'खोजना शुरू करें'}
          subtitle={lang === 'en' ? 'Type a keyword like "FIR", "challan", or "salary"' : '"FIR", "चालान", या "वेतन" जैसा कीवर्ड टाइप करें'}
          icon="🔎"
        />
      )}
    </main>
  );
}
