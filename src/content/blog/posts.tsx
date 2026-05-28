import type { ReactElement } from 'react';

export interface PostSection {
  num: string;
  title: string;
  desc: string;
}

export interface PostTakeaway {
  label: string;
  value: string;
  desc: string;
}

export interface PostPullQuote {
  quote: string;
  attribution: string;
}

export interface BlogPostData {
  slug: string;
  cat: string;
  catLabel: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  metaDescription: string;
  illustration: ReactElement;
  takeaways: PostTakeaway[];
  sections: PostSection[];
  pullQuote: PostPullQuote;
  related: string[];
}

const ShieldArt = (
  <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="220" rx="20" fill="#F4ECE3" />
    <circle cx="80" cy="50" r="60" fill="rgba(143,188,143,.18)" />
    <circle cx="260" cy="180" r="50" fill="rgba(179,139,109,.18)" />
    <path
      d="M160 50 L 110 70 V 110 C 110 140 132 168 160 178 C 188 168 210 140 210 110 V 70 Z"
      fill="#fff"
      stroke="#576DB5"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M138 116 L 152 130 L 184 100"
      fill="none"
      stroke="#8FBC8F"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="232" cy="62" r="6" fill="#B38B6D" />
    <rect x="32" y="180" width="56" height="8" rx="4" fill="rgba(45,55,72,.08)" />
    <rect x="32" y="194" width="32" height="6" rx="3" fill="rgba(45,55,72,.06)" />
  </svg>
);

const ChartArt = (
  <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="220" rx="20" fill="#F4ECE3" />
    <circle cx="260" cy="60" r="55" fill="rgba(87,109,181,.16)" />
    <circle cx="60" cy="180" r="40" fill="rgba(143,188,143,.18)" />
    <line x1="50" y1="170" x2="50" y2="50" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
    <line
      x1="50"
      y1="170"
      x2="270"
      y2="170"
      stroke="#2D3748"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <polyline
      points="70,148 110,118 150,132 190,80 230,60 260,42"
      fill="none"
      stroke="#576DB5"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="260" cy="42" r="7" fill="#8FBC8F" />
    <text
      x="160"
      y="200"
      textAnchor="middle"
      fontFamily="Plus Jakarta Sans, sans-serif"
      fontSize="11"
      fontWeight="700"
      letterSpacing="3"
      fill="#B38B6D"
    >
      CPA · ROAS · LTV
    </text>
  </svg>
);

const StarArt = (
  <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="220" rx="20" fill="#F4ECE3" />
    <circle cx="80" cy="60" r="48" fill="rgba(143,188,143,.20)" />
    <circle cx="240" cy="170" r="48" fill="rgba(179,139,109,.18)" />
    <polygon
      points="160,50 180,108 244,110 192,148 208,210 160,176 112,210 128,148 76,110 140,108"
      fill="rgba(143,188,143,.32)"
      stroke="#8FBC8F"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <polygon
      points="160,72 173,116 220,118 184,144 196,188 160,162 124,188 136,144 100,118 147,116"
      fill="#8FBC8F"
    />
    <circle cx="232" cy="56" r="5" fill="#B38B6D" />
  </svg>
);

const MapArt = (
  <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="220" rx="20" fill="#F4ECE3" />
    <circle cx="260" cy="60" r="50" fill="rgba(87,109,181,.14)" />
    <path
      d="M160 50 C 132 50 110 72 110 100 C 110 138 160 188 160 188 S 210 138 210 100 C 210 72 188 50 160 50 Z"
      fill="#fff"
      stroke="#B38B6D"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <circle cx="160" cy="100" r="20" fill="#F4ECE3" stroke="#B38B6D" strokeWidth="3" />
    <circle cx="160" cy="100" r="9" fill="#576DB5" />
    <line
      x1="50"
      y1="180"
      x2="100"
      y2="180"
      stroke="#2D3748"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="3 5"
    />
    <line
      x1="220"
      y1="180"
      x2="280"
      y2="180"
      stroke="#2D3748"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="3 5"
    />
  </svg>
);

