import { ExerciseStatus, Session } from "./exercise";

export enum SessionActionKind {
  ADD_EXERCISE = "add-exercise",
  DELETE_EXERCISE = "delete-exercise",
  COMPLETE_EXERCISE = "complete-exercise",
  EDIT_EXERCISE = "edit-exercise",
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
      const {
        name,
        currentWeightKg,
        reps,
        series,
        sessionNumber,
        description,
      } = payload;

      const exerciseToAdd = {
        status: ExerciseStatus.INCOMPLETE,
        name,
        currentWeightKg,
        reps,
        series,
        description,
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

    case SessionActionKind.EDIT_SESSION: {
      const { sessionName, sessionNumber, sessionToEdit } = payload;
      const newState: Session[] = state.map((session, index) => {
        if (index == sessionNumber) {
          return {
            name: sessionName,
            exercises: sessionToEdit.exercises,
          };
        }
        return session;
      });
      console.log("ADDED SESSION");

      localStorage.setItem("sessions", JSON.stringify(newState));
      return newState;
    }

    case SessionActionKind.DELETE_SESSION: {
      const { sessionNumber } = payload;
      const newState: Session[] = state.filter((session, index) => {
        return index != sessionNumber;
      });
      console.log("DELETE SESSION");

      localStorage.setItem("sessions", JSON.stringify(newState));
      return newState;
    }

    case SessionActionKind.COMPLETE_EXERCISE: {
      const { exerciseNumber, sessionNumber, newWeight, newDifficulty } =
        payload;

      const newState: Session[] = state.map((session, sessionIndex) => {
        if (sessionIndex === sessionNumber) {
          return {
            ...state[sessionIndex],
            exercises: state[sessionIndex].exercises.map((exercise, index) => {
              if (index === exerciseNumber) {
                return {
                  ...exercise,
                  currentWeightKg: newWeight,
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
      console.log("COMPLETED ", newState);
      localStorage.setItem("sessions", JSON.stringify(newState));
      return newState;
    }

    case SessionActionKind.EDIT_EXERCISE: {
      const {
        name,
        currentWeightKg,
        reps,
        series,
        sessionNumber,
        exerciseToEdit,
        description,
      } = payload;

      console.log("EDIT EXERCISE");
      const newState: Session[] = state.map((session, sessionIndex) => {
        if (sessionIndex === sessionNumber) {
          return {
            ...state[sessionIndex],
            exercises: state[sessionIndex].exercises.map((exercise, index) => {
              if (index === exerciseToEdit) {
                return {
                  ...exercise,
                  currentWeightKg,
                  name,
                  reps,
                  series,
                  description,
                };
              } else return exercise;
            }),
          };
        } else return session;
      });
      console.log("EDITED EXERCISE ", newState);
      localStorage.setItem("sessions", JSON.stringify(newState));
      return newState;
    }

    case SessionActionKind.DELETE_EXERCISE: {
      const { exerciseNumber, sessionNumber } = payload;

      const newState: Session[] = state.map((session, sessionIndex) => {
        if (sessionIndex === sessionNumber) {
          return {
            ...state[sessionIndex],
            exercises: state[sessionIndex].exercises.filter(
              (exercise, index) => {
                if (index === exerciseNumber) {
                  return false;
                } else return true;
              }
            ),
          };
        } else return session;
      });
      console.log("DELETED");
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
