import styled from "styled-components/native";

export const ViewButton = styled.Pressable<{ color: string }>`
  display: flex;
  width: 40px;
  height: 40px;
  border-width: 2px;
  border-color: ${({ color }) => color};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
