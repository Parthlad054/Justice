/**
 * Returns the correct field for the current language.
 * @param {object} obj - Data object with _en and _hi variants
 * @param {string} field - Base field name e.g. 'title', 'explanation'
 * @param {string} lang - 'en' or 'hi'
 */
export function t(obj, field, lang = 'en') {
  const key = `${field}_${lang}`;
  return obj[key] || obj[`${field}_en`] || '';
}

/**
 * Simple string translation helper for static UI strings.
 */
export const strings = {
  en: {
    search_placeholder: 'Search laws, rights, topics...',
    categories: 'Categories',
    home: 'Home',
    faq: 'FAQ',
    about: 'About',
    view_details: 'View Details',
    key_rights: 'Key Rights',
    what_to_do: 'What Should You Do?',
    act_section: 'Act / Section',
    penalty: 'Penalty',
    share: 'Share',
    copy_link: 'Copy Link',
    copied: 'Copied!',
    back: '← Back',
    law_of_day: 'Law of the Day',
    no_results: 'No results found',
    try_different: 'Try a different keyword',
    search_results_for: 'Search results for',
    disclaimer: 'This is general legal information, not professional legal advice. For serious matters, consult a licensed lawyer or NALSA (15100) for free legal aid.',
    helplines: 'Emergency Helplines',
    all_laws: 'All Laws',
  },
  hi: {
    search_placeholder: 'कानून, अधिकार, विषय खोजें...',
    categories: 'श्रेणियां',
    home: 'होम',
    faq: 'सामान्य प्रश्न',
    about: 'हमारे बारे में',
    view_details: 'विवरण देखें',
    key_rights: 'मुख्य अधिकार',
    what_to_do: 'आपको क्या करना चाहिए?',
    act_section: 'अधिनियम / धारा',
    penalty: 'दंड',
    share: 'शेयर करें',
    copy_link: 'लिंक कॉपी करें',
    copied: 'कॉपी हो गया!',
    back: '← वापस',
    law_of_day: 'आज का कानून',
    no_results: 'कोई परिणाम नहीं मिला',
    try_different: 'कोई अलग कीवर्ड आज़माएं',
    search_results_for: 'खोज परिणाम',
    disclaimer: 'यह सामान्य कानूनी जानकारी है, पेशेवर कानूनी सलाह नहीं। गंभीर मामलों के लिए, लाइसेंस प्राप्त वकील से परामर्श करें या मुफ्त कानूनी सहायता के लिए NALSA (15100) से संपर्क करें।',
    helplines: 'आपातकालीन हेल्पलाइन',
    all_laws: 'सभी कानून',
  },
};

export function ui(key, lang = 'en') {
  return strings[lang]?.[key] || strings['en'][key] || key;
}
