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
    all_laws: 'All Laws',
    tools: 'Tools',
    tools_title: 'Legal Empowerment Tools & Helplines',
    tools_subtitle: 'Practical tools to assert your rights and emergency helplines to get immediate assistance.',
    emergency_helplines: 'National Emergency Helplines',
    search_helplines: 'Search helplines by name or number...',
    call_now: 'Call Now',
    empowerment_tools: 'Citizen Empowerment Suite',
    coming_soon: 'Coming Soon (Phase 2)',
    preview_tool: 'Explore Tool Preview',
    // Quiz
    quiz: 'Quiz',
    daily_quiz: 'Daily Law Quiz',
    daily_quiz_subtitle: 'Test your legal knowledge — 3 questions from today\'s set',
    your_score: 'Your Score',
    total_answered: 'Total Answered',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    next_question: 'Next Question',
    see_explanation: 'See Explanation',
    finish_quiz: 'Finish Quiz',
    quiz_complete: 'Quiz Complete!',
    play_again: 'Play Again',
    share_score: 'Share Score',
    question_of: 'Question',
    of: 'of',
    // Escalation Ladder
    escalation_ladder: 'Escalation Ladder',
    escalation_subtitle: 'If step 1 fails, try step 2 — your complete action path',
    // What To Say Scripts
    scripts: 'Scripts',
    what_to_say: 'What To Say',
    what_to_say_title: '"What To Say" Scripts',
    what_to_say_subtitle: 'Polite, legally-informed scripts for common confrontation situations',
    copy_script: 'Copy Script',
    script_copied: 'Copied!',
    all_categories: 'All',
    // Search filters
    filter_by: 'Filter by category',
    all_results: 'All Results',
    // WhatsApp Share Templates (Phase 3A)
    share_whatsapp: 'Share on WhatsApp',
    share_template_preview: 'Preview WhatsApp Message',
    send_whatsapp: 'Send via WhatsApp',
    copy_template: 'Copy Text Template',
    template_copied: 'Template Copied!',
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
    tools: 'कानूनी उपकरण',
    tools_title: 'कानूनी सशक्तिकरण उपकरण एवं हेल्पलाइन',
    tools_subtitle: 'अपने अधिकारों की रक्षा करने के व्यावहारिक साधन और तुरंत सहायता के लिए राष्ट्रीय हेल्पलाइन।',
    emergency_helplines: 'राष्ट्रीय आपातकालीन हेल्पलाइन',
    search_helplines: 'हेल्पलाइन नाम या नंबर से खोजें...',
    call_now: 'कॉल करें',
    empowerment_tools: 'नागरिक सशक्तिकरण सुइट',
    coming_soon: 'जल्द आ रहा है (चरण 2)',
    preview_tool: 'उपकरण विवरण देखें',
    // Quiz
    quiz: 'क्विज़',
    daily_quiz: 'दैनिक कानून क्विज़',
    daily_quiz_subtitle: 'अपनी कानूनी जानकारी परखें — आज के 3 प्रश्न',
    your_score: 'आपका स्कोर',
    total_answered: 'कुल उत्तर दिए',
    correct: 'सही!',
    incorrect: 'गलत',
    next_question: 'अगला प्रश्न',
    see_explanation: 'व्याख्या देखें',
    finish_quiz: 'क्विज़ समाप्त करें',
    quiz_complete: 'क्विज़ पूर्ण!',
    play_again: 'फिर खेलें',
    share_score: 'स्कोर शेयर करें',
    question_of: 'प्रश्न',
    of: 'में से',
    // Escalation Ladder
    escalation_ladder: 'एस्केलेशन सीढ़ी',
    escalation_subtitle: 'चरण 1 विफल हो तो चरण 2 — आपका पूरा कार्य मार्ग',
    // What To Say Scripts
    scripts: 'स्क्रिप्ट',
    what_to_say: 'क्या कहें',
    what_to_say_title: '"क्या कहें" स्क्रिप्ट',
    what_to_say_subtitle: 'सामान्य विवाद की स्थितियों के लिए विनम्र, कानूनी रूप से सूचित स्क्रिप्ट',
    copy_script: 'स्क्रिप्ट कॉपी करें',
    script_copied: 'कॉपी हो गया!',
    all_categories: 'सभी',
    // Search filters
    filter_by: 'श्रेणी से फ़िल्टर करें',
    all_results: 'सभी परिणाम',
    // WhatsApp Share Templates (Phase 3A)
    share_whatsapp: 'WhatsApp पर शेयर करें',
    share_template_preview: 'शेयर संदेश का पूर्वावलोकन',
    send_whatsapp: 'WhatsApp से भेजें',
    copy_template: 'पूरा संदेश कॉपी करें',
    template_copied: 'संदेश कॉपी हो गया!',
  },
};

export function ui(key, lang = 'en') {
  return strings[lang]?.[key] || strings['en'][key] || key;
}
