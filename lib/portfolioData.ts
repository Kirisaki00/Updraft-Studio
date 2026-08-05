export type ProjectItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  software: string[];
  services: string[];
  tall?: boolean;
  wide?: boolean;
};

export type FolderCategory = {
  slug: string;
  label: string;
  icon: string;
  description: string;
  longDescription: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  projects: ProjectItem[];
};

export const portfolioCategories: FolderCategory[] = [
  {
    slug: "video-editing",
    label: "Video Editing",
    icon: "🎬",
    description: "Cinematic cuts that tell stories",
    longDescription:
      "Every frame is intentional. We craft narrative-driven edits that command attention, evoke emotion, and leave audiences wanting more. From brand films to documentary-style cuts — we turn raw footage into cinematic experiences.",
    accentColor: "#8b5cf6",
    gradientFrom: "#8b5cf6",
    gradientTo: "#06b6d4",
    projects: [
      {
        id: 101,
        title: "Brand Film — Noir",
        description: "A cinematic brand story film with dramatic lighting and pacing.",
        category: "Video Editing",
        type: "image",
        src: "/p-motion.png",
        software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
        services: ["Color Grading", "Sound Design", "Motion Graphics"],
        tall: true,
      },
      {
        id: 102,
        title: "Product Launch Reel",
        description: "High-energy launch video for a premium tech product.",
        category: "Video Editing",
        type: "image",
        src: "/p-product.png",
        software: ["Premiere Pro", "After Effects"],
        services: ["Editing", "Color Grading", "SFX"],
        tall: false,
      },
      {
        id: 103,
        title: "Documentary Edit",
        description: "Long-form narrative documentary with immersive storytelling.",
        category: "Video Editing",
        type: "image",
        src: "/p-fashion.png",
        software: ["Premiere Pro", "DaVinci Resolve"],
        services: ["Story Editing", "Color Grading"],
        tall: false,
      },
    ],
  },
  {
    slug: "motion-graphics",
    label: "Motion Graphics",
    icon: "✨",
    description: "Abstract worlds in motion",
    longDescription:
      "Where design becomes alive. Our motion graphics blur the line between art and communication — transforming complex ideas into visually stunning animated sequences that captivate and inform simultaneously.",
    accentColor: "#06b6d4",
    gradientFrom: "#06b6d4",
    gradientTo: "#ec4899",
    projects: [
      {
        id: 201,
        title: "Orbit Motion Reel",
        description: "Abstract motion reel featuring 3D geometry and particle systems.",
        category: "Motion Graphics",
        type: "image",
        src: "/p-motion.png",
        software: ["After Effects", "Cinema 4D", "Redshift"],
        services: ["3D Animation", "Motion Design", "Compositing"],
        tall: false,
        wide: true,
      },
      {
        id: 202,
        title: "Brand Animation System",
        description: "Full animated brand identity — logos, lower thirds, transitions.",
        category: "Motion Graphics",
        type: "image",
        src: "/p-brand.png",
        software: ["After Effects", "Illustrator"],
        services: ["Motion Branding", "UI Animation"],
        tall: true,
      },
    ],
  },
  {
    slug: "saas-animation",
    label: "SaaS Animation",
    icon: "⚡",
    description: "Software brought to life",
    longDescription:
      "We make software feel magical. Through precisely crafted product animations, UI walkthroughs, and explainer videos, we help SaaS companies communicate their value instantly — increasing signups and reducing churn.",
    accentColor: "#ec4899",
    gradientFrom: "#ec4899",
    gradientTo: "#8b5cf6",
    projects: [
      {
        id: 301,
        title: "Apex SaaS Explainer",
        description: "Premium SaaS product walkthrough animation with UI interactions.",
        category: "SaaS Animation",
        type: "image",
        src: "/p-web.png",
        software: ["After Effects", "Figma", "Lottie"],
        services: ["Product Animation", "UI/UX", "Explainer Video"],
        wide: true,
        tall: false,
      },
      {
        id: 302,
        title: "Dashboard Onboarding Flow",
        description: "Animated onboarding sequence for a B2B analytics platform.",
        category: "SaaS Animation",
        type: "image",
        src: "/p-social.png",
        software: ["Framer", "After Effects", "Figma"],
        services: ["UX Animation", "Micro-interactions"],
        tall: true,
      },
    ],
  },
  {
    slug: "graphic-design",
    label: "Graphic Design",
    icon: "🎨",
    description: "Identity, brand & visual language",
    longDescription:
      "Design is the first impression. We build visual identities that are bold, coherent, and unmistakably yours — from logo systems to full brand guidelines, social templates, and everything in between.",
    accentColor: "#f59e0b",
    gradientFrom: "#f59e0b",
    gradientTo: "#ec4899",
    projects: [
      {
        id: 401,
        title: "Nova Brand Identity",
        description: "Full brand identity system: logo, type, colour, collateral.",
        category: "Graphic Design",
        type: "image",
        src: "/p-brand.png",
        software: ["Illustrator", "Photoshop", "Figma"],
        services: ["Logo Design", "Brand Identity", "Typography"],
        tall: false,
      },
      {
        id: 402,
        title: "Luxury Packaging Design",
        description: "Premium packaging suite for a high-end cosmetics brand.",
        category: "Graphic Design",
        type: "image",
        src: "/p-product.png",
        software: ["Illustrator", "Photoshop"],
        services: ["Packaging", "Print Design"],
        tall: true,
      },
      {
        id: 403,
        title: "Social Media Kit",
        description: "360° visual system for social platforms — posts, reels, stories.",
        category: "Graphic Design",
        type: "image",
        src: "/p-social.png",
        software: ["Figma", "Illustrator"],
        services: ["Social Design", "Content Strategy"],
        tall: false,
      },
    ],
  },
  {
    slug: "shorts-editing",
    label: "Shorts Editing",
    icon: "📱",
    description: "Viral-ready short-form content",
    longDescription:
      "The attention economy demands excellence in under 60 seconds. We craft high-energy, algorithm-friendly short-form content that hooks viewers in the first frame and keeps them watching until the last.",
    accentColor: "#22d3ee",
    gradientFrom: "#22d3ee",
    gradientTo: "#8b5cf6",
    projects: [
      {
        id: 501,
        title: "Lifestyle Reel Series",
        description: "Vertical lifestyle reels optimised for Instagram and TikTok virality.",
        category: "Shorts Editing",
        type: "image",
        src: "/p-fashion.png",
        software: ["Premiere Pro", "CapCut", "After Effects"],
        services: ["Short-form Editing", "Captions", "Sound Sync"],
        tall: true,
      },
      {
        id: 502,
        title: "Brand Story Shorts",
        description: "Punchy brand story shorts designed for paid social campaigns.",
        category: "Shorts Editing",
        type: "image",
        src: "/p-motion.png",
        software: ["Premiere Pro", "After Effects"],
        services: ["Short-form Editing", "Motion Text"],
        tall: false,
      },
    ],
  },
];

export const allProjects: ProjectItem[] = portfolioCategories.flatMap((c) => c.projects);

export function getCategoryBySlug(slug: string): FolderCategory | undefined {
  return portfolioCategories.find((c) => c.slug === slug);
}
