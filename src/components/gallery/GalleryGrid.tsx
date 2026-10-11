"use client";

import { useState, useMemo, useEffect } from "react";
import { Column, Heading, Text, Media, Flex, Badge } from "@once-ui-system/core";
import Image from "next/image";
import { Icon } from "@once-ui-system/core";
import { getGalleryAlbumCoverUrl } from "@/lib/imageUrl";
import { GalleryModal } from "./GalleryModal";
import { galleryCategories, GalleryCategory, GalleryAlbum } from "@/data/galleryData";
import styles from "./GalleryGrid.module.scss";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

interface GalleryGridProps {
  selectedCategory: string | null;
}

export function GalleryGrid({ selectedCategory }: GalleryGridProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Flatten all albums from all categories
  const allAlbums = useMemo(() => {
    return galleryCategories.flatMap(category => 
      category.albums.map(album => ({
        ...album,
        categoryName: category.name,
        categoryIcon: category.icon
      }))
    );
  }, []);


  // Filter albums based on selected category and sort by date
  const filteredAlbums = useMemo(() => {
    let albums = allAlbums;
    
    // Filter by category if selected
    if (selectedCategory) {
      albums = allAlbums.filter(album => album.categoryName === selectedCategory);
    }
    
    // Sort albums by date in descending order (newest first)
    return albums.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      // Sort in descending order (newest first)
      return dateB.getTime() - dateA.getTime();
    });
  }, [allAlbums, selectedCategory]);

  const isMobile = useIsMobile();
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleAlbums = isMobile ? filteredAlbums.slice(0, visibleCount) : filteredAlbums;
  const canLoadMore = isMobile && visibleCount < filteredAlbums.length;

  const handleAlbumClick = (album: GalleryAlbum) => {
    setSelectedAlbum(album);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlbum(null);
  };

  // Get grid columns class based on album count
  const getGridClass = () => {
    if (isMobile) return styles.singleColumn;
    if (visibleAlbums.length <= 2) return styles.twoColumns;
    if (visibleAlbums.length < 3) return styles.threeColumnsCentered;
    return styles.threeColumns;
  };

  return (
    <>
      <div className={styles.galleryContainer}>

        {/* Albums Grid */}
        {visibleAlbums.length > 0 && (
          <div className={`${styles.albumsGrid} ${getGridClass()}`}>
            {visibleAlbums.map((album, idx) => (
              <Column 
                key={album.id}
                fillWidth 
                style={{
                  borderRadius: "var(--radius-l)",
                  border: "2px solid var(--glass-card-border)",
                  background: "var(--glass-card-bg)",
                  backdropFilter: "var(--glass-backdrop)",
                  WebkitBackdropFilter: "var(--glass-backdrop)",
                  overflow: "hidden",
                  zIndex: "var(--glass-z-index)",
                  transition: "all 0.3s ease",
                  transform: hoveredCard === album.id ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hoveredCard === album.id
                    ? "0 8px 32px var(--glass-card-shadow-hover)"
                    : "0 2px 8px var(--glass-card-shadow)",
                  cursor: "pointer",
                }}
                className={styles.card}
                onMouseEnter={() => setHoveredCard(album.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleAlbumClick(album)}
              >
                {/* Image Container - Stretches across entire card */}
                <div style={{ position: "relative", overflow: "hidden", height: "280px" }}>
                  <Image
                    src={getGalleryAlbumCoverUrl(album.coverImage) ?? album.coverImage}
                    alt={album.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ 
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                      transform: hoveredCard === album.id ? "scale(1.05)" : "scale(1)",
                    }}
                    className={styles.image}
                    priority={false}
                  />
                  
                  {/* Overlay with album title and category/location */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                      color: "white",
                      padding: "16px",
                    }}
                  >
                    <Heading as="h3" wrap="balance" variant="heading-strong-s" style={{ color: "white", marginBottom: "4px" }}>
                      {album.title}
                    </Heading>
                    <Flex gap="xs" align="center">
                      <Icon name={album.categoryIcon as any} size="xs" style={{ color: "var(--glass-text-weak)" }} />
                      <Text variant="body-default-xs" style={{ color: "var(--glass-text-weak)" }}>
                        {album.categoryName} • {album.location}
                      </Text>
                    </Flex>
                  </div>
                </div>

                {/* Badges section at bottom - vertically centered */}
                <div style={{ height: "70px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Flex gap="s" wrap>
                    <Badge background="neutral-strong" onBackground="neutral-weak" paddingX="8" paddingY="4">
                      {album.subAlbums 
                        ? album.subAlbums.reduce((total, subAlbum) => total + subAlbum.images.length, 0)
                        : album.images.length
                      } photos
                    </Badge>
                    <Badge background="neutral-weak" onBackground="neutral-strong" paddingX="8" paddingY="4">
                      {album.date}
                    </Badge>
                  </Flex>
                </div>
              </Column>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {canLoadMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 0, marginBottom: 12 }}>
            <button
              onClick={() => setVisibleCount(c => c + 6)}
              className={styles.categoryTag}
              style={{ cursor: 'pointer', fontSize: 14, fontWeight: 500, marginTop: 0 }}
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      {selectedAlbum && (
        <GalleryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          category={selectedAlbum.title}
          albums={selectedAlbum.subAlbums && selectedAlbum.subAlbums.length > 0 
            ? selectedAlbum.subAlbums 
            : [selectedAlbum]
          }
        />
      )}
    </>
  );
}
