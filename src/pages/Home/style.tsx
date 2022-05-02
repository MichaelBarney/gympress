import { TextField } from "@mui/material";
import styled from "styled-components";

export const SessionTitle = styled(TextField)`
  margin-top: 32px;
  min-width: 128px;
  & label {
    font-size: 16px;
    color: white;
  }

  & .MuiInputBase-input {
    border: none;
    font-size: 30px;
    line-height: normal;
  }

  & .MuiInput-underline:before {
    border: none;
  }
  & .MuiInput-underline:hover:before {
    border: none;
  }
  & .MuiInput-underline:after {
    border: none;
  }
`;
