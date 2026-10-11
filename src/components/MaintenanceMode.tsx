"use client";

import { useEffect, useState } from "react";
import { Flex, Column, Heading, Text, Button, Spinner } from "@once-ui-system/core";

interface MaintenanceConfig {
  enabled: boolean;
  message: string;
  estimatedTime?: string;
  contactEmail?: string;
}

const MaintenanceMode: React.FC = () => {
  const [config, setConfig] = useState<MaintenanceConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceConfig = async () => {
      try {
        const response = await fetch('/maintenance.json');
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        } else {
          // If maintenance.json doesn't exist or can't be fetched, assume maintenance is disabled
          setConfig({ enabled: false, message: "" });
        }
      } catch (error) {
        console.error('Failed to fetch maintenance config:', error);
        setConfig({ enabled: false, message: "" });
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceConfig();
  }, []);

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (!config || !config.enabled) {
    return null;
  }

  return (
    <Column 
      paddingY="128" 
      maxWidth={24} 
      gap="24" 
      center
      style={{ minHeight: "60vh", justifyContent: "center" }}
    >
      <Column gap="16" center>
        <Heading align="center" wrap="balance" size="xl">
          🛠️ Under Maintenance
        </Heading>
        <Text align="center" wrap="balance" size="l">
          {config.message}
        </Text>
      </Column>

      {config.estimatedTime && (
        <Text align="center" color="neutral-on-background-medium">
          Estimated time: {config.estimatedTime}
        </Text>
      )}

      {config.contactEmail && (
        <Column gap="8" center>
          <Text align="center" color="neutral-on-background-medium">
            Need immediate assistance?
          </Text>
          <Button
            variant="secondary"
            onClick={() => window.location.href = `mailto:${config.contactEmail}`}
          >
            Contact Us
          </Button>
        </Column>
      )}

      <Button
        variant="tertiary"
        onClick={() => window.location.reload()}
      >
        Refresh Page
      </Button>
    </Column>
  );
};

export { MaintenanceMode };
