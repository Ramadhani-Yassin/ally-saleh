export const CONTENT_KEYS = [
  /* Nav */
  "navHome", "navAbout", "navWorks", "navImpact", "navSpeaking", "navGallery", "navTestimonials", "navContact",
  "navPoetry", "navShortStories", "navOnline",
  /* Hero */
  "heroPhrase1Prefix", "heroPhrase1Highlight", "heroPhrase2Prefix", "heroPhrase2Highlight",
  "heroDescription", "heroBtnJourney", "heroBtnWorks", "heroScroll",
  /* About */
  "aboutLabel", "aboutHeading1", "aboutHeading1Highlight", "aboutHeading2", "aboutHeading2Highlight",
  "aboutDescription",
  "aboutRole1", "aboutRole2", "aboutRole3", "aboutRole4", "aboutRole5",
  /* Works / Books */
  "worksLabel", "worksHeading", "worksHeadingHighlight", "worksSubtitle", "worksReview",
  /* Impact */
  "impactLabel", "impactHeading", "impactHeadingHighlight",
  "impactMilestone1Title", "impactMilestone1Sub",
  "impactMilestone2Title", "impactMilestone2Sub",
  "impactMilestone3Title", "impactMilestone3Sub",
  "impactMilestone4Title", "impactMilestone4Sub",
  "impactMilestone5Title", "impactMilestone5Sub",
  /* Stats */
  "statLabel1", "statLabel2", "statLabel3", "statLabel4",
  /* Speaking */
  "speakingLabel", "speakingHeading", "speakingHeadingHighlight", "speakingDescription",
  "speakingTopic1", "speakingTopic2", "speakingTopic3", "speakingTopic4",
  "speakingTopic5", "speakingTopic6", "speakingTopic7", "speakingTopic8",
  "speakingProfileHeading", "speakingProfileSub",
  "speakingDetail1Label", "speakingDetail1Value",
  "speakingDetail2Label", "speakingDetail2Value",
  "speakingDetail3Label", "speakingDetail3Value",
  "speakingQuote", "speakingBtn",
  /* Gallery */
  "galleryLabel", "galleryHeading", "galleryHeadingHighlight",
  /* Testimonials */
  "testimonialsLabel", "testimonialsHeading", "testimonialsHeadingHighlight",
  "testimonialQuote1", "testimonialAuthor1", "testimonialRole1",
  "testimonialQuote2", "testimonialAuthor2", "testimonialRole2",
  "testimonialQuote3", "testimonialAuthor3", "testimonialRole3",
  /* Quote */
  "quoteText", "quoteAuthor",
  /* Contact */
  "contactLabel", "contactHeading", "contactHeadingHighlight", "contactDescription",
  "contactInfo1Label", "contactInfo1Value",
  "contactInfo2Label", "contactInfo2Value",
  "contactInfo3Label", "contactInfo3Value",
  "contactFollowLabel",
  "formName", "formEmail", "formSubject", "formMessage",
  "btnSubmit", "btnSending", "sentSuccess", "sentError",
  "socialInstagram", "socialFacebook", "socialLinkedIn",
  /* Footer */
  "footerName", "footerTagline", "footerCredit", "footerCreditName",
] as const;

export type ContentKey = (typeof CONTENT_KEYS)[number];

