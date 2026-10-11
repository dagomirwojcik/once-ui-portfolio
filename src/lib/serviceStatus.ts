export type ServiceStatusState = "online" | "offline";

export interface MonitoredService {
  id: string;
  name: string;
  label: string;
  url: string;
}

export interface ServiceStatusResult extends MonitoredService {
  status: ServiceStatusState;
  responseTimeMs?: number;
}

export const MONITORED_SERVICES: MonitoredService[] = [
  {
    id: "portfolio",
    name: "Portfolio",
    label: "dagomirwojcik.com",
    url: "https://www.dagomirwojcik.com",
  },
  {
    id: "images",
    name: "Image CDN",
    label: "img.dagomirwojcik.com",
    url: "https://img.dagomirwojcik.com",
  },
  {
    id: "turnstile",
    name: "Contact Form Turnstile",
    label: "challenges.cloudflare.com",
    url: "https://challenges.cloudflare.com/turnstile/v0/api.js",
  },
];

const REQUEST_TIMEOUT_MS = 8000;

function isOnlineResponse(response: Response): boolean {
  // Some endpoints return 404 on the root path while still being reachable.
  return response.status < 500;
}

async function pingUrl(url: string): Promise<{ online: boolean; responseTimeMs: number }> {
  const start = Date.now();
  const attempts: RequestInit[] = [
    { method: "HEAD" },
    { method: "GET", headers: { Range: "bytes=0-0" } },
  ];

  for (const init of attempts) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        ...init,
        signal: controller.signal,
        cache: "no-store",
        redirect: "follow",
      });
      clearTimeout(timeoutId);

      if (isOnlineResponse(response)) {
        return { online: true, responseTimeMs: Date.now() - start };
      }

      if (response.status !== 405 && response.status !== 501) {
        return { online: false, responseTimeMs: Date.now() - start };
      }
    } catch {
      clearTimeout(timeoutId);
    }
  }

  return { online: false, responseTimeMs: Date.now() - start };
}

export async function checkAllServices(): Promise<ServiceStatusResult[]> {
  const results = await Promise.all(
    MONITORED_SERVICES.map(async (service) => {
      const { online, responseTimeMs } = await pingUrl(service.url);
      return {
        ...service,
        status: online ? ("online" as const) : ("offline" as const),
        responseTimeMs,
      };
    }),
  );

  return results;
}
