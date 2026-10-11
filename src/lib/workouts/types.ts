export interface WorkoutRoute {
  path: string;
  viewBox: string;
}

export interface WorkoutSummary {
  id: string;
  name: string;
  activityType: string;
  startDate: string;
  distanceLabel: string;
  durationLabel: string;
  paceLabel: string;
  route: WorkoutRoute | null;
  sourceUrl: string | null;
}

export interface WorkoutsResponse {
  configured: boolean;
  workouts: WorkoutSummary[];
  fetchedAt: string;
  error?: string;
}
