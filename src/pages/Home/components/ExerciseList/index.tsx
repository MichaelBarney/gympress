import { Exercise, ExerciseStatus, Session } from "../../store/exercise";
import { SessionAction, SessionActionKind } from "../../store/sessionReducer";
import { StyledList } from "./style";
import { Component, Dispatch, ReactChild, useEffect, useState } from "react";
import ExerciseItem from "../ExerciseItem";

interface ExerciseListProps {
  currentSession: Session | null;
  dispatcher: Dispatch<SessionAction>;
  sessionNumber: number;
}
const ExerciseList = (props: ExerciseListProps) => {
  const { currentSession, sessionNumber, dispatcher } = props;
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);

  const exercisesView = currentSession?.exercises
    .map((exercise, index) => {
      return {
        ...exercise,
        originalIndex: index,
      };
    })
    .sort((a, b) => {
      if (a.status == b.status) {
        return a.originalIndex - b.originalIndex;
      } else if (a.status == ExerciseStatus.INCOMPLETE) {
        return -1;
      } else {
        return 1;
      }
    });

  useEffect(() => {
    setExpandedExercise(getFirstIncompleteExercise(currentSession?.exercises));
  }, [currentSession?.exercises]);

  // useEffect(() => {
  //   clearSession(sessionNumber, dispatcher);
  //   localStorage.clear();
  // }, []);

  return (
    <StyledList>
      {exercisesView?.map((exercise, index) => {
        return (
          <ExerciseItem
            exercise={exercise}
            key={exercise.name}
            viewOrder={index}
            expanded={expandedExercise == exercise.originalIndex}
            expand={() => {
              setExpandedExercise(exercise.originalIndex);
            }}
            complete={(weight, reps) => {
              dispatcher({
                type: SessionActionKind.COMPLETE_EXERCISE,
                payload: {
                  exerciseNumber: exercise.originalIndex,
                  sessionNumber,
                  newWeight: weight,
                  newReps: reps,
                },
              });
            }}
          />
        );
      })}
    </StyledList>
  );
};

const getFirstIncompleteExercise = (
  exercises: Exercise[] | undefined
): number | null => {
  if (!exercises) return null;

  for (const [index, exercise] of exercises.entries()) {
    if (exercise.status == ExerciseStatus.INCOMPLETE) {
      return index;
    }
  }
  return null;
};

const clearSession = (
  sessionNumber: number,
  dispatcher: Dispatch<SessionAction>
) => {
  dispatcher({
    type: SessionActionKind.CLEAR_SESSION,
    payload: {
      sessionNumber,
    },
  });
};

export default ExerciseList;
