"use client";

import { useEffect, useState } from "react";
import { Column, Heading, Text, Flex, Button, Icon, Dialog } from "@once-ui-system/core";
import Image from "next/image";
import {
  getGalleryModalAlbumUrl,
  getGalleryPhotoThumbUrl,
} from "@/lib/imageUrl";
import styles from "./GalleryModal.module.scss";

interface GalleryImage {
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

interface GalleryAlbum {
  id: string;
  title: string;
  summary: string;
  category: string;
  location: string;
  date: string;
  coverImage: string;
  images: (string | GalleryImage)[];
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  albums: GalleryAlbum[];
}

interface PhotoCardProps {
  image: GalleryImage;
}

function PhotoCard({ image }: PhotoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      position="relative"
      transition="micro-medium"
      direction="column"
      radius="l"
      style={{
        borderRadius: "var(--radius-l)",
        border: "2px solid var(--glass-card-border)",
        background: "var(--glass-card-bg)",
        backdropFilter: "var(--glass-backdrop)",
        WebkitBackdropFilter: "var(--glass-backdrop)",
        overflow: "hidden",
        zIndex: "var(--glass-z-index)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 8px 32px var(--glass-card-shadow-hover)"
          : "0 2px 8px var(--glass-card-shadow)",
        filter: isHovered ? "brightness(1.08)" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      fillWidth
    >
      <a
        href={image.src}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", width: "100%" }}
      >
        <div style={{ position: "relative", width: "100%", paddingTop: "100%" }}>
          <Image
            src={getGalleryPhotoThumbUrl(image.src) ?? image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.photoImage}
            style={{ objectFit: "cover", borderRadius: "var(--radius-l)" }}
            priority={false}
          />
        </div>
      </a>
      <Column position="relative" fillWidth gap="8" padding="16" vertical="center">
        {image.metadata && (
          <div className={styles.metadataContainer}>
            {(image.metadata.date || image.metadata.time) && (
              <div className={styles.metadataItem}>
                {Icon && <Icon name="calendar" size="xs" style={{ color: "white" }} />}
                <Text variant="body-default-xs" style={{ color: "white" }}>
                  {[image.metadata.date, image.metadata.time].filter(Boolean).join(" ")}
                </Text>
              </div>
            )}

            {image.metadata.location && (
              <div className={styles.metadataItem}>
                {Icon && <Icon name="globe" size="xs" style={{ color: "white" }} />}
                {image.metadata.coordinates ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${image.metadata.coordinates.lat},${image.metadata.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "white",
                      textDecoration: "underline",
                      cursor: "pointer",
                      transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <Text variant="body-default-xs" style={{ color: "inherit" }}>
                      {image.metadata.location}
                    </Text>
                  </a>
                ) : (
                  <Text variant="body-default-xs" style={{ color: "white" }}>
                    {image.metadata.location}
                  </Text>
                )}
              </div>
            )}
          </div>
        )}
      </Column>
    </Flex>
  );
}

export function GalleryModal({ isOpen, onClose, category, albums }: GalleryModalProps) {
  const [showAlbums, setShowAlbums] = useState(true);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | "all">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    if (isOpen) {
      setSelectedAlbumId("all");
      setSortOrder("desc");
    }
  }, [isOpen]);

  const allImages: GalleryImage[] = albums.flatMap((album, albumIndex) =>
    album.images.map((image, imageIndex) => {
      if (typeof image === "string") {
        return {
          src: image,
          alt: `${album.title} - Image ${imageIndex + 1}`,
          caption: `${album.title} - ${album.location}`,
        };
      }
      return image;
    }),
  );

  const filteredImages =
    selectedAlbumId === "all"
      ? allImages
      : albums
          .filter((album) => album.id === selectedAlbumId)
          .flatMap((album) =>
            album.images.map((image, imageIndex) => {
              if (typeof image === "string") {
                return {
                  src: image,
                  alt: `${album.title} - Image ${imageIndex + 1}`,
                  caption: `${album.title} - ${album.location}`,
                };
              }
              return image;
            }),
          );

