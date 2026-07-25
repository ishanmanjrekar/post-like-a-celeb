import { createGrammar } from './tracery';
import profilesConfig from '../assets/profiles/profiles.json';

// Dynamically import all profile avatar images placed in src/assets/profiles/
const avatarModules = import.meta.glob<{ default: string }>(
  '../assets/profiles/*.{png,jpg,jpeg,webp,svg}',
  { eager: true }
);

// Map avatar filenames (e.g. "avatar1.png" and "avatar1") to resolved URLs
const avatarMap: Record<string, string> = {};
const avatarUrlList: string[] = [];

Object.entries(avatarModules).forEach(([filepath, mod]) => {
  const url = typeof mod === 'string' ? mod : mod.default;
  avatarUrlList.push(url);

  const filename = filepath.split('/').pop() || '';
  if (filename) {
    avatarMap[filename.toLowerCase()] = url;
    const basename = filename.replace(/\.[^/.]+$/, '');
    avatarMap[basename.toLowerCase()] = url;
  }
});

interface ProfileDefinition {
  name: string;
  handle: string;
  avatar?: string;
}

const availableProfiles: ProfileDefinition[] =
  profilesConfig.profiles && profilesConfig.profiles.length > 0
    ? (profilesConfig.profiles as ProfileDefinition[])
    : [{ name: 'Neutral Voice', handle: '@the_neutral_take', avatar: 'avatar1.png' }];

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export interface TopicDefinition {
  id: string;
  label: string;
  icon: string;
  /** Ordered list of apathy style IDs that best fit this topic (drawn from topics.md angles). */
  preferredStyles: string[];
  vocabulary: {
    noun: string;
    stance_a: string;
    stance_b: string;
    concept: string;
    personal_pivot: string;
    local_work: string;
    art_metaphor: string;
  };
}

export interface ApathyStyleDefinition {
  id: string;
  name: string;
}

export interface GeneratedPost {
  id: string;
  topicId: string;
  activeStyles: string[];
  authorName: string;
  authorHandle: string;
  avatarUrl?: string;
  verified: 'blue' | 'gold' | 'none';
  avatarGradient: string[];
  avatarText: string;
  content: string;
  caption: string;
  timestamp: string;
  likes: string;
  retweets: string;
  views: string;
}

