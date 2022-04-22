import { Typography } from "@mui/material";
import { Exercise, ExerciseStatus, Session } from "../../store/exercise";
import { SessionAction, SessionActionKind } from "../../store/sessionReducer";
import { Checker, StyledList } from "./style";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Component, createRef, ReactChild, RefObject } from "react";
import { findDOMNode } from "react-dom";

interface ExerciseListProps {
  currentSession: Session | undefined;
  dispatcher: React.Dispatch<SessionAction>;
  sessionNumber: number;
  children?: ReactChild[];
}
class ExerciseList extends Component<ExerciseListProps> {
  render() {
    const { currentSession, sessionNumber, dispatcher } = this.props;

    console.log("Exercises: ", currentSession?.exercises);

    return (
      <StyledList>
        {currentSession?.exercises.map((exercise: Exercise, index) => {
          return (
            <ExerciseItem
              exercise={exercise}
              order={index}
              key={exercise.name}
              onClick={() => {
                dispatcher({
                  type: SessionActionKind.COMPLETE_EXERCISE,
                  payload: {
                    exerciseNumber: index,
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
  }
}

interface ExerciseItemProps {
  exercise: Exercise;
  order: number;
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
    if (prevProps.order !== this.props.order) {
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
    if (prevProps.order !== this.props.order && snapshot) {
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
    const { exercise, order, onClick } = this.props;
    return (
      <Checker
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
      </Checker>
    );
  }
}

export default ExerciseList;