export const CONTENT_EN: Record<ContentKey, string> = {
  /* Nav */
  navHome: "Home",
  navAbout: "About",
  navWorks: "Works",
  navImpact: "Impact",
  navSpeaking: "Public Voice",
  navGallery: "Gallery",
  navTestimonials: "Testimonials",
  navContact: "Contact",
  navPoetry: "Poetry",
  navShortStories: "Short stories",
  navOnline: "Online",

  /* Hero */
  heroPhrase1Prefix: "Words that",
  heroPhrase1Highlight: "Inspire",
  heroPhrase2Prefix: "Leadership that",
  heroPhrase2Highlight: "Serves",
  heroDescription:
    "A Zanzibari poet, author, lawyer, journalist, and public leader dedicated to the intersection of literature, public service, and the empowerment of his community.",
  heroBtnJourney: "Explore My Journey",
  heroBtnWorks: "View My Works",
  heroScroll: "Scroll",

  /* About */
  aboutLabel: "About",
  aboutHeading1: "A Voice for",
  aboutHeading1Highlight: "Change",
  aboutHeading2: "A Pen for",
  aboutHeading2Highlight: "Purpose",
  aboutDescription:
    "Ally Saleh is a distinguished Zanzibari figure — a politician, lawyer, journalist, poet, and author whose work spans the worlds of public service and creative expression. Through his writing and leadership, he continues to shape the cultural and political landscape of Zanzibar.",
  aboutRole1: "Politician & Public Leader",
  aboutRole2: "Lawyer & Advocate",
  aboutRole3: "Poet & Author",
  aboutRole4: "Journalist",
  aboutRole5: "Community Developer",

  /* Works */
  worksLabel: "Archive",
  worksHeading: "All",
  worksHeadingHighlight: "Works",
  worksSubtitle: "",
  worksReview: "Review",

  /* Impact */
  impactLabel: "Leadership & Impact",
  impactHeading: "A Journey of",
  impactHeadingHighlight: "Service",
  impactMilestone1Title: "Lawyer & Advocate",
  impactMilestone1Sub: "Practicing law in service of justice",
  impactMilestone2Title: "Author & Poet",
  impactMilestone2Sub: "Published poetry and literary works",
  impactMilestone3Title: "Public Leader",
  impactMilestone3Sub: "Political leadership across Zanzibar",
  impactMilestone4Title: "Journalist",
  impactMilestone4Sub: "Voice in media and public discourse",
  impactMilestone5Title: "Community Developer",
  impactMilestone5Sub: "Building a stronger Zanzibar",

  /* Stats */
  statLabel1: "Published Works",
  statLabel2: "Years of Service",
  statLabel3: "Community Initiatives",
  statLabel4: "Leadership Roles",

  /* Speaking */
  speakingLabel: "Public Voice",
  speakingHeading: "A Voice That",
  speakingHeadingHighlight: "Resonates",
  speakingDescription:
    "From political platforms to literary forums, Ally Saleh's voice in governance, media, and the arts has inspired discourse and change across Zanzibar and beyond.",
  speakingTopic1: "Leadership",
  speakingTopic2: "Public Service",
  speakingTopic3: "Governance",
  speakingTopic4: "Community Development",
  speakingTopic5: "Literature & Poetry",
  speakingTopic6: "Social Justice",
  speakingTopic7: "Youth Empowerment",
  speakingTopic8: "Media & Communication",
  speakingProfileHeading: "Profile",
  speakingProfileSub: "Public Leader & Thought Leader",
  speakingDetail1Label: "Languages",
  speakingDetail1Value: "English, Swahili",
  speakingDetail2Label: "Arenas",
  speakingDetail2Value: "Politics, Media, Literature",
  speakingDetail3Label: "Focus",
  speakingDetail3Value: "Governance, Poetry, Public Service",
  speakingQuote:
    "Ally Saleh brings a rare depth of insight — merging the worlds of law, literature, and leadership with an unwavering commitment to his community.",
  speakingBtn: "Get In Touch",

  /* Gallery */
  galleryLabel: "Gallery",
  galleryHeading: "Moments of",
  galleryHeadingHighlight: "Presence",

  /* Testimonials */
  testimonialsLabel: "Testimonials",
  testimonialsHeading: "Voices of",
  testimonialsHeadingHighlight: "Respect",
  testimonialQuote1:
    "Ally Saleh's writings capture the soul of Zanzibar. His poetry speaks to the heart of our shared humanity and struggle.",
  testimonialAuthor1: "Fatma A.",
  testimonialRole1: "Literary Critic, Zanzibar",
  testimonialQuote2:
    "His dedication to public service and the arts is truly inspiring. Ally is a voice that bridges tradition and modernity.",
  testimonialAuthor2: "Dr. Hussein M.",
  testimonialRole2: "Academic, University of Zanzibar",
  testimonialQuote3:
    "Working alongside Ally Saleh has been a privilege. His commitment to justice, culture, and community is unwavering.",
  testimonialAuthor3: "Mariam K.",
  testimonialRole3: "Community Leader, Dar es Salaam",

  /* Quote */
  quoteText:
    "The pen and the voice are instruments of change — wield them with courage, purpose, and an unwavering love for your people.",
  quoteAuthor: "Ally Saleh",

  /* Contact */
  contactLabel: "Contact",
  contactHeading: "Let's Connect for",
  contactHeadingHighlight: "Change",
  contactDescription:
    "Whether you'd like to collaborate, discuss ideas, or simply connect — reach out and let's make an impact together.",
  contactInfo1Label: "Email",
  contactInfo1Value: "info@allysaleh.space",
  contactInfo2Label: "Phone",
  contactInfo2Value: "+255 777 000 000",
  contactInfo3Label: "Location",
  contactInfo3Value: "Zanzibar, Tanzania",
  contactFollowLabel: "Follow",
  formName: "Name",
  formEmail: "Email",
  formSubject: "Subject",
  formMessage: "Message",
  btnSubmit: "Send Message",
  btnSending: "Sending...",
  sentSuccess: "Sent Successfully",
  sentError: "Failed to send. Please try again.",
  socialInstagram: "Instagram",
  socialFacebook: "Facebook",
  socialLinkedIn: "LinkedIn",

  /* Footer */
  footerName: "ALLY SALEH",
  footerTagline: "Poet \u2022 Author \u2022 Lawyer \u2022 Public Leader",
  footerCredit: "Designed with excellence by",
  footerCreditName: "Ramadhani YASSIN",
};

