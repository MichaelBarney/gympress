import { Button } from "@mui/material";
import styled from "styled-components";
import { colors } from "../theme";

export const StyledButton = styled(Button)`
  border: 3px solid ${colors.green};
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  color: ${colors.green};

  :hover {
    border-color: ${colors.darkGreen};
    color: ${colors.darkGreen};
    background-color: ${colors.black};
  }
`;
