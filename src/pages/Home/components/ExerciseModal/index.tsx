import {
  Button,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { SessionAction, SessionActionKind } from "../../store/sessionReducer";
import { ModalBox } from "../../../../styles/ModalBox";
import { StyledButton } from "../../../../styles/StyledButton";
import { ExerciseStatus, Session } from "../../store/exercise";
import { DeleteOutline } from "@mui/icons-material";

export enum EXERCISE_MODAL_STATE {
  CLOSED = "closed",
  NEW = "new",
  EDIT = "edit",
}

interface ExerciseModalDTO {
  onClose(): any;
  dispatcher: React.Dispatch<SessionAction>;
  currentSessionNumber: number;
  sessions: Session[];
  state: EXERCISE_MODAL_STATE;
  exerciseToEdit?: number;
}

const ExerciseModal = (props: ExerciseModalDTO) => {
  const {
    currentSessionNumber,
    onClose,
    dispatcher,
    sessions,
    exerciseToEdit,
  } = props;

  console.log("Exercise to Edit: ", exerciseToEdit);
  const exerciseToEditData =
    exerciseToEdit != undefined
      ? sessions[currentSessionNumber].exercises[exerciseToEdit]
      : null;

  console.log("ExerciseEdit Data: ", exerciseToEditData);

  const [exerciseName, setExerciseName] = useState<string | undefined>(
    exerciseToEditData?.name
  );
  const [exerciseDescription, setExerciseDescription] = useState<
    string | undefined
  >(exerciseToEditData?.description);
  const [exerciseWeight, setExerciseWeight] = useState<number | undefined>(
    exerciseToEditData?.currentWeightKg
  );
  const [exerciseReps, setExerciseReps] = useState<number | undefined>(
    exerciseToEditData?.reps
  );
  const [exerciseSeries, setExerciseSeries] = useState<number | undefined>(
    exerciseToEditData?.series
  );
  const [sessionNumber, setSessionNumber] =
    useState<number>(currentSessionNumber);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (exerciseName && exerciseReps && exerciseWeight && exerciseSeries) {
      dispatcher({
        type: SessionActionKind.ADD_EXERCISE,
        payload: {
          name: exerciseName,
          currentWeightKg: exerciseWeight,
          reps: exerciseReps,
          series: exerciseSeries,
          sessionNumber,
          description: exerciseDescription,
        },
      });

      onClose();
    }
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();

    if (exerciseName && exerciseReps && exerciseWeight && exerciseSeries) {
      props.dispatcher({
        type: SessionActionKind.EDIT_EXERCISE,
        payload: {
          name: exerciseName,
          currentWeightKg: exerciseWeight,
          reps: exerciseReps,
          series: exerciseSeries,
          sessionNumber,
          description: exerciseDescription,
          exerciseToEdit,
        },
      });

      props.onClose();
    }
  };

  const handleDelete = () => {
    dispatcher({
      type: SessionActionKind.DELETE_EXERCISE,
      payload: {
        exerciseNumber: exerciseToEdit,
        sessionNumber,
      },
    });
    props.onClose();
  };

  return (
    <Modal open={props.state != EXERCISE_MODAL_STATE.CLOSED} onClose={onClose}>
      <ModalBox
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          maxHeight: "90vh",
          margin: "auto",
          height: "fit-content",
        }}
      >
        <Typography variant="h6" component="h2" style={{ marginBottom: 16 }}>
          {props.state == EXERCISE_MODAL_STATE.NEW
            ? "New Exercise"
            : "Edit Exercise"}
        </Typography>

        <form
          noValidate
          autoComplete="off"
          onSubmit={
            props.state == EXERCISE_MODAL_STATE.EDIT ? handleEdit : handleAdd
          }
        >
          <TextField
            label="Exercise Name"
            variant="outlined"
            defaultValue={exerciseToEditData?.name}
            fullWidth
            onChange={(e) => {
              setExerciseName(e.target.value);
            }}
            required
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            defaultValue={exerciseToEditData?.description}
            multiline={true}
            rows={2}
            fullWidth
            onChange={(e) => {
              setExerciseDescription(e.target.value);
            }}
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Weight"
            variant="outlined"
            fullWidth
            defaultValue={exerciseToEditData?.currentWeightKg}
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
            required
            onChange={(e) => {
              setExerciseWeight(parseFloat(e.target.value));
            }}
            type="number"
            style={{ marginBottom: 16 }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 8,
            }}
          >
            <TextField
              label="Reps"
              variant="outlined"
              defaultValue={exerciseToEditData?.reps}
              required
              onChange={(e) => {
                setExerciseReps(parseInt(e.target.value));
              }}
              type="number"
              style={{ width: "50%" }}
            />
            <TextField
              label="Series"
              variant="outlined"
              defaultValue={exerciseToEditData?.series}
              required
              onChange={(e) => {
                setExerciseSeries(parseInt(e.target.value));
              }}
              type="number"
              style={{ width: "50%" }}
            />
          </div>
          {props.state == EXERCISE_MODAL_STATE.EDIT && (
            <IconButton
              color="error"
              aria-label="Delete Session"
              component="span"
              style={{ position: "absolute", top: 8, right: 8 }}
              onClick={handleDelete}
            >
              <DeleteOutline />
            </IconButton>
          )}
          <StyledButton
            type="submit"
            style={{ width: "100%", marginTop: 16 }}
            color="secondary"
            variant="contained"
          >
            {props.state == EXERCISE_MODAL_STATE.NEW ? "Add Exercise" : "Done"}
          </StyledButton>
        </form>
      </ModalBox>
    </Modal>
  );
};

export default ExerciseModal;
