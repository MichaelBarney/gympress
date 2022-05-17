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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { SessionAction, SessionActionKind } from "../../store/sessionReducer";
import { ModalBox } from "../../../../styles/ModalBox";
import { StyledButton } from "../../../../styles/StyledButton";
import { ExerciseStatus, Session } from "../../store/exercise";

interface ExerciseModalDTO {
  open: boolean;
  onClose(): any;
  dispatcher: React.Dispatch<SessionAction>;
  currentSessionNumber: number;
  sessions: Session[];
}

const NewExerciseModal = (props: ExerciseModalDTO) => {
  const { currentSessionNumber, onClose, open, dispatcher, sessions } = props;

  const [exerciseName, setExerciseName] = useState<string>();
  const [exerciseDescription, setExerciseDescription] = useState<string>();
  const [exerciseWeight, setExerciseWeight] = useState<number>();
  const [exerciseReps, setExerciseReps] = useState<number>();
  const [exerciseSeries, setExerciseSeries] = useState<number>();
  const [sessionNumber, setSessionNumber] =
    useState<number>(currentSessionNumber);

  useEffect(() => {
    return () => {
      console.log("Did Unmount");
    };
  }, []);
  console.log(exerciseName);

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <Modal open={open} onClose={onClose}>
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
          New Exercise
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Exercise Name"
            variant="outlined"
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
              required
              onChange={(e) => {
                setExerciseSeries(parseInt(e.target.value));
              }}
              type="number"
              style={{ width: "50%" }}
            />
          </div>
          <StyledButton
            type="submit"
            style={{ width: "100%", marginTop: 16 }}
            color="secondary"
            variant="contained"
          >
            Add
          </StyledButton>
        </form>
      </ModalBox>
    </Modal>
  );
};

export default NewExerciseModal;
