const person = {
  firstName: "Dagomir",
  lastName: "Wójcik",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Computer Professional & University Student",
  avatar: "/images/avatar.jpg",
  email: "dagomir@dagomirwojcik,com",
  location: "Europe/London", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Polish"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "Facebook",
    icon: "facebook",
    link: "https://facebook.com/wojcidag",
  },
  {
    name: "X",
    icon: "x",
    link: "https://x.com/wojcidag",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/dagomirwojcik",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/dagomir-wojcik",
    
  },
  {
    name: "Github",
    icon: "github",
    link: "https://github.com/dagomirwojcik",
  },
  {
    name: "YouTube",
    icon: "youtube",
    link: "https://www.youtube.com/@dagomirwojcik",
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} » Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Innovative technologist passionate about computers and systems.</>,
  featured: {
    display: true,
    title: <>Important: <strong className="ml-4">The Next Step</strong></>,
    href: "/about?next-step=1",
  },
  subline:
    "I'm Dagomir, a Computer Professional studying Artificial Intelligence @ Birmingham City University.",
  stats: {
    runningTitle: "Where I've Been Running:",
    projectsPlus: false,
    cloudDeployments: { count: 8, plus: true },
    technologiesExplored: { count: 20, plus: true },
    githubCommitsThisYear: { count: 60, plus: true },
    certifications: { count: 5, plus: true },
  },
};

