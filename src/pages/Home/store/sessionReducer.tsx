import { ExerciseStatus, Session } from "./exercise";

export enum SessionActionKind {
  ADD_EXERCISE = "add-exercise",
  COMPLETE_EXERCISE = "complete-exercise",
  ADD_SESSION = "add-session",
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
      localStorage.setItem("sessions", JSON.stringify(newState));
      return newState;
    }
    case SessionActionKind.COMPLETE_EXERCISE: {
      const { exerciseNumber, sessionNumber, status } = payload;

      const newState: Session[] = state.map((session, sessionIndex) => {
        if (sessionIndex === sessionNumber) {
          return {
            ...state[sessionIndex],
            exercises: state[sessionIndex].exercises.map((exercise, index) => {
              if (index === exerciseNumber) {
                return {
                  ...exercise,
                  status,
                };
              } else return exercise;
            }),
          };
        } else return session;
      });
      localStorage.setItem("sessions", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};
