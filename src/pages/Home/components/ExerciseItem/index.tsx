import {
  Typography,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Exercise, ExerciseStatus } from "../../store/exercise";
import { StyledExercise } from "./style";

import { StyledButton } from "../../../../styles/StyledButton";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

import { colors } from "../../../../theme";

interface ExerciseItemProps {
  exercise: Exercise;
  viewOrder: number;
  expanded: boolean;
  expand(): any;
  complete(
    newWeight: number,
    reps: number,
    series: number,
    difficulty: number
  ): any;
}

const ExerciseItem = (props: ExerciseItemProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { exercise, expand, expanded, viewOrder, complete } = props;

  const [weight, setWeight] = useState(exercise.currentWeightKg);
  const [reps, setReps] = useState(exercise.reps);
  const [series, setSeries] = useState(exercise.series);

  const [difficulty, setDifficulty] = useState(exercise.difficulty);

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
              marginBottom: 16,
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
            <TextField
              label="Series"
              variant="outlined"
              required
              type="number"
              style={{ width: "50%" }}
              defaultValue={series}
              onChange={(e) => {
                setSeries(parseInt(e.target.value));
              }}
            />
          </div>
          <Typography align="center" style={{ marginBottom: 4 }}>
            Difficulty
          </Typography>
          <ToggleButtonGroup
            value={difficulty}
            exclusive
            onChange={(e, newDifficulty) => {
              setDifficulty(newDifficulty);
            }}
            fullWidth
            color="secondary"
          >
            <ToggleButton value={1} style={{ padding: "4px 0px" }}>
              1
            </ToggleButton>
            <ToggleButton value={2} style={{ padding: "4px 0px" }}>
              2
            </ToggleButton>
            <ToggleButton value={3} style={{ padding: "4px 0px" }}>
              3
            </ToggleButton>
            <ToggleButton value={4} style={{ padding: "4px 0px" }}>
              4
            </ToggleButton>
            <ToggleButton value={5} style={{ padding: "4px 0px" }}>
              5
            </ToggleButton>
          </ToggleButtonGroup>

          <StyledButton
            type="submit"
            style={{ width: "100%", marginBottom: 8, marginTop: 24 }}
            color="secondary"
            onClick={() => {
              if (difficulty && weight && reps) {
                complete(weight, reps, series, difficulty);
              }
            }}
            variant="contained"
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
          {exercise.currentWeightKg}kg | {exercise.reps} reps |{" "}
          {exercise.series}x
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
        <CheckCircleOutlineIcon
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
