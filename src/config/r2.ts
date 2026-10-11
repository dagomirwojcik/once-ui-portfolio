// Cloudflare R2 Configuration
export const R2_CONFIG = {
  // Your custom domain for serving images
  BASE_URL: "https://img.dagomirwojcik.com",
  
  // Folder structure in your R2 bucket
  FOLDERS: {
    LODZ_2024: "lodz-2024",
    MIEDZYZDROJE_2024: "miedzyzdroje-2024",
    ZAKOPANE_2024: "zakopane-2024"
  }
} as const;

// Helper function to build R2 URLs with year structure
export function getR2ImageUrl(year: string, destination: string, filename: string): string {
  return `${R2_CONFIG.BASE_URL}/${year}/${destination}/${filename}`;
}

// Helper function to build cover image URLs with year structure
export function getR2CoverUrl(year: string, destination: string, filename: string): string {
  return `${R2_CONFIG.BASE_URL}/${year}/${destination}/${filename}`;
}