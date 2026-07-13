import { useState, useMemo } from 'react';
import { Trophy, ChevronRight, RotateCcw, Share2, BookOpen, Zap, Target, MessageCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { ui } from '../utils/translate';
import QuizCard from '../components/quiz/QuizCard';
import allQuestions from '../data/quiz.json';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { whatsappShareQuiz } from '../utils/shareUtils';

/** Pick 3 questions seeded by today's date (same set for everyone each day) */
function getDailyQuestions() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const qs = [...allQuestions.questions];
  // Simple seeded shuffle using date as seed
  let s = seed;
  for (let i = qs.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [qs[i], qs[j]] = [qs[j], qs[i]];
  }
  return qs.slice(0, 3);
}

export default function QuizPage() {
  const { lang } = useLang();
  const [stats, setStats] = useLocalStorage('kanoon_quiz_stats', { totalAnswered: 0, totalCorrect: 0 });

  const questions = useMemo(() => getDailyQuestions(), []);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]); // array of booleans
  const [sessionAnswered, setSessionAnswered] = useState(false); // has current Q been answered
  const [finished, setFinished] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);

  function handleAnswer(isCorrect) {
    setSessionAnswered(true);
    setAnswers(prev => [...prev, isCorrect]);
    if (isCorrect) setSessionScore(prev => prev + 1);
    // Update cumulative stats
    setStats(prev => ({
      totalAnswered: prev.totalAnswered + 1,
      totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
    }));
  }

  function handleNext() {
    if (currentIdx + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIdx(prev => prev + 1);
      setSessionAnswered(false);
    }
  }

  function handleRestart() {
    setCurrentIdx(0);
    setAnswers([]);
    setSessionAnswered(false);
    setFinished(false);
    setSessionScore(0);
  }

  function handleShare() {
    const text = lang === 'hi'
      ? `मैंने आज Kanoon Sahayak की दैनिक क्विज़ में ${sessionScore}/${questions.length} स्कोर किया! अपने कानूनी अधिकार जानें।`
      : `I scored ${sessionScore}/${questions.length} on today's Kanoon Sahayak Daily Law Quiz! Know your legal rights.`;
    if (navigator.share) {
      navigator.share({ title: 'Kanoon Sahayak Quiz', text });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  }

  function handleWhatsAppShare() {
    window.open(whatsappShareQuiz(sessionScore, questions.length, lang), '_blank');
  }

  const accuracy = stats.totalAnswered > 0
    ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
    : 0;

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(239,68,68,0.06), transparent)',
        border: '1px solid rgba(249,115,22,0.22)',
        borderRadius: 24, padding: '32px 28px', marginBottom: 32,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40, width: 160, height: 160,
          borderRadius: '50%', background: '#f97316', opacity: 0.07, filter: 'blur(40px)',
        }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(249,115,22,0.18)', color: '#f97316', padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
          <Zap size={13} />
          <span>{ui('daily_quiz', lang)}</span>
        </div>
        <h1 style={{ color: 'var(--text)', fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
          {ui('daily_quiz', lang)}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
          {ui('daily_quiz_subtitle', lang)}
        </p>
      </div>

      {/* Cumulative Stats Row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28,
      }}>
        {[
          { icon: <Target size={18} color="#f97316" />, label: lang === 'hi' ? 'कुल उत्तर' : 'Total Answered', value: stats.totalAnswered, color: '#f97316' },
          { icon: <Trophy size={18} color="#22c55e" />, label: lang === 'hi' ? 'कुल सही' : 'Total Correct', value: stats.totalCorrect, color: '#22c55e' },
          { icon: <Zap size={18} color="#3b82f6" />, label: lang === 'hi' ? 'सटीकता' : 'Accuracy', value: `${accuracy}%`, color: '#3b82f6' },
        ].map(({ icon, label, value, color }) => (
          <div key={label} style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 16, padding: '16px 14px', textAlign: 'center',
            boxShadow: 'var(--card-shadow)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>{icon}</div>
            <div style={{ color, fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 800 }}>{value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Quiz Card or Results */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 24, padding: '28px 24px',
        boxShadow: 'var(--card-shadow)',
      }}>
        {!finished ? (
          <>
            <QuizCard
              question={questions[currentIdx]}
              onAnswer={handleAnswer}
              questionIndex={currentIdx}
              total={questions.length}
              key={currentIdx}
            />

            {sessionAnswered && (
              <button
                onClick={handleNext}
                style={{
                  marginTop: 20, width: '100%',
                  background: 'linear-gradient(135deg, #f97316, #ef4444)',
                  color: '#fff', border: 'none', borderRadius: 14,
                  padding: '14px 20px', fontSize: 15, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8, transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                {currentIdx + 1 >= questions.length ? ui('finish_quiz', lang) : ui('next_question', lang)}
                <ChevronRight size={18} />
              </button>
            )}
          </>
        ) : (
          /* Results Screen */
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>
              {sessionScore === questions.length ? '🏆' : sessionScore >= 2 ? '🎉' : '📚'}
            </div>
            <h2 style={{ color: 'var(--text)', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
              {ui('quiz_complete', lang)}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
              {lang === 'hi'
                ? `आपने ${questions.length} में से ${sessionScore} सही उत्तर दिए`
                : `You got ${sessionScore} out of ${questions.length} correct`}
            </p>

            {/* Score Ring */}
            <div style={{
              width: 100, height: 100, borderRadius: '50%', margin: '0 auto 24px',
              background: `conic-gradient(#f97316 ${(sessionScore / questions.length) * 360}deg, var(--border) 0)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 76, height: 76, borderRadius: '50%',
                background: 'var(--bg-card)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 800, color: '#f97316',
              }}>
                {sessionScore}/{questions.length}
              </div>
            </div>

            {/* Answer review */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
              {answers.map((correct, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: correct ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                  border: `2px solid ${correct ? '#22c55e' : '#ef4444'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                  color: correct ? '#22c55e' : '#ef4444',
                }}>
                  {i + 1}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={handleRestart}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'var(--bg-subtle)', border: '1px solid var(--border)',
                  color: 'var(--text)', padding: '12px 20px', borderRadius: 12,
                  fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.color = '#f97316'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
              >
                <RotateCcw size={15} /> {ui('play_again', lang)}
              </button>
              <button
                onClick={handleWhatsAppShare}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: '#25D366',
                  border: 'none', color: '#fff', padding: '12px 20px',
                  borderRadius: 12, fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <MessageCircle size={15} /> WhatsApp
              </button>
              <button
                onClick={handleShare}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'linear-gradient(135deg, #f97316, #ef4444)',
                  border: 'none', color: '#fff', padding: '12px 20px',
                  borderRadius: 12, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <Share2 size={15} /> {ui('share_score', lang)}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div style={{
        marginTop: 24, padding: '12px 16px', borderRadius: 12,
        background: 'var(--bg-subtle)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'flex-start', gap: 8,
      }}>
        <BookOpen size={14} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
        <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
          {ui('disclaimer', lang)}
        </p>
      </div>
    </main>
  );
}
