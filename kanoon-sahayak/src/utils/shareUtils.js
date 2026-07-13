/**
 * Generate a structured, pre-formatted legal rights card text for WhatsApp and social sharing.
 */
export function formatWhatsAppLawTemplate(law, lang = 'en') {
  const title = lang === 'hi' ? law.title_hi : law.title_en;
  const explanation = lang === 'hi' ? law.explanation_hi : law.explanation_en;
  const penalty = lang === 'hi' ? law.penalty_hi : law.penalty_en;
  const rights = lang === 'hi' ? (law.key_rights_hi || []) : (law.key_rights_en || []);
  const url = `${window.location.origin}/law/${law.id}`;

  const rightsFormatted = rights.length > 0
    ? rights.slice(0, 3).map(r => `• ${r}`).join('\n')
    : '';

  if (lang === 'hi') {
    return `⚖️ *अपने अधिकार जानें — भारत* 🇮🇳
*${title}*

📜 *कानूनी प्रावधान:* ${law.act_section || 'भारतीय कानून'}
${penalty ? `⚠️ *जुर्माना / सजा:* ${penalty}\n` : ''}
💡 *नागरिक अधिकार:*
${rightsFormatted || explanation}

👉 *कार्रवाई के चरण और पूरी जानकारी देखें:*
${url}

_Kanoon Sahayak द्वारा साझा किया गया — निःशुल्क कानूनी सहायता_`;
  }

  return `⚖️ *Know Your Legal Right — India* 🇮🇳
*${title}*

📜 *Legal Authority:* ${law.act_section || 'Indian Law'}
${penalty ? `⚠️ *Penalty / Fine:* ${penalty}\n` : ''}
💡 *Key Citizen Rights:*
${rightsFormatted || explanation}

👉 *Read steps to take & escalation guide:*
${url}

_Shared via Kanoon Sahayak — Free Bilingual Legal Guide_`;
}

/**
 * Generate a WhatsApp shareable message for daily quiz score.
 */
export function formatWhatsAppQuizTemplate(score, total = 3, lang = 'en') {
  const url = `${window.location.origin}/quiz`;
  if (lang === 'hi') {
    return `🔥 *मेरा दैनिक कानूनी ज्ञान स्कोर!* 🇮🇳

मैंने आज Kanoon Sahayak क्विज़ में *${score}/${total}* स्कोर किया! ⚖️
क्या आप अपने भारतीय कानूनी अधिकारों को जानते हैं?

👉 *आज का क्विज़ खेलें:*
${url}`;
  }

  return `🔥 *My Daily Legal Literacy Score!* 🇮🇳

I scored *${score}/${total}* on today's Kanoon Sahayak Quiz! ⚖️
Do you know your Indian legal rights?

👉 *Take today's quiz:*
${url}`;
}

/**
 * Build WhatsApp share URL for a law using the rich template.
 */
export function whatsappShare(law, lang = 'en') {
  const msg = formatWhatsAppLawTemplate(law, lang);
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

/**
 * Build WhatsApp share URL for a quiz score.
 */
export function whatsappShareQuiz(score, total = 3, lang = 'en') {
  const msg = formatWhatsAppQuizTemplate(score, total, lang);
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

/**
 * Share a law using the Web Share API, with clipboard fallback.
 */
export async function shareLaw(law, lang = 'en') {
  const title = lang === 'hi' ? law.title_hi : law.title_en;
  const text = formatWhatsAppLawTemplate(law, lang);
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
      await navigator.clipboard.writeText(text);
      return 'copied';
    } catch {
      return 'error';
    }
  }
}
