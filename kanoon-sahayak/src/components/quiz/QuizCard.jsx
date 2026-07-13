import { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, Lightbulb } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { ui } from '../../utils/translate';

const CATEGORY_COLORS = {
  traffic: '#f97316',
  consumer: '#22c55e',
  police: '#3b82f6',
  'women-safety': '#ec4899',
  'cyber-crime': '#ef4444',
  employment: '#a855f7',
  'rent-property': '#14b8a6',
  'marriage-family': '#eab308',
};

export default function QuizCard({ question, onAnswer, questionIndex, total }) {
  const { lang } = useLang();
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const options = lang === 'hi' ? question.options_hi : question.options_en;
  const questionText = lang === 'hi' ? question.question_hi : question.question_en;
  const explanation = lang === 'hi' ? question.explanation_hi : question.explanation_en;
  const color = CATEGORY_COLORS[question.category] || '#f97316';
  const answered = selected !== null;

  function handleSelect(idx) {
    if (answered) return;
    setSelected(idx);
    onAnswer(idx === question.correct);
  }

  function getOptionStyle(idx) {
    const base = {
      width: '100%',
      textAlign: 'left',
      padding: '14px 18px',
      borderRadius: 14,
      border: '1.5px solid var(--border)',
      background: 'var(--bg-subtle)',
      color: 'var(--text)',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.5,
      cursor: answered ? 'default' : 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    };
    if (!answered) return base;
    if (idx === question.correct) {
      return { ...base, background: 'rgba(34,197,94,0.12)', borderColor: '#22c55e', color: '#22c55e' };
    }
    if (idx === selected && idx !== question.correct) {
      return { ...base, background: 'rgba(239,68,68,0.12)', borderColor: '#ef4444', color: '#ef4444' };
    }
    return { ...base, opacity: 0.5 };
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Progress + Category */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100,
          background: `${color}18`, color, border: `1px solid ${color}40`,
          textTransform: 'capitalize',
        }}>
          {question.category.replace('-', ' ')}
        </span>
        <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>
          {ui('question_of', lang)} {questionIndex + 1} {ui('of', lang)} {total}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${((questionIndex + 1) / total) * 100}%`,
          background: `linear-gradient(90deg, ${color}, ${color}bb)`,
          borderRadius: 4,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Question */}
      <p style={{
        color: 'var(--text)', fontSize: 'clamp(15px, 2.5vw, 18px)',
        fontWeight: 700, lineHeight: 1.6, margin: 0,
      }}>
        {questionText}
      </p>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map((opt, idx) => (
          <button
            key={idx}
            style={getOptionStyle(idx)}
            onClick={() => handleSelect(idx)}
            onMouseEnter={e => {
              if (!answered) {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.background = `${color}10`;
              }
            }}
            onMouseLeave={e => {
              if (!answered) {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.background = 'var(--bg-subtle)';
              }
            }}
          >
            <span style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 12,
              background: answered
                ? (idx === question.correct ? 'rgba(34,197,94,0.2)' : idx === selected ? 'rgba(239,68,68,0.2)' : 'var(--border)')
                : `${color}18`,
              color: answered
                ? (idx === question.correct ? '#22c55e' : idx === selected ? '#ef4444' : 'var(--text-muted)')
                : color,
            }}>
              {answered ? (
                idx === question.correct
                  ? <CheckCircle2 size={14} />
                  : idx === selected
                    ? <XCircle size={14} />
                    : ['A', 'B', 'C', 'D'][idx]
              ) : ['A', 'B', 'C', 'D'][idx]}
            </span>
            {opt}
          </button>
        ))}
      </div>

      {/* Feedback + Explanation */}
      {answered && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Result badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 12,
            background: selected === question.correct ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${selected === question.correct ? '#22c55e40' : '#ef444440'}`,
            color: selected === question.correct ? '#22c55e' : '#ef4444',
            fontWeight: 700, fontSize: 14,
          }}>
            {selected === question.correct
              ? <><CheckCircle2 size={16} /> {ui('correct', lang)}</>
              : <><XCircle size={16} /> {ui('incorrect', lang)}</>
            }
          </div>

          {/* Explanation toggle */}
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'transparent', border: 'none',
              color: '#f97316', fontWeight: 600, fontSize: 13,
              cursor: 'pointer', padding: 0,
            }}
          >
            <Lightbulb size={15} />
            {ui('see_explanation', lang)}
          </button>

          {showExplanation && (
            <div style={{
              background: 'rgba(249,115,22,0.06)',
              border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: 12, padding: '14px 16px',
              fontSize: 13, color: 'var(--text)', lineHeight: 1.7,
            }}>
              {explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
