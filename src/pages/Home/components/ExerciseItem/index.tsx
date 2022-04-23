import { Typography, TextField, InputAdornment } from "@mui/material";
import {
  Component,
  createRef,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Exercise, ExerciseStatus } from "../../store/exercise";
import { StyledExercise } from "./style";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { StyledButton } from "../../../../styles/StyledButton";

interface ExerciseItemProps {
  exercise: Exercise;
  viewOrder: number;
  onClick(): any;
}

const ExerciseItem = (props: ExerciseItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const { exercise, onClick } = props;

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
  }, [exercise]);

  return (
    <StyledExercise
      onClick={() => {
        if (exercise.status == ExerciseStatus.INCOMPLETE) {
          setExpanded(!expanded);
        } else {
          onClick();
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
              value={exercise.currentWeightKg}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kg</InputAdornment>
                ),
              }}
              required
              type="number"
              style={{ width: "50%" }}
            />
            <TextField
              label="Reps"
              variant="outlined"
              required
              type="number"
              style={{ width: "50%" }}
              value={exercise.reps}
            />
          </div>
          <StyledButton
            type="submit"
            style={{ width: "100%", marginBottom: 8, marginTop: 16 }}
            color="secondary"
            onClick={onClick}
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

      {!expanded && (
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
    </StyledExercise>
  );
};

export default ExerciseItem;