const BotArt = (
  <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="220" rx="20" fill="#F4ECE3" />
    <circle cx="60" cy="60" r="45" fill="rgba(143,188,143,.18)" />
    <circle cx="260" cy="180" r="48" fill="rgba(179,139,109,.18)" />
    <rect
      x="92"
      y="58"
      width="136"
      height="92"
      rx="22"
      fill="#fff"
      stroke="#576DB5"
      strokeWidth="3"
    />
    <circle cx="132" cy="104" r="7" fill="#576DB5" />
    <circle cx="160" cy="104" r="7" fill="#8FBC8F" />
    <circle cx="188" cy="104" r="7" fill="#B38B6D" />
    <path
      d="M130 150 L 122 174 L 152 150 Z"
      fill="#fff"
      stroke="#576DB5"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <line
      x1="160"
      y1="48"
      x2="160"
      y2="34"
      stroke="#2D3748"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="160" cy="28" r="6" fill="#B38B6D" />
  </svg>
);

const LotusArt = (
  <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="220" rx="20" fill="#F4ECE3" />
    <circle cx="80" cy="180" r="42" fill="rgba(87,109,181,.14)" />
    <circle cx="250" cy="50" r="40" fill="rgba(179,139,109,.18)" />
    <g transform="translate(160 112)">
      <path d="M0 -56 Q 24 -10 0 34 Q -24 -10 0 -56 Z" fill="#8FBC8F" />
      <path
        d="M0 -56 Q 24 -10 0 34 Q -24 -10 0 -56 Z"
        fill="#8FBC8F"
        opacity=".72"
        transform="rotate(72)"
      />
      <path
        d="M0 -56 Q 24 -10 0 34 Q -24 -10 0 -56 Z"
        fill="#8FBC8F"
        opacity=".52"
        transform="rotate(144)"
      />
      <path
        d="M0 -56 Q 24 -10 0 34 Q -24 -10 0 -56 Z"
        fill="#8FBC8F"
        opacity=".72"
        transform="rotate(216)"
      />
      <path
        d="M0 -56 Q 24 -10 0 34 Q -24 -10 0 -56 Z"
        fill="#8FBC8F"
        opacity=".52"
        transform="rotate(288)"
      />
      <circle r="14" fill="#576DB5" />
    </g>
  </svg>
);

const ClockArt = (
  <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="220" rx="20" fill="#F4ECE3" />
    <circle cx="60" cy="180" r="40" fill="rgba(143,188,143,.18)" />
    <circle cx="240" cy="60" r="48" fill="rgba(87,109,181,.14)" />
    <rect
      x="60"
      y="50"
      width="200"
      height="130"
      rx="14"
      fill="#fff"
      stroke="#576DB5"
      strokeWidth="3"
    />
    <rect x="154" y="74" width="12" height="68" rx="3" fill="#8FBC8F" />
    <rect x="130" y="98" width="60" height="20" rx="3" fill="#8FBC8F" />
    <line x1="60" y1="172" x2="260" y2="172" stroke="#2D3748" strokeWidth="2" />
    <circle cx="78" cy="166" r="3" fill="#B38B6D" />
    <circle cx="98" cy="166" r="3" fill="#B38B6D" />
    <circle cx="118" cy="166" r="3" fill="#B38B6D" />
  </svg>
);

const DashboardArt = (
  <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="220" rx="20" fill="#F4ECE3" />
    <circle cx="80" cy="60" r="42" fill="rgba(143,188,143,.18)" />
    <circle cx="250" cy="180" r="44" fill="rgba(87,109,181,.14)" />
    <circle
      cx="160"
      cy="110"
      r="62"
      fill="none"
      stroke="#B38B6D"
      strokeWidth="4"
      strokeDasharray="5 7"
    />
    <circle cx="160" cy="110" r="40" fill="#fff" stroke="#576DB5" strokeWidth="3.5" />
    <line
      x1="160"
      y1="110"
      x2="160"
      y2="78"
      stroke="#576DB5"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <line
      x1="160"
      y1="110"
      x2="186"
      y2="126"
      stroke="#8FBC8F"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <circle cx="160" cy="110" r="5" fill="#576DB5" />
  </svg>
);

