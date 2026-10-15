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
  summary: string;
  context: string;
  stack: string;
  links: { label: string; href: string }[];
  items: GalleryItem[];
}

const g = gallery as Record<string, GalleryItem[]>;

const defs: Omit<Project, "items">[] = [
  {
    slug: "voice-agents",
    title: "Voice and chat agents for sales",
    summary:
      "Agents answer inbound enquiries, qualify leads and write call summaries straight into the CRM. A WhatsApp automation cut routine replies from about 4 hours to under 30 seconds, and an LLM pipeline turns free-text requirements into structured quotations.",
    context: "Basmat Alomran, 2026",
    stack: "LLM and voice APIs, n8n, Node.js, MySQL",
    links: [],
  },
  {
    slug: "amc-estimator",
    title: "Smart AMC Estimator and bocsmart.com",
    summary:
      "A bilingual Arabic and English corporate platform with a live estimator that returns a maintenance quote in under 2 seconds.",
    context: "Basmat Alomran, 2026",
    stack: "Vue.js, Node.js, Express",
    links: [{ label: "Visit bocsmart.com", href: "https://bocsmart.com" }],
  },
  {
    slug: "erp",
    title: "Company ERP",
    summary:
      "Built from scratch for HR, finance, procurement, projects and field operations. Role-based access, multi-stage approvals and live dashboards replaced manual daily reports across 3 active sites.",
    context: "Basmat Alomran, 2026",
    stack: "Vue.js, Node.js, Express, MySQL, Docker",
    links: [],
  },
  {
    slug: "voice-platform",
    title: "Voice AI platform",
    summary:
      "A SaaS platform that orchestrates Vapi conversational agents, with a real-time React dashboard for live calls and sentiment. A RAGAS evaluation loop runs on every knowledge-base update, so hallucination regressions are caught before release.",
    context: "Agent Maven, 2025 to 2026",
    stack: "Node.js, PostgreSQL, React 19, Socket.io, Docker",
    links: [],
  },
  {
    slug: "arabic-sentiment",
    title: "Arabic sentiment model",
    summary:
      "Llama 3 8B fine-tuned with QLoRA on Arabic tweets, then served from a FastAPI endpoint on HuggingFace Spaces with latency and memory monitoring.",
    context: "Personal project",
    stack: "QLoRA, HuggingFace, FastAPI",
    links: [],
  },
  {
    slug: "scentwell",
    title: "ScentWell",
    summary:
      "A fragrance recommendation app. RAG over pgvector with a GPT-4o agent grounded by live web search and Reddit data, traced in Langfuse and evaluated with RAGAS.",
    context: "Personal project",
    stack: "React Native, Node.js, pgvector, OpenAI, Supabase",
    links: [],
  },
  {
    slug: "athar",
    title: "Athar",
    summary:
      "A bilingual platform connecting Saudi retail investors to Vision 2030 impact funding. Saudi-compliant KYC with SMS OTP, a document pipeline on AWS S3 and a Laravel Nova admin, with full right-to-left support.",
    context: "Tamkeen Middle East, 2025",
    stack: "Laravel 10, Nuxt.js, Vuetify, AWS S3",
    links: [],
  },
  {
    slug: "turf-booking",
    title: "Turf booking app",
    summary:
      "About 5,000 active users, over 99% crash-free sessions, and zero double-bookings across 10,000+ transactions. A support chatbot took roughly 60% of queries off human agents.",
    context: "Reshantech Sports, 2024 to 2025",
    stack: "React Native, Node.js, MongoDB, Firebase",
    links: [],
  },
  {
    slug: "saudi-research-agent",
    title: "Saudi Business Research Agent",
    summary:
      "An autonomous five-tool agent that completes full company research in under 16 seconds and returns a structured report with citations and caveats.",
    context: "Personal project",
    stack: "Python, PostgreSQL",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/Basimhussain/saudi-research-agent",
      },
    ],
  },
  {
    slug: "mri-to-ct",
    title: "MRI to CT image translation",
    summary:
      "A pix2pix-style conditional GAN aimed at removing redundant scans in clinical workflows, validated with SSIM. Won 2nd Prize at the AMU ZHCET Project Exhibition.",
    context: "Final-year project, 2025",
    stack: "PyTorch, computer vision",
    links: [],
  },
  {
    slug: "gesture-mouse",
    title: "AI gesture mouse for macOS",
    summary:
      "Hand-gesture cursor control with spoken feedback, built in the Research Experience for Undergraduates programme run by The Ohio State University and AMU.",
    context: "Research project, 2024",
    stack: "Python, OpenCV, MediaPipe",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/Basimhussain/ai-gesture-mouse-macos",
      },
    ],
  },
  {
    slug: "mise",
    title: "Mise",
    summary:
      "A multi-tenant operations platform for restaurants, cafes and lounges: QR ordering, a multi-station kitchen display, reservations with deposits and a live floor plan.",
    context: "Personal project",
    stack: "Fastify, PostgreSQL, Redis",
    links: [{ label: "Open the live beta", href: "https://mise-beta-test.vercel.app/" }],
  },
];

export const projects: Project[] = defs.map((d) => ({ ...d, items: g[d.slug] ?? [] }));

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

// Diagram-only projects use their big-number board as the cover, since it still reads at thumbnail size.
export const cover = (p: Project): GalleryItem | undefined =>
  p.items.find((i) => !i.illustration) ??
  p.items.find((i) => /outcomes|results|recognition|gestures/.test(i.src)) ??
  p.items[0];

export const hasScreens = (p: Project) => p.items.some((i) => !i.illustration);
