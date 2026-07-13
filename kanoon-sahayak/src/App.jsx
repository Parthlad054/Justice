import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import LawDetailPage from './pages/LawDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';
import ToolsPage from './pages/ToolsPage';
import QuizPage from './pages/QuizPage';
import { EmptyState } from './components/common/Common';

function NotFoundPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
      <EmptyState title="404 — Page not found" subtitle="The page you're looking for doesn't exist." icon="🔍" />
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/category/:id" element={<CategoryDetailPage />} />
                <Route path="/law/:id" element={<LawDetailPage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
