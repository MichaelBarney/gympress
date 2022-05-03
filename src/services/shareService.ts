import html2canvas from "html2canvas";
import { Session } from "./../pages/Home/store/exercise";
import { colors } from "../theme";

import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const share = async (currentSession: Session) => {
  console.log("a");

  const e = document.createElement("div");
  e.style.padding = "16px 16px 32px 16px";
  const title = document.createElement("h1");
  title.textContent = currentSession.name;
  title.style.margin = "0px";
  e.appendChild(title);

  const date = document.createElement("h4");
  date.textContent = new Date().toLocaleDateString();
  date.style.margin = "0px";

  e.appendChild(date);

  for (const exercise of currentSession.exercises) {
    const exerciseName = document.createElement("h2");
    exerciseName.textContent = exercise.name;
    e.appendChild(exerciseName);
  }

  const logo = document.createElement("div");
  logo.innerHTML = `<b style="color:${colors.green}">Gym</b>Press`;
  logo.style.float = "right";
  e.appendChild(logo);

  document.body.appendChild(e);

  const canvas = await html2canvas(e, {
    backgroundColor: colors.black,
  });

  document.body.removeChild(e);

  canvas.toBlob(async (blob) => {
    console.log("ab");
    if (!blob) return;

    console.log("c");

    if (!("share" in navigator)) {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      console.log("Copied to Clipboard");
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
  });
};

export default share;
