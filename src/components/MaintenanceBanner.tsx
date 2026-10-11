"use client";

import { Feedback, Icon, Text, Heading } from "@once-ui-system/core";

interface MaintenanceBannerProps {
  title: string;
  description: string;
  variant?: "warning" | "error" | "info" | "success" | "download";
  className?: string;
  style?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
}

export default function MaintenanceBanner({
  title,
  description,
  variant = "warning",
  className,
  style,
  cardStyle
}: MaintenanceBannerProps) {
  return (
    <div 
      className={className}
      style={{ 
        width: '100%', 
        padding: '24px 0',
        ...style 
      }}
    >
      <div
        style={{
          width: '100%',
          position: 'relative',
          borderRadius: 'var(--radius-l)',
          border: variant === "download" ? '2px solid var(--glass-card-border)' : variant === "info" ? '2px solid var(--glass-card-border)' : '2px solid rgba(255, 165, 0, 0.7)',
          background: variant === "download" ? 'var(--glass-card-bg)' : variant === "info" ? 'var(--glass-card-bg)' : 'rgba(255, 165, 0, 0.2)',
          backdropFilter: variant === "download" ? 'var(--glass-backdrop)' : variant === "info" ? 'var(--glass-backdrop)' : 'none',
          WebkitBackdropFilter: variant === "download" ? 'var(--glass-backdrop)' : variant === "info" ? 'var(--glass-backdrop)' : 'none',
          overflow: 'hidden',
          zIndex: variant === "download" ? 'var(--glass-z-index)' : variant === "info" ? 'var(--glass-z-index)' : 'auto',
          ...cardStyle
        }}
      >
        {variant === "download" ? (
          <div style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <div style={{
              color: 'var(--color-text-strong)',
              fontSize: '20px',
              marginTop: '2px',
              flexShrink: 0
            }}>
              <Icon name="download" />
            </div>
            <div style={{ flex: 1 }}>
              <Heading as="h3" variant="heading-strong-s" style={{ 
                color: 'var(--color-text-strong)',
                margin: '0 0 4px 0'
              }}>
                {title}
              </Heading>
              <Text variant="body-default-s" style={{ 
                color: 'var(--color-text-weak)',
                margin: 0
              }}>
                {description}
              </Text>
            </div>
          </div>
        ) : (
          <Feedback
            title={title}
            description={description}
            variant={variant === "error" ? "danger" : variant}
            style={{
              background: 'transparent',
              border: '0',
              borderRadius: '0',
              padding: '16px 20px',
              width: '100%',
              height: '100%'
            }}
          />
        )}
      </div>
    </div>
  );
}
