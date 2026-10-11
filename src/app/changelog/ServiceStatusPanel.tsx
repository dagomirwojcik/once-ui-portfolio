"use client";

import { useCallback, useEffect, useState } from "react";
import { Flex, Pulse, Text } from "@once-ui-system/core";
import type { ColorScheme } from "@once-ui-system/core";
import type { ServiceStatusResult, ServiceStatusState } from "@/lib/serviceStatus";
import pageStyles from "./Changelog.module.scss";

interface ServiceStatusPanelProps {
  initialStatuses: ServiceStatusResult[];
}

type DisplayStatus = ServiceStatusState | "checking";

const STATUS_VARIANT: Record<DisplayStatus, ColorScheme> = {
  online: "success",
  offline: "danger",
  checking: "warning",
};

const STATUS_LABEL: Record<DisplayStatus, string> = {
  online: "Online",
  offline: "Offline",
  checking: "Checking…",
};

export default function ServiceStatusPanel({
  initialStatuses,
}: ServiceStatusPanelProps) {
  const [services, setServices] = useState<ServiceStatusResult[]>(
    initialStatuses ?? [],
  );

  const refreshStatuses = useCallback(async () => {
    try {
      const response = await fetch("/api/service-status", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as { services?: ServiceStatusResult[] };
      if (Array.isArray(data.services)) {
        setServices(data.services);
      }
    } catch {
      // Keep last known statuses on network failure.
    }
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(refreshStatuses, 60_000);
    return () => window.clearInterval(intervalId);
  }, [refreshStatuses]);

  return (
    <div className={pageStyles.serviceStatusGrid} aria-live="polite">
      {services.map((service) => {
        const displayStatus: DisplayStatus = service.status;

        return (
          <article
            key={service.id}
            className={pageStyles.serviceStatusCard}
          >
            <Flex fillWidth horizontal="between" vertical="center" gap="8">
              <Flex vertical="center" gap="8" minWidth={0}>
                <Pulse
                  size="m"
                  scheme={STATUS_VARIANT[displayStatus]}
                  aria-label={`${service.name} is ${STATUS_LABEL[displayStatus].toLowerCase()}`}
                />
                <Flex direction="column" gap="2" minWidth={0}>
                  <Text
                    variant="label-strong-s"
                    onBackground="neutral-weak"
                    className={pageStyles.serviceStatusName}
                  >
                    {service.name}
                  </Text>
                  <Text
                    variant="body-default-xs"
                    onBackground="neutral-weak"
                    className={pageStyles.serviceStatusLabel}
                  >
                    {service.label}
                  </Text>
                </Flex>
              </Flex>
              <Text
                variant="label-default-s"
                onBackground="neutral-weak"
                className={pageStyles.serviceStatusState}
              >
                {STATUS_LABEL[displayStatus]}
              </Text>
            </Flex>
          </article>
        );
      })}
    </div>
  );
}
