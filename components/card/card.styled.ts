import styled from "styled-components/native";

export const Card = styled.View<{ width: string }>`
  margin: 5px;
  padding: 20px;
  height: 75px;
  border-color: #bdbdbdff;
  border-width: 2px;
  border-radius: 10px;
  width: ${({ width }) => width};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
