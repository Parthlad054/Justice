import { useSearchParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { ui } from '../utils/translate';
import { useSearch } from '../hooks/useSearch';
import SearchBar from '../components/home/SearchBar';
import LawCard from '../components/law/LawCard';
import { EmptyState } from '../components/common/Common';

export default function SearchResultsPage() {
  const { lang } = useLang();
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const results = useSearch(query);

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
      <div style={{ marginBottom: 28, maxWidth: 600 }}>
        <SearchBar initialValue={query} autoFocus />
      </div>

      {query && (
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
          {ui('search_results_for', lang)}: <strong style={{ color: 'var(--text)' }}>"{query}"</strong>
          {' · '}
          <span style={{ color: 'var(--text-muted)' }}>{results.length} {lang === 'en' ? 'results' : 'परिणाम'}</span>
        </p>
      )}

      {query && results.length === 0 ? (
        <EmptyState
          title={ui('no_results', lang)}
          subtitle={ui('try_different', lang)}
          icon="🔍"
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {results.map(law => (
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
