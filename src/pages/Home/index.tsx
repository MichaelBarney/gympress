import { IconButton, MenuItem, Typography } from "@mui/material";
import { useReducer, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { sessionsReducer } from "./store/sessionReducer";
import { ALPHABET } from "../../consts";
import AddIcon from "@mui/icons-material/Add";

import NewExerciseModal from "./components/NewExerciseModal";
import SessionModal, { SESSION_MODAL_STATE } from "./components/SessionModal";
import ExerciseList from "./components/ExerciseList";
import { colors } from "../../theme";
import { StyledButton } from "../../styles/StyledButton";
import { Session } from "./store/exercise";
import { SessionTitle } from "./style";

import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import share from "../../services/shareService";

const Home = () => {
  const loadedSessionsString = localStorage.getItem("sessions");
  const loadedCurrentSession = localStorage.getItem("currentSession");

  const [exerciseModalOpen, setExerciseModalOpen] = useState<boolean>(false);
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
  }, [sessionNumber, sessions]);

  const captureElement = useRef(null);

  return (
    <div ref={captureElement}>
      {currentSession && (
        <>
          <IconButton
            color="primary"
            aria-label="Share"
            component="span"
            style={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => {
              share(currentSession);
            }}
          >
            <ShareIcon />
          </IconButton>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
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
          />

          <hr style={{ marginTop: 16, opacity: 0.25 }} />

          <StyledButton
            fullWidth
            onClick={() => {
              setExerciseModalOpen(true);
            }}
            style={{ marginTop: 8, marginBottom: 32 }}
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

      {exerciseModalOpen && (
        <NewExerciseModal
          onClose={() => {
            setExerciseModalOpen(false);
          }}
          open={exerciseModalOpen}
          dispatcher={dispatchSessions}
          currentSessionNumber={sessionNumber}
          sessions={sessions}
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
            console.log("Added: ", sessions.length);
            setSessionNumber(sessions.length);
          }}
          onDelete={() => {
            setSessionNumber(0);
          }}
          sessionToEdit={currentSession}
          sessionNumber={sessionNumber}
        />
      )}
    </div>
  );
};
export default Home;
