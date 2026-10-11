export interface ParsedWorkoutFilename {
  startDate: string;
  title: string;
  activityType: string;
}

const FILENAME_PATTERN =
  /^(\d{4}-\d{2}-\d{2})-(\d{6})-(.+)-Dag's-Watch\.(gpx|csv)$/i;

export function parseWorkoutFilename(filename: string): ParsedWorkoutFilename | null {
  const match = filename.match(FILENAME_PATTERN);

  if (!match) {
    return null;
  }

  const [, datePart, timePart, activitySlug] = match;
  const hours = timePart.slice(0, 2);
  const minutes = timePart.slice(2, 4);
  const seconds = timePart.slice(4, 6);
  const activityType = activitySlug.replace(/-/g, " ");

  return {
    startDate: `${datePart}T${hours}:${minutes}:${seconds}`,
    title: activityType,
    activityType,
  };
}

export function isRunningWorkoutFilename(filename: string): boolean {
  return /Outdoor-Running/i.test(filename) && /\.gpx$/i.test(filename);
}

export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)} km`;
  }

  return `${Math.round(meters)} m`;
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function formatPace(distanceMeters: number, durationSeconds: number): string {
  if (distanceMeters <= 0 || durationSeconds <= 0) {
    return "--";
  }

  const secondsPerKm = durationSeconds / (distanceMeters / 1000);
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.round(secondsPerKm % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}/km`;
}