export const CONTENT_SW: Record<ContentKey, string> = {
  /* Nav */
  navHome: "Mwanzo",
  navAbout: "Kuhusu",
  navWorks: "Kazi",
  navImpact: "Athari",
  navSpeaking: "Sauti ya Umma",
  navGallery: "Picha",
  navTestimonials: "Ushuhuda",
  navContact: "Wasiliana",
  navPoetry: "Ushairi",
  navShortStories: "hadithi fupi",
  navOnline: "Mtandaoni",

  /* Hero */
  heroPhrase1Prefix: "Maneno",
  heroPhrase1Highlight: "Yanayohamasisha",
  heroPhrase2Prefix: "Uongozi",
  heroPhrase2Highlight: "Unaotumikia",
  heroDescription:
    "Mshairi, mwandishi, wakili, mwandishi wa habari, na kiongozi wa umma wa Kizanzibari aliyejitolea kwenye makutano ya fasihi, utumishi wa umma, na uwezeshaji wa jamii yake.",
  heroBtnJourney: "Gundua Safari Yangu",
  heroBtnWorks: "Tazama Kazi Zangu",
  heroScroll: "Teleza",

  /* About */
  aboutLabel: "Kuhusu",
  aboutHeading1: "Sauti ya",
  aboutHeading1Highlight: "Mabadiliko",
  aboutHeading2: "Kalamu ya",
  aboutHeading2Highlight: "Kusudi",
  aboutDescription:
    "Ally Saleh ni mtu mashuhuri wa Kizanzibari — mwanasiasa, wakili, mwandishi wa habari, mshairi, na mwandishi ambaye kazi yake inazunguka ulimwengu wa utumishi wa umma na usemi wa kisanii. Kupitia uandishi wake na uongozi wake, anaendelea kuunda mandhari ya kitamaduni na kisiasa ya Zanzibar.",
  aboutRole1: "Mwanasiasa na Kiongozi wa Umma",
  aboutRole2: "Wakili na Mwanasheria",
  aboutRole3: "Mshairi na Mwandishi",
  aboutRole4: "Mwandishi wa Habari",
  aboutRole5: "Msanidi wa Jamii",

  /* Works */
  worksLabel: "Kumbukumbu",
  worksHeading: "Kazi",
  worksHeadingHighlight: "Zote",
  worksSubtitle: "",
  worksReview: "Tathmini",

  /* Impact */
  impactLabel: "Uongozi na Athari",
  impactHeading: "Safari ya",
  impactHeadingHighlight: "Utumishi",
  impactMilestone1Title: "Wakili na Mwanasheria",
  impactMilestone1Sub: "Kutoa huduma za sheria kwa ajili ya haki",
  impactMilestone2Title: "Mwandishi na Mshairi",
  impactMilestone2Sub: "Machapisho ya mashairi na kazi za fasihi",
  impactMilestone3Title: "Kiongozi wa Umma",
  impactMilestone3Sub: "Uongozi wa kisiasa kote Zanzibar",
  impactMilestone4Title: "Mwandishi wa Habari",
  impactMilestone4Sub: "Sauti katika vyombo vya habari na mijadala ya umma",
  impactMilestone5Title: "Msanidi wa Jamii",
  impactMilestone5Sub: "Kujenga Zanzibar imara",

  /* Stats */
  statLabel1: "Kazi Zilizochapishwa",
  statLabel2: "Miaka ya Huduma",
  statLabel3: "Mipango ya Jamii",
  statLabel4: "Nafasi za Uongozi",

  /* Speaking */
  speakingLabel: "Sauti ya Umma",
  speakingHeading: "Sauti",
  speakingHeadingHighlight: "Inayosikika",
  speakingDescription:
    "Kutoka kwenye majukwaa ya kisiasa hadi kwenye vikao vya fasihi, sauti ya Ally Saleh katika utawala, vyombo vya habari, na sanaa imehamasisha mazungumzo na mabadiliko kote Zanzibar na kwingineko.",
  speakingTopic1: "Uongozi",
  speakingTopic2: "Utumishi wa Umma",
  speakingTopic3: "Utawala",
  speakingTopic4: "Maendeleo ya Jamii",
  speakingTopic5: "Fasihi na Ushairi",
  speakingTopic6: "Haki za Jamii",
  speakingTopic7: "Uwezeshaji wa Vijana",
  speakingTopic8: "Vyombo vya Habari na Mawasiliano",
  speakingProfileHeading: "Wasifu",
  speakingProfileSub: "Kiongozi wa Umma na Mfikiriaji",
  speakingDetail1Label: "Lugha",
  speakingDetail1Value: "Kiingereza, Kiswahili",
  speakingDetail2Label: "Nyanja",
  speakingDetail2Value: "Siasa, Vyombo vya Habari, Fasihi",
  speakingDetail3Label: "Lengo",
  speakingDetail3Value: "Utawala, Ushairi, Utumishi wa Umma",
  speakingQuote:
    "Ally Saleh analeta upeo wa nadra wa maarifa — akiunganisha ulimwengu wa sheria, fasihi, na uongozi kwa kujitolea kusikoyumba kwa jamii yake.",
  speakingBtn: "Wasiliana Nasi",

  /* Gallery */
  galleryLabel: "Picha",
  galleryHeading: "Nyakati za",
  galleryHeadingHighlight: "Uwepo",

  /* Testimonials */
  testimonialsLabel: "Ushuhuda",
  testimonialsHeading: "Sauti za",
  testimonialsHeadingHighlight: "Heshima",
  testimonialQuote1:
    "Maandishi ya Ally Saleh yanagusa roho ya Zanzibar. Ushairi wake unazungumza kwa undani wa ubinadamu wetu na mapambano yetu.",
  testimonialAuthor1: "Fatma A.",
  testimonialRole1: "Mhakiki wa Fasihi, Zanzibar",
  testimonialQuote2:
    "Kujitolea kwake kwa utumishi wa umma na sanaa kunatia hamasa. Ally ni sauti inayounganisha utamaduni na usasa.",
  testimonialAuthor2: "Dk. Hussein M.",
  testimonialRole2: "Msomi, Chuo Kikuu cha Zanzibar",
  testimonialQuote3:
    "Kufanya kazi pamoja na Ally Saleh ni fursa kubwa. Kujitolea kwake kwa haki, utamaduni, na jamii hakutetereki.",
  testimonialAuthor3: "Mariam K.",
  testimonialRole3: "Kiongozi wa Jamii, Dar es Salaam",

  /* Quote */
  quoteText:
    "Kalamu na sauti ni zana za mabadiliko — zitumie kwa ujasiri, kusudi, na upendo usioyumba kwa watu wako.",
  quoteAuthor: "Ally Saleh",

  /* Contact */
  contactLabel: "Wasiliana",
  contactHeading: "Tuungane kwa",
  contactHeadingHighlight: "Mabadiliko",
  contactDescription:
    "Iwe ungependa kushirikiana, kujadili mawazo, au kuwasiliana tu — wasiliana nasi na tubadilishe jamii pamoja.",
  contactInfo1Label: "Barua Pepe",
  contactInfo1Value: "info@allysaleh.space",
  contactInfo2Label: "Simu",
  contactInfo2Value: "+255 777 000 000",
  contactInfo3Label: "Mahali",
  contactInfo3Value: "Zanzibar, Tanzania",
  contactFollowLabel: "Tufuate",
  formName: "Jina",
  formEmail: "Barua Pepe",
  formSubject: "Mada",
  formMessage: "Ujumbe",
  btnSubmit: "Tuma Ujumbe",
  btnSending: "Inatuma...",
  sentSuccess: "Imetumwa Kwa Mafanikio",
  sentError: "Imeshindwa kutuma. Tafadhali jaribu tena.",
  socialInstagram: "Instagram",
  socialFacebook: "Facebook",
  socialLinkedIn: "LinkedIn",

  /* Footer */
  footerName: "ALLY SALEH",
  footerTagline: "Mshairi \u2022 Mwandishi \u2022 Wakili \u2022 Kiongozi wa Umma",
  footerCredit: "Imeundwa kwa ubora na",
  footerCreditName: "Ramadhani YASSIN",
};
