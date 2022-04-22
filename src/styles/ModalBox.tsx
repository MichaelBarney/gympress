import { Box } from "@mui/material";
import styled from "styled-components";
import { colors } from "../theme";

export const ModalBox = styled(Box)`
  position: absolute;
  top: 16%;
  left: 0;
  right: 0;
  margin: auto;
  width: 400px;
  max-width: 80vw;
  border: 2px solid #000;
  box-shadow: 24;
  padding: 16px 16px 32px 16px;
  background-color: ${colors.black};
`;
