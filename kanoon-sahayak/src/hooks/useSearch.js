import { useState, useMemo } from 'react';
import laws from '../data/laws.json';

export function useSearch(query) {
  const results = useMemo(() => {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();
    return laws.laws.filter(law => {
      return (
        law.title_en.toLowerCase().includes(q) ||
        law.title_hi.includes(q) ||
        law.explanation_en.toLowerCase().includes(q) ||
        law.explanation_hi.includes(q) ||
        law.tags.some(tag => tag.toLowerCase().includes(q)) ||
        law.category.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return results;
}
