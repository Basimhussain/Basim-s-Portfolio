import gallery from "./gallery.json";

export interface GalleryItem {
  src: string;
  w: number;
  h: number;
  title: string;
  caption: string;
  tall?: boolean;
  phone?: boolean;
  illustration?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  catKey: string;
  category: string;
  /** Card text and the short line under the hero title. */
  description: string;
  /** The large statement at the top of the page. */
  lead: string;
  intro?: string;
  details: string[];
  facts: { label: string; value: string }[];
  process?: { title: string; text: string }[];
  challenges?: { challenge: string; solution: string }[];
  location: string;
  year?: string;
  scope: string;
  links: { label: string; href: string }[];
  /** Real screenshots when true, overview diagrams when false. */
  screens: boolean;
  img: string;
  items: GalleryItem[];
}

export const categories = [
  { key: "agents", label: "AI Agents" },
  { key: "platforms", label: "Web Platforms" },
  { key: "mobile", label: "Mobile Apps" },
  { key: "research", label: "Models & Research" },
] as const;

type Def = Omit<Project, "items" | "img" | "category">;

const g = gallery as Record<string, GalleryItem[]>;

const defs: Def[] = [
  {
    slug: "voice-agents",
    catKey: "agents",
    title: "Voice and Chat Agents for Sales",
    description:
      "Agents answer inbound enquiries, qualify leads and write call summaries straight into the CRM.",
    lead: "Every inbound enquiry is answered, qualified and written into the CRM.",
    intro:
      "Voice and chat agents handle first contact so the sales team only sees conversations worth their time. A WhatsApp automation answers routine questions, and an LLM pipeline turns free-text customer requirements into structured, service-based quotations.",
    details: [
      "Call summaries are written back to the CRM automatically.",
      "An n8n WhatsApp automation brought routine replies from roughly 4 hours to under 30 seconds.",
      "An LLM pipeline drafts quotations from free-text requirements.",
    ],
    facts: [
      { label: "First-contact enquiries handled", value: "~70%" },
      { label: "Routine reply time", value: "<30s" },
      { label: "Previously", value: "~4 hours" },
    ],
    process: [
      { title: "Enquiry", text: "An inbound call, chat or WhatsApp message arrives." },
      { title: "Answer", text: "The agent answers routine questions on the spot." },
      { title: "Qualify", text: "Leads are qualified before a person gets involved." },
      { title: "Hand off", text: "A summary is written into the CRM for the sales team." },
    ],
    challenges: [
      {
        challenge: "Sales was spending its time on repetitive first-contact enquiries.",
        solution:
          "Agents now handle them. Around 70% of repetitive first-contact enquiries no longer reach the sales team.",
      },
      {
        challenge: "Routine WhatsApp questions waited hours for a reply.",
        solution: "An n8n automation answers them in under 30 seconds.",
      },
    ],
    location: "Basmat Alomran, Riyadh",
    year: "2026",
    scope: "LLM and voice APIs, n8n, Node.js, MySQL",
    links: [],
    screens: false,
  },
  {
    slug: "amc-estimator",
    catKey: "platforms",
    title: "Smart AMC Estimator and bocsmart.com",
    description:
      "A bilingual Arabic and English corporate platform with a live estimator that quotes in under 2 seconds.",
    lead: "A maintenance quote in under two seconds, in Arabic or English.",
    intro:
      "bocsmart.com presents an MEP and fire protection contractor to clients across the Kingdom. The Smart AMC Estimator sits beside the hero, so a visitor can price annual maintenance without leaving the page, then send the request to the sales team.",
    details: [
      "Full right-to-left Arabic layout alongside English.",
      "Quantities in, estimated annual maintenance out, then a short form to send the request.",
      "Services, a filterable project library, safety content and a quote request page.",
    ],
    facts: [
      { label: "Time to a quote", value: "<2s" },
      { label: "Languages", value: "EN + AR" },
      { label: "Live", value: "bocsmart.com" },
    ],
    process: [
      { title: "Enter quantities", text: "Control panels, detectors, lights, pumps and cabinets." },
      { title: "Calculate", text: "The estimate appears instantly." },
      { title: "Add details", text: "Name and phone, with email optional." },
      { title: "Send", text: "The request goes to the sales team by WhatsApp or email." },
    ],
    challenges: [
      {
        challenge: "Customers had to wait for a person to price a maintenance contract.",
        solution: "A live estimator returns an annual figure in under 2 seconds.",
      },
    ],
    location: "Basmat Alomran, Riyadh",
    year: "2026",
    scope: "Vue.js, Node.js, Express",
    links: [{ label: "Visit bocsmart.com", href: "https://bocsmart.com" }],
    screens: true,
  },
  {
    slug: "erp",
    catKey: "platforms",
    title: "Company ERP",
    description:
      "Built from scratch for HR, finance, procurement, projects and field operations across 3 active sites.",
    lead: "One system for the whole business, with live numbers instead of daily reports.",
    intro:
      "A company-wide ERP covering HR, finance, procurement, projects and field operations. Role-based access means each person sees their own work, and multi-stage approvals move requests through defined steps.",
    details: [
      "Role-based access across every module.",
      "Multi-stage approvals for requests.",
      "Real-time dashboards that replaced manual daily reports.",
    ],
    facts: [
      { label: "Active sites reporting", value: "3" },
      { label: "Business areas", value: "5" },
      { label: "Built", value: "From scratch" },
    ],
    process: [
      { title: "Request", text: "Work is raised in the module that owns it." },
      { title: "Approve", text: "It moves through multi-stage approvals." },
      { title: "Record", text: "HR, finance, procurement, projects and field operations share one record." },
      { title: "Report", text: "Dashboards update in real time." },
    ],
    challenges: [
      {
        challenge: "Sites reported through manual daily reports.",
        solution: "Real-time dashboards replaced them across 3 active sites.",
      },
    ],
    location: "Basmat Alomran, Riyadh",
    year: "2026",
    scope: "Vue.js, Node.js, Express, MySQL, Docker",
    links: [],
    screens: false,
  },
  {
    slug: "voice-platform",
    catKey: "agents",
    title: "Voice AI Platform",
    description:
      "A SaaS platform that orchestrates Vapi conversational agents, with a real-time dashboard for live calls.",
    lead: "Built to run a hundred thousand calls a day, and to catch hallucinations before customers do.",
    intro:
      "The platform orchestrates conversational agents on a Node.js and PostgreSQL backend designed for 100K+ calls a day. A real-time React dashboard streams live calls, sentiment and performance, and an evaluation loop guards every knowledge-base update.",
    details: [
      "Real-time React 19 dashboard on Socket.io for live call streaming and sentiment.",
      "RAGAS evaluation with automated regression tests on every knowledge-base update.",
      "Every service containerised, with a multi-stage GitHub Actions pipeline and test gates.",
    ],
    facts: [
      { label: "Calls a day, design target", value: "100K+" },
      { label: "Faithfulness (RAGAS)", value: "0.93" },
      { label: "Answer relevancy", value: "0.90" },
    ],
    process: [
      { title: "Call", text: "A caller reaches a Vapi conversational agent." },
      { title: "Orchestrate", text: "A Node.js backend manages the call and stores data in PostgreSQL." },
      { title: "Stream", text: "Socket.io pushes live events to the dashboard." },
      { title: "Evaluate", text: "RAGAS regression tests run before each knowledge-base release." },
    ],
    challenges: [
      {
        challenge: "A knowledge-base update can quietly make answers worse.",
        solution:
          "A RAGAS loop with regression tests on every update catches hallucination regressions before they reach production.",
      },
      {
        challenge: "Shipping safely under a tight schedule.",
        solution:
          "Docker for every service and a multi-stage GitHub Actions pipeline with test gates. No failed production deployments through launch.",
      },
    ],
    location: "Agent Maven, Riyadh",
    year: "2025 to 2026",
    scope: "Node.js, Express, PostgreSQL, Supabase, React 19, Socket.io, Docker",
    links: [],
    screens: false,
  },
  {
    slug: "arabic-sentiment",
    catKey: "research",
    title: "Arabic Sentiment Model",
    description:
      "Llama 3 8B fine-tuned with QLoRA on Arabic tweets, served from a monitored FastAPI endpoint.",
    lead: "Sentiment F1 on Arabic tweets, from 0.58 to 0.87.",
    intro:
      "Llama 3 8B fine-tuned with QLoRA (4-bit NF4) on 12K Arabic tweets. The quantised model sits behind a FastAPI endpoint on HuggingFace Spaces, with latency and memory monitoring.",
    details: [
      "Three-class sentiment on Arabic text.",
      "14 tracked training runs.",
      "Deployed as an API with latency and memory monitoring.",
    ],
    facts: [
      { label: "F1 before", value: "0.58" },
      { label: "F1 after", value: "0.87" },
      { label: "Training tweets", value: "12K" },
    ],
    process: [
      { title: "Data", text: "12K Arabic tweets in three sentiment classes." },
      { title: "Fine-tune", text: "QLoRA with 4-bit NF4 quantisation." },
      { title: "Compare", text: "14 tracked runs against the base model." },
      { title: "Serve", text: "FastAPI endpoint on HuggingFace Spaces." },
    ],
    challenges: [
      {
        challenge: "The base Llama 3 8B scored an F1 of 0.58 on Arabic sentiment.",
        solution: "QLoRA fine-tuning lifted the three-class F1 to 0.87.",
      },
    ],
    location: "Personal project",
    scope: "Llama 3 8B, QLoRA, HuggingFace, FastAPI",
    links: [],
    screens: false,
  },
  {
    slug: "scentwell",
    catKey: "mobile",
    title: "ScentWell",
    description:
      "A recommendation app: RAG over pgvector with a GPT-4o agent grounded by live web search and Reddit.",
    lead: "Swipe through fragrances picked for your taste, with answers that are checked, not guessed.",
    intro:
      "ScentWell learns your taste through a short onboarding, then serves one recommendation at a time as a swipe deck, alongside a running breakdown of your scent profile. Behind it, a RAG engine over pgvector and a GPT-4o agent grounded by live web search and Reddit data.",
    details: [
      "Onboarding covers vibe, scents, perfumes you love, dislikes and when you wear it.",
      "Langfuse tracing and RAGAS evaluation on every answer.",
      "React Native app on a Node.js backend with Supabase.",
    ],
    facts: [
      { label: "Faithfulness", value: "0.90" },
      { label: "Answer relevancy", value: "0.88" },
      { label: "Fewer hallucinations", value: "35%" },
    ],
    process: [
      { title: "Taste profile", text: "A short onboarding learns what you like and dislike." },
      { title: "Retrieve", text: "RAG over pgvector finds matching fragrances." },
      { title: "Ground", text: "A GPT-4o agent checks live web search and Reddit." },
      { title: "Measure", text: "Langfuse traces and RAGAS scores every answer." },
    ],
    challenges: [
      {
        challenge: "Language models invent details about products.",
        solution:
          "Grounding in retrieved and live data, with RAGAS evaluation, cut hallucinations by 35%.",
      },
    ],
    location: "Personal project",
    scope: "React Native, Node.js, pgvector, OpenAI, Supabase",
    links: [],
    screens: true,
  },
  {
    slug: "athar",
    catKey: "platforms",
    title: "Athar",
    description:
      "A bilingual platform connecting Saudi retail investors to Vision 2030 impact funding.",
    lead: "Saudi-compliant onboarding, in Arabic and English, shipped as an MVP in three months.",
    intro:
      "Athar connects Saudi retail investors to social impact funding aligned with Vision 2030. I led delivery from scope to launch, working directly with the product owner and design team.",
    details: [
      "Saudi-compliant KYC with multi-stage verification and SMS OTP.",
      "Document pipeline on AWS S3 and a Laravel Nova admin console.",
      "Laravel 10 REST API with Sanctum authentication and rate limiting.",
      "Vue.js and Nuxt.js frontend with full i18n and right-to-left support.",
    ],
    facts: [
      { label: "From scope to MVP", value: "3 months" },
      { label: "Languages", value: "EN + AR" },
      { label: "Delivered", value: "On schedule" },
    ],
    process: [
      { title: "Sign up", text: "An investor creates an account." },
      { title: "Verify", text: "Multi-stage KYC with SMS OTP." },
      { title: "Upload", text: "Documents go to an AWS S3 pipeline." },
      { title: "Review", text: "The admin team reviews in a Laravel Nova console." },
    ],
    challenges: [
      {
        challenge: "A fully bilingual product with right-to-left layout.",
        solution: "Full i18n and RTL support, with no layout breakage in either language.",
      },
    ],
    location: "Tamkeen Middle East, Riyadh",
    year: "2025",
    scope: "Laravel 10, Nuxt.js, Vuetify, MySQL, AWS S3",
    links: [],
    screens: false,
  },
  {
    slug: "turf-booking",
    catKey: "mobile",
    title: "Turf Booking App",
    description:
      "About 5,000 active users, zero double-bookings across 10,000+ transactions, and an AI support chatbot.",
    lead: "Zero double-bookings across ten thousand transactions under concurrent load.",
    intro:
      "A greenfield React Native app for booking sports turf, with Firebase Auth and Sentry monitoring. A Node.js booking engine uses optimistic locking, and an AI chatbot answers support questions about FAQs, slot availability and booking.",
    details: [
      "React Native (Expo, TypeScript) with Firebase Auth.",
      "Node.js booking engine with optimistic locking.",
      "AI chatbot for support and booking guidance.",
    ],
    facts: [
      { label: "Active users", value: "~5,000" },
      { label: "Crash-free sessions", value: "99%+" },
      { label: "Support queries handled by the bot", value: "~60%" },
    ],
    process: [
      { title: "Browse", text: "Players see live slot availability." },
      { title: "Book", text: "The booking engine reserves the slot with optimistic locking." },
      { title: "Support", text: "A chatbot answers questions and guides bookings." },
      { title: "Monitor", text: "Sentry tracks crashes and errors." },
    ],
    challenges: [
      {
        challenge: "Two people booking the same slot at the same moment.",
        solution:
          "Optimistic locking in the booking engine. Zero double-bookings across 10,000+ transactions under concurrent load.",
      },
    ],
    location: "Reshantech Sports",
    year: "2024 to 2025",
    scope: "React Native, TypeScript, Node.js, MongoDB, Firebase, Sentry",
    links: [],
    screens: false,
  },
  {
    slug: "saudi-research-agent",
    catKey: "agents",
    title: "Saudi Business Research Agent",
    description:
      "An autonomous five-tool agent that completes full company research in under 16 seconds.",
    lead: "Ask a question about a Saudi company, get a cited report in seconds.",
    intro:
      "An autonomous agent with five tools and persistent memory. It looks up live market data, builds a structured report, and flags the caveats, with sources, instead of answering from guesswork.",
    details: [
      "Calls a live market data tool, then builds a structured research report.",
      "Every report carries findings, citations and caveats.",
      "Runs from the terminal or in Docker.",
    ],
    facts: [
      { label: "Full company research", value: "<16s" },
      { label: "Tools", value: "5" },
      { label: "Memory", value: "Persistent" },
    ],
    process: [
      { title: "Ask", text: "A question about a company." },
      { title: "Look up", text: "The agent calls live data tools." },
      { title: "Report", text: "It builds a structured report." },
      { title: "Cite", text: "Findings come with sources and caveats." },
    ],
    location: "Personal project",
    scope: "Python",
    links: [
      { label: "View on GitHub", href: "https://github.com/Basimhussain/saudi-research-agent" },
    ],
    screens: true,
  },
  {
    slug: "mri-to-ct",
    catKey: "research",
    title: "MRI to CT Image Translation",
    description:
      "A pix2pix-style conditional GAN aimed at removing redundant scans. Won 2nd Prize.",
    lead: "A model that aims to spare patients a second scan.",
    intro:
      "A conditional GAN that translates MRI slices into CT-like images, aimed at removing redundant scans in clinical workflows and validated with SSIM. It won 2nd Prize at the AMU ZHCET Project Exhibition.",
    details: [
      "pix2pix-style conditional GAN in PyTorch.",
      "Validated with SSIM.",
      "Selected from all final-year projects for the award.",
    ],
    facts: [
      { label: "Award", value: "2nd Prize" },
      { label: "Exhibition", value: "AMU ZHCET 2025" },
      { label: "Validation", value: "SSIM" },
    ],
    process: [
      { title: "Input", text: "An MRI slice." },
      { title: "Generate", text: "A conditional GAN produces a CT-like image." },
      { title: "Discriminate", text: "A discriminator separates real from generated." },
      { title: "Validate", text: "Structural similarity (SSIM) checks the result." },
    ],
    location: "Aligarh Muslim University",
    year: "2025",
    scope: "PyTorch, computer vision",
    links: [],
    screens: false,
  },
  {
    slug: "gesture-mouse",
    catKey: "research",
    title: "AI Gesture Mouse for macOS",
    description:
      "Hand-gesture cursor control with spoken feedback, built in a joint research programme.",
    lead: "Control the cursor with your hand, and hear what it is doing.",
    intro:
      "A real-time virtual mouse for macOS powered by hand gestures and computer vision. Built in the Research Experience for Undergraduates programme run by The Ohio State University and AMU.",
    details: [
      "Move, left click, right click, drag and scroll by gesture.",
      "Non-blocking spoken feedback.",
      "A voice alert when the hand leaves the frame.",
    ],
    facts: [
      { label: "Move", value: "Two fingers" },
      { label: "Click", value: "Pinch" },
      { label: "Scroll", value: "Open hand" },
    ],
    process: [
      { title: "See", text: "The webcam feeds MediaPipe." },
      { title: "Track", text: "Hand landmarks are extracted." },
      { title: "Interpret", text: "Gesture rules map the hand to an action." },
      { title: "Act", text: "The cursor moves, clicks or scrolls, with spoken feedback." },
    ],
    location: "OSU and AMU research programme",
    year: "2024",
    scope: "Python, OpenCV, MediaPipe",
    links: [
      { label: "View on GitHub", href: "https://github.com/Basimhussain/ai-gesture-mouse-macos" },
    ],
    screens: false,
  },
  {
    slug: "mise",
    catKey: "platforms",
    title: "Mise",
    description:
      "A multi-tenant operations platform for restaurants, cafes and lounges.",
    lead: "Run the floor, the kitchen pass and the numbers as one.",
    intro:
      "Mise gives venues QR ordering, a multi-station kitchen display, reservations with deposits and a live floor plan. The marketing site and product views are in English and Arabic, light and dark.",
    details: [
      "QR ordering that reaches every table.",
      "Multi-station kitchen display with live elapsed timers.",
      "Reservations, deposits and waitlist, with a drag-and-drop floor plan.",
    ],
    facts: [
      { label: "Languages", value: "EN + AR" },
      { label: "Themes", value: "Light + dark" },
      { label: "Tenancy", value: "Multi-tenant" },
    ],
    location: "Personal project",
    scope: "Fastify, PostgreSQL, Redis",
    links: [{ label: "Open the live beta", href: "https://mise-beta-test.vercel.app/" }],
    screens: true,
  },
];

const labelOf = (key: string) => categories.find((c) => c.key === key)!.label;

export const projects: Project[] = defs.map((d) => {
  const items = g[d.slug] ?? [];
  const cover =
    items.find((i) => !i.illustration && !i.phone && !i.tall) ?? items[0];
  return { ...d, category: labelOf(d.catKey), items, img: cover?.src ?? "" };
});

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const groupedCategories = categories.map((c) => ({
  ...c,
  projects: projects.filter((p) => p.catKey === c.key),
}));
