import { TextField } from "@mui/material";
import styled from "styled-components";

export const SessionTitle = styled(TextField)`
  margin-top: 32px;

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
`;
