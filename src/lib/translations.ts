export type Language = 'en' | 'te' | 'ta' | 'ja' | 'zh' | 'hi' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ko' | 'ar' | 'bn' | 'mr' | 'gu' | 'kn' | 'ml' | 'pa' | 'vi' | 'tr' | 'pl' | 'nl' | 'el' | 'he' | 'th' | 'id' | 'ms' | 'fil' | 'sv';

export const LANGUAGES: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'te', name: 'Telugu (తెలుగు)' },
    { code: 'ta', name: 'Tamil (தமிழ்)' },
    { code: 'ja', name: 'Japanese (日本語)' },
    { code: 'zh', name: 'Chinese (中文)' },
    { code: 'hi', name: 'Hindi (హిन्दी)' },
    { code: 'es', name: 'Spanish (Español)' },
    { code: 'fr', name: 'French (Français)' },
    { code: 'de', name: 'German (Deutsch)' },
    { code: 'it', name: 'Italian (Italiano)' },
    { code: 'pt', name: 'Portuguese (Português)' },
    { code: 'ru', name: 'Russian (Русский)' },
    { code: 'ko', name: 'Korean (한국어)' },
    { code: 'ar', name: 'Arabic (العربية)' },
    { code: 'bn', name: 'Bengali (বাংলা)' },
    { code: 'mr', name: 'Marathi (మరాઠી)' },
    { code: 'gu', name: 'Gujarati (గుજરાతీ)' },
    { code: 'kn', name: 'Kannada (కನ್ನಡ)' },
    { code: 'ml', name: 'Malayalam (മലയാളం)' },
    { code: 'pa', name: 'Punjabi (ప్ంజాబీ)' },
    { code: 'vi', name: 'Vietnamese (Tiếng Việt)' },
    { code: 'tr', name: 'Turkish (Türkçe)' },
    { code: 'pl', name: 'Polish (Polski)' },
    { code: 'nl', name: 'Dutch (Nederlands)' },
    { code: 'el', name: 'Greek (Ελληνικά)' },
    { code: 'he', name: 'Hebrew (עבריత)' },
    { code: 'th', name: 'Thai (ไทย)' },
    { code: 'id', name: 'Indonesian (Bahasa Indonesia)' },
    { code: 'ms', name: 'Malay (Bahasa Melayu)' },
    { code: 'fil', name: 'Filipino (Tagalog)' },
    { code: 'sv', name: 'Swedish (Svenska)' },
];

const baseEn = {
    nav: { home: 'Home', about: 'About me', education: 'Education', projects: 'Projects', certificates: 'Certificates', internships: 'Internships', skills: 'Skills', contact: 'Contact', resume: 'RESUME' },
    hero: { role: 'Full-Stack Developer & UI/UX Enthusiast', name: 'PENJENDRU VARUN', bio: '“I’m a passionate Full-Stack Developer and UI/UX enthusiast, currently pursuing B.E CSE at RMKCET. I love building practical applications and solving real-world problems through technology.”', viewProjects: 'View Projects', contactMe: 'Contact Me' },
    about: { title: 'About Me', subtitle: 'I am Varun, a Full Stack Developer', description1: 'I am currently in my 3rd year of B.E Computer Science and Engineering at RMKCET. My journey is fueled by a relentless drive to master full-stack development and create seamless digital experiences.', description2: 'Beyond basic development, I dive deep into system architecture and modern frameworks to build robust, scalable solutions. I believe in continuous learning and pushing the boundaries of what is possible with code.', cgpa: 'Current CGPA', gradYear: 'Graduation Year' },
    education: { title: 'Academic Journey' },
    projects: { title: 'Project Timeline', subtitle: 'A visual journey through my development and design milestones.' },
    certificates: { title: 'Verified Achievements', subtitle: 'A collection of my professional certifications and honors.' },
    skills: { title: 'Tools & Technology' },
    contact: { title: 'Get in Touch', subtitle: "Let's build something amazing together.", name: 'Full Name', email: 'Email Address', message: 'Queries', send: 'Send Message' },
    settings: { title: 'Settings', bg: 'Background Color', lang: 'Select Language', rating: 'Rate Experience', logout: 'Logout' }
};

export const translations: Record<Language, typeof baseEn> = {
    en: baseEn,
    te: { ...baseEn, nav: { ...baseEn.nav, about: 'గురించి', education: 'విద్య', projects: 'ప్రాజెక్ట్‌లు', skills: 'నైపుణ్యాలు', contact: 'సంప్రదించండి', resume: 'రెజ్యూమే' }, hero: { ...baseEn.hero, name: 'పెన్జెండ్రు వరుణ్' }, education: { title: 'విద్యా ప్రయాణం' } },
    ta: { ...baseEn, nav: { ...baseEn.nav, about: 'பற்றி', education: 'கல்வி', projects: 'திட்டங்கள்', skills: 'திறன்கள்', contact: 'தொடர்பு', resume: 'சுயவிவரம்' }, hero: { ...baseEn.hero, name: 'பென்ஜேன்று வருண்' } },
    ja: { ...baseEn, nav: { ...baseEn.nav, about: '概要', education: '教育', projects: 'プロジェクト', skills: 'スキル', contact: 'お問い合わせ', resume: '履歴書' }, hero: { ...baseEn.hero, name: 'ペンジェンドル・ヴァルン' } },
    zh: { ...baseEn, nav: { ...baseEn.nav, about: '关于', education: '教育', projects: '项目', skills: '技能', contact: '联系', resume: '简历' }, hero: { ...baseEn.hero, name: '彭金德鲁·瓦伦' } },
    hi: { ...baseEn }, es: { ...baseEn }, fr: { ...baseEn }, de: { ...baseEn }, it: { ...baseEn }, pt: { ...baseEn }, ru: { ...baseEn }, ko: { ...baseEn }, ar: { ...baseEn }, bn: { ...baseEn }, mr: { ...baseEn }, gu: { ...baseEn }, kn: { ...baseEn }, ml: { ...baseEn }, pa: { ...baseEn }, vi: { ...baseEn }, tr: { ...baseEn }, pl: { ...baseEn }, nl: { ...baseEn }, el: { ...baseEn }, he: { ...baseEn }, th: { ...baseEn }, id: { ...baseEn }, ms: { ...baseEn }, fil: { ...baseEn }, sv: { ...baseEn }
};
