import {
  Button,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { SessionAction, SessionActionKind } from "../../store/sessionReducer";
import { ModalBox } from "../../../../styles/ModalBox";
import { StyledButton } from "../../../../styles/StyledButton";

interface ExerciseModalDTO {
  open: boolean;
  onClose(): any;
  dispatcher: React.Dispatch<SessionAction>;
  day: number;
}

const NewSessionModal = (props: ExerciseModalDTO) => {
  const [sessionName, setSessionName] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (sessionName) {
      props.dispatcher({
        type: SessionActionKind.ADD_SESSION,
        payload: {
          sessionName,
        },
      });
      props.onClose();
    }
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ModalBox>
        <Typography variant="h5" style={{ marginBottom: 24, fontWeight: 600 }}>
          New Session
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Session Name"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setSessionName(e.target.value);
            }}
            color="secondary"
          />
          <StyledButton type="submit" fullWidth style={{ marginTop: 16 }}>
            Create Session
          </StyledButton>
        </form>
      </ModalBox>
    </Modal>
  );
};

export default NewSessionModal;
