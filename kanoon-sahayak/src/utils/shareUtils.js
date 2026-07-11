/**
 * Share a law using the Web Share API, with clipboard fallback.
 */
export async function shareLaw(law, lang = 'en') {
  const title = lang === 'hi' ? law.title_hi : law.title_en;
  const text = lang === 'hi'
    ? `${law.title_hi}\n\n${law.explanation_hi}\n\nAct: ${law.act_section}`
    : `${law.title_en}\n\n${law.explanation_en}\n\nAct: ${law.act_section}`;
  const url = `${window.location.origin}/law/${law.id}`;

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return 'shared';
    } catch {
      // User cancelled
      return 'cancelled';
    }
  } else {
    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(`${title}\n${url}`);
      return 'copied';
    } catch {
      return 'error';
    }
  }
}

/**
 * Build WhatsApp share URL for a law.
 */
export function whatsappShare(law, lang = 'en') {
  const title = lang === 'hi' ? law.title_hi : law.title_en;
  const url = `${window.location.origin}/law/${law.id}`;
  const msg = encodeURIComponent(`${title} — Kanoon Sahayak\n${url}`);
  return `https://wa.me/?text=${msg}`;
}
