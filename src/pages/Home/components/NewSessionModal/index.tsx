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
  onAdded(): any;
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
      props.onAdded();
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
          />
          <Typography style={{ fontSize: 12, marginTop: 0, opacity: 0.75 }}>
            Ex: Leg Day
          </Typography>
          <StyledButton type="submit" fullWidth style={{ marginTop: 16 }}>
            Create Session
          </StyledButton>
        </form>
      </ModalBox>
    </Modal>
  );
};

export default NewSessionModal;
