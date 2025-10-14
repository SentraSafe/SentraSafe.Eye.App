import styled from "styled-components/native";

export const Card = styled.View<{ width: number; height: number }>`
  margin: 5px 0;
  padding: 10px;
  height: 75px;
  border-color: #bdbdbdff;
  border-width: 2px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height - 27}px;
`;
