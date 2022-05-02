import { ExerciseStatus, Session } from "./exercise";

export enum SessionActionKind {
  ADD_EXERCISE = "add-exercise",
  COMPLETE_EXERCISE = "complete-exercise",
  ADD_SESSION = "add-session",
  EDIT_SESSION = "edit-session",
  CLEAR_SESSION = "clear-session",
  DELETE_SESSION = "delete-session",
}

export interface SessionAction {
  type: SessionActionKind;
  payload: any;
}

export const sessionsReducer = (state: Session[], action: SessionAction) => {
  const { type, payload } = action;
  switch (type) {
    case SessionActionKind.ADD_EXERCISE: {
      const { name, currentWeightKg, reps, series, sessionNumber } = payload;

      const exerciseToAdd = {
        status: ExerciseStatus.INCOMPLETE,
        name,
        currentWeightKg,
        reps,
        series,
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
          id: Date.now(),
        },
      ];
      console.log("ADDED SESSION");

      localStorage.setItem("sessions", JSON.stringify(newState));
      return newState;
    }

    case SessionActionKind.EDIT_SESSION: {
      const { sessionName, sessionToEdit } = payload;
      const newState: Session[] = state.map((session) => {
        if (session.id == sessionToEdit.id) {
          return {
            name: sessionName,
            exercises: sessionToEdit.exercises,
            id: session.id,
          };
        }
        return session;
      });
      console.log("ADDED SESSION");

      localStorage.setItem("sessions", JSON.stringify(newState));
      return newState;
    }

    case SessionActionKind.DELETE_SESSION: {
      const { sessionToDelete } = payload;
      const newState: Session[] = state.filter((session) => {
        return session.id != sessionToDelete.id;
      });
      console.log("DELETE SESSION");

      localStorage.setItem("sessions", JSON.stringify(newState));
      return newState;
    }

    case SessionActionKind.COMPLETE_EXERCISE: {
      const {
        exerciseNumber,
        sessionNumber,
        newWeight,
        newReps,
        newDifficulty,
        newSeries,
      } = payload;

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
                  series: newSeries,
                  difficulty: newDifficulty,
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
