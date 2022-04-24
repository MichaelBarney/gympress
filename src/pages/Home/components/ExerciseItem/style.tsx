import styled from "styled-components";
import { ExerciseStatus } from "../../store/exercise";

export const StyledExercise = styled.div.attrs(
  (props: { status: ExerciseStatus }) => props
)`
  border: ${(props) => props.theme.white} 2px solid;
  padding: 8px 16px;
  border-radius: 12px;
  position: relative;
  margin-bottom: 16px;
  opacity: ${(props) => (props.status == ExerciseStatus.INCOMPLETE ? 1 : 0.5)};

  user-select: none;
  transition: opacity ease 500ms;

  :hover {
    cursor: pointer;
  }
`;
