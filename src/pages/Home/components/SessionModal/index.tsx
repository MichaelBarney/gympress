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
import { Session } from "../../store/exercise";

export enum SESSION_MODAL_STATE {
  CLOSED = "closed",
  NEW = "new",
  EDIT = "edit",
}
interface ExerciseModalDTO {
  state: SESSION_MODAL_STATE;
  onClose(): any;
  dispatcher: React.Dispatch<SessionAction>;
  onAdded(): any;
  onDelete(): any;
  sessionToEdit?: Session;
}

const NewSessionModal = (props: ExerciseModalDTO) => {
  const [sessionName, setSessionName] = useState<string>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (sessionName) {
      if (props.state == SESSION_MODAL_STATE.NEW) {
        props.dispatcher({
          type: SessionActionKind.ADD_SESSION,
          payload: {
            sessionName,
            sessionToEdit: props.sessionToEdit,
          },
        });
        props.onAdded();
      } else {
        props.dispatcher({
          type: SessionActionKind.EDIT_SESSION,
          payload: {
            sessionName,
            sessionToEdit: props.sessionToEdit,
          },
        });
      }

      props.onClose();
    }
  };

  const handleDelete = () => {
    props.dispatcher({
      type: SessionActionKind.DELETE_SESSION,
      payload: {
        sessionToDelete: props.sessionToEdit,
      },
    });
    props.onDelete();
    props.onClose();
  };

  return (
    <Modal
      open={props.state != SESSION_MODAL_STATE.CLOSED}
      onClose={props.onClose}
    >
      <ModalBox>
        <Typography variant="h5" style={{ marginBottom: 24, fontWeight: 600 }}>
          {props.state == SESSION_MODAL_STATE.NEW
            ? "New Session"
            : "Edit Session"}
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Session Name"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setSessionName(e.target.value);
            }}
            defaultValue={
              props.state == SESSION_MODAL_STATE.EDIT
                ? props.sessionToEdit?.name
                : null
            }
          />
          <Typography style={{ fontSize: 12, marginTop: 4, opacity: 0.75 }}>
            Ex: Leg Day
          </Typography>

          <StyledButton
            type="submit"
            fullWidth
            style={{ marginTop: 16 }}
            variant="contained"
            color="secondary"
          >
            {props.state == SESSION_MODAL_STATE.NEW ? "Create Session" : "Done"}
          </StyledButton>

          {props.state == SESSION_MODAL_STATE.EDIT && (
            <StyledButton
              fullWidth
              variant="outlined"
              color="error"
              style={{ marginTop: 8 }}
              onClick={handleDelete}
            >
              Delete
            </StyledButton>
          )}
        </form>
      </ModalBox>
    </Modal>
  );
};

export default NewSessionModal;
