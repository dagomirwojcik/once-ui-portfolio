"use client";

import { useEffect, useMemo, useState } from "react";
import { Heading, Icon, RevealFx, SmartLink, Text } from "@once-ui-system/core";
import { formatDate } from "@/app/utils/formatDate";
import type { WorkoutSummary, WorkoutsResponse } from "@/lib/workouts/types";
import styles from "./RunningWorkoutsPanel.module.scss";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;
const ROTATE_INTERVAL_MS = 8_000;

interface RunningWorkoutsPanelProps {
  title?: string;
  disableHover?: boolean;
}

function RouteOutline({ route }: { route: WorkoutSummary["route"] }) {
  if (!route?.path) {
    return (
      <div className={styles.routeFallback} aria-hidden="true">
        <Icon name="refresh" size="m" onBackground="neutral-weak" />
      </div>
    );
  }

  return (
    <svg
      className={styles.routeSvg}
      viewBox={route.viewBox}
      role="img"
      aria-label="Workout route outline"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={route.path}
        className={styles.routePath}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const RunningWorkoutsPanel: React.FC<RunningWorkoutsPanelProps> = ({
  title = "Where I've Been Running:",
  disableHover = false,
}) => {
  const [payload, setPayload] = useState<WorkoutsResponse | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const effectiveHover = !disableHover && isHovered;
  const workouts = payload?.workouts ?? [];
  const activeWorkout = workouts[activeIndex] ?? null;

  useEffect(() => {
    let cancelled = false;

    async function loadWorkouts() {
      try {
        const response = await fetch("/api/workouts/latest", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as WorkoutsResponse;
        if (!cancelled) {
          setPayload(data);
          setActiveIndex(0);
        }
      } catch {
        if (!cancelled) {
          setPayload({
            configured: false,
            workouts: [],
            fetchedAt: new Date().toISOString(),
            error: "Failed to load workouts from OneDrive.",
          });
        }
      }
    }

    loadWorkouts();
    const refreshId = window.setInterval(loadWorkouts, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(refreshId);
    };
  }, []);

  useEffect(() => {
    if (workouts.length <= 1) {
      return;
    }

    const rotateId = window.setInterval(() => {
      setIsFading(true);
      window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % workouts.length);
        setIsFading(false);
      }, 250);
    }, ROTATE_INTERVAL_MS);

    return () => window.clearInterval(rotateId);
  }, [workouts.length]);

  const statusMessage = useMemo(() => {
    if (!payload) {
      return "Loading recent runs...";
    }

    if (!payload.configured && !payload.error) {
      return "Add a HealthFit GPX file download link to show recent runs.";
    }

    if (payload.error) {
      return payload.error;
    }

    if (workouts.length === 0) {
      return "No recent runs found. Run npm run sync:workouts to copy GPX files from HealthFit.";
    }

    return null;
  }, [payload, workouts.length]);

  return (
    <RevealFx speed="fast" translateY="4" delay={1.1} fillWidth>
      <div
        className={styles.card}
        style={{
          transform: effectiveHover ? "translateY(-4px)" : "translateY(0)",
          boxShadow: effectiveHover
            ? "0 8px 32px var(--glass-card-shadow-hover)"
            : "0 2px 8px var(--glass-card-shadow)",
        }}
        onMouseEnter={() => {
          if (!disableHover) setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (!disableHover) setIsHovered(false);
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Heading as="h3" variant="heading-strong-s" onBackground="neutral-weak">
              {title}
            </Heading>
          </div>

          <div className={`${styles.content} ${isFading ? styles.fadeOut : styles.fadeIn}`}>
            {activeWorkout ? (
              <SmartLink
                href={activeWorkout.sourceUrl ?? "#"}
                unstyled
                fillWidth
                aria-label={`View ${activeWorkout.name} on Strava`}
              >
                <div className={styles.workoutLink}>
                  <div className={styles.routeFrame}>
                    <RouteOutline route={activeWorkout.route} />
                  </div>

                  <div className={styles.details}>
                    <Text variant="heading-strong-s" className={styles.workoutName}>
                      {activeWorkout.name}
                    </Text>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {formatDate(activeWorkout.startDate, false)}
                    </Text>
                    <div className={styles.statsRow}>
                      <span>{activeWorkout.distanceLabel}</span>
                      <span>{activeWorkout.durationLabel}</span>
                      <span>{activeWorkout.paceLabel}</span>
                    </div>
                  </div>
                </div>
              </SmartLink>
            ) : (
              <div className={styles.emptyState}>
                <Icon name="refresh" size="m" onBackground="neutral-weak" />
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {statusMessage}
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </RevealFx>
  );
};