  const sortedImages = filteredImages.sort((a, b) => {
    const dateA = a.metadata?.date;
    const timeA = a.metadata?.time;
    const dateB = b.metadata?.date;
    const timeB = b.metadata?.time;

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    const dateTimeA = new Date(`${dateA} ${timeA || "00:00"}`);
    const dateTimeB = new Date(`${dateB} ${timeB || "00:00"}`);

    if (sortOrder === "desc") {
      return dateTimeB.getTime() - dateTimeA.getTime();
    }
    return dateTimeA.getTime() - dateTimeB.getTime();
  });

  const selectedAlbum =
    selectedAlbumId === "all" ? null : albums.find((album) => album.id === selectedAlbumId);

  const modalTitle = selectedAlbum
    ? selectedAlbum.title
    : albums.length === 1
      ? albums[0].title
      : category;

  return (
    <Dialog open={isOpen} onClose={onClose} title={modalTitle}>
      <Column gap="l" fillWidth className={styles.galleryModalContent}>
        <div className={styles.albumsSection}>
          <div className={styles.albumsHeader}>
            <div className={styles.albumsHeaderLeft}>
              <Button
                variant="tertiary"
                size="s"
                onClick={() => setShowAlbums(!showAlbums)}
                className={styles.toggleButton}
              >
                {Icon && <Icon name={showAlbums ? "chevronDown" : "chevronRight"} size="xs" />}
              </Button>
              <Heading as="h3" variant="heading-strong-m" className={styles.sectionTitle}>
                Albums
              </Heading>
            </div>
            <Text variant="body-default-s" className={styles.sectionSubtitle}>
              {albums.length} Album{albums.length !== 1 ? "s" : ""}
            </Text>
          </div>

          {showAlbums && (
            <div className={styles.albumsGrid}>
              <div
                key="all"
                className={`${styles.albumCard} ${selectedAlbumId === "all" ? styles.albumCardSelected : ""}`}
                onClick={() => setSelectedAlbumId("all")}
                style={{ cursor: "pointer" }}
              >
                <div className={styles.albumCover}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "var(--radius-m)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {Icon && <Icon name="grid" size="xl" />}
                  </div>
                  <div className={styles.albumOverlay}>
                    <div className={styles.photoCount}>{allImages.length}</div>
                  </div>
                </div>
                <Text variant="body-default-s" className={styles.albumTitle}>
                  All Photos
                </Text>
              </div>

              {albums.map((album) => (
                <div
                  key={album.id}
                  className={`${styles.albumCard} ${selectedAlbumId === album.id ? styles.albumCardSelected : ""}`}
                  onClick={() => setSelectedAlbumId(album.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.albumCover}>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        paddingTop: "100%",
                        borderRadius: "var(--radius-m)",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={getGalleryModalAlbumUrl(album.coverImage) ?? album.coverImage}
                        alt={album.title}
                        fill
                        sizes="(max-width: 768px) 33vw, 200px"
                        style={{ objectFit: "cover" }}
                        priority={false}
                      />
                    </div>
                    <div className={styles.albumOverlay}>
                      <div className={styles.photoCount}>{album.images.length}</div>
                    </div>
                  </div>
                  <Text variant="body-default-s" className={styles.albumTitle}>
                    {album.title}
                  </Text>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.photosSection}>
          <div className={styles.photosHeader}>
            <div>
              <Heading as="h3" variant="heading-strong-m" className={styles.sectionTitle}>
                {selectedAlbum ? `${selectedAlbum.title} Photos` : "All Photos"}
              </Heading>
              <Text variant="body-default-s" className={styles.sectionSubtitle}>
                {sortedImages.length} photo{sortedImages.length !== 1 ? "s" : ""}
              </Text>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Text variant="body-default-s" className={styles.sortLabel}>
                {sortOrder === "desc" ? "Descending" : "Ascending"}
              </Text>
              <Button
                variant="tertiary"
                size="s"
                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                className={styles.sortButton}
                title={sortOrder === "desc" ? "Sorted: Newest first" : "Sorted: Oldest first"}
              >
                {Icon && <Icon name={sortOrder === "desc" ? "chevronDown" : "chevronUp"} size="s" />}
              </Button>
            </div>
          </div>
          <div className={styles.photosGrid}>
            {sortedImages.map((image, index) => (
              <PhotoCard key={index} image={image} />
            ))}
          </div>
        </div>
      </Column>
    </Dialog>
  );
}
