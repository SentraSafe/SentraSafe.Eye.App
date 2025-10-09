import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  /* margin: 20px 20px; */
`;

export const CenteredContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

export const ContainerRight = styled(Container)`
  justify-content: end;
  align-items: center;
`;

export const ContainerLeft = styled(Container)`
  justify-content: start;
  align-items: center;
`;
