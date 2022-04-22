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
  status: ExerciseStatus;
}

export interface Session {
  exercises: Exercise[];
  name?: string;
}