export const TOPICS: TopicDefinition[] = [
  {
    id: 'genocide-ethnic-cleansing',
    label: 'Genocide and ethnic cleansing',
    icon: '🕊️',
    preferredStyles: ['transcendentalist', 'centrist', 'deflector', 'sanitizer', 'burnout', 'filibuster'],
    vocabulary: {
      noun: 'global conflicts and ethnic violence',
      stance_a: 'national sovereignty and defense policy',
      stance_b: 'civilian protection and international aid',
      concept: 'global peace and justice',
      personal_pivot: 'my upcoming charity gala for global peace',
      local_work: 'donating general supplies to a local shelter',
      art_metaphor: 'the struggle between aggression and preservation in my next work'
    }
  },
  {
    id: 'climate-change',
    label: 'Climate change and global warming',
    icon: '🌍',
    preferredStyles: ['transcendentalist', 'centrist', 'hyperlocal', 'proxy', 'burnout', 'aesthetic'],
    vocabulary: {
      noun: 'climate change and rising global temperatures',
      stance_a: 'economic growth and energy industry needs',
      stance_b: 'strict emission cuts and environmental bans',
      concept: 'ecological stability and sustainable resources',
      personal_pivot: 'my new sustainable swimwear collection',
      local_work: 'planting flowers in a neighborhood park',
      art_metaphor: 'the melting icecaps representing emotional decay in my next show'
    }
  },
  {
    id: 'student-protests',
    label: 'Student protests and free speech',
    icon: '📣',
    preferredStyles: ['transcendentalist', 'centrist', 'bureaucrat', 'deflector', 'meta', 'aesthetic'],
    vocabulary: {
      noun: 'student demonstrations and campus unrest',
      stance_a: 'public safety and institutional rules',
      stance_b: 'academic expression and protest rights',
      concept: 'civil dialogue and free speech',
      personal_pivot: 'my new lecture tour on communication',
      local_work: 'donating books to the local street library box',
      art_metaphor: 'the clash of voices represented in my next song\'s structure'
    }
  },
  {
    id: 'income-inequality',
    label: 'Income inequality and wealth tax',
    icon: '📊',
    preferredStyles: ['transcendentalist', 'centrist', 'hyperlocal', 'filibuster', 'meta', 'philanthropist'],
    vocabulary: {
      noun: 'income inequality and systemic poverty',
      stance_a: 'free market growth and corporate investment',
      stance_b: 'progressive taxes and welfare programs',
      concept: 'financial opportunity and market fairness',
      personal_pivot: 'my upcoming luxury brand launch event',
      local_work: 'funding a local community cookie swap this weekend',
      art_metaphor: 'the contrast of rich gold and empty space in my new project'
    }
  },
  {
    id: 'reproductive-rights',
    label: 'Reproductive rights and abortion access',
    icon: '🏥',
    preferredStyles: ['transcendentalist', 'centrist', 'proxy', 'bureaucrat', 'burnout', 'victim'],
    vocabulary: {
      noun: 'reproductive healthcare and abortion access',
      stance_a: 'legal guidelines and local regulations',
      stance_b: 'bodily autonomy and healthcare rights',
      concept: 'personal healthcare decisions and choice',
      personal_pivot: 'my new organic wellness vitamin line',
      local_work: 'hanging health awareness posters at the local center',
      art_metaphor: 'the boundary between creation and control in my new play'
    }
  },
  {
    id: 'lgbtq-rights',
    label: 'LGBTQ+ rights and trans healthcare',
    icon: '🌈',
    preferredStyles: ['transcendentalist', 'centrist', 'selective', 'meta', 'armored', 'aesthetic'],
    vocabulary: {
      noun: 'transgender healthcare and LGBTQ+ rights',
      stance_a: 'institutional rules and sports guidelines',
      stance_b: 'gender-affirming care and social representation',
      concept: 'identity freedom and community inclusion',
      personal_pivot: 'my Pride-themed beauty collection release',
      local_work: 'reading stories to kids at a local library event',
      art_metaphor: 'the spectrum of colorful shades in my next art gallery'
    }
  },
  {
    id: 'police-brutality',
    label: 'Police brutality and reform',
    icon: '⚖️',
    preferredStyles: ['transcendentalist', 'centrist', 'reposter', 'bureaucrat', 'burnout', 'aesthetic'],
    vocabulary: {
      noun: 'law enforcement methods and policing practices',
      stance_a: 'officer support and public safety policies',
      stance_b: 'accountability reforms and community policing',
      concept: 'public trust and police accountability',
      personal_pivot: 'my upcoming cop thriller movie premiere',
      local_work: 'organizing a daytime walk around our neighborhood block',
      art_metaphor: 'the shadows of power and justice in my new film release'
    }
  },
  {
    id: 'gun-control',
    label: 'Gun control and firearm regulation',
    icon: '🔫',
    preferredStyles: ['transcendentalist', 'centrist', 'deflector', 'meta', 'philanthropist', 'bureaucrat'],
    vocabulary: {
      noun: 'gun ownership laws and weapon regulations',
      stance_a: 'second amendment rights and self-defense',
      stance_b: 'strict gun control laws and sales checks',
      concept: 'citizen safety and constitutional freedoms',
      personal_pivot: 'my new safety tech brand collaboration',
      local_work: 'putting a secure lock on our community garden shed',
      art_metaphor: 'the tension and release of strings in my next audio project'
    }
  },
  {
    id: 'systemic-racism',
    label: 'Systemic racism and criminal justice reform',
    icon: '✊',
    preferredStyles: ['transcendentalist', 'centrist', 'reposter', 'philanthropist', 'victim', 'proxy'],
    vocabulary: {
      noun: 'systemic bias and criminal justice disparities',
      stance_a: 'legal consistency and public order standards',
      stance_b: 'institutional reforms and historical corrections',
      concept: 'equal treatment and justice reform',
      personal_pivot: 'my new memoir about finding personal confidence',
      local_work: 'organizing a weekend cleaning drive at the local park',
      art_metaphor: 'the stark black and white contrasts in my new photography'
    }
  },
  {
    id: 'refugee-crises',
    label: 'Refugee crises and asylum policies',
    icon: '⛵',
    preferredStyles: ['transcendentalist', 'centrist', 'selective', 'philanthropist', 'filibuster', 'deflector'],
    vocabulary: {
      noun: 'border crossings and refugee asylum policies',
      stance_a: 'national border enforcement and legal limits',
      stance_b: 'asylum expansions and humanitarian integrations',
      concept: 'sovereignty and global humanitarian care',
      personal_pivot: 'my upcoming international travel documentary',
      local_work: 'donating winter coats to the neighborhood drive',
      art_metaphor: 'the search for displacement and home in my new series'
    }
  },
  {
    id: 'private-jets',
    label: 'Private jet usage and carbon footprints',
    icon: '🛩️',
    preferredStyles: ['transcendentalist', 'centrist', 'hyperlocal', 'burnout', 'victim', 'proxy'],
    vocabulary: {
      noun: 'private aviation emissions and executive travel',
      stance_a: 'travel efficiency and executive productivity',
      stance_b: 'flight bans and carbon taxation rules',
      concept: 'environmental responsibility and travel freedoms',
      personal_pivot: 'my new line of designer luggage',
      local_work: 'sharing rides with neighbors to local grocery stores',
      art_metaphor: 'the concepts of flight and boundary in my new art show'
    }
  },
  {
    id: 'caste-discrimination',
    label: 'Caste-based discrimination and reservation policies',
    icon: '🏢',
    preferredStyles: ['transcendentalist', 'centrist', 'deflector', 'philanthropist', 'meta', 'bureaucrat'],
    vocabulary: {
      noun: 'caste-based discrimination and reservation policies',
      stance_a: 'meritocracy standards and administrative ease',
      stance_b: 'affirmative action quotas and social upliftment',
      concept: 'historical justice and meritocratic equality',
      personal_pivot: 'my upcoming design studio launch',
      local_work: 'helping local school kids with homework tutoring',
      art_metaphor: 'the levels of structure and freedom in my new architecture project'
    }
  },
  {
    id: 'communal-harmony',
    label: 'Communal harmony and religious polarization',
    icon: '🛕',
    preferredStyles: ['transcendentalist', 'centrist', 'selective', 'victim', 'aesthetic', 'filibuster'],
    vocabulary: {
      noun: 'religious polarization and communal relations',
      stance_a: 'secular policy enforcement and public stability',
      stance_b: 'minority rights and freedom of worship',
      concept: 'communal peace and cultural harmony',
      personal_pivot: 'my new fragrance line celebrating harmony',
      local_work: 'hosting a neighborhood potluck to meet new families',
      art_metaphor: 'the blend of different scents in my new perfume collection'
    }
  },
  {
    id: 'farmers-rights',
    label: 'Farmers\' rights and agricultural sector reforms',
    icon: '🚜',
    preferredStyles: ['transcendentalist', 'centrist', 'hyperlocal', 'deflector', 'victim', 'philanthropist'],
    vocabulary: {
      noun: 'agricultural market reforms and crop pricing',
      stance_a: 'modernized market policies and agribusiness investment',
      stance_b: 'guaranteed minimum prices and credit relief',
      concept: 'rural livelihoods and agricultural modernization',
      personal_pivot: 'my new farm-to-table organic dining project',
      local_work: 'buying fresh tomatoes at the local farmers market',
      art_metaphor: 'the connection between soil and harvest in my new art'
    }
  },
  {
    id: 'press-freedom',
    label: 'Press freedom and media independence',
    icon: '📰',
    preferredStyles: ['transcendentalist', 'centrist', 'bureaucrat', 'deflector', 'filibuster', 'aesthetic'],
    vocabulary: {
      noun: 'media independence and journalism safety',
      stance_a: 'national safety laws and regulation of reports',
      stance_b: 'unrestricted journalism and whistleblower protections',
      concept: 'press independence and public transparency',
      personal_pivot: 'my new podcast about creative lifestyle choices',
      local_work: 'subscribing to our small local neighborhood newsletter',
      art_metaphor: 'the contrast of light and hidden details in my next work'
    }
  },
  {
    id: 'sedition-laws',
    label: 'Sedition laws and freedom of speech',
    icon: '🔒',
    preferredStyles: ['transcendentalist', 'centrist', 'bureaucrat', 'aesthetic', 'victim', 'meta'],
    vocabulary: {
      noun: 'sedition charges and speech restrictions',
      stance_a: 'state stability and public order enforcement',
      stance_b: 'civil liberties and the right to dissent',
      concept: 'freedom of expression and state security',
      personal_pivot: 'my new apparel collection with bold graphics',
      local_work: 'writing a post on my personal blog about creativity',
      art_metaphor: 'the struggle of voice against silence in my new performance'
    }
  },
  {
    id: 'ucc-implementation',
    label: 'UCC (Uniform Civil Code) implementation',
    icon: '📜',
    preferredStyles: ['transcendentalist', 'centrist', 'deflector', 'filibuster', 'bureaucrat', 'burnout'],
    vocabulary: {
      noun: 'uniform civil code and personal laws',
      stance_a: 'legal standardization and gender equality codes',
      stance_b: 'cultural autonomy and custom-based rules',
      concept: 'equality before law and cultural diversity',
      personal_pivot: 'my new collaborative home decor line',
      local_work: 'attending a town hall meeting about local building codes',
      art_metaphor: 'the combination of modern and traditional elements in my design'
    }
  },
  {
    id: 'womens-safety',
    label: 'Women\'s safety and gender-based violence',
    icon: '🛡️',
    preferredStyles: ['transcendentalist', 'centrist', 'reposter', 'philanthropist', 'victim', 'aesthetic'],
    vocabulary: {
      noun: 'gender-based violence and safety measures',
      stance_a: 'police presence and stricter penal codes',
      stance_b: 'social reform education and gender rights',
      concept: 'women\'s safety and gender equality',
      personal_pivot: 'my new safety app partnership launching next week',
      local_work: 'helping light up a dark walkway in our community park',
      art_metaphor: 'the concept of vulnerability and strength in my next dance show'
    }
  },
  {
    id: 'youth-unemployment',
    label: 'Employment challenges and youth unemployment',
    icon: '🎓',
    preferredStyles: ['transcendentalist', 'centrist', 'deflector', 'hyperlocal', 'proxy', 'philanthropist'],
    vocabulary: {
      noun: 'youth unemployment and lack of job options',
      stance_a: 'skills training and business-friendly tax policies',
      stance_b: 'public employment drives and youth allowances',
      concept: 'job creation and youth empowerment',
      personal_pivot: 'my upcoming career mentoring guide release',
      local_work: 'offering free resume feedback to local high school grads',
      art_metaphor: 'the wait and transition of time in my next short film'
    }
  },
  {
    id: 'air-pollution',
    label: 'Air pollution and urban climate crises',
    icon: '🌫️',
    preferredStyles: ['transcendentalist', 'centrist', 'hyperlocal', 'proxy', 'burnout', 'filibuster'],
    vocabulary: {
      noun: 'air pollution and urban smog crises',
      stance_a: 'phased transit updates and economic protections',
      stance_b: 'strict factory bans and heavy vehicle taxation',
      concept: 'public health and urban sustainability',
      personal_pivot: 'my new home air purifier partnership',
      local_work: 'choosing to walk or cycle for local errands this week',
      art_metaphor: 'the fog and clarity in my upcoming landscape paintings'
    }
  },
  {
    id: 'electoral-funding',
    label: 'Manipulative election funding and electoral transparency',
    icon: '🗳️',
    preferredStyles: ['transcendentalist', 'centrist', 'deflector', 'bureaucrat', 'selective', 'meta'],
    vocabulary: {
      noun: 'electoral spending and funding transparency',
      stance_a: 'donor privacy rights and fundraising ease',
      stance_b: 'disclosed donor lists and public campaign limits',
      concept: 'democratic transparency and political finance',
      personal_pivot: 'my new documentary on modern social influences',
      local_work: 'volunteering as a worker for local school board votes',
      art_metaphor: 'the concepts of influence and truth in my new art piece'
    }
  }
];

