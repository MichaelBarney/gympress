import { ExerciseStatus, Session } from "./exercise";

export enum SessionActionKind {
  ADD_EXERCISE = "add-exercise",
  COMPLETE_EXERCISE = "complete-exercise",
  ADD_SESSION = "add-session",
  CLEAR_SESSION = "clear-session",
}

export interface SessionAction {
  type: SessionActionKind;
  payload: any;
}

export const sessionsReducer = (state: Session[], action: SessionAction) => {
  const { type, payload } = action;
  switch (type) {
    case SessionActionKind.ADD_EXERCISE: {
      const { name, currentWeightKg, reps, sessionNumber } = payload;

      const exerciseToAdd = {
        status: ExerciseStatus.INCOMPLETE,
        name,
        currentWeightKg,
        reps,
      };
      const newState: Session[] = state.map((session, index) => {
        if (index === sessionNumber) {
          return {
            ...state[index],
            exercises: [...state[index].exercises, exerciseToAdd],
          };
        } else return session;
      });
      console.log("ADDED EXERCISE");

      localStorage.setItem("sessions", JSON.stringify(newState));
      return newState;
    }
    case SessionActionKind.ADD_SESSION: {
      const { sessionName } = payload;
      const newState: Session[] = [
        ...state,
        {
          name: sessionName,
          exercises: [],
        },
      ];
      console.log("ADDED SESSION");

      localStorage.setItem("sessions", JSON.stringify(newState));
      return newState;
    }
    case SessionActionKind.COMPLETE_EXERCISE: {
      const { exerciseNumber, sessionNumber, newWeight, newReps } = payload;

      const newState: Session[] = state.map((session, sessionIndex) => {
        if (sessionIndex === sessionNumber) {
          return {
            ...state[sessionIndex],
            exercises: state[sessionIndex].exercises.map((exercise, index) => {
              if (index === exerciseNumber) {
                return {
                  ...exercise,
                  weight: newWeight,
                  reps: newReps,
                  status:
                    newWeight > exercise.currentWeightKg
                      ? ExerciseStatus.INCREASED
                      : newWeight < exercise.currentWeightKg
                      ? ExerciseStatus.DECREASED
                      : ExerciseStatus.MAINTAINED,
                };
              } else return exercise;
            }),
          };
        } else return session;
      });
      console.log("COMPLETED");
      localStorage.setItem("sessions", JSON.stringify(newState));
      return newState;
    }

    case SessionActionKind.CLEAR_SESSION: {
      const { sessionNumber } = payload;

      const newState: Session[] = state.map((session, sessionIndex) => {
        if (sessionIndex == sessionNumber) {
          return {
            ...state[sessionIndex],
            exercises: state[sessionIndex].exercises.map((exercise) => {
              return {
                ...exercise,
                status: ExerciseStatus.INCOMPLETE,
              };
            }),
          };
        } else return session;
      });
      console.log("CLEARED");
      localStorage.setItem("sessions", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};
