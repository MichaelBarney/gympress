import { Typography, TextField, InputAdornment } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Exercise, ExerciseStatus } from "../../store/exercise";
import { StyledExercise } from "./style";

import { StyledButton } from "../../../../styles/StyledButton";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

import { colors } from "../../../../theme";

interface ExerciseItemProps {
  exercise: Exercise;
  viewOrder: number;
  expanded: boolean;
  expand(): any;
  complete(newWeight: number, reps: number): any;
}

const ExerciseItem = (props: ExerciseItemProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { exercise, expand, expanded, viewOrder, complete } = props;

  const [weight, setWeight] = useState(exercise.currentWeightKg);
  const [reps, setReps] = useState(exercise.reps);

  // Animate exercise completion
  const oldY = useRef<number>();
  useEffect(() => {
    const el = divRef.current;
    if (el && oldY.current) {
      const newOffset = el.getBoundingClientRect().top;
      const changeInY = oldY.current - newOffset;
      console.log(changeInY);

      if (changeInY) {
        requestAnimationFrame(() => {
          el.style.transition = "";
          el.style.transform = `translateY(${changeInY}px)`;

          requestAnimationFrame(() => {
            el.style.transition = "transform 500ms ease";
            el.style.transform = "";
          });
        });
      }
    }
    oldY.current = el?.getBoundingClientRect().top;
  }, [viewOrder]);

  return (
    <StyledExercise
      onClick={() => {
        if (exercise.status == ExerciseStatus.INCOMPLETE) {
          expand();
        }
      }}
      status={exercise.status}
      ref={divRef}
    >
      <Typography
        variant="h5"
        style={{
          display: "inline",
        }}
      >
        {exercise.name}
      </Typography>

      {expanded && (
        <div style={{ marginTop: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 8,
            }}
          >
            <TextField
              label="Weight"
              variant="outlined"
              defaultValue={weight}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kg</InputAdornment>
                ),
              }}
              required
              type="number"
              style={{ width: "50%" }}
              onChange={(e) => {
                setWeight(parseInt(e.target.value));
              }}
            />
            <TextField
              label="Reps"
              variant="outlined"
              required
              type="number"
              style={{ width: "50%" }}
              defaultValue={reps}
              onChange={(e) => {
                setReps(parseInt(e.target.value));
              }}
            />
          </div>
          <StyledButton
            type="submit"
            style={{ width: "100%", marginBottom: 8, marginTop: 16 }}
            color="secondary"
            onClick={() => {
              complete(weight, reps);
            }}
          >
            Done!
          </StyledButton>
        </div>
      )}

      {!expanded && (
        <Typography
          variant="subtitle1"
          style={{
            fontWeight: 300,
          }}
        >
          {exercise.currentWeightKg}kg | {exercise.reps}x
        </Typography>
      )}

      {exercise.status == ExerciseStatus.INCOMPLETE && !expanded && (
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
      )}

      {exercise.status == ExerciseStatus.INCREASED && !expanded && (
        <ArrowCircleUpIcon
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 16,
            margin: "auto",
            fontSize: 32,
            color: colors.lightGreen,
          }}
        />
      )}

      {exercise.status == ExerciseStatus.DECREASED && !expanded && (
        <ArrowCircleDownIcon
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 16,
            margin: "auto",
            fontSize: 32,
            color: colors.lightRed,
          }}
        />
      )}

      {exercise.status == ExerciseStatus.MAINTAINED && !expanded && (
        <RadioButtonCheckedIcon
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 16,
            margin: "auto",
            fontSize: 32,
          }}
        />
      )}
    </StyledExercise>
  );
};

export default ExerciseItem;
