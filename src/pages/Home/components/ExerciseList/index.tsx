import { Typography } from "@mui/material";
import { Exercise, Session } from "../..";
import { SessionAction, SessionActionKind } from "../../store/sessionReducer";
import { Checker } from "./style";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

interface ExerciseListDTO {
  currentSession: Session | undefined;
  dispatcher: React.Dispatch<SessionAction>;
  sessionNumber: number;
}
const ExerciseList = (props: ExerciseListDTO) => {
  const { currentSession, sessionNumber, dispatcher } = props;
  return (
    <div style={{ marginTop: 32 }}>
      {currentSession?.exercises.map((exercise: Exercise, index) => {
        return (
          <ExerciseItem
            exercise={exercise}
            order={index}
            onClick={() => {
              dispatcher({
                type: SessionActionKind.COMPLETE_EXERCISE,
                payload: {
                  exerciseNumber: index,
                  sessionNumber,
                },
              });
            }}
          />
        );
      })}
    </div>
  );
};

interface ExerciseItemDTO {
  exercise: Exercise;
  order: number;
  onClick(): any;
}

const ExerciseItem = (props: ExerciseItemDTO) => {
  const { exercise, order, onClick } = props;
  return (
    <Checker key={order}>
      <Typography
        variant="h5"
        style={{
          display: "inline",
        }}
      >
        {exercise.name}
      </Typography>

      <Typography
        variant="subtitle1"
        style={{
          fontWeight: 300,
        }}
      >
        {exercise.currentWeightKg}kg | {exercise.reps}x
      </Typography>

      <RadioButtonUncheckedIcon
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 16,
          margin: "auto",
          fontSize: 32,
        }}
      />
    </Checker>
  );
};

export default ExerciseList;
