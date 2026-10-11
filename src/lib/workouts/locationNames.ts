import { readFile } from "node:fs/promises";
import path from "node:path";
import type { WorkoutPlaceName } from "@/lib/workouts/geocode";

const LOCATIONS_PATH = path.join(process.cwd(), "public", "workouts", "locations.json");

type LocationCache = Record<string, WorkoutPlaceName>;

export async function loadWorkoutLocationNames(): Promise<LocationCache> {
  try {
    const raw = await readFile(LOCATIONS_PATH, "utf8");
    return JSON.parse(raw) as LocationCache;
  } catch {
    return {};
  }
}

export async function getWorkoutPlaceName(filename: string): Promise<WorkoutPlaceName | null> {
  const locations = await loadWorkoutLocationNames();
  return locations[filename] ?? null;
}
