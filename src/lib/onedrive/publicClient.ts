/**
 * Ensures a OneDrive share URL uses direct-download mode.
 * Works with individual file links (1drv.ms/u/...), not folder links.
 */
export function toDirectDownloadUrl(url: string): string {
  const trimmed = url.trim();

  if (!trimmed) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);

    if (!parsed.searchParams.has("download")) {
      parsed.searchParams.set("download", "1");
    }

    return parsed.toString();
  } catch {
    return trimmed.includes("download=1") ? trimmed : `${trimmed}${trimmed.includes("?") ? "&" : "?"}download=1`;
  }
}

export function parseConfiguredUrls(raw: string | undefined): string[] {
  if (!raw) {
    return [];
  }

  return raw
    .split(/[\n,]/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map(toDirectDownloadUrl);
}

export async function fetchPublicFile(
  url: string,
): Promise<{ text: string; lastModified: string | null }> {
  const response = await fetch(toDirectDownloadUrl(url), {
    redirect: "follow",
    cache: "no-store",
    headers: {
      Accept: "application/xml,text/plain,text/csv,*/*",
      "User-Agent": "once-ui-portfolio-healthfit/1.0",
    },
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error(
        "OneDrive blocked server download (403). Use npm run sync:workouts or host GPX on a raw-file URL.",
      );
    }

    throw new Error(`Failed to fetch public OneDrive file (${response.status}).`);
  }

  const text = await response.text();

  if (text.trimStart().startsWith("<!DOCTYPE") || text.trimStart().startsWith("<html")) {
    throw new Error(
      "OneDrive returned a web page instead of a file. Server-side fetch is not supported for this share link — use npm run sync:workouts.",
    );
  }

  return {
    text,
    lastModified: response.headers.get("last-modified"),
  };
}

export async function fetchPublicText(url: string): Promise<string> {
  const file = await fetchPublicFile(url);
  return file.text;
}

export function extractFilenameFromUrl(url: string): string | null {
  try {
    const decoded = decodeURIComponent(url);
    const match = decoded.match(/\d{4}-\d{2}-\d{2}-\d{6}-Outdoor-Running[^/?#]*\.gpx/i);
    return match?.[0] ?? null;
  } catch {
    return null;
  }
}

import { healthfit } from "@/resources";

interface ManifestPayload {
  latestGpxUrl?: string;
  gpxUrls?: string[];
}

const FOLDER_ONLY_ERROR =
  "Your HealthFit folder is linked, but the site needs a direct GPX file download link — not the folder link. In OneDrive, right-click a .gpx file → Share → copy link → add ?download=1 to ONEDRIVE_HEALTHFIT_LATEST_GPX_URL in .env.local (or add it to healthfit.gpxDownloadUrls in content.js).";

export async function resolveGpxDownloadUrls(): Promise<{
  urls: string[];
  folderViewUrl: string | null;
  error?: string;
}> {
  const folderViewUrl =
    process.env.ONEDRIVE_HEALTHFIT_FOLDER_URL?.trim() ||
    process.env.ONEDRIVE_WORKOUTS_SHARE_URL?.trim() ||
    healthfit.folderUrl ||
    null;

  const manifestUrl = process.env.ONEDRIVE_HEALTHFIT_MANIFEST_URL?.trim();
  const latestUrl = process.env.ONEDRIVE_HEALTHFIT_LATEST_GPX_URL?.trim();
  const configuredUrls = parseConfiguredUrls(process.env.ONEDRIVE_HEALTHFIT_GPX_URLS);
  const contentUrls = (healthfit.gpxDownloadUrls ?? []).map(toDirectDownloadUrl);

  if (manifestUrl) {
    try {
      const manifestText = await fetchPublicText(manifestUrl);
      const trimmed = manifestText.trim();

      if (trimmed.startsWith("{")) {
        const manifest = JSON.parse(trimmed) as ManifestPayload;
        const fromManifest = [
          ...(manifest.latestGpxUrl ? [manifest.latestGpxUrl] : []),
          ...(manifest.gpxUrls ?? []),
        ].map(toDirectDownloadUrl);

        if (fromManifest.length > 0) {
          return { urls: fromManifest, folderViewUrl };
        }
      }

      const lines = trimmed
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map(toDirectDownloadUrl);

      if (lines.length > 0) {
        return { urls: lines, folderViewUrl };
      }
    } catch (error) {
      return {
        urls: [],
        folderViewUrl,
        error: error instanceof Error ? error.message : "Failed to read HealthFit manifest.",
      };
    }
  }

  const urls = [
    ...(latestUrl ? [toDirectDownloadUrl(latestUrl)] : []),
    ...configuredUrls,
    ...contentUrls,
  ];

  if (urls.length === 0 && folderViewUrl) {
    return { urls: [], folderViewUrl, error: FOLDER_ONLY_ERROR };
  }

  return { urls, folderViewUrl };
}
