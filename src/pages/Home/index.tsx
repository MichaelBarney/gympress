import { Button, Typography } from "@mui/material";
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

const Home = () => {
  const loadedDay: number = parseInt(localStorage.getItem("day") || "0");
  const loadedSessionsString = localStorage.getItem("sessions");

  const [day, setDay] = useState<number>(loadedDay);
  const [exerciseModalOpen, setExerciseModalOpen] = useState<boolean>(false);
  const [sessionModalOpen, setSessionModalOpen] = useState<boolean>(false);

  const [sessions, dispatchSessions] = useReducer(
    sessionsReducer,
    loadedSessionsString ? JSON.parse(loadedSessionsString) : []
  );

  const [currentSession, setCurrentSession] = useState<Session>();
  const [sessionNumber, setSessionNumber] = useState<number>(0);

  useEffect(() => {
    const calculatedSessionNumber = day % sessions.length;
    setSessionNumber(calculatedSessionNumber);
    setCurrentSession(sessions[calculatedSessionNumber]);
  }, [day, sessions]);

  if (currentSession)
    return (
      <div>
        <Typography variant="subtitle1" style={{ marginTop: 24 }}>
          Today's Session:
        </Typography>
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          {currentSession?.name}
        </Typography>

        <Typography
          component="p"
          style={{ fontSize: 16, color: colors.lightBlack, marginBottom: 32 }}
        >
          {ALPHABET.slice(0, sessions.length).map(
            (letter: string, index: number) => {
              if (index === sessionNumber) {
                return (
                  <b style={{ color: colors.green }} key={index}>
                    {letter}
                  </b>
                );
              } else {
                return letter + " |";
              }
            }
          )}
        </Typography>

        <ExerciseList
          currentSession={currentSession}
          sessionNumber={day % sessions.length}
          dispatcher={dispatchSessions}
        />

        <StyledButton
          fullWidth
          onClick={() => {
            setExerciseModalOpen(true);
          }}
          style={{ marginTop: 16 }}
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

        <NewExerciseModal
          onClose={() => {
            setExerciseModalOpen(false);
          }}
          open={exerciseModalOpen}
          dispatcher={dispatchSessions}
          sessionNumber={day % sessions.length}
        />
      </div>
    );
  else
    return (
      <div>
        <Typography variant="h4" style={{ marginTop: 32 }}>
          <b>You don't have any sessions yet...</b>
        </Typography>

        <StyledButton
          fullWidth
          onClick={() => {
            setSessionModalOpen(true);
          }}
          style={{ marginTop: 16 }}
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

        <NewSessionModal
          onClose={() => {
            setSessionModalOpen(false);
          }}
          open={sessionModalOpen}
          dispatcher={dispatchSessions}
          day={day}
        />
      </div>
    );
};

export default Home;
