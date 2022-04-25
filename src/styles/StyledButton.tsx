import { Button } from "@mui/material";
import styled from "styled-components";
import { colors } from "../theme";

export const StyledButton = styled(Button)`
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  /* color: ${colors.green}; */
  border-color: ${colors.green};
  border-width: 3px;

  :hover {
    border-width: 3px;
  }
`;
