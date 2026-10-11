import { Column, Meta } from "@once-ui-system/core";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import MaintenanceBanner from "@/components/MaintenanceBanner";
import { StructuredData } from "@/components/seo/StructuredData";
import { galleryIndexSchemas } from "@/lib/pageSchemas";
import { baseURL, gallery } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(
      gallery.title
    )}&description=${encodeURIComponent(
      gallery.description
    )}&type=gallery`,
    path: gallery.path,
  });
}

export default function GalleryPage() {
  return (
    <>
      <StructuredData data={galleryIndexSchemas()} />
      <div style={{ position: "relative", minHeight: "100vh", width: "100%" }}>
        <Column
          maxWidth="xl"
          gap="xl"
          position="relative"
          zIndex={2}
          style={{ marginInline: "auto" }}
        >
          <GalleryHero />
          <MaintenanceBanner
            title="Gallery Under Maintenance"
            description="The gallery is getting a little more work. Please check back soon."
            variant="info"
          />
        </Column>
      </div>
    </>
  );
}