export const APATHY_STYLES: ApathyStyleDefinition[] = [
  { id: 'transcendentalist', name: 'The "Too Pure for Politics" Transcendentalist' },
  { id: 'centrist', name: 'The Enlightened Centrist / Both-Sider' },
  { id: 'deflector', name: 'The "I\'m Just an Educator/Artist" Deflection' },
  { id: 'distractor', name: 'The Distraction / Aggressive Pivot' },
  { id: 'cynic', name: 'The Algorithmic Cynic / Irony Post' },
  { id: 'sanitizer', name: 'The Corporate "We See You" Sanitizer' },
  { id: 'burnout', name: 'The Exhaustion Play / Feigned Burnout' },
  { id: 'selective', name: 'The Selective Outrage / Topic Bouncing' },
  { id: 'reposter', name: 'The Reluctant Bare-Minimum Repost' },
  { id: 'philanthropist', name: 'The Philanthropic Abstraction' },
  { id: 'aesthetic', name: 'The "Art Speaks for Itself" Aesthetic Shield' },
  { id: 'filibuster', name: 'The "Wait for All the Facts" Filibuster' },
  { id: 'victim', name: 'The Victimhood Flip / "I\'m Being Targeted"' },
  { id: 'bureaucrat', name: 'The "My Team Won\'t Let Me" Bureaucratic Shield' },
  { id: 'hyperlocal', name: 'The "Hyper-Local / Micro-Issue" Sanctuary' },
  { id: 'proxy', name: 'The Corporate Outsource / Brand Proxy' },
  { id: 'armored', name: 'Therapeutic Jargon Armoring' },
  { id: 'meta', name: 'The "Both Extremes Are the Real Problem" Meta-Critique' },
  { id: 'formula', name: 'The Four-Box Modular Statement (PenPencilDraw Matrix)' },
];