const about = {
  path: "/about",
  label: "About",
  title: `${person.name} » About Me`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: `Dagomir Wójcik is a University Student at Birmingham City University studying Artificial Intelligence. He is a tech enthusiast passionate about computers and business, Dagomir Wójcik seeks new challenges and utilises them for personal and professional advancements. Dagomir has participated in a lot of projects that vary in scope but share the technology factor. Dagomir has had project experiences with multiple companies such as Birmingham City University, Career Colleges Trust and Digital Skills Consulting.`,
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        id: "bcu-vdem",
        tocLabel: "Birmingham City University — VDEM",
        company: "Birmingham City University ",
        logo: "https://bcucdn.azureedge.net/cdl/v1.5/favicons/apple-touch-icon-152x152.png",
        timeframe: "2024 - Present",
        role: "Visiting Demonstrator in Computing and Digital Technology",
        achievements: [
          `Assisted lecturing staff with laboratory & teaching sessions.`,
          `Mentored struggling students and delivered one-to-one support sessions.`,
        ],
        images: [],
        skills: ["Teaching", "Mentoring", "Information Technology", "Teamwork", "Directing Others"],
      },
      {
        company: "Manpower UK ",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Manpower_Inc._Logo.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
        timeframe: "2023 - Present",
        role: "Student Ambassador of Recruitment Events",
        achievements: [
          `Engaged with prospective students and parents to promote the university on open days.`,
          `Aided the delivery of applicant taster sessions by providing guided tours.`,
        ],
        images: [
          //{src: "/images/gallery/dagomir-openday.avif", alt: "Dagomir Wójcik at Open Day", width: 8, height: 10},
        ],
        skills: ["Public Speaking", "Customer Service", "Question Answering", "Guided Tours",],
      },
      {
        company: "Dorota C Accountancy ",
        logo: "/trademarks/dca.avif",
        timeframe: "2021 - 2023",
        role: "Administrator / Accounts Assistant",
        achievements: [
          `Provided day-to-day IT support.`,
          `Maintained the office technological equipment & infrastructure.`,
        ],
        images: [],
        skills: ["IT Support", "Administration", "Technology", "Networking", "Computer Repair"],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        id: "bcu-msc-artificial-intelligence",
        tocLabel: "Birmingham City University — MSc AI",
        name: "Birmingham City University ",
        logo: "https://bcucdn.azureedge.net/cdl/v1.5/favicons/apple-touch-icon-152x152.png",
        timeframe: "2026 - 2027",
        description: `Master of Science (MSc) in Artificial Intelligence`,
        achievements: [
          `Starting in September 2026.`,
          `Looking forward to the new challenges and opportunities that this course will bring.`,
        ],
        images: [],
        modules: [
          "Computing for Artificial Intelligence",
          "Machine Learning",
          "Generative Artificial Intelligence for Natural Language Processing",
          "Computer Vision",
          "Individual Master's Project",
          "Data Visualisation",
          "Impact of Artificial Intelligence",
          "Risk Management in Financial Technology",
          "Portfolio Analysis",
        ],
      },
      {
        id: "bcu-bsc-business-information-technology",
        tocLabel: "Birmingham City University — BSc BIT",
        name: "Birmingham City University ",
        logo: "https://bcucdn.azureedge.net/cdl/v1.5/favicons/apple-touch-icon-152x152.png",
        timeframe: "2023 - 2026",
        description: `Bachelor of Science with Honours (BSc) in Business Information Technology`,
        achievements: [
          `Achieved a First-Class Honours Degree.`,
          `Grade given: 76.08%.`,
        ],
        images: [],
        modules: [
          "Business Information Systems",
          "Computational Thinking & Professional Development",
          "Introduction to Programming",
          "Business Information Modelling",
          "Network Fundamentals",
          "Application Systems",
          "Enterprise Systems",
          "Database Systems Development",
          "Human-Computer Interaction",
          "Ethical and Professional Context of IT",
          "Strategic, Information Systems Alignment",
          "Business Intelligence",
          "Application Solutions Development",
          "Consultancy and IT Management"
        ],
      },
      {
        name: "USP College - Palmer's Campus ",
        logo: "https://uspcollege.ac.uk/favicon.ico",
        timeframe: "2020 - 2022",
        description: `Level 3 BTEC Extended Diploma in Information Technology (1080) RQF`,
        achievements: [
          `Achieved a D*DD in the BTEC Extended Diploma in Information Technology (A*, A, A).`,
          `Awarded the Hew Watt Prize for social and cultural contributions to the college.`,
        ],
        images: [
        ],
      },
    ],
  },
  volunteering: {
    display: true, // set to false to hide this section
    title: "Volunteering",
    experiences: [
      {
        organization: "parkrun ",
        logo: "https://www.parkrun.org.uk/favicon.ico",
        timeframe: "2026 - Present",
        role: "Multiple Roles",
        achievements: [
          `Supported weekly free, timed 5k community events.`,
          `Took on volunteer roles including marshalling, barcode scanning and event close-down.`,
        ],
        images: [],
        statsBox: {
          foldingStyle: true,
          content: (
            <>
              I have volunteered a total of <strong>4</strong> times at parkrun events for a total of <strong>5</strong> credits.
            </>
          ),
          showUpdated: true,
        },
      },
      {
        organization: "Folding@Home ",
        logo: "https://foldingathome.org/favicon.ico",
        timeframe: "2023 - Present",
        role: "Citizen Scientist",
        achievements: [
          `Ran protein folding simulations to help find a cure for diseases.`,
          `Contributed research for cures to COVID-19, Alzheimer's and Parkinson's.`,
        ],
        images: [],
        statsBox: {
          source: "foldingathome",
          foldingStyle: true,
          content: (
            <>
              I have earned <strong>38,236,769</strong> points by contributing <strong>275</strong> work
              units.
            </>
          ),
          showUpdated: true,
        },
      },
      {
        organization: "Hedgehog Friendly Campus",
        logo: "https://www.hedgehogfriendlycampus.co.uk/favicon.ico",
        timeframe: "2024 - 2025",
        role: "Hedgehog Champion",
        achievements: [
          `Deployed 'bug hotels' across the campus to feed the local hedgehog population.`,
          `Participated in litter picks to keep the campus clean and safe for the hedgehogs.`,
        ],
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Dagomir Wójcik » Blog",
  description: `A collection of my blog posts, achievements and awards.`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `${person.name} » Projects`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
  //
  // Highlight specific projects on /work (display order). Use MDX slugs, e.g. ["chatdag", "runcore"].
  // Leave empty to use `featured: true` in project frontmatter, or the latest project if none are marked.
  featured: ["final-year-project"],
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `${person.name} » Gallery`,
  description: `A photo collection by ${person.name}`,
};

const contact = {
  path: "/contact",
  label: "Contact",
  title: `${person.name} » Contact Me`,
  description: `Get in touch with ${person.name} using the form below.`,
  headline: <>Contact Me</>,
  subline: <>Want to get in contact? Fill out the form and I'll get back to you!</>,
};

const fyp = {
  path: "/fyp",
  label: "Final Year Project",
  title: `${person.name} » Final Year Project`,
  dissertationTitle:
    "Towards a Scalable and Modular System Architecture for Healthcare SMEs: A Microservice Approach",
  description:
    "A microservice-based enterprise architecture for healthcare SMEs, guided by TOGAF principles—addressing monolithic legacy limitations through modularity, scalability, and HL7/FHIR interoperability.",
  module: "CMP6200 — Final Year Project",
  course: "BSc (Hons) Business Information Technology",
  university: "Birmingham City University",
  supervisor: "Dr. Gerald Feldman",
  submittedDate: "05/05/2026",
  focusAreas: [
    "Microservices architecture",
    "Enterprise Architecture (TOGAF / ADM)",
    "Healthcare interoperability (HL7 / FHIR)",
    "Design Science Research Methodology (DSRM)",
  ],
  compliance: "GDPR/HIPAA-aligned conceptual design; no real patient data",
  abstract:
    "This project investigates the development of a modular and scalable system architecture for healthcare SMEs using a microservice-based approach guided by TOGAF principles. It addresses the limitations of monolithic legacy systems and the lack of adaptable enterprise architecture solutions tailored to healthcare SMEs. Through a structured literature review and analysis of existing frameworks, a research gap is identified and used to inform the design of a layered architecture comprising business, application, and technology layers. The proposed architecture incorporates API-driven interactions and boundary services to support gradual legacy integration. Evaluation against defined objectives demonstrates improved modularity, scalability, and architectural flexibility. The findings suggest that a microservice-oriented approach provides a practical and strategically aligned framework for modernising healthcare SME systems.",
  problemStatement:
    "Healthcare SMEs continue to rely on outdated, monolithic IT infrastructures that are costly to maintain, difficult to integrate with modern standards such as HL7 and FHIR, and vulnerable to security and regulatory risks. Most existing literature focuses on large-scale hospital deployments rather than adaptable models for resource-constrained SMEs. This project asks how a microservice-oriented enterprise architecture, guided by TOGAF/ADM, can be designed to reduce integration friction, mitigate regulatory and security risks, and improve scalability and maintainability compared to monolithic or traditional SOA systems.",
  aim:
    "To develop a technical and conceptual system architecture that focuses on modularity and scalability for healthcare SMEs, using TOGAF as a guide and a microservice approach for interoperability.",
  objectives: [
    "Analyse the current state of SME healthcare systems—their limitations and challenges related to interoperability, scalability, and modularity—through literature review, case studies, and industry reports.",
    "Outline the functional and architectural requirements necessary to plan the design, adhering to ISO/IEC/IEEE 42010 standards for requirements engineering.",
    "Construct a model of the architecture design tailored towards healthcare SMEs by following TOGAF's ADM cycle and the principles of microservices architecture.",
    "Demonstrate the architecture through controlled healthcare scenario use cases to showcase integration of core services such as data flows and system modules.",
    "Evaluate the effectiveness of the architecture by assessing its reliability, scalability, and suitability for deployment in an SME environment.",
  ],
  contributions: [
    "A microservice-oriented architecture blueprint that transfers enterprise architecture principles into a contextualised model suitable for smaller healthcare organisations—balancing modularity with SME feasibility through containerisation, decentralised data ownership, and controlled API exposure.",
    "Integration of EA modelling through TOGAF and ArchiMate with a microservice architectural style, demonstrating how enterprise modelling can be operationalised across business, application, and technology layers.",
  ],
  posterImage: "/images/projects/fypposter.avif",
  progress: [
    { key: "literatureReview", label: "Literature Review", value: 100 },
    { key: "researchDesignMethods", label: "Research Design & Methods", value: 100 },
    { key: "architectureDesign", label: "Architecture Design", value: 100 },
    { key: "evaluation", label: "Evaluation", value: 100 },
    { key: "dissertationWriting", label: "Dissertation Writing", value: 100 },
    { key: "posterCreation", label: "Poster Creation", value: 100 },
  ],
  status: "complete",
};

const healthfit = {
  folderUrl:
    "https://1drv.ms/f/c/c4a5df59502ca1a0/IgA782ny1QU0RLjlJH7cvh6TAZR2_LdOgL5a5HdlkNc3ZH4?e=NVbf8Q",
  stravaProfileUrl: "https://www.strava.com/athletes/148867277",
  // Individual file share links with ?download=1 — folder links cannot be fetched directly.
  // Right-click a .gpx in OneDrive → Share → copy link → add ?download=1
  gpxDownloadUrls: [],
};

export { person, social, newsletter, home, about, blog, work, gallery, contact, fyp, healthfit };
