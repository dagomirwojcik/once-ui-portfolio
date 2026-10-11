export interface ChangelogEntry {
  date: string;
  version?: string;
  focus?: string;
  changes: string[];
  tags: string[];
}

/** Human-readable release notes; versions use YY.iteration.patch (year, release within year, patch). */
export const changelogEntries: ChangelogEntry[] = [
  {
    date: "October 11, 2026",
    version: "v26.4.0",
    focus: "The Open Source Update",
    tags: ["Major Update"],
    changes: [
      "Moved the portfolio to a new public GitHub repository, giving the project a public home for its source and future development.",
      "Started a fresh public Git history with an initial commit, creating a clean baseline for future releases.",
      "Prepared the project for public collaboration with a dependency lockfile, example environment configuration, and repository workflow and editor settings.",
    ],
  },
  {
    date: "September 18, 2026",
    version: "v26.3.3",
    focus: "A safer download flow and clearer page updates.",
    tags: ["Minor Update"],
    changes: [
      "Protected the CV download flow with a verification step before the file is served, improving security without disrupting access.",
      "Updated the About page to reflect the latest study milestones and current professional background more accurately.",
      "Refreshed the site’s dependency and package hygiene to keep the project more stable and easier to maintain.",
      "Tightened supporting security measures around the portfolio flow so key actions remain safer and more reliable.",
    ],
  },
  {
    date: "July 6, 2026",
    version: "v26.3.2",
    focus: "Sharper images, tidier cards, and small polish across the site.",
    tags: ["Patch Update"],
    changes: [
      "Improved gallery and home card imagery with optimised CDN thumbnails for faster loading.",
      "Refined changelog entry headers on mobile so release dates sit neatly in the top corner.",
      "Streamlined the contact form by removing redundant verification messaging.",
      "Updated About page studies copy to reflect final degree results.",
      "Tightened work project card actions for a cleaner browsing experience.",
    ],
  },
  {
    date: "July 5, 2026",
    version: "v26.3.1",
    focus: "Live volunteering stats and a leaner site under the bonnet.",
    tags: ["Patch Update"],
    changes: [
      "Added live Folding@Home contribution stats to the About page so volunteering highlights stay up to date.",
      "Removed unused pages, components, and legacy gallery routes that were no longer part of the live site.",
      "Trimmed dependencies and build settings for a lighter, faster project.",
      "Aligned gallery structured data with the current gallery experience.",
    ],
  },
  {
    date: "June 14, 2026",
    version: "v26.3.0",
    focus: "The Open Update",
    tags: ["Major Update"],
    changes: [
      "Restored the contact form with bot protection and reliable email delivery.",
      "Added live service status indicators on the changelog so visitors can see whether key parts of the site are available.",
      "Reopened the gallery with full browsing, category filtering, and a cleaner photo viewer.",
      "Refreshed the home page with a live running highlights panel and more accurate latest gallery content.",
      "Expanded the work section with new case studies and a clearer project grid.",
      "Promoted the Cancer Research UK Great Birmingham Run 2027 fundraiser in the site banner and updated copy across the site.",
      "Adopted a clearer year-based versioning format for all changelog releases.",
    ],
  },
  {
    date: "May 25, 2026",
    version: "v26.2.1",
    focus:
      "Final-year project wrap-up content, a clearer global background layer, and polish across the blog and changelog surfaces.",
    tags: ["Patch Update"],
    changes: [
      "Published an Innovation Fest 2026 blog post covering the final-year viva, poster, and Dr Arshad Mahmood Memorial Prize, with new gallery imagery to match.",
      "Rewrote the Final Year Project case study with dissertation title, abstract, objectives, key contributions, and an updated poster preview.",
      "Moved site-wide background effects into a dedicated layer for clearer page structure.",
      "Refined the blog index and changelog card styling for a cleaner browsing experience.",
      "Improved image processing support and steadier dependency installs.",
    ],
  },
  {
    date: "May 18, 2026",
    version: "v26.2.0",
    focus: "The Harmony Update",
    tags: ["Major Update"],
    changes: [
      "Updated core dependencies and added libraries for media compression and charting.",
      "Added structured data across key pages, refreshed blog copy, and introduced a completion banner for the Final Year Project.",
      "Refined the app shell with clearer missing-page messaging and smoother font loading across routes.",
      "Rebuilt the changelog into a timeline with glass-style cards, release-type filters, and a light seasonal background effect.",
    ],
  },
  {
    date: "February 13, 2026",
    version: "v26.1.1",
    focus: "Steadier installs and a safer MDX rendering path.",
    tags: ["Patch Update"],
    changes: [
      "Brought build tooling up to date and removed outdated nested dependencies.",
      "Upgraded the MDX rendering stack for a safer content pipeline.",
    ],
  },
  {
    date: "January 19, 2026",
    version: "v26.1.0",
    focus: "The Stability Update",
    tags: ["Major Update"],
    changes: [
      "Clarified maintenance banners site-wide, simplified the contact-form warning, and added a changelog link in the header.",
      "Moved the stack to a newer Next.js release and refreshed TypeScript types while tightening the contact form experience.",
      "Extended Final Year Project progress tracking for poster and digital demo milestones and refreshed About and CV download banner behaviour.",
    ],
  },
  {
    date: "November 3, 2025",
    version: "v25.3.2",
    focus: "Supporting libraries and small UI refinements for long-form and project pages.",
    tags: ["Minor Update"],
    changes: [
      "Introduced PDF parsing support and optional hover behaviour on countdown and certification components.",
      "Cleaned up blog post colour handling after recent dependency updates.",
    ],
  },
  {
    date: "October 22, 2025",
    version: "v25.3.0",
    focus: "The Showcase Update",
    tags: ["Major Update"],
    changes: [
      "Grew the gallery with richer albums, modal sorting and filtering, image metadata, and a refreshed home hero image.",
      "Introduced maintenance messaging, turned off the live contact form behind a clear notice, and defaulted the site to dark mode in layout.",
      "Applied glass-style treatments across blog and gallery, improved theme handling, and swapped a heavy image component for a lighter path where it helped performance.",
    ],
  },
  {
    date: "September 28, 2025",
    version: "v25.2.0",
    focus: "The Momentum Update",
    tags: ["Major Update"],
    changes: [
      "Reworked the Final Year Project page with progress bars, clearer supervisor context, and LinkedIn instead of an unused GitHub link.",
      "Tightened blog layout spacing, safer heading anchors, and hover states on post cards.",
      "Improved header responsiveness and root layout structure alongside the Once UI upgrade.",
    ],
  },
  {
    date: "September 1, 2025",
    version: "v25.1.0",
    focus: "The Genesis Update",
    tags: ["Major Update"],
    changes: [
      "Shipped the initial home, work, blog, about, and contact experiences with shared layout, navigation, and metadata for each route.",
      "Published early case studies with rich project pages and supporting imagery.",
      "Centralised site content in shared resources so later releases could build on the same structure.",
    ],
  },
];
