import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { ui } from '../../utils/translate';

export default function SearchBar({ autoFocus = false, initialValue = '' }) {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) navigate(`/search?q=${encodeURIComponent(value.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%' }}>
      <Search
        size={18} color="#64748b"
        style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
      />
      <input
        id="main-search"
        type="text"
        className="search-input"
        placeholder={ui('search_placeholder', lang)}
        value={value}
        onChange={e => setValue(e.target.value)}
        autoFocus={autoFocus}
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue('')}
          style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', color: '#64748b', cursor: 'pointer',
            display: 'flex', alignItems: 'center',
          }}
        >
          <X size={16} />
        </button>
      )}
    </form>
  );
}
