"use client";

import { useState } from "react";
import {
  Column,
  CountFx,
  Flex,
  Icon,
  RevealFx,
  Text,
} from "@once-ui-system/core";
import type { IconName } from "@once-ui-system/core";
import type { WorkStat } from "@/app/utils/workStats";
import styles from "./WorkStatsBar.module.scss";

interface WorkStatsBarProps {
  stats: WorkStat[];
}

export function WorkStatsBar({ stats }: WorkStatsBarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <RevealFx speed="fast" translateY="8" delay={0.15} fillWidth>
      <div
        className={styles.bar}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: isHovered
            ? "0 8px 32px var(--glass-card-shadow-hover)"
            : "0 2px 8px var(--glass-card-shadow)",
        }}
      >
        <Flex
          fillWidth
          gap="16"
          wrap
          horizontal="center"
          className={styles.statsRow}
        >
          {stats.map((stat) => (
            <Column
              key={stat.label}
              flex={1}
              gap="8"
              horizontal="center"
              className={styles.stat}
            >
              <Icon name={stat.icon as IconName} size="m" onBackground="neutral-weak" />
              <CountFx
                value={stat.count}
                variant="display-strong-s"
                speed={500}
                effect="smooth"
                easing="ease-in-out"
              />
              <Text
                variant="label-default-s"
                onBackground="neutral-weak"
                style={{ textAlign: "center" }}
              >
                {stat.label}
              </Text>
            </Column>
          ))}
        </Flex>
      </div>
    </RevealFx>
  );
}
