export enum ExerciseStatus {
  INCOMPLETE = "incomplete",
  INCREASED = "increased",
  DECREASED = "decreased",
  MAINTAINED = "maintained",
}

export interface Exercise {
  name: string;
  description?: string;
  currentWeightKg: number;
  reps: number;
  series: number;
  status: ExerciseStatus;
  originalIndex?: number;
  difficulty?: number;
}

export interface Session {
  exercises: Exercise[];
  name?: string;
  id: number;
}
