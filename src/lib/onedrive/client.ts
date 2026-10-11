import {
  buildRouteOutline,
  calculateDurationSeconds,
  calculateRouteDistanceMeters,
  parseGpxActivityName,
  parseGpxTimes,
  parseGpxTimestamp,
  parseGpxTrackPoints,
} from "@/lib/workouts/gpx";
import {
  resolveWorkoutDisplayName,
} from "@/lib/workouts/geocode";
import {
  formatDistance,
  formatDuration,
  formatPace,
  parseWorkoutFilename,
} from "@/lib/workouts/formatWorkout";
import type { WorkoutSummary, WorkoutsResponse } from "@/lib/workouts/types";
import {
  extractFilenameFromUrl,
  fetchPublicFile,
  resolveGpxDownloadUrls,
} from "@/lib/onedrive/publicClient";
import { loadLocalGpxFiles } from "@/lib/workouts/localGpx";
import { getWorkoutPlaceName } from "@/lib/workouts/locationNames";
import { healthfit } from "@/resources";

const WORKOUT_LIMIT = 5;

function resolveWorkoutLinkUrl(): string {
  return (
    process.env.STRAVA_PROFILE_URL?.trim() ||
    healthfit.stravaProfileUrl ||
    healthfit.folderUrl ||
    "https://www.strava.com/athletes/148867277"
  );
}

function sortWorkoutsByMetadata(workouts: WorkoutSummary[]): WorkoutSummary[] {
  return [...workouts].sort(
    (a, b) => Date.parse(b.startDate) - Date.parse(a.startDate),
  );
}

function gpxToWorkoutSummary(
  gpx: string,
  sourceUrl: string,
  filename: string | null,
  lastModified: string | null,
  placeName: Awaited<ReturnType<typeof getWorkoutPlaceName>> = null,
): WorkoutSummary | null {
  if (!gpx.includes("<trkpt") && !gpx.includes("<gpx")) {
    return null;
  }

  const parsedFilename = filename ? parseWorkoutFilename(filename) : null;
  const gpxName = parseGpxActivityName(gpx);
  const startDate =
    parseGpxTimestamp(gpx, lastModified) ??
    parsedFilename?.startDate ??
    null;

  if (!startDate) {
    return null;
  }

  const points = parseGpxTrackPoints(gpx);
  const times = parseGpxTimes(gpx);
  const distanceMeters = calculateRouteDistanceMeters(points);
  const durationSeconds = calculateDurationSeconds(times);
  const route = buildRouteOutline(points);

  return {
    id: filename ?? sourceUrl,
    name: resolveWorkoutDisplayName({
      placeName,
      gpxName,
      filenameTitle: parsedFilename?.title ?? null,
    }),
    activityType: parsedFilename?.activityType ?? "Outdoor Running",
    startDate,
    distanceLabel: distanceMeters > 0 ? formatDistance(distanceMeters) : "--",
    durationLabel: durationSeconds ? formatDuration(durationSeconds) : "--",
    paceLabel:
      durationSeconds && distanceMeters > 0
        ? formatPace(distanceMeters, durationSeconds)
        : "--",
    route,
    sourceUrl,
  };
}

export async function fetchPublicOneDriveWorkouts(): Promise<WorkoutsResponse> {
  const fetchedAt = new Date().toISOString();
  const { urls, folderViewUrl, error: configError } = await resolveGpxDownloadUrls();
  const workouts: WorkoutSummary[] = [];
  const seenIds = new Set<string>();

  function addWorkout(workout: WorkoutSummary | null) {
    if (!workout || seenIds.has(workout.id)) {
      return;
    }

    seenIds.add(workout.id);
    workouts.push(workout);
  }

  const workoutLinkUrl = resolveWorkoutLinkUrl();
  const localFiles = await loadLocalGpxFiles(WORKOUT_LIMIT);

  for (const file of localFiles) {
    const placeName = await getWorkoutPlaceName(file.filename);
    addWorkout(
      gpxToWorkoutSummary(
        file.gpx,
        workoutLinkUrl,
        file.filename,
        file.lastModified,
        placeName,
      ),
    );
  }

  for (const url of urls) {
    try {
      const { text: gpx, lastModified } = await fetchPublicFile(url);
      const filename = extractFilenameFromUrl(url);
      const placeName = filename ? await getWorkoutPlaceName(filename) : null;
      addWorkout(
        gpxToWorkoutSummary(
          gpx,
          workoutLinkUrl,
          filename,
          lastModified,
          placeName,
        ),
      );
    } catch {
      // Skip broken links and continue with the rest.
    }
  }

  if (workouts.length > 0) {
    return {
      configured: true,
      workouts: sortWorkoutsByMetadata(workouts).slice(0, WORKOUT_LIMIT),
      fetchedAt,
    };
  }

  if (configError) {
    return {
      configured: true,
      workouts: [],
      fetchedAt,
      error: configError,
    };
  }

  if (urls.length > 0) {
    return {
      configured: true,
      workouts: [],
      fetchedAt,
      error:
        "OneDrive share links return a login page to the server (403). Run npm run sync:workouts to copy GPX files from your synced HealthFit folder into public/workouts/.",
    };
  }

  return {
    configured: Boolean(folderViewUrl),
    workouts: [],
    fetchedAt,
    error:
      folderViewUrl
        ? "Run npm run sync:workouts to copy recent runs from OneDrive Apps/HealthFit into public/workouts/."
        : "Add HealthFit GPX files to public/workouts/ or configure ONEDRIVE_HEALTHFIT_LATEST_GPX_URL.",
  };
}
