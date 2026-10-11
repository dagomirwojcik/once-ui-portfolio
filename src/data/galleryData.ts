export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  metadata?: {
    date?: string;
    time?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    location?: string;
    photographer?: string;
    copyright?: string;
  };
}

export interface GalleryAlbum {
  id: string;
  title: string;
  summary: string;
  category: string;
  location: string;
  date: string;
  coverImage: string;
  images: (string | GalleryImage)[];
  subAlbums?: GalleryAlbum[]; // Optional sub-albums that appear in the modal
  hideFromGrid?: boolean; // Hide this album from the main gallery grid
}

export interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  albums: GalleryAlbum[];
}

// Gallery data organized by categories
export const galleryCategories: GalleryCategory[] = [
  {
    id: "travel",
    name: "Travel",
    description: "Photos from my travels and adventures around the world",
    icon: "globe",
    albums: [
      {
        id: "gaski-2025",
        title: "Gąski 2025 🇵🇱",
        summary: "Coastal retreat at the Baltic Sea, exploring beaches and seaside sunsets",
        category: "travel",
        location: "Gąski, Poland",
        date: "2025-08-06",
        coverImage: "https://img.dagomirwojcik.com/2025/gaski-2025/IMG_5638.jpeg",
        images: [
          {
            src: "https://img.dagomirwojcik.com/2025/gaski-2025/IMG_5612.jpeg",
            alt: "Gąski Beach",
            caption: "Evening at the Baltic coast",
            metadata: {
              date: "2025-08-06",
              time: "21:47",
              location: "Gąski",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 54.243836111111115, lng: 15.875044444444445 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/gaski-2025/IMG_5634.jpeg",
            alt: "Baltic Sunset",
            caption: "Golden hour on the beach",
            metadata: {
              date: "2025-08-09",
              time: "19:03",
              location: "Gąski",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 54.242802777777776, lng: 15.872866666666667 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/gaski-2025/IMG_5638.jpeg",
            alt: "Coastal Evening",
            caption: "Evening colors at the Baltic Sea",
            metadata: {
              date: "2025-08-09",
              time: "19:04",
              location: "Gąski",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 54.242808333333336, lng: 15.87273888888889 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/gaski-2025/IMG_5639.jpeg",
            alt: "Sunset Moments",
            caption: "Capturing the sunset",
            metadata: {
              date: "2025-08-09",
              time: "19:05",
              location: "Gąski",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 54.242805555555556, lng: 15.872722222222222 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/gaski-2025/IMG_5641.jpeg",
            alt: "Beach at Dusk",
            caption: "Dusk descending on the beach",
            metadata: {
              date: "2025-08-09",
              time: "19:05",
              location: "Gąski",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 54.24283333333334, lng: 15.87273888888889 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/gaski-2025/IMG_5650.jpeg",
            alt: "Evening Stroll",
            caption: "Walking along the Baltic shore",
            metadata: {
              date: "2025-08-09",
              time: "20:01",
              location: "Gąski",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 54.244372222222225, lng: 15.880219444444444 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/gaski-2025/IMG_5673.jpeg",
            alt: "Baltic Coast",
            caption: "Evening at the coast",
            metadata: {
              date: "2025-08-10",
              time: "20:32",
              location: "Gąski",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 54.243825, lng: 15.874377777777779 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/gaski-2025/IMG_5683.jpeg",
            alt: "Seaside Memories",
            caption: "Final evening at Gąski beach",
            metadata: {
              date: "2025-08-10",
              time: "20:36",
              location: "Gąski",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 54.243805555555554, lng: 15.874347222222223 }
            }
          }
        ]
      },
      {
        id: "swietajno-2025",
        title: "Świętajno 2025 🇵🇱",
        summary: "Summer lakeside retreat in the Masurian Lake District of northeastern Poland",
        category: "travel",
        location: "Świętajno, Poland",
        date: "2025-07-31",
        coverImage: "https://img.dagomirwojcik.com/2025/swietajno-2025/IMG_5577.jpeg",
        images: [
          {
            src: "https://img.dagomirwojcik.com/2025/swietajno-2025/IMG_5559.jpeg",
            alt: "Świętajno Lakeside",
            caption: "Evening at the lake",
            metadata: {
              date: "2025-07-31",
              time: "18:02",
              location: "Świętajno",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.630402777777775, lng: 21.18907777777778 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/swietajno-2025/IMG_5560.jpeg",
            alt: "Lake Views",
            caption: "Peaceful lakeside scenery",
            metadata: {
              date: "2025-07-31",
              time: "18:02",
              location: "Świętajno",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.630402777777775, lng: 21.189 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/swietajno-2025/IMG_5561.jpeg",
            alt: "Masurian Sunset",
            caption: "Golden hour by the water",
            metadata: {
              date: "2025-07-31",
              time: "18:02",
              location: "Świętajno",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.63044444444444, lng: 21.189022222222224 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/swietajno-2025/IMG_5568.jpeg",
            alt: "Evening Light",
            caption: "Late evening at Świętajno lake",
            metadata: {
              date: "2025-07-31",
              time: "20:47",
              location: "Świętajno",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.62622777777778, lng: 21.18895277777778 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/swietajno-2025/IMG_5570.jpeg",
            alt: "Twilight",
            caption: "Twilight reflections on the lake",
            metadata: {
              date: "2025-07-31",
              time: "20:47",
              location: "Świętajno",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.626194444444444, lng: 21.188969444444446 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/swietajno-2025/IMG_5577.jpeg",
            alt: "Summer Evening",
            caption: "Warm summer evening by the lake",
            metadata: {
              date: "2025-08-01",
              time: "18:32",
              location: "Świętajno",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.630383333333334, lng: 21.188966666666666 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/swietajno-2025/IMG_5586.jpeg",
            alt: "Midday Lake",
            caption: "Afternoon at the lakeside resort",
            metadata: {
              date: "2025-08-04",
              time: "14:10",
              location: "Świętajno",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.62881388888889, lng: 21.18813888888889 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/swietajno-2025/IMG_5603.jpeg",
            alt: "Lakeside Retreat",
            caption: "Relaxing by the Masurian lake",
            metadata: {
              date: "2025-08-06",
              time: "13:26",
              location: "Świętajno",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.63056111111111, lng: 21.188975 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/swietajno-2025/IMG_5604.jpeg",
            alt: "Summer Day",
            caption: "Perfect summer day at the lake",
            metadata: {
              date: "2025-08-06",
              time: "13:26",
              location: "Świętajno",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.63036388888889, lng: 21.189086111111113 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2025/swietajno-2025/IMG_5606.jpeg",
            alt: "Water Views",
            caption: "Final moments at Świętajno",
            metadata: {
              date: "2025-08-06",
              time: "13:37",
              location: "Świętajno",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.63041944444444, lng: 21.188980555555556 }
            }
          }
        ]
      },
      {
        id: "zakopane-2024",
        title: "Zakopane 2024 🇵🇱",
        summary: "A journey through the Tatra Mountains in August 2024, exploring four breathtaking locations",
        category: "travel",
        location: "Zakopane, Poland",
        date: "2024-08-26",
        coverImage: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3818.jpeg",
        images: [], // Parent album has no direct images, uses subAlbums
        subAlbums: [
          {
            id: "koscielisko-valley-2024",
            title: "Kościelisko Valley 🏔️",
            summary: "Exploring the scenic Kościelisko Valley in the Tatra Mountains",
            category: "travel",
            location: "Kościelisko, Poland",
            date: "2024-08-26",
            coverImage: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3686.jpeg",
            images: [
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3672.jpeg",
                alt: "Kościelisko Valley",
                caption: "Beginning the journey through Kościelisko Valley",
                metadata: {
                  date: "2024-08-26",
                  time: "12:59",
                  location: "Dolina Kościeliska, Kościelisko",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.251380555555556, lng: 19.865155555555557 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3673.jpeg",
                alt: "Kościelisko Valley",
                caption: "Mountain views in Kościelisko Valley",
                metadata: {
                  date: "2024-08-26",
                  time: "12:59",
                  location: "Dolina Kościeliska, Kościelisko",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.25145277777778, lng: 19.865155555555557 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3677.jpeg",
                alt: "Kościelisko Valley",
                caption: "Valley landscape",
                metadata: {
                  date: "2024-08-26",
                  time: "13:02",
                  location: "Dolina Kościeliska, Kościelisko",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.249880555555556, lng: 19.86512777777778 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3678.jpeg",
                alt: "Kościelisko Valley",
                caption: "Scenic valley views",
                metadata: {
                  date: "2024-08-26",
                  time: "13:02",
                  location: "Dolina Kościeliska, Kościelisko",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.249877777777776, lng: 19.865136111111113 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3682.jpeg",
                alt: "Kościelisko Valley",
                caption: "Mountain trail through the valley",
                metadata: {
                  date: "2024-08-26",
                  time: "13:05",
                  location: "Dolina Kościeliska, Kościelisko",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.24796666666667, lng: 19.865558333333336 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3686.jpeg",
                alt: "Kościelisko Valley",
                caption: "Exploring the scenic Kościelisko Valley",
                metadata: {
                  date: "2024-08-26",
                  time: "13:13",
                  location: "Dolina Kościeliska, Kościelisko",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.24328888888889, lng: 19.864133333333335 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3688.jpeg",
                alt: "Kościelisko Valley",
                caption: "Deep in the valley",
                metadata: {
                  date: "2024-08-26",
                  time: "13:17",
                  location: "Dolina Kościeliska, Kościelisko",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.24301666666667, lng: 19.86398888888889 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3690.jpeg",
                alt: "Kościelisko Valley",
                caption: "Afternoon in the valley",
                metadata: {
                  date: "2024-08-26",
                  time: "13:48",
                  location: "Dolina Kościeliska, Kościelisko",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.229686111111114, lng: 19.85996111111111 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3698.jpeg",
                alt: "Kościelisko Valley",
                caption: "Late afternoon valley views",
                metadata: {
                  date: "2024-08-26",
                  time: "14:58",
                  location: "Dolina Kościeliska, Kościelisko",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.23928055555556, lng: 19.863561111111114 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3705.jpeg",
                alt: "Kościelisko Valley",
                caption: "Valley exploration continues",
                metadata: {
                  date: "2024-08-26",
                  time: "15:02",
                  location: "Dolina Kościeliska, Kościelisko",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.24143611111111, lng: 19.86431388888889 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3706.jpeg",
                alt: "Kościelisko Valley",
                caption: "Final moments in Kościelisko Valley",
                metadata: {
                  date: "2024-08-26",
                  time: "15:03",
                  location: "Dolina Kościeliska, Kościelisko",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.24211944444445, lng: 19.86375277777778 }
                }
              }
            ]
          },
          {
            id: "zakopane-town-2024",
            title: "Zakopane Town 🏘️",
            summary: "Exploring the heart of Zakopane and its surroundings",
            category: "travel",
            location: "Zakopane, Poland",
            date: "2024-08-27",
            coverImage: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3731.jpeg",
            images: [
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3731.jpeg",
                alt: "Zakopane Town",
                caption: "Discovering Zakopane town",
                metadata: {
                  date: "2024-08-27",
                  time: "13:50",
                  location: "Zakopane",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.27816111111111, lng: 19.957047222222222 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3736.jpeg",
                alt: "Zakopane Town",
                caption: "Afternoon in Zakopane",
                metadata: {
                  date: "2024-08-27",
                  time: "13:55",
                  location: "Zakopane",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.27825277777778, lng: 19.956569444444444 }
                }
              }
            ]
          },
          {
            id: "gubalowka-2024",
            title: "Gubałówka Ridge 🌄",
            summary: "Panoramic views from Gubałówka ridge overlooking the Tatra Mountains",
            category: "travel",
            location: "Gubałówka, Zakopane",
            date: "2024-08-28",
            coverImage: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3774.jpeg",
            images: [
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3762.jpeg",
                alt: "Gubałówka Ridge",
                caption: "Approaching Gubałówka ridge",
                metadata: {
                  date: "2024-08-28",
                  time: "11:54",
                  location: "Gubałówka, Zakopane",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.30636111111111, lng: 19.933147222222225 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3771.jpeg",
                alt: "Gubałówka Viewpoint",
                caption: "Panoramic views from Gubałówka",
                metadata: {
                  date: "2024-08-28",
                  time: "12:04",
                  location: "Gubałówka, Zakopane",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.306525, lng: 19.935116666666666 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3774.jpeg",
                alt: "Tatra Mountains from Gubałówka",
                caption: "Stunning Tatra panorama from Gubałówka ridge",
                metadata: {
                  date: "2024-08-28",
                  time: "12:04",
                  location: "Gubałówka, Zakopane",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.30670277777777, lng: 19.934438888888888 }
                }
              }
            ]
          },
          {
            id: "kasprowy-wierch-2024",
            title: "Kasprowy Wierch Summit ⛰️",
            summary: "Summit adventure at Kasprowy Wierch peak (1,987m) with alpine hiking trails",
            category: "travel",
            location: "Kasprowy Wierch, Poland",
            date: "2024-08-29",
            coverImage: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3818.jpeg",
            images: [
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3818.jpeg",
                alt: "Kasprowy Wierch Peak",
                caption: "At the summit of Kasprowy Wierch",
                metadata: {
                  date: "2024-08-29",
                  time: "13:29",
                  location: "Kasprowy Wierch",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.23222222222223, lng: 19.981580555555553 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3819.jpeg",
                alt: "Alpine Vista",
                caption: "Breathtaking alpine views from Kasprowy Wierch",
                metadata: {
                  date: "2024-08-29",
                  time: "13:29",
                  location: "Kasprowy Wierch",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.23218888888889, lng: 19.981702777777777 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3823.jpeg",
                alt: "Mountain Ridge",
                caption: "High-altitude views near Kasprowy Wierch",
                metadata: {
                  date: "2024-08-29",
                  time: "13:31",
                  location: "Kasprowy Wierch",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.232419444444446, lng: 19.981872222222222 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3826.jpeg",
                alt: "Mountain Pass",
                caption: "Traversing the mountain pass",
                metadata: {
                  date: "2024-08-29",
                  time: "13:41",
                  location: "Sucha Przełęcz",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.23113333333333, lng: 19.98265 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3828.jpeg",
                alt: "Sucha Przełęcz Pass",
                caption: "Hiking through Sucha Przełęcz mountain pass",
                metadata: {
                  date: "2024-08-29",
                  time: "13:42",
                  location: "Sucha Przełęcz",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.231205555555555, lng: 19.98286111111111 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3842.jpeg",
                alt: "Rugged Mountain Terrain",
                caption: "Rocky landscapes of Sucha Przełęcz",
                metadata: {
                  date: "2024-08-29",
                  time: "13:48",
                  location: "Sucha Przełęcz",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.23180833333333, lng: 19.983130555555555 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3846.jpeg",
                alt: "Ridge Trail",
                caption: "Continuing along the high mountain ridge",
                metadata: {
                  date: "2024-08-29",
                  time: "14:38",
                  location: "Siodłowa Perć",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.23252222222222, lng: 19.982902777777777 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3849.jpeg",
                alt: "Siodłowa Perć Ridge",
                caption: "Walking along the scenic Siodłowa Perć ridge trail",
                metadata: {
                  date: "2024-08-29",
                  time: "14:45",
                  location: "Siodłowa Perć",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.23266944444445, lng: 19.982805555555554 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/zakopane-2024/IMG_3850.jpeg",
                alt: "Cable Car Station",
                caption: "Upper station of Kasprowy Wierch cable car at 1,987m",
                metadata: {
                  date: "2024-08-29",
                  time: "14:46",
                  location: "Kasprowy Wierch Cable Car Station",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 49.234316666666665, lng: 19.982722222222222 }
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "charity-events",
    name: "Charity Events",
    description: "Photos from charity walks, fundraisers, and community events",
    icon: "certificate",
    albums: []
  },
  {
    id: "achievements",
    name: "Achievements",
    description: "Celebrating milestones, awards, and academic achievements",
    icon: "checkCircle",
    albums: [
      {
        id: "lodz-2024",
        title: "Łódź 2024 🇵🇱",
        summary: "Summer visits to Poland's vibrant city of Łódź, exploring urban architecture and local culture",
        category: "achievements",
        location: "Łódź, Poland",
        date: "2024-06-23",
        coverImage: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3953.jpeg",
        images: [],
        subAlbums: [
          {
            id: "lodz-zoo-2024",
            title: "Zoo 🦁",
            summary: "Visit to Łódź Zoo and Orientarium",
            category: "achievements",
            location: "Łódź Zoo, Poland",
            date: "2024-06-23",
            coverImage: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3295.jpeg",
            images: [
              {
                src: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3295.jpeg",
                alt: "Łódź Zoo",
                caption: "Exploring Łódź Zoo and Orientarium",
                metadata: {
                  date: "2024-06-23",
                  time: "17:13",
                  location: "Łódź Zoo",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 51.780430555555554, lng: 19.526041666666664 }
                }
              }
            ]
          },
          {
            id: "lodz-city-2024",
            title: "City 🏙️",
            summary: "Exploring downtown Łódź and its urban character",
            category: "achievements",
            location: "Łódź City Center, Poland",
            date: "2024-08-22",
            coverImage: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3953.jpeg",
            images: [
              {
                src: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3596.jpeg",
                alt: "City Center",
                caption: "Discovering the city center",
                metadata: {
                  date: "2024-08-22",
                  time: "11:51",
                  location: "Łódź City Center",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 51.76250833333334, lng: 19.485766666666667 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3597.jpeg",
                alt: "Urban Landscape",
                caption: "Łódź cityscape views",
                metadata: {
                  date: "2024-08-22",
                  time: "11:51",
                  location: "Łódź City Center",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 51.76263888888889, lng: 19.485766666666667 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3605.jpeg",
                alt: "City Streets",
                caption: "Exploring the streets of Łódź",
                metadata: {
                  date: "2024-08-22",
                  time: "12:31",
                  location: "Łódź City Center",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 51.76300555555556, lng: 19.458880555555556 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3929.jpeg",
                alt: "Evening in Łódź",
                caption: "Golden hour in the city",
                metadata: {
                  date: "2024-09-03",
                  time: "18:44",
                  location: "Łódź City Center",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 51.776713888888885, lng: 19.454869444444444 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3932.jpeg",
                alt: "Łódź Morning",
                caption: "Morning in the city center",
                metadata: {
                  date: "2024-09-04",
                  time: "11:31",
                  location: "Łódź City Center",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 51.76302777777778, lng: 19.458255555555557 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3945.jpeg",
                alt: "Urban District",
                caption: "Afternoon in a historic district",
                metadata: {
                  date: "2024-09-05",
                  time: "15:16",
                  location: "Historic District, Łódź",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 51.76145555555556, lng: 19.413994444444445 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3948.jpeg",
                alt: "City Architecture",
                caption: "Industrial heritage architecture",
                metadata: {
                  date: "2024-09-05",
                  time: "15:34",
                  location: "Historic District, Łódź",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 51.760958333333335, lng: 19.41265 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3950.jpeg",
                alt: "Historic Buildings",
                caption: "Exploring historic quarters",
                metadata: {
                  date: "2024-09-05",
                  time: "15:34",
                  location: "Historic District, Łódź",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 51.76085, lng: 19.412680555555553 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3953.jpeg",
                alt: "Street Scene",
                caption: "Vibrant street life",
                metadata: {
                  date: "2024-09-05",
                  time: "15:54",
                  location: "Historic District, Łódź",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 51.76051388888889, lng: 19.413238888888888 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3955.jpeg",
                alt: "Urban Details",
                caption: "City details and textures",
                metadata: {
                  date: "2024-09-05",
                  time: "15:59",
                  location: "Historic District, Łódź",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 51.76026944444445, lng: 19.414213888888888 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3961.jpeg",
                alt: "Afternoon Walk",
                caption: "Afternoon wandering through the city",
                metadata: {
                  date: "2024-09-05",
                  time: "16:31",
                  location: "Historic District, Łódź",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 51.759147222222225, lng: 19.412655555555553 }
                }
              },
              {
                src: "https://img.dagomirwojcik.com/2024/lodz-2024/IMG_3964.jpeg",
                alt: "City Sunset",
                caption: "End of the day in Łódź",
                metadata: {
                  date: "2024-09-05",
                  time: "16:36",
                  location: "Historic District, Łódź",
                  photographer: "Dagomir Wojcik",
                  coordinates: { lat: 51.75984166666667, lng: 19.412141666666667 }
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "exploration",
    name: "Exploration",
    description: "Discovering new places, technologies, and experiences",
    icon: "grid",
    albums: [
      {
        id: "miedzyzdroje-2024",
        title: "Międzyzdroje 2024 🇵🇱",
        summary: "A week-long seaside retreat at Poland's Baltic coast, exploring beaches, cliffs, and coastal trails",
        category: "exploration",
        location: "Międzyzdroje, Poland",
        date: "2024-06-27",
        coverImage: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3334.jpeg",
        images: [
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3311.jpeg",
            alt: "Międzyzdroje Beach",
            caption: "Evening at Międzyzdroje beach",
            metadata: {
              date: "2024-06-27",
              time: "17:57",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.93338055555555, lng: 14.450225 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3322.jpeg",
            alt: "Baltic Coastline",
            caption: "Exploring the Baltic coastline",
            metadata: {
              date: "2024-06-28",
              time: "11:24",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.93695833333333, lng: 14.455633333333333 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3334.jpeg",
            alt: "Sunset at the Beach",
            caption: "Golden hour at the Baltic Sea",
            metadata: {
              date: "2024-06-28",
              time: "17:46",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.93228611111111, lng: 14.448502777777778 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3338.jpeg",
            alt: "Beach Promenade",
            caption: "Strolling along the beach promenade",
            metadata: {
              date: "2024-06-28",
              time: "17:49",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.93277777777777, lng: 14.45023611111111 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3339.jpeg",
            alt: "Coastal Views",
            caption: "Scenic coastal views",
            metadata: {
              date: "2024-06-28",
              time: "17:50",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.932830555555554, lng: 14.450413888888889 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3362.jpeg",
            alt: "Seaside Walk",
            caption: "Midday walk by the sea",
            metadata: {
              date: "2024-07-01",
              time: "12:11",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.93212222222222, lng: 14.448747222222222 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3363.jpeg",
            alt: "Beach Life",
            caption: "Enjoying the beach atmosphere",
            metadata: {
              date: "2024-07-01",
              time: "12:11",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.932002777777775, lng: 14.448405555555556 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3391.jpeg",
            alt: "Morning at the Coast",
            caption: "Morning exploration of the coastline",
            metadata: {
              date: "2024-07-03",
              time: "10:43",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.929775, lng: 14.45684722222222 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3409.jpeg",
            alt: "Coastal Trail",
            caption: "Hiking the coastal trail",
            metadata: {
              date: "2024-07-03",
              time: "11:20",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.93353611111111, lng: 14.475191666666667 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3417.jpeg",
            alt: "Cliffside Views",
            caption: "Panoramic views from the cliffs",
            metadata: {
              date: "2024-07-03",
              time: "11:24",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.933841666666666, lng: 14.47503888888889 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3420.jpeg",
            alt: "Baltic Panorama",
            caption: "Stunning Baltic Sea panorama",
            metadata: {
              date: "2024-07-03",
              time: "11:27",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.93349722222222, lng: 14.475344444444444 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3467.jpeg",
            alt: "Afternoon Beach",
            caption: "Relaxing afternoon at the beach",
            metadata: {
              date: "2024-07-04",
              time: "17:03",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.93219722222222, lng: 14.449383333333333 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3468.jpeg",
            alt: "Seaside Evening",
            caption: "Evening by the Baltic Sea",
            metadata: {
              date: "2024-07-04",
              time: "17:03",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.93216388888889, lng: 14.449641666666666 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3469.jpeg",
            alt: "Beach Sunset",
            caption: "Capturing the sunset",
            metadata: {
              date: "2024-07-04",
              time: "17:03",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.93209722222222, lng: 14.449563888888889 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3471.jpeg",
            alt: "Evening Stroll",
            caption: "Evening stroll along the shore",
            metadata: {
              date: "2024-07-04",
              time: "17:54",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.93180833333333, lng: 14.446352777777777 }
            }
          },
          {
            src: "https://img.dagomirwojcik.com/2024/miedzyzdroje-2024/IMG_3478.jpeg",
            alt: "Last Day at the Beach",
            caption: "Final moments at Międzyzdroje beach",
            metadata: {
              date: "2024-07-05",
              time: "17:06",
              location: "Międzyzdroje",
              photographer: "Dagomir Wojcik",
              coordinates: { lat: 53.93131944444444, lng: 14.449911111111112 }
            }
          }
        ]
      }
    ]
  }
];

export const getCategoryById = (id: string): GalleryCategory | undefined => {
  return galleryCategories.find(category => category.id === id);
};

export type GalleryAlbumWithCategory = GalleryAlbum & { categoryName: string };

export function getLatestGalleryAlbum(): GalleryAlbumWithCategory | null {
  const allAlbums = galleryCategories.flatMap((cat) =>
    cat.albums
      .filter((album) => !album.hideFromGrid)
      .map((album) => ({ ...album, categoryName: cat.name })),
  );

  if (allAlbums.length === 0) return null;

  const sorted = allAlbums
    .map((album) => ({ album, ts: Date.parse(album.date) }))
    .filter((entry) => !Number.isNaN(entry.ts))
    .sort((a, b) => b.ts - a.ts);

  return sorted.length > 0 ? sorted[0].album : allAlbums[0];
}

export const getAllImagesForCategory = (categoryId: string): GalleryImage[] => {
  const category = getCategoryById(categoryId);
  if (!category) return [];
  
  const allImages = category.albums.flatMap((album) => {
    // If album has subAlbums, get images from those instead
    const albumsToProcess = album.subAlbums && album.subAlbums.length > 0 
      ? album.subAlbums 
      : [album];
    
    return albumsToProcess.flatMap((subAlbum, albumIndex) =>
      subAlbum.images.map((image, imageIndex) => {
        // Handle both string and object formats for backward compatibility
        if (typeof image === 'string') {
          return {
            src: image,
            alt: `${subAlbum.title} - Image ${imageIndex + 1}`,
            caption: `${subAlbum.title} - ${subAlbum.location}`
          };
        }
        // If it's already an object with metadata, return as is
        return image;
      })
    );
  });

  // Sort images by date/time in descending order (newest first)
  return allImages.sort((a, b) => {
    // Get date/time from metadata
    const dateA = a.metadata?.date;
    const timeA = a.metadata?.time;
    const dateB = b.metadata?.date;
    const timeB = b.metadata?.time;

    // If no metadata or date, put at the end
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    // Combine date and time for comparison
    const dateTimeA = new Date(`${dateA} ${timeA || '00:00'}`);
    const dateTimeB = new Date(`${dateB} ${timeB || '00:00'}`);

    // Sort in descending order (newest first)
    return dateTimeB.getTime() - dateTimeA.getTime();
  });
};
