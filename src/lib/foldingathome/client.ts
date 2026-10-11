import type { FoldingAtHomeDonor } from "@/lib/foldingathome/types";

const FOLDINGATHOME_API = "https://api2.foldingathome.org";
export const FOLDINGATHOME_DONOR_ID = 1021852;

interface RawDonorResponse {
  name?: string;
  id?: number;
  score?: number;
  wus?: number;
  rank?: number;
  last?: string;
  status?: string;
  error?: string;
}

function normalizeDonor(data: RawDonorResponse): FoldingAtHomeDonor | null {
  if (
    typeof data.id !== "number" ||
    typeof data.score !== "number" ||
    typeof data.wus !== "number"
  ) {
    return null;
  }

  return {
    name: data.name ?? "Unknown",
    id: data.id,
    score: data.score,
    wus: data.wus,
    rank: typeof data.rank === "number" ? data.rank : 0,
    last: data.last ?? "",
  };
}

export async function fetchFoldingAtHomeDonor(
  donorId = FOLDINGATHOME_DONOR_ID,
): Promise<FoldingAtHomeDonor | null> {
  const response = await fetch(`${FOLDINGATHOME_API}/uid/${donorId}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Folding@home API returned ${response.status}`);
  }

  const data = (await response.json()) as RawDonorResponse;

  if (data.status === "error" || data.error) {
    throw new Error(data.error ?? "Folding@home API returned an error");
  }

  return normalizeDonor(data);
}
