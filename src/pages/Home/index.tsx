import {
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { SessionActionKind, sessionsReducer } from "./store/sessionReducer";
import { ALPHABET } from "../../consts";
import AddIcon from "@mui/icons-material/Add";

import NewExerciseModal from "./components/NewExerciseModal";
import NewSessionModal from "./components/NewSessionModal";
import ExerciseList from "./components/ExerciseList";
import { colors } from "../../theme";
import { StyledButton } from "../../styles/StyledButton";
import { Session } from "./store/exercise";
import styled from "styled-components";
import { SessionTitle } from "./style";

const Home = () => {
  const loadedSessionsString = localStorage.getItem("sessions");
  const loadedCurrentSession = localStorage.getItem("currentSession");

  const [exerciseModalOpen, setExerciseModalOpen] = useState<boolean>(false);
  const [sessionModalOpen, setSessionModalOpen] = useState<boolean>(false);

  const [sessions, dispatchSessions] = useReducer(
    sessionsReducer,
    loadedSessionsString ? JSON.parse(loadedSessionsString) : []
  );

  const [currentSession, setCurrentSession] = useState<Session>();
  const [sessionNumber, setSessionNumber] = useState<number>(
    loadedCurrentSession ? parseInt(loadedCurrentSession) : 0
  );

  useEffect(() => {
    console.log("SET CURRENT SESSION ", sessionNumber);
    setCurrentSession(sessions[sessionNumber]);
  }, [sessionNumber, sessions]);

  return (
    <div>
      {currentSession && (
        <>
          <SessionTitle
            label="Today's Session:"
            variant="standard"
            onChange={(e) => {
              if (e.target.value == "new") {
                setSessionModalOpen(true);
              } else {
                setSessionNumber(parseInt(e.target.value));
              }
            }}
            select
            fullWidth
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
            setSessionModalOpen(true);
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

      {sessionModalOpen && (
        <NewSessionModal
          onClose={() => {
            setSessionModalOpen(false);
          }}
          open={sessionModalOpen}
          dispatcher={dispatchSessions}
          onAdded={() => {
            console.log("Added: ", sessions.length);
            setSessionNumber(sessions.length);
          }}
        />
      )}
    </div>
  );
};
export default Home;