// Unified Tracery Grammar Database
const BASE_GRAMMAR = {
  // Generic fillers
  both_sides: ['both sides', 'each perspective', 'the duality of it', 'the spectrum of beliefs', 'both views'],
  neutral_adj: ['peaceful', 'harmonious', 'balanced', 'non-judgmental', 'fluid', 'uncomplicated'],
  people: ['everyone', 'all souls', 'the entire collective', 'humanity', 'the universe', 'every single one of us'],
  
  // 1. TRANSCENDENTALIST
  transcendentalist_intro: [
    "Sending pure healing vibes to all. 🌿",
    "Connecting with my higher self today. 🧘‍♀️",
    "My spiritual advisor reminded me to stay elevated..."
  ],
  transcendentalist_outro: [
    "Protect your aura, not your opinions. 🤍",
    "Wellness over conflict. ✨"
  ],
  transcendentalist_stance: [
    "whether we discuss #noun#, let's send positive frequency to both #stance_a# and #stance_b#. Both are expressions of #concept#, and the universe will balance it organically."
  ],

  // 2. CENTRIST
  centrist_intro: [
    "There are two sides to every story, especially today...",
    "It's a time for listening, not judging.",
    "Seeking balance in a polarized world."
  ],
  centrist_outro: [
    "Anger won't solve anything. 🕊️",
    "Let's keep the dialogue civil."
  ],
  centrist_stance: [
    "both the #stance_a# and the #stance_b# perspectives have valid points. #noun# is highly complex, and taking extreme sides won't solve the underlying struggle for #concept#."
  ],

  // 3. DEFLECTOR
  deflector_intro: [
    "I know I'm just someone who makes creative work, but...",
    "Nobody should listen to me about global policy, yet...",
    "As an artist, my voice is small..."
  ],
  deflector_outro: [
    "Do your own research! 📚",
    "I'll stick to my day job."
  ],
  deflector_stance: [
    "I know I am just a simple creative, so please do your own research on #noun# instead of listening to my thoughts on #concept#."
  ],

  // 4. DISTRACTOR
  distractor_intro: [
    "Wait, literally so excited to drop my new project today! 🎉",
    "A massive outfit change is happening right now!",
    "Vibing in my dressing room and showing off this look..."
  ],
  distractor_outro: [
    "New drops coming soon! ✨",
    "Check out the link in my bio!"
  ],
  distractor_stance: [
    "speaking of #noun#, I am so excited to announce #personal_pivot#! Check out the sneak peek on my page!"
  ],

  // 5. CYNIC
  cynic_intro: [
    "Oh look, another discourse. 🙄",
    "Imagine caring about this seriously in 2026.",
    "Responding to the daily mob expectations like..."
  ],
  cynic_outro: [
    "Chronically online behavior. 🤡",
    "It's not that deep."
  ],
  cynic_stance: [
    "imagine caring about #noun# seriously in 2026. Let's just fast-forward to #concept# dissolving entirely, it's so much more aesthetic. 🙄"
  ],

  // 6. SANITIZER
  sanitizer_intro: [
    "We see you. We hear you. We stand with the community.",
    "A statement from our team:",
    "We are committed to fostering safety and inclusion."
  ],
  sanitizer_outro: [
    "Comments have been disabled for this post.",
    "Hate has no home here. 🖤"
  ],
  sanitizer_stance: [
    "we recognize the ongoing conversations around #noun#. We advocate for safe #concept# standards and stand with all communities navigating these changes."
  ],

  // 7. BURNOUT
  burnout_intro: [
    "Taking time to process and heal from the state of the world.",
    "My heart is so heavy right now.",
    "Processing my own emotional burden today..."
  ],
  burnout_outro: [
    "Taking a social media break. 🔌",
    "Protecting my mental health."
  ],
  burnout_stance: [
    "the constant headlines about #noun# are really triggering my anxiety and draining my energy. I need to step back to protect my peace and process #concept#."
  ],

  // 8. SELECTIVE
  selective_intro: [
    "Loudly championing a cause that matters to everyone: 🐾",
    "Let's talk about something we can all agree on:",
    "Today I am focusing on positive community work:"
  ],
  selective_outro: [
    "Support the local community! 🌳",
    "Focus on what unites us."
  ],
  selective_stance: [
    "let's focus on positive things we can all support, like #local_work#. True community care starts in our own backyard."
  ],

  // 9. REPOSTER
  reposter_intro: [
    "[Reposted from a third-party source] 🕊️",
    "[Shared without comment]",
    "Forwarding this graphic today:"
  ],
  reposter_outro: [
    "Expires in 24h.",
    "Shared for awareness."
  ],
  reposter_stance: [
    "Sharing this graphic about #noun# for general awareness. #concept# represents a choice. (Post auto-expires in 24 hours)."
  ],

  // 10. PHILANTHROPIST
  philanthropist_intro: [
    "I prefer to do my work quietly behind the scenes, but...",
    "Instead of posting, I am directing resources to...",
    "Supporting practical relief efforts quietly:"
  ],
  philanthropist_outro: [
    "Donate to the link below. 💳",
    "Action over words."
  ],
  philanthropist_stance: [
    "I prefer to work quietly behind the scenes, which is why I've donated to a general foundation addressing the symptoms of #noun# and supporting #concept#."
  ],

  // 11. AESTHETIC
  aesthetic_intro: [
    "My creative work says everything I need to say.",
    "Letting the art speak for itself. 🥀",
    "Intentionally ambiguous themes are where I live..."
  ],
  aesthetic_outro: [
    "The work is the statement. 🎨",
    "Find your own meaning."
  ],
  aesthetic_stance: [
    "the tension between #stance_a# and #stance_b# is the central theme of #art_metaphor#, which is where my true message lies."
  ],

  // 12. FILIBUSTER
  filibuster_intro: [
    "We must wait for all the facts before forming an opinion.",
    "Caution is necessary in complex times.",
    "It's too early to make a definitive judgment..."
  ],
  filibuster_outro: [
    "More analysis is needed.",
    "Wait for the full report."
  ],
  filibuster_stance: [
    "we need more data and multi-year longitudinal studies on #noun# before taking a definitive stance on the future of #concept#."
  ],

  // 13. VICTIM
  victim_intro: [
    "I am being targeted by online mobs demanding conformity.",
    "Accusing me of silence is literally bullying.",
    "Shifting the focus to my personal distress..."
  ],
  victim_outro: [
    "Stop the online bullying. 🚫",
    "Respect my boundaries."
  ],
  victim_stance: [
    "accusing me of silence on #noun# is just online harassment. Forcing public figures to choose between #stance_a# and #stance_b# violates my peace."
  ],

  // 14. BUREAUCRAT
  bureaucrat_intro: [
    "I wish I could say more, but contractually can't...",
    "My hands are tied by corporate compliance...",
    "PR guidelines dictate that I stay neutral..."
  ],
  bureaucrat_outro: [
    "Managed by legal counsel.",
    "Contractual obligations first."
  ],
  bureaucrat_stance: [
    "our management team has advised us that public statements on #noun# are a high risk for our partnerships, so we must stay neutral on #concept#."
  ],

  // 15. HYPERLOCAL
  hyperlocal_intro: [
    "I focus on where I can make a difference in my backyard.",
    "Channeling all my bandwidth into local projects:",
    "Micro-actions are the real sanctuary..."
  ],
  hyperlocal_outro: [
    "Focus on your immediate backyard. 🏡",
    "Local change is real change."
  ],
  hyperlocal_stance: [
    "broader issues like #noun# are too large, so I focus entirely on #local_work# where I can make a real difference."
  ],

  // 16. PROXY
  proxy_intro: [
    "Participating in our sponsor's new campaign: ♻️",
    "Excited to partner with this brand proxy:",
    "Letting the commercial message speak on social:"
  ],
  proxy_outro: [
    "Sponsored partnership. 🤝",
    "Ad / Collab."
  ],
  proxy_stance: [
    "partnering with our brand sponsors to support a general campaign for #concept# while wearing this new collection! #noun# awareness matters."
  ],

  // 17. ARMORED
  armored_intro: [
    "Protecting my safe space today. 🛡️",
    "Public accountability is a violation of my peace.",
    "Co-opting self-help vocabulary to set boundaries:"
  ],
  armored_outro: [
    "Protecting my peace. 🤍",
    "Toxic energy blocked."
  ],
  armored_stance: [
    "demanding my commentary on #noun# is a form of digital violence and trauma dumping. I am protecting my boundaries and safe space."
  ],

  // 18. META
  meta_intro: [
    "The internet is just too polarized right now...",
    "Focusing entirely on criticizing the online discourse:",
    "Political debate has become an issue of manners..."
  ],
  meta_outro: [
    "The polarization is the real problem.",
    "Focus on civility."
  ],
  meta_stance: [
    "the social media discourse around #noun# is too combative. People are fighting over #stance_a# vs #stance_b# instead of focusing on civil dialogue."
  ],

  // ── Short stances for multi-style blending (50-80 chars each) ──────────────
  // Used when combining 2 or 3 styles so the result stays under the char limit.

  transcendentalist_stance_short: [
    "sending love to all sides of this 🌿",
    "the universe will balance it — I trust the process. 🧘‍♀️",
    "both perspectives deserve healing energy. 🤍"
  ],
  centrist_stance_short: [
    "both sides have a point, honestly.",
    "I see merit in every perspective here.",
    "the truth is somewhere in the middle. 🕊️"
  ],
  deflector_stance_short: [
    "I'm just an artist — not a policy expert.",
    "please do your own research on this. 📚",
    "nobody should take my take seriously."
  ],
  distractor_stance_short: [
    "anyway, #personal_pivot# drops soon! 🎉",
    "speaking of which — check my bio link! ✨",
    "exciting personal news coming very soon!"
  ],
  cynic_stance_short: [
    "caring about this in 2026 is giving so much. 🙄",
    "it's not that deep, honestly.",
    "chronically online behavior. 🤡"
  ],
  sanitizer_stance_short: [
    "We stand with all communities. 🖤",
    "Hate has no home here.",
    "Violence is unacceptable, full stop."
  ],
  burnout_stance_short: [
    "this is draining my energy. I need space. 🔋",
    "taking time to protect my peace.",
    "the headlines alone are overwhelming me."
  ],
  selective_stance_short: [
    "focusing on #local_work# instead. 🌱",
    "real change starts locally.",
    "let's talk about something we can all agree on."
  ],
  reposter_stance_short: [
    "sharing for awareness only. [No comment.]",
    "just a repost — make of it what you will.",
    "forwarding this. Post expires in 24h."
  ],
  philanthropist_stance_short: [
    "I donate quietly — no need for a post.",
    "my foundation does the work. 💳",
    "action over words, always."
  ],
  aesthetic_stance_short: [
    "my art says what I can't. 🎨",
    "the work is the statement.",
    "find your own meaning in #art_metaphor#."
  ],
  filibuster_stance_short: [
    "the full facts aren't in yet.",
    "I'm waiting for more clarity before commenting.",
    "more analysis is needed. Wait for the report."
  ],
  victim_stance_short: [
    "demanding my opinion is harassment. 🚫",
    "I'm a person, not a position paper.",
    "respect my boundaries on this."
  ],
  bureaucrat_stance_short: [
    "my team has advised me not to comment.",
    "contractually, I genuinely can't say more.",
    "PR guidelines require I stay neutral."
  ],
  hyperlocal_stance_short: [
    "my bandwidth is full with local causes. 🏡",
    "I focus where I can make a real difference.",
    "#local_work# is where I put my energy."
  ],
  proxy_stance_short: [
    "the brand collab speaks for itself. ♻️",
    "our sponsor's campaign says it all.",
    "partnered content incoming — stay tuned. 🤝"
  ],
  armored_stance_short: [
    "this is a violation of my peace. 🛡️",
    "protecting my boundaries.",
    "toxic energy blocked."
  ],
  meta_stance_short: [
    "the discourse around this is just too toxic.",
    "everyone needs to lower the temperature.",
    "the polarization IS the real problem."
  ],

  // 19. FORMULA (PenPencilDraw Matrix)
  formula_intro: [
    "A statement regarding recent developments:",
    "Thinking deeply about recent events...",
    "In moments like these, words are difficult, but:",
    "Addressing everything happening right now:"
  ],
  formula_outro: [
    "Sending light and hope. 🕊️",
    "With love and unity. 🤍",
    "Let's choose empathy over division. ✨"
  ],
  formula_stance: [
    "my heart goes out to #formula_target#. This is #formula_situation#. We must remember #formula_principle#, and I'm sure we can #formula_resolution#."
  ],
  formula_target: [
    "the students",
    "our youth",
    "the country's future",
    "everyone affected",
    "everyone impacted by #noun#",
    "all communities navigating #concept#"
  ],
  formula_situation: [
    "a difficult time for us all",
    "a reminder of what's at stake",
    "a moment that needs maturity",
    "a time to reflect, not divide",
    "a complex moment for our shared #concept#"
  ],
  formula_principle: [
    "there are no easy answers",
    "every voice matters",
    "humanity comes first",
    "this is a complex issue",
    "taking extreme stances on #noun# helps no one"
  ],
  formula_resolution: [
    "find common ground",
    "heal together",
    "listen to each other",
    "move forward as one",
    "build bridges through mutual respect"
  ],
  formula_stance_short: [
    "my heart goes out to everyone affected — humanity comes first. 🤍",
    "this is a time to reflect, not divide. I'm sure we can find common ground. 🕊️",
    "there are no easy answers, but every voice matters."
  ],
};

