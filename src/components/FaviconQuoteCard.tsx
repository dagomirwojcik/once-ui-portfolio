"use client";

import {
  Flex,
  Media,
  BlockQuote,
  GlitchFx,
  RevealFx,
} from "@once-ui-system/core";
import { useState } from "react";
import styles from "./FaviconQuoteCard.module.scss";

interface FaviconQuoteCardProps {
  faviconSrc: string;
  faviconAlt: string;
  faviconWidth?: number;
  faviconHeight?: number;
  quote: string;
  author: {
    name: string;
    avatar: string;
  };
  link: {
    href: string;
    label: string;
  };
  subline: string;
  disableHover?: boolean;
}

export const FaviconQuoteCard: React.FC<FaviconQuoteCardProps> = ({
  faviconSrc,
  faviconAlt,
  faviconWidth = 16,
  faviconHeight = 16,
  quote,
  author,
  link,
  subline,
  disableHover = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const effectiveHover = !disableHover && isHovered;

  return (
    <RevealFx speed="fast" translateY="4" delay={0.9} fillWidth horizontal="center">
      <Flex 
        gap="xl" 
        vertical="center" 
        horizontal="between" 
        fillWidth
        style={{
          borderRadius: "var(--radius-l)",
          border: `2px solid var(--glass-card-border)`,
          background: `var(--glass-card-bg)`,
          backdropFilter: "var(--glass-backdrop)",
          WebkitBackdropFilter: "var(--glass-backdrop)",
          overflow: "hidden",
          zIndex: "var(--glass-z-index)",
          padding: "24px",
          gap: "24px",
          transition: "all 0.3s ease",
          transform: effectiveHover ? "translateY(-4px)" : "translateY(0)",
          boxShadow: effectiveHover
            ? `0 8px 32px var(--glass-card-shadow-hover)`
            : `0 2px 8px var(--glass-card-shadow)`,
        }}
        onMouseEnter={() => { if (!disableHover) setIsHovered(true); }}
        onMouseLeave={() => { if (!disableHover) setIsHovered(false); }}
      >
         {/* Left side - Favicon with effect */}
         <Flex flex="1" horizontal="end" className={styles.faviconContainer}>
           <GlitchFx>
             <Media
               src={faviconSrc}
               alt={faviconAlt}
               width={faviconWidth}
               height={faviconHeight}
             />
           </GlitchFx>
         </Flex>
        
        {/* Right side - BlockQuote */}
        <Flex flex="2" horizontal="end" className={styles.blockquoteContainer}>
          <BlockQuote
            author={author}
            link={link}
            subline={subline}
          >
            {quote}
          </BlockQuote>
        </Flex>
      </Flex>
    </RevealFx>
  );
};
