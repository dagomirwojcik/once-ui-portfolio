import type { LatLngPoint } from "@/lib/workouts/gpx";

export interface WorkoutPlaceName {
  name: string;
  source: "park" | "location";
}

interface NominatimReverseResponse {
  name?: string;
  class?: string;
  type?: string;
  display_name?: string;
  address?: Record<string, string | undefined>;
}

interface OverpassElement {
  tags?: { name?: string; leisure?: string };
  center?: { lat: number; lon: number };
}

const USER_AGENT = "once-ui-portfolio-healthfit/1.0";
const PARK_LEISURE = /^(park|recreation_ground|nature_reserve)$/i;
const GENERIC_WORKOUT_NAMES = /^(outdoor\s+)?(running|walking|workout)$/i;

const LOCATION_ADDRESS_KEYS = [
  "suburb",
  "village",
  "neighbourhood",
  "neighborhood",
  "town",
  "city",
  "hamlet",
  "locality",
  "municipality",
  "county",
] as const;

function haversineMeters(a: LatLngPoint, b: LatLngPoint): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const [lat1, lon1] = a;
  const [lat2, lon2] = b;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const rLat1 = toRad(lat1);
  const rLat2 = toRad(lat2);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(dLon / 2) ** 2;

  return 6371000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function computeRouteCentroid(points: LatLngPoint[]): LatLngPoint | null {
  if (points.length === 0) {
    return null;
  }

  const totals = points.reduce(
    (accumulator, [latitude, longitude]) => {
      accumulator.latitude += latitude;
      accumulator.longitude += longitude;
      return accumulator;
    },
    { latitude: 0, longitude: 0 },
  );

  return [totals.latitude / points.length, totals.longitude / points.length];
}

export function sampleRoutePoints(points: LatLngPoint[]): LatLngPoint[] {
  if (points.length === 0) {
    return [];
  }

  const indices = [0, Math.floor(points.length / 2), points.length - 1];
  const sampled: LatLngPoint[] = [];

  for (const index of indices) {
    const point = points[index];
    if (
      !sampled.some(
        ([latitude, longitude]) => latitude === point[0] && longitude === point[1],
      )
    ) {
      sampled.push(point);
    }
  }

  return sampled;
}

export function isGenericWorkoutName(name: string | null | undefined): boolean {
  if (!name?.trim()) {
    return true;
  }

  return GENERIC_WORKOUT_NAMES.test(name.trim());
}

function resolveLocationFromAddress(address: Record<string, string | undefined>): string | null {
  for (const key of LOCATION_ADDRESS_KEYS) {
    const value = address[key]?.trim();
    if (value) {
      return value;
    }
  }

  return null;
}

function pickNearestNamedPark(
  elements: OverpassElement[] | undefined,
  samplePoints: LatLngPoint[],
): string | null {
  const namedParks = (elements ?? [])
    .filter((element) => {
      const name = element.tags?.name?.trim();
      const leisure = element.tags?.leisure ?? "";
      return Boolean(name) && PARK_LEISURE.test(leisure) && element.center;
    })
    .map((element) => {
      const parkCenter: LatLngPoint = [element.center!.lat, element.center!.lon];
      const distance = Math.min(
        ...samplePoints.map((point) => haversineMeters(point, parkCenter)),
      );

      return {
        name: element.tags!.name!.trim(),
        distance,
      };
    })
    .sort((a, b) => a.distance - b.distance);

  const nearest = namedParks[0];
  return nearest && nearest.distance <= 900 ? nearest.name : null;
}

async function fetchNearestParkName(samplePoints: LatLngPoint[]): Promise<string | null> {
  if (samplePoints.length === 0) {
    return null;
  }

  const aroundClauses = samplePoints
    .map(([latitude, longitude]) =>
      `way["leisure"~"park|recreation_ground|nature_reserve"](around:900,${latitude},${longitude});`,
    )
    .join("");

  const query = `[out:json][timeout:15];(${aroundClauses});out center tags;`;

  try {
    const response = await fetch("https://overpass.kumi.systems/api/interpreter", {
      method: "POST",
      body: query,
      headers: {
        "Content-Type": "text/plain",
        "User-Agent": USER_AGENT,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(90000),
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { elements?: OverpassElement[] };
    return pickNearestNamedPark(payload.elements, samplePoints);
  } catch {
    return null;
  }
}

async function fetchLocationName(point: LatLngPoint): Promise<string | null> {
  const [latitude, longitude] = point;
  const reverseUrl = new URL("https://nominatim.openstreetmap.org/reverse");
  reverseUrl.searchParams.set("format", "json");
  reverseUrl.searchParams.set("lat", String(latitude));
  reverseUrl.searchParams.set("lon", String(longitude));
  reverseUrl.searchParams.set("zoom", "14");
  reverseUrl.searchParams.set("addressdetails", "1");

  try {
    const response = await fetch(reverseUrl, {
      headers: { "User-Agent": USER_AGENT },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as NominatimReverseResponse;

    if (payload.class === "leisure" && payload.type === "park" && payload.name?.trim()) {
      return payload.name.trim();
    }

    if (payload.address) {
      const fromAddress = resolveLocationFromAddress(payload.address);
      if (fromAddress) {
        return fromAddress;
      }
    }

    const displaySegment = payload.display_name?.split(",")[0]?.trim();
    if (displaySegment && !/road$|street$|avenue$|lane$/i.test(displaySegment)) {
      return displaySegment;
    }
  } catch {
    return null;
  }

  return null;
}

export async function resolveWorkoutPlaceName(
  points: LatLngPoint[],
): Promise<WorkoutPlaceName | null> {
  const samplePoints = sampleRoutePoints(points);
  const centroid = computeRouteCentroid(points) ?? samplePoints[0];

  if (!centroid) {
    return null;
  }

  const parkName = await fetchNearestParkName(samplePoints);
  if (parkName) {
    return { name: parkName, source: "park" };
  }

  const locationName = await fetchLocationName(samplePoints[0] ?? centroid);
  if (locationName) {
    return { name: locationName, source: "location" };
  }

  return null;
}

export function resolveWorkoutDisplayName(candidates: {
  placeName?: WorkoutPlaceName | null;
  gpxName?: string | null;
  filenameTitle?: string | null;
}): string {
  if (candidates.placeName?.name) {
    return candidates.placeName.name;
  }

  if (!isGenericWorkoutName(candidates.gpxName)) {
    return candidates.gpxName!.trim();
  }

  if (!isGenericWorkoutName(candidates.filenameTitle)) {
    return candidates.filenameTitle!.trim();
  }

  return "Recent Run";
}
