import styled from "styled-components/native";

export const Wrapper = styled.View<{ groupSize: number; height: number }>`
  align-items: ${({ groupSize }) => (groupSize > 1 ? "flex-start" : "center")};
  height: 400px;
`;

export const TextWrapper = styled.View`
  flex-direction: row;
  justify-content: start;
  width: 100%;
`;
