import { IconButton, MenuItem, Snackbar, Typography } from "@mui/material";
import { useReducer, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { SessionActionKind, sessionsReducer } from "./store/sessionReducer";
import { ALPHABET } from "../../consts";
import AddIcon from "@mui/icons-material/Add";

import ExerciseModal, {
  EXERCISE_MODAL_STATE,
} from "./components/ExerciseModal";
import SessionModal, { SESSION_MODAL_STATE } from "./components/SessionModal";
import ExerciseList from "./components/ExerciseList";
import { colors } from "../../theme";
import { StyledButton } from "../../styles/StyledButton";
import { Session } from "./store/exercise";
import { SessionTitle } from "./style";

import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import Share from "../../services/shareService";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Home = () => {
  const loadedSessionsString = localStorage.getItem("sessions");
  const loadedCurrentSession = localStorage.getItem("currentSession");

  const [isSharing, setIsSharing] = useState(false);
  const [shareSnackbar, setShareSnackbar] = useState(false);
  const [exerciseModalState, setExerciseModalState] =
    useState<EXERCISE_MODAL_STATE>(EXERCISE_MODAL_STATE.CLOSED);
  const [exerciseToEdit, setExerciseToEdit] = useState<number>();

  const [sessionModalState, setSessionModalState] =
    useState<SESSION_MODAL_STATE>(SESSION_MODAL_STATE.CLOSED);

  const [sessions, dispatchSessions] = useReducer(
    sessionsReducer,
    loadedSessionsString ? JSON.parse(loadedSessionsString) : []
  );

  const [currentSession, setCurrentSession] = useState<Session>();
  const [sessionNumber, setSessionNumber] = useState<number>(
    loadedCurrentSession ? parseInt(loadedCurrentSession) : 0
  );

  useEffect(() => {
    setCurrentSession(sessions[sessionNumber]);
    localStorage.setItem("currentSession", sessionNumber.toString());
  }, [sessionNumber, sessions]);

  return (
    <div style={{ overflowX: "hidden" }}>
      {currentSession && (
        <>
          <IconButton
            color="primary"
            aria-label="Share"
            component="span"
            style={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => {
              setIsSharing(true);
            }}
          >
            <ShareIcon />
          </IconButton>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <SessionTitle
              label="Today's Session:"
              variant="standard"
              onChange={(e) => {
                if (e.target.value == "new") {
                  setSessionModalState(SESSION_MODAL_STATE.NEW);
                } else {
                  setSessionNumber(parseInt(e.target.value));
                }
              }}
              select
              value={sessionNumber}
            >
              {sessions.map((session, index) => (
                <MenuItem key={index} value={index}>
                  {session.name}
                </MenuItem>
              ))}
              <MenuItem key={"new"} value={"new"}>
                <AddIcon />
                &nbsp; New Session
              </MenuItem>
            </SessionTitle>

            <IconButton
              color="primary"
              aria-label="Edit Session"
              component="span"
              style={{ marginBottom: 8 }}
              onClick={() => {
                setSessionModalState(SESSION_MODAL_STATE.EDIT);
              }}
            >
              <EditIcon />
            </IconButton>
          </div>
          <Typography
            style={{ fontSize: 16, color: colors.lightBlack, marginBottom: 32 }}
          >
            {ALPHABET.slice(0, sessions.length).map(
              (letter: string, index: number) => {
                if (index === sessionNumber) {
                  return (
                    <>
                      {index != 0 && " | "}
                      <b style={{ color: colors.green }} key={index}>
                        {letter}
                      </b>
                    </>
                  );
                } else {
                  return index == 0 ? letter : " | " + letter;
                }
              }
            )}
          </Typography>

          <ExerciseList
            currentSession={currentSession}
            sessionNumber={sessionNumber}
            dispatcher={dispatchSessions}
            onEditExercise={(exerciseNumber) => {
              setExerciseToEdit(exerciseNumber);
              setExerciseModalState(EXERCISE_MODAL_STATE.EDIT);
            }}
          />

          <hr style={{ marginTop: 16, opacity: 0.25 }} />

          <StyledButton
            fullWidth
            onClick={() => {
              setExerciseModalState(EXERCISE_MODAL_STATE.NEW);
            }}
            style={{ marginTop: 8, marginBottom: 8 }}
            variant="outlined"
            color="secondary"
          >
            <AddIcon
              style={{
                fontSize: 32,
                position: "absolute",
                left: 16,
              }}
            />
            New Exercise
          </StyledButton>

          <StyledButton
            fullWidth
            onClick={() => {
              dispatchSessions({
                type: SessionActionKind.CLEAR_SESSION,
                payload: { sessionNumber: sessionNumber },
              });
            }}
            style={{ marginTop: 8, marginBottom: 32 }}
            variant="outlined"
            color="primary"
          >
            <RestartAltIcon
              style={{
                fontSize: 32,
                position: "absolute",
                left: 16,
              }}
            />
            Restart Session
          </StyledButton>
        </>
      )}

      {sessions.length == 0 && (
        <StyledButton
          fullWidth
          onClick={() => {
            setSessionModalState(SESSION_MODAL_STATE.NEW);
          }}
          style={{ marginTop: 16 }}
          variant="outlined"
          color="secondary"
        >
          <AddIcon
            style={{
              fontSize: 32,
              position: "absolute",
              left: 16,
            }}
          />
          Add Session
        </StyledButton>
      )}

      {exerciseModalState != EXERCISE_MODAL_STATE.CLOSED && (
        <ExerciseModal
          onClose={() => {
            setExerciseModalState(EXERCISE_MODAL_STATE.CLOSED);
            setExerciseToEdit(undefined);
          }}
          dispatcher={dispatchSessions}
          currentSessionNumber={sessionNumber}
          sessions={sessions}
          state={exerciseModalState}
          exerciseToEdit={exerciseToEdit}
        />
      )}

      {sessionModalState != SESSION_MODAL_STATE.CLOSED && (
        <SessionModal
          onClose={() => {
            setSessionModalState(SESSION_MODAL_STATE.CLOSED);
          }}
          state={sessionModalState}
          dispatcher={dispatchSessions}
          onAdded={() => {
            setSessionNumber(sessions.length);
          }}
          onDelete={() => {
            setSessionNumber(0);
          }}
          sessionToEdit={currentSession}
          sessionNumber={sessionNumber}
        />
      )}

      {currentSession && isSharing && (
        <Share
          currentSession={currentSession}
          onGenerated={() => {
            setIsSharing(false);
          }}
          openSnackbar={() => {
            setShareSnackbar(true);
          }}
        />
      )}
      <Snackbar
        open={shareSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          setShareSnackbar(false);
        }}
        message="Coppied to Clipboard"
      />
    </div>
  );
};
export default Home;