const ErArt = (
  <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="220" rx="20" fill="#F4ECE3" />
    <circle cx="60" cy="180" r="40" fill="rgba(179,139,109,.18)" />
    <circle cx="260" cy="60" r="44" fill="rgba(143,188,143,.18)" />
    <path
      d="M40 130 L 90 130 L 110 80 L 145 180 L 175 60 L 200 130 L 280 130"
      fill="none"
      stroke="#576DB5"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="148" y="52" width="14" height="60" rx="2" fill="#8FBC8F" />
    <rect x="128" y="72" width="54" height="20" rx="2" fill="#8FBC8F" />
  </svg>
);

export const BLOG_POSTS: BlogPostData[] = [
  {
    slug: 'hipaa-tracking',
    cat: 'compliance',
    catLabel: 'HIPAA Compliance',
    date: 'Apr 22, 2026',
    readTime: '8 min read',
    title: 'How to set up HIPAA-compliant Google Ads tracking in 2026.',
    excerpt:
      'A step-by-step guide to server-side tracking, BAA-ready vendors, and the consent flows that keep your conversion data clean without exposing PHI.',
    metaDescription:
      'A practitioner playbook for HIPAA-compliant Google Ads tracking: server-side tagging, BAA-ready vendors, and consent flows that keep conversion data clean.',
    author: 'Priya Patel',
    authorRole: 'Senior Compliance Strategist',
    illustration: ShieldArt,
    takeaways: [
      {
        label: 'Risk class',
        value: 'PHI-adjacent',
        desc: 'Conversion pixels can carry IP, user-agent, and URL signals that qualify as identifiers under HIPAA.',
      },
      {
        label: 'Setup time',
        value: '~ 3 days',
        desc: 'Server-side container, BAA paperwork, and consent banner - wired end-to-end in under a week.',
      },
      {
        label: 'Conversion lift',
        value: '+18%',
        desc: 'Server-side tags recover conversions that browser blockers would otherwise drop on the floor.',
      },
    ],
    sections: [
      {
        num: '01',
        title: 'Map the data trail',
        desc: 'Inventory every form, page, and pixel that touches a patient identifier before you touch a single tag.',
      },
      {
        num: '02',
        title: 'Move to server-side',
        desc: 'Route all conversion events through your own first-party endpoint - never directly from the browser to Google.',
      },
      {
        num: '03',
        title: 'Sign the right BAAs',
        desc: 'Confirm BAA-ready coverage with every vendor in the chain, from CDN to analytics warehouse.',
      },
      {
        num: '04',
        title: 'Ship the consent flow',
        desc: 'A two-line banner, a real opt-in, and an audit log that survives a compliance review.',
      },
    ],
    pullQuote: {
      quote:
        'Compliance is not a switch you flip at launch. It is the architecture you choose on day one.',
      attribution: 'Priya Patel · Senior Compliance Strategist',
    },
    related: ['ads-cost', 'reviews', 'ai-chatbot'],
  },
  {
    slug: 'ads-cost',
    cat: 'paid',
    catLabel: 'Paid Media',
    date: 'Apr 18, 2026',
    readTime: '6 min read',
    title: 'Why your urgent care CPA is probably 30% too high.',
    excerpt:
      'The 4 most common bidding mistakes we see in urgent care Google Ads accounts - and the audit checklist we use to identify them in the first 24 hours.',
    metaDescription:
      'Four high-frequency bidding mistakes that inflate urgent care Google Ads CPA - plus the 24-hour audit checklist used to find and fix them fast.',
    author: 'Marcus Rodriguez',
    authorRole: 'Head of Paid Media',
    illustration: ChartArt,
    takeaways: [
      {
        label: 'Avg overspend',
        value: '30%',
        desc: 'Median CPA waste we measure across new urgent care audits before optimization.',
      },
      {
        label: 'Audit window',
        value: '24 hrs',
        desc: 'How long it takes us to map leaks across keywords, geos, schedules, and devices.',
      },
      {
        label: 'Payback',
        value: '< 30 days',
        desc: 'Most clinics recover the audit cost inside one billing cycle on saved media spend.',
      },
    ],
    sections: [
      {
        num: '01',
        title: 'Audit the match types',
        desc: 'Broad-match leakage is the single biggest reason urgent care budgets bleed into off-intent searches.',
      },
      {
        num: '02',
        title: 'Geo-fence intent',
        desc: 'A 5-mile radius is rarely the right shape. Map drive-time, not distance, to real catchment behavior.',
      },
      {
        num: '03',
        title: 'Cap the dayparts',
        desc: 'After-hours clicks convert at a fraction of business-hour clicks - bid accordingly, not equally.',
      },
      {
        num: '04',
        title: 'Pin the negatives',
        desc: 'A clinic without a 200-term negative list is paying Google to talk to the wrong patients.',
      },
    ],
    pullQuote: {
      quote:
        'Healthcare CPA is rarely a creative problem. It is almost always a configuration problem.',
      attribution: 'Marcus Rodriguez · Head of Paid Media',
    },
    related: ['hipaa-tracking', 'maps-rank', 'fsed-trauma'],
  },
  {
    slug: 'reviews',
    cat: 'reputation',
    catLabel: 'Reputation',
    date: 'Apr 14, 2026',
    readTime: '5 min read',
    title: 'Automating Google reviews without violating HIPAA.',
    excerpt:
      "Patient testimonials are 10x more powerful than ad copy - but most review automation tools quietly break HIPAA. Here's the stack we use instead.",
    metaDescription:
      'Build a compliant patient review engine: opt-in only, no PHI in messages, and a BAA-covered tooling stack that keeps Google reviews flowing safely.',
    author: 'Sarah Chen',
    authorRole: 'Reputation Lead',
    illustration: StarArt,
    takeaways: [
      {
        label: 'Trust lift',
        value: '10×',
        desc: 'Patient reviews convert prospects roughly an order of magnitude better than paid ad copy.',
      },
      {
        label: 'Opt-in rate',
        value: '64%',
        desc: 'When the review prompt sits at the right post-visit moment, two-thirds of patients say yes.',
      },
      {
        label: 'Compliance risk',
        value: 'High',
        desc: 'Most off-the-shelf review SaaS tools transmit PHI without a BAA - and most clinics never notice.',
      },
    ],
    sections: [
      {
        num: '01',
        title: 'Strip the PHI',
        desc: 'Review requests never reference appointments, providers, or conditions - only the visit existed, nothing else.',
      },
      {
        num: '02',
        title: 'Capture the opt-in',
        desc: 'Consent is collected at intake, time-stamped, and revocable in a single click from any message.',
      },
      {
        num: '03',
        title: 'Wire BAA tools only',
        desc: 'Every SMS, email, and storage layer in the path operates under a signed Business Associate Agreement.',
      },
      {
        num: '04',
        title: 'Route the negatives',
        desc: 'Low-scoring responses surface privately to the front desk before they ever reach a public profile.',
      },
    ],
    pullQuote: {
      quote: 'Patient trust is built quietly. The same goes for the systems that ask for a review.',
      attribution: 'Sarah Chen · Reputation Lead',
    },
    related: ['hipaa-tracking', 'medspa', 'urgent-care'],
  },
  {
    slug: 'maps-rank',
    cat: 'seo',
    catLabel: 'Local SEO',
    date: 'Apr 10, 2026',
    readTime: '9 min read',
    title: 'The 7 Google Business Profile signals that move map rankings.',
    excerpt:
      'After managing 200+ Google Business Profiles across Texas, these are the 7 signals that actually correlate with local-pack ranking improvement - ranked by leverage.',
    metaDescription:
      'The seven Google Business Profile signals that genuinely move local-pack rankings - sourced from 200+ healthcare GBPs and ranked by real-world leverage.',
    author: 'Marcus Rodriguez',
    authorRole: 'Head of Paid Media',
    illustration: MapArt,
    takeaways: [
      {
        label: 'Profiles studied',
        value: '200+',
        desc: 'Live healthcare GBPs across Texas, Florida, and Arizona, tracked over 18 months.',
      },
      {
        label: 'Top signal',
        value: 'Reviews',
        desc: 'Volume, velocity, and response rate consistently outranked every on-profile field.',
      },
      {
        label: 'Time to rank',
        value: '60–90 days',
        desc: 'How long it takes a serious cadence to move a GBP into the 3-pack in a competitive metro.',
      },
    ],
    sections: [
      {
        num: '01',
        title: 'Reviews above everything',
        desc: 'Volume, velocity, and reply-rate together explain more local-pack movement than any other signal we measure.',
      },
      {
        num: '02',
        title: 'Service & area pages',
        desc: 'GBP service blocks linked to hyper-local landing pages compound the proximity ranking signal.',
      },
      {
        num: '03',
        title: 'Photos that look human',
        desc: 'Real interior, exterior, and team photos outperform stock - and uploads decay if you stop posting.',
      },
      {
        num: '04',
        title: 'Q&A you actually own',
        desc: 'Pre-load and answer your own Q&A. Empty profiles invite competitor-flavored answers from strangers.',
      },
    ],
    pullQuote: {
      quote:
        'GBP ranking is not a hack. It is the quiet compounding of doing seven small things, every week, on purpose.',
      attribution: 'Marcus Rodriguez · Head of Paid Media',
    },
    related: ['reviews', 'urgent-care', 'analytics'],
  },
  {
    slug: 'ai-chatbot',
    cat: 'automation',
    catLabel: 'Automation & AI',
    date: 'Apr 6, 2026',
    readTime: '11 min read',
    title: 'AI patient intake: what works, what breaks compliance.',
    excerpt:
      "AI scheduling and intake bots can cut front-desk load by 40%. They can also leak PHI in 6 different ways. Here's the architecture that does the first without the second.",
    metaDescription:
      'A practitioner architecture for HIPAA-aware AI patient intake - what compliant bots include, what they exclude, and the six leak vectors to design out.',
    author: 'David Kim',
    authorRole: 'Automation Architect',
    illustration: BotArt,
    takeaways: [
      {
        label: 'Load reduction',
        value: '40%',
        desc: 'How much front-desk volume a well-scoped intake bot absorbs in the first 60 days.',
      },
      {
        label: 'Leak vectors',
        value: '6',
        desc: 'Most consumer AI stacks expose PHI in at least six discrete ways - none of them advertised.',
      },
      {
        label: 'Time to live',
        value: '2 weeks',
        desc: 'From scope-and-script to a production bot inside a BAA-covered, audit-logged stack.',
      },
    ],
    sections: [
      {
        num: '01',
        title: 'Scope before models',
        desc: 'Decide which questions the bot answers and which it must hand off. Scope is a compliance decision, not a UX one.',
      },
      {
        num: '02',
        title: 'Strip identifiers',
        desc: 'No PHI in prompts, no PHI in logs. Tokenize patient context, never raw identifiers.',
      },
      {
        num: '03',
        title: 'BAA the entire stack',
        desc: 'Model provider, vector store, transcript log, and CRM. Any link without a BAA breaks the chain.',
      },
      {
        num: '04',
        title: 'Escalate gracefully',
        desc: 'A bot that knows when to hand off is worth ten that try to answer everything themselves.',
      },
    ],
    pullQuote: {
      quote:
        'The fastest way to lose patient trust is to let a confident model answer a regulated question.',
      attribution: 'David Kim · Automation Architect',
    },
    related: ['hipaa-tracking', 'reviews', 'analytics'],
  },
  {
    slug: 'medspa',
    cat: 'medspa',
    catLabel: 'MedSpa Marketing',
    date: 'Apr 2, 2026',
    readTime: '7 min read',
    title: 'The MedSpa LTV playbook: turning $300 facials into $4K patients.',
    excerpt:
      "High-LTV MedSpa marketing isn't about cheaper acquisition - it's about better post-purchase journey. Here's the email + SMS + remarketing stack we deploy on day one.",
    metaDescription:
      'A MedSpa LTV playbook: the email, SMS, and remarketing journey that turns a first $300 facial into a multi-thousand-dollar lifetime patient relationship.',
    author: 'Marcus Rodriguez',
    authorRole: 'Head of Paid Media',
    illustration: LotusArt,
    takeaways: [
      {
        label: 'Avg LTV lift',
        value: '4.2×',
        desc: 'How much MedSpa LTV moves once the post-purchase journey is wired and running.',
      },
      {
        label: 'First repeat',
        value: 'Day 14',
        desc: 'The window where the post-treatment SMS sequence does the most work for retention.',
      },
      {
        label: 'Margin shift',
        value: '+22%',
        desc: 'Higher-tier services convert better when the journey leads, instead of the price tag.',
      },
    ],
    sections: [
      {
        num: '01',
        title: 'Frame the first visit',
        desc: 'Treat the first facial as a discovery session, not a transaction. Set the next ladder rung that day.',
      },
      {
        num: '02',
        title: 'Wire the 14-day touch',
        desc: 'A two-message SMS sequence around healing milestones drives the highest single-channel repeat lift we measure.',
      },
      {
        num: '03',
        title: 'Remarket on outcomes',
        desc: 'Hero the results, not the room. Patient-permission outcome creative outperforms every stock ad set.',
      },
      {
        num: '04',
        title: 'Ladder the offers',
        desc: 'Curate the next-best service before the patient asks. Decision fatigue is the silent LTV killer.',
      },
    ],
    pullQuote: {
      quote: 'MedSpa growth is not an acquisition problem. It is a sequencing problem.',
      attribution: 'Marcus Rodriguez · Head of Paid Media',
    },
    related: ['reviews', 'ads-cost', 'analytics'],
  },
  {
    slug: 'urgent-care',
    cat: 'urgent',
    catLabel: 'Urgent Care',
    date: 'Mar 28, 2026',
    readTime: '6 min read',
    title: 'Wait-time marketing: the urgent care advantage no one is using.',
    excerpt:
      'Why publishing real-time wait times publicly converts 23% better than promoting "convenience" or "walk-in welcome" - and the technical stack to do it safely.',
    metaDescription:
      'Real-time wait-time publishing converts urgent care prospects 23% better than generic "walk-in welcome" copy. Here is the safe, scalable stack to do it.',
    author: 'Sarah Chen',
    authorRole: 'Reputation Lead',
    illustration: ClockArt,
    takeaways: [
      {
        label: 'Conversion lift',
        value: '+23%',
        desc: 'Live wait-time pages convert prospects materially better than generic convenience copy.',
      },
      {
        label: 'Refresh cadence',
        value: '60 sec',
        desc: 'How fast the public dashboard polls the queue to stay credible without thrashing your PMS.',
      },
      {
        label: 'No-show drop',
        value: '−14%',
        desc: 'Published expectations set up the visit. Patients self-route to the right location and time.',
      },
    ],
    sections: [
      {
        num: '01',
        title: 'Publish the actual number',
        desc: 'Round to five minutes, not zero. Honesty out-converts every form of optimism marketing.',
      },
      {
        num: '02',
        title: 'Mirror it on every channel',
        desc: 'GBP, website, Apple/Google Maps, and SMS auto-reply - one source of truth, four surfaces.',
      },
      {
        num: '03',
        title: 'Wrap it in expectations',
        desc: 'Show next-slot availability and walk-in window beside the number, so patients pick the lane that fits.',
      },
      {
        num: '04',
        title: 'Audit the feed',
        desc: 'A stale wait-time is worse than no wait-time. Alert when the feed drifts more than five minutes.',
      },
    ],
    pullQuote: {
      quote:
        'The most under-rated urgent care channel is honesty, displayed in real time, in three places.',
      attribution: 'Sarah Chen · Reputation Lead',
    },
    related: ['maps-rank', 'reviews', 'ads-cost'],
  },
  {
    slug: 'analytics',
    cat: 'analytics',
    catLabel: 'Analytics',
    date: 'Mar 24, 2026',
    readTime: '8 min read',
    title: 'The healthcare marketing dashboard every clinic should run.',
    excerpt:
      "CPA, appointment-to-show ratio, LTV, channel ROI - the 12 metrics we put on every client's real-time dashboard, plus the alerts that catch problems before they hit revenue.",
    metaDescription:
      'The 12-metric healthcare marketing dashboard we deploy for every clinic - CPA, show ratio, LTV, channel ROI - plus the alerts that catch revenue leaks early.',
    author: 'David Kim',
    authorRole: 'Automation Architect',
    illustration: DashboardArt,
    takeaways: [
      {
        label: 'Tracked metrics',
        value: '12',
        desc: 'The minimum viable dashboard for a clinic to make spend decisions without flying blind.',
      },
      {
        label: 'Detection lift',
        value: '5× faster',
        desc: 'Anomaly alerts surface revenue leaks days before a monthly report would catch them.',
      },
      {
        label: 'Data freshness',
        value: '< 1 hr',
        desc: 'Hourly refresh on every chart, every clinic. Daily dashboards are last decade.',
      },
    ],
    sections: [
      {
        num: '01',
        title: 'Pick the load-bearing 12',
        desc: 'CPA, show ratio, LTV, and channel ROI are non-negotiable. Everything else is a sub-view of those four.',
      },
      {
        num: '02',
        title: 'Anchor revenue, not vanity',
        desc: 'A dashboard without a dollar figure on the cover is a dashboard nobody reads.',
      },
      {
        num: '03',
        title: 'Alert on inflection',
        desc: 'Static thresholds miss reality. Alerts should fire on slope changes, not absolute numbers.',
      },
      {
        num: '04',
        title: 'Run it weekly with eyes',
        desc: 'Automation surfaces problems. Humans decide what to do about them. Keep both in the loop.',
      },
    ],
    pullQuote: {
      quote: 'A dashboard nobody opens is a CRM with extra steps.',
      attribution: 'David Kim · Automation Architect',
    },
    related: ['ads-cost', 'ai-chatbot', 'maps-rank'],
  },
  {
    slug: 'fsed-trauma',
    cat: 'fsed',
    catLabel: 'FSED',
    date: 'Mar 20, 2026',
    readTime: '10 min read',
    title: 'Freestanding ER marketing: high-acuity keyword bidding done right.',
    excerpt:
      '"Chest pain near me" costs $48 per click. "ER near me" costs $12. Here\'s the keyword segmentation framework that captures the right intent without burning budget on tire-kickers.',
    metaDescription:
      'A keyword segmentation framework for freestanding ER marketing that captures real high-acuity intent without burning budget on low-conversion clicks.',
    author: 'Sarah Chen',
    authorRole: 'Reputation Lead',
    illustration: ErArt,
    takeaways: [
      {
        label: 'High-acuity CPC',
        value: '$48',
        desc: 'Median click price for symptom-led searches like "chest pain near me" in a competitive metro.',
      },
      {
        label: 'Generic CPC',
        value: '$12',
        desc: 'Baseline ER-near-me terms. Cheaper, broader, and far less correlated with actual visits.',
      },
      {
        label: 'Convert ratio',
        value: '6×',
        desc: 'High-acuity terms convert roughly six times better - when the segmentation is honest.',
      },
    ],
    sections: [
      {
        num: '01',
        title: 'Separate intent buckets',
        desc: 'Symptom-led, location-led, and insurance-led searches need different ads, different pages, and different bids.',
      },
      {
        num: '02',
        title: 'Price by acuity',
        desc: 'Pay up where conversion is honest. Squeeze where intent is exploratory or insurance-shopping.',
      },
      {
        num: '03',
        title: 'Match landing pages',
        desc: 'A symptom searcher hitting a generic ER homepage is a $48 click wasted on the wrong message.',
      },
      {
        num: '04',
        title: 'Hold the negatives',
        desc: 'Job, insurance, and pediatric-only terms drain freestanding ER budgets unless aggressively excluded.',
      },
    ],
    pullQuote: {
      quote:
        'The wrong click at high-acuity prices is the fastest way to spend a quarter of media budget by Friday.',
      attribution: 'Sarah Chen · Reputation Lead',
    },
    related: ['ads-cost', 'urgent-care', 'maps-rank'],
  },
];

export const getPostBySlug = (slug: string | undefined): BlogPostData | undefined =>
  BLOG_POSTS.find((post) => post.slug === slug);

export const getRelatedPosts = (slugs: string[]): BlogPostData[] =>
  slugs
    .map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter((p): p is BlogPostData => Boolean(p));
