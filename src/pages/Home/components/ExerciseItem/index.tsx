import { Typography } from "@mui/material";
import { Component, createRef, RefObject } from "react";
import { Exercise } from "../../store/exercise";
import { StyledExercise } from "./style";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

interface ExerciseItemProps {
  exercise: Exercise;
  viewOrder: number;
  onClick(): any;
}

class ExerciseItem extends Component<ExerciseItemProps> {
  divRef: RefObject<HTMLDivElement>;

  constructor(props: ExerciseItemProps) {
    super(props);
    this.divRef = createRef();
  }

  getSnapshotBeforeUpdate(prevProps: ExerciseItemProps) {
    console.log("Before Update");
    if (prevProps.viewOrder !== this.props.viewOrder) {
      if (this.divRef?.current) {
        return this.divRef.current.getBoundingClientRect().top;
      }
    }
    return null;
  }

  componentDidUpdate(
    prevProps: ExerciseItemProps,
    prevState: any,
    snapshot: number
  ) {
    console.log("DBG NOW: ", this.props);
    console.log("DBG BEFORE: ", prevProps);
    if (prevProps.viewOrder !== this.props.viewOrder && snapshot) {
      console.log("Changed Order");
      if (this.divRef?.current) {
        let el = this.divRef.current;
        console.log("EL: ", el);
        let newOffset = el.getBoundingClientRect().top;
        let invert = snapshot - newOffset;
        console.log("INVERT: ", invert);
        el.classList.remove("animate-on-transforms");
        el.style.transform = `translateY(${invert}px)`;

        requestAnimationFrame(function () {
          el.classList.add("animate-on-transforms");
          el.style.transform = "";
        });
      }
    }
  }

  render() {
    const { exercise, onClick } = this.props;
    return (
      <StyledExercise
        onClick={onClick}
        status={exercise.status}
        ref={this.divRef}
        data-reactid={exercise.name}
      >
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
      </StyledExercise>
    );
  }
}

export default ExerciseItem;
