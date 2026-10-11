import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { isRunningWorkoutFilename } from "@/lib/workouts/formatWorkout";

export interface LocalGpxFile {
  filename: string;
  gpx: string;
  lastModified: string | null;
}

const WORKOUTS_DIR = path.join(process.cwd(), "public", "workouts");

export async function loadLocalGpxFiles(limit = 5): Promise<LocalGpxFile[]> {
  let entries: string[];

  try {
    entries = await readdir(WORKOUTS_DIR);
  } catch {
    return [];
  }

  const runningFiles = entries.filter(isRunningWorkoutFilename).sort().reverse();

  const files: LocalGpxFile[] = [];

  for (const filename of runningFiles.slice(0, limit)) {
    try {
      const filePath = path.join(WORKOUTS_DIR, filename);
      const [gpx, fileStat] = await Promise.all([
        readFile(filePath, "utf8"),
        stat(filePath),
      ]);

      if (!gpx.includes("<trkpt") && !gpx.includes("<gpx")) {
        continue;
      }

      files.push({
        filename,
        gpx,
        lastModified: fileStat.mtime.toISOString(),
      });
    } catch {
      // Skip unreadable files.
    }
  }

  return files;
}
