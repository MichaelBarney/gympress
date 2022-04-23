import { Exercise, ExerciseStatus, Session } from "../../store/exercise";
import { SessionAction, SessionActionKind } from "../../store/sessionReducer";
import { StyledList } from "./style";
import { Component, ReactChild } from "react";
import ExerciseItem from "../ExerciseItem";

interface ExerciseListProps {
  currentSession: Session | undefined;
  dispatcher: React.Dispatch<SessionAction>;
  sessionNumber: number;
}
const ExerciseList = (props: ExerciseListProps) => {
  const { currentSession, sessionNumber, dispatcher } = props;

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

  return (
    <StyledList>
      {exercisesView?.map((exercise, index) => {
        return (
          <ExerciseItem
            exercise={exercise}
            key={exercise.name}
            viewOrder={index}
            onClick={() => {
              console.log("Complete");
              dispatcher({
                type: SessionActionKind.COMPLETE_EXERCISE,
                payload: {
                  exerciseNumber: exercise.originalIndex,
                  sessionNumber,
                  status:
                    exercise.status == ExerciseStatus.INCOMPLETE
                      ? ExerciseStatus.INCREASED
                      : ExerciseStatus.INCOMPLETE,
                },
              });
            }}
          />
        );
      })}
    </StyledList>
  );
};

export default ExerciseList;
