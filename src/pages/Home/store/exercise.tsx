export enum ExerciseStatus {
  INCOMPLETE = "incomplete",
  INCREASED = "increased",
  DECREASED = "decreased",
  MAINTAINED = "maintained",
}

export interface Unit {
  name: string;
  symbol: string;
}

export const Units: Unit[] = [
  { name: "Weight", symbol: "Kg" },
  { name: "Weight", symbol: "Lb" },
  { name: "Preassure", symbol: "Psi" },
  { name: "Number", symbol: "Nº" },
  { name: "Time", symbol: "Seconds" },
  { name: "Time", symbol: "Minutes" },
];

export interface Exercise {
  name: string;
  description?: string;
  currentWeight: number;
  reps: number;
  series: number;
  status: ExerciseStatus;
  originalIndex?: number;
  difficulty?: number;
  unitIndex: number;
}

export interface Session {
  exercises: Exercise[];
  name: string;
}
