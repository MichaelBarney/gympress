import { ExerciseStatus, Session } from "../pages/Home/store/exercise";
import { colors } from "../theme";

import { Divider, Typography } from "@mui/material";
import { useCallback, useRef } from "react";
import * as htmlToImage from "html-to-image";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface ShareDTO {
  currentSession: Session;
  onGenerated(): any;
  openSnackbar(): any;
}
const Share = (props: ShareDTO) => {
  const { currentSession, onGenerated, openSnackbar } = props;
  const divRef = useCallback(async (node) => {
    if (node) {
      console.log("a");
      const blob = await htmlToImage.toBlob(node, {
        backgroundColor: colors.black,
      });
      onGenerated();
      console.log("ab");
      if (!blob) return;

      console.log("c");

      if (!("share" in navigator)) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        console.log("Copied to Clipboard");
        openSnackbar();
        return;
      }

      console.log("d");

      // Even if you want to share just one file you need to
      // send them as an array of files.
      const files = [new File([blob], "image.png", { type: blob.type })];
      const shareData = {
        text: "Some text",
        title: "Some title",
        files,
      };
      if (navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
        } catch (err: unknown) {
          console.error(err);
        }
      } else {
        console.warn("Sharing not supported", shareData);
      }
    }
  }, []);

  return (
    <div style={{ padding: "24px 16px", width: "320px" }} ref={divRef}>
      <Typography variant="h4">{currentSession.name}</Typography>
      <Typography variant="subtitle1" style={{ marginBottom: 32 }}>
        {new Date().toLocaleDateString()}
      </Typography>
      {currentSession.exercises.map((exercise) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                marginBottom: 8,
                marginTop: 8,
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={exercise.originalIndex}
            >
              <Typography variant="h5">{exercise.name}</Typography>
              {console.log(exercise.status)}
              {exercise.status == ExerciseStatus.INCOMPLETE && (
                <RadioButtonUncheckedIcon />
              )}

              {exercise.status == ExerciseStatus.INCREASED && (
                <ArrowCircleUpIcon style={{ color: colors.green }} />
              )}

              {exercise.status == ExerciseStatus.DECREASED && (
                <ArrowCircleDownIcon style={{ color: colors.lightRed }} />
              )}
              {exercise.status == ExerciseStatus.MAINTAINED && (
                <CheckCircleOutlineIcon style={{ color: colors.darkGreen }} />
              )}
            </div>
            <Divider />
          </>
        );
      })}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography
          variant="h5"
          color="inherit"
          component="div"
          style={{
            color: colors.white,
            marginTop: 32,
          }}
        >
          <b style={{ color: colors.green }}>Gym</b>Press
        </Typography>
      </div>
    </div>
  );
};

export default Share;
