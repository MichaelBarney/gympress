import {
  Button,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { SessionAction, SessionActionKind } from "../../store/sessionReducer";
import { ModalBox } from "../../../../styles/ModalBox";
import { StyledButton } from "../../../../styles/StyledButton";
import { ExerciseStatus } from "../../store/exercise";

interface ExerciseModalDTO {
  open: boolean;
  onClose(): any;
  dispatcher: React.Dispatch<SessionAction>;
  sessionNumber: number;
}

const NewExerciseModal = (props: ExerciseModalDTO) => {
  const { sessionNumber, onClose, open, dispatcher } = props;

  const [exerciseName, setExerciseName] = useState<string>();
  const [exerciseDescription, setExerciseDescription] = useState<string>();
  const [exerciseWeight, setExerciseWeight] = useState<number>();
  const [exerciseReps, setExerciseReps] = useState<number>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (exerciseName && exerciseReps && exerciseWeight) {
      dispatcher({
        type: SessionActionKind.ADD_EXERCISE,
        payload: {
          name: exerciseName,
          currentWeightKg: exerciseWeight,
          reps: exerciseReps,
          sessionNumber,
        },
      });

      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox>
        <Typography variant="h6" component="h2" style={{ marginBottom: 16 }}>
          New Exercise
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Name"
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kg</InputAdornment>
                ),
              }}
              required
              onChange={(e) => {
                setExerciseWeight(parseInt(e.target.value));
              }}
              type="number"
              style={{ width: "50%" }}
            />
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
          </div>
          <StyledButton
            type="submit"
            style={{ width: "100%", marginTop: 16 }}
            color="secondary"
          >
            Add Exercise
          </StyledButton>
        </form>
      </ModalBox>
    </Modal>
  );
};

export default NewExerciseModal;
