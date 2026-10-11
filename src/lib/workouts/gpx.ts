export type LatLngPoint = [latitude: number, longitude: number];

export interface WorkoutRoute {
  path: string;
  viewBox: string;
}

const VIEWBOX_SIZE = 100;
const ROUTE_PADDING = 6;
const MAX_ROUTE_POINTS = 240;

export function parseGpxTrackPoints(gpx: string): LatLngPoint[] {
  const points: LatLngPoint[] = [];
  const regex = /<trkpt lat="([^"]+)" lon="([^"]+)"/g;
  let match = regex.exec(gpx);

  while (match) {
    const latitude = Number.parseFloat(match[1]);
    const longitude = Number.parseFloat(match[2]);

    if (!Number.isNaN(latitude) && !Number.isNaN(longitude)) {
      points.push([latitude, longitude]);
    }

    match = regex.exec(gpx);
  }

  return points;
}

export function parseGpxTimes(gpx: string): string[] {
  const times: string[] = [];
  const regex = /<time>([^<]+)<\/time>/g;
  let match = regex.exec(gpx);

  while (match) {
    times.push(match[1]);
    match = regex.exec(gpx);
  }

  return times;
}

export function parseGpxStartTime(gpx: string): string | null {
  const metadataMatch = gpx.match(/<metadata>[\s\S]*?<time>([^<]+)<\/time>/i);
  if (metadataMatch?.[1]) {
    return metadataMatch[1];
  }

  const times = parseGpxTimes(gpx);
  return times[0] ?? null;
}

export function parseGpxActivityName(gpx: string): string | null {
  const trackMatch = gpx.match(/<trk>[\s\S]*?<name>([^<]+)<\/name>/i);
  if (trackMatch?.[1]) {
    return trackMatch[1].trim();
  }

  const rootMatch = gpx.match(/<gpx[^>]*>[\s\S]*?<name>([^<]+)<\/name>/i);
  return rootMatch?.[1]?.trim() ?? null;
}

export function parseGpxTimestamp(gpx: string, lastModified: string | null = null): string | null {
  const gpxStart = parseGpxStartTime(gpx);
  if (gpxStart && !Number.isNaN(Date.parse(gpxStart))) {
    return gpxStart;
  }

  if (lastModified && !Number.isNaN(Date.parse(lastModified))) {
    return new Date(lastModified).toISOString();
  }

  return null;
}

export function downsampleRoutePoints(points: LatLngPoint[], maxPoints = MAX_ROUTE_POINTS): LatLngPoint[] {
  if (points.length <= maxPoints) {
    return points;
  }

  const step = Math.ceil(points.length / maxPoints);
  const sampled: LatLngPoint[] = [];

  for (let index = 0; index < points.length; index += step) {
    sampled.push(points[index]);
  }

  const lastPoint = points[points.length - 1];
  const lastSample = sampled[sampled.length - 1];

  if (lastSample[0] !== lastPoint[0] || lastSample[1] !== lastPoint[1]) {
    sampled.push(lastPoint);
  }

  return sampled;
}

export function buildRouteOutline(points: LatLngPoint[]): WorkoutRoute | null {
  if (points.length < 2) {
    return null;
  }

  const sampled = downsampleRoutePoints(points);
  const latitudes = sampled.map(([latitude]) => latitude);
  const longitudes = sampled.map(([, longitude]) => longitude);

  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);

  const latRange = maxLat - minLat || 0.0001;
  const lngRange = maxLng - minLng || 0.0001;
  const drawableSize = VIEWBOX_SIZE - ROUTE_PADDING * 2;

  const path = sampled
    .map(([latitude, longitude], index) => {
      const x = ROUTE_PADDING + ((longitude - minLng) / lngRange) * drawableSize;
      const y = ROUTE_PADDING + (1 - (latitude - minLat) / latRange) * drawableSize;
      const command = index === 0 ? "M" : "L";
      return `${command}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return {
    path,
    viewBox: `0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`,
  };
}

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

export function calculateRouteDistanceMeters(points: LatLngPoint[]): number {
  let total = 0;

  for (let index = 1; index < points.length; index += 1) {
    total += haversineMeters(points[index - 1], points[index]);
  }

  return total;
}

export function calculateDurationSeconds(times: string[]): number | null {
  if (times.length < 2) {
    return null;
  }

  const start = Date.parse(times[0]);
  const end = Date.parse(times[times.length - 1]);

  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) {
    return null;
  }

  return Math.round((end - start) / 1000);
}
