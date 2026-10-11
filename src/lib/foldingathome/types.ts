export interface FoldingAtHomeDonor {
  name: string;
  id: number;
  score: number;
  wus: number;
  rank: number;
  last: string;
}

export interface FoldingAtHomeStatsResponse {
  configured: boolean;
  donor: FoldingAtHomeDonor | null;
  fetchedAt: string;
  error?: string;
}