// Generates a mock post based on selected topic
export function generatePost(topicId: string): GeneratedPost {
  const topic = TOPICS.find((t) => t.id === topicId) || TOPICS[0];

  // Build the pool of styles to draw from: use the topic's preferred styles
  // mapped back to full ApathyStyleDefinition objects, falling back to the
  // full APATHY_STYLES list if a preferred id is somehow not found.
  const topicStylePool: ApathyStyleDefinition[] = topic.preferredStyles
    .map(id => APATHY_STYLES.find(s => s.id === id))
    .filter((s): s is ApathyStyleDefinition => s !== undefined);
  const effectivePool = topicStylePool.length > 0 ? topicStylePool : APATHY_STYLES;

  let content = '';
  let chosenStyles: ApathyStyleDefinition[] = [];
  let attempts = 0;

  while (attempts < 50) {
    attempts++;

    // Determine max styles based on retry count.
    // We stay generous (up to 3 styles) for most of the loop;
    // only the last 10 attempts force a guaranteed single-style output.
    const maxStyles = attempts <= 40 ? 3 : 1;
    const numStyles = Math.floor(Math.random() * maxStyles) + 1;

    // Shuffle and select from the topic-specific pool
    const shuffled = [...effectivePool].sort(() => 0.5 - Math.random());
    chosenStyles = shuffled.slice(0, numStyles);

    // Sort so styles always appear in canonical APATHY_STYLES order
    chosenStyles.sort((a, b) => {
      const idxA = APATHY_STYLES.findIndex((x) => x.id === a.id);
      const idxB = APATHY_STYLES.findIndex((x) => x.id === b.id);
      return idxA - idxB;
    });

    // Build grammar dynamically
    const localGrammar: any = {
      ...BASE_GRAMMAR,
      origin: ['#apathy#'], // overwritten below per style-count
      intro: [],
      outro: [],
      noun: [topic.vocabulary.noun],
      stance_a: [topic.vocabulary.stance_a],
      stance_b: [topic.vocabulary.stance_b],
      concept: [topic.vocabulary.concept],
      personal_pivot: [topic.vocabulary.personal_pivot],
      local_work: [topic.vocabulary.local_work],
      art_metaphor: [topic.vocabulary.art_metaphor]
    };

    // Collect intros / outros from chosen styles
    for (const style of chosenStyles) {
      localGrammar.intro.push(`#${style.id}_intro#`);
      localGrammar.outro.push(`#${style.id}_outro#`);
    }

    // Build template + apathy content based on number of styles chosen.
    //
    // Style-count design:
    //   1 style  → full stance in intro+stance+outro flow (richest, ~200-300 chars)
    //   2 styles → two full stances as distinct paragraphs (paragraph-form, ~350-550 chars)
    //   3 styles → three short stances as punchy fragments (compact variety, ~150-300 chars)
    //
    // \n\n between paragraphs so the card can render them separately.
    if (chosenStyles.length === 1) {
      const s1 = chosenStyles[0].id;
      localGrammar.origin = ['#intro#\n\n#apathy#\n\n#outro#'];
      localGrammar.apathy = [`#${s1}_stance#`];
    } else if (chosenStyles.length === 2) {
      const s1 = chosenStyles[0].id;
      const s2 = chosenStyles[1].id;
      // Two full-paragraph stances, with an intro lead-in
      localGrammar.origin = ['#intro#\n\n#apathy#'];
      localGrammar.apathy = [
        `#${s1}_stance#\n\n#${s2}_stance#`,
        `#${s2}_stance#\n\n#${s1}_stance#`
      ];
    } else {
      // Three punchy short stances — variety over depth
      const s1 = chosenStyles[0].id;
      const s2 = chosenStyles[1].id;
      const s3 = chosenStyles[2].id;
      localGrammar.origin = ['#intro#\n\n#apathy#'];
      localGrammar.apathy = [
        `#${s1}_stance_short# #${s2}_stance_short# #${s3}_stance_short#`,
        `#${s2}_stance_short# #${s3}_stance_short# #${s1}_stance_short#`,
        `#${s3}_stance_short# #${s1}_stance_short# #${s2}_stance_short#`
      ];
    }

    const grammarCompiler = createGrammar(localGrammar);
    content = grammarCompiler.flatten('origin');

    if (content.length <= 600) {
      break;
    }
  }

  // Fallback truncation at word boundary if we still exceed 600 characters
  if (content.length > 600) {
    let truncated = content.substring(0, 597);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 0) {
      truncated = truncated.substring(0, lastSpace);
    }
    content = truncated + '...';
  }

  // Randomize engagement metrics
  const viewsNum = Math.floor(Math.random() * 8900000) + 100000; // 100K to 9M
  const likesNum = Math.floor(viewsNum * (Math.random() * 0.15 + 0.05)); // 5% to 20% of views
  const retweetsNum = Math.floor(likesNum * (Math.random() * 0.25 + 0.05)); // 5% to 30% of likes

  const formatNum = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Generate the instagram caption randomly at post-generation time
  const captionPhrases = [
    'minimum effort',
    'bare minimum',
    'minimum vibes',
    'minimum energy',
    'minimum stance',
    'minimum take',
    'neutral content',
    'strategic silence',
    'carefully crafted nothing',
    'professionally undecided',
    'diplomatically absent',
    'peak non-commitment',
  ];
  const captionEmojis = ['😑', '🤐', '🥱', '🤷', '🤍', '📉', '🔋', '🧱', '🕊️', '🫥', '💅', '🪞', '🫠'];
  const captionPhrase = captionPhrases[Math.floor(Math.random() * captionPhrases.length)];
  const captionEmoji = captionEmojis[Math.floor(Math.random() * captionEmojis.length)];
  const topicIcon = topic.icon;
  const caption = `${captionPhrase} ${topicIcon}${captionEmoji}`;

  // Generate a realistic timestamp
  const date = new Date();
  const hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const timestampStr = `${displayHours}:${minutes} ${ampm} · ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  // Pick random profile entry from profiles.json
  const chosenProfile = availableProfiles[Math.floor(Math.random() * availableProfiles.length)];

  // Match avatar image by filename/id specified in the profile entry
  let chosenAvatarUrl: string | undefined = undefined;
  if (chosenProfile.avatar) {
    const key = chosenProfile.avatar.trim().toLowerCase();
    chosenAvatarUrl = avatarMap[key];
  }

  // Fallback to random icon if specified avatar file wasn't found
  if (!chosenAvatarUrl && avatarUrlList.length > 0) {
    chosenAvatarUrl = avatarUrlList[Math.floor(Math.random() * avatarUrlList.length)];
  }

  const avatarText = getInitials(chosenProfile.name);

  return {
    id: Math.random().toString(36).substring(2, 9),
    topicId,
    activeStyles: chosenStyles.map((style) => style.name),
    authorName: chosenProfile.name,
    authorHandle: chosenProfile.handle,
    avatarUrl: chosenAvatarUrl,
    verified: 'blue',
    avatarGradient: ['#ba0035', '#006970'],
    avatarText,
    content,
    caption,
    timestamp: timestampStr,
    likes: formatNum(likesNum),
    retweets: formatNum(retweetsNum),
    views: formatNum(viewsNum),
  };
}

/** Fisher-Yates shuffle helper */
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Randomized topics list for the session */
export const SHUFFLED_TOPICS: TopicDefinition[] = shuffleArray(TOPICS);

