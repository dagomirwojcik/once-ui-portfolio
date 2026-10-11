// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL = "https://www.dagomirwojcik.com";

const routes = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": true,
  "/contact": true,
  "/changelog": true,
};

const display = {
  location: false,
  time: false,
  themeSwitcher: true
};

// Maintenance mode configuration
const maintenance = {
  // Path to the maintenance.json file (relative to public folder)
  configPath: "/maintenance.json",
  // Default message when maintenance.json is not available
  defaultMessage: "Currently performing maintenance on my website. It'll be back up soon!",
  // Whether to show refresh button
  showRefreshButton: true,
  // Whether to show contact email if available
  showContactEmail: true
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
const protectedRoutes = {

};

// Import and set font for each variant
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// default customization applied to the HTML in the main layout.tsx
const style = {
  theme: "system", // dark | light | system
  neutral: "slate", // sand | gray | slate | custom
  brand: "blue", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  accent: "cyan", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  solid: "contrast", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100" // 90 | 95 | 100 | 105 | 110
};

const dataStyle = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false
  },
};

const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: true,
    opacity: 40,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const mailchimp = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  }
};

// metadata for pages
const meta = {
  home: {
    path: "/",
    title: "Dagomir Wójcik » Portfolio",
    description:
      "Dagomir Wójcik is a University Student studying Business Information Technology at Birmingham City University. Here is his Portfolio Website.",
    image: "/favicon.ico",
    canonical: "https://www.dagomirwojcik.com",
    robots: "index,follow",
    alternates: [{ href: "https://www.dagomirwojcik.com", hrefLang: "en" }],
  },
  about: {
    path: "/about",
    title: "Dagomir Wójcik » About Me",
    description: "Dagomir Wójcik is a skilled and knowledgeable professional with diverse interests and expertise. This page explores his background, achievements, and personal passions.",
    image: "/images/avatar.avif",
    canonical: "https://www.dagomirwojcik.com/about",
    robots: "index,follow",
    alternates: [
      { href: "https://www.dagomirwojcik.com/about", hrefLang: "en" }
    ]
  },
};

// default schema data
const schema = {
  logo: "/favicon.ico",
  type: "Person",
  name: "Dagomir Wójcik",
  description: meta.home.description,
  email: "dagomir@dagomirwojcik.com",
};

// social links
import { social } from "./content";

const sameAs = social.reduce((acc, item) => {
  if (item.link && item.name) {
    acc[item.name.toLowerCase()] = item.link;
  }
  return acc;
}, {});

export { display, maintenance, mailchimp, routes, protectedRoutes, baseURL, fonts, style, meta, schema, sameAs, effects, dataStyle };
