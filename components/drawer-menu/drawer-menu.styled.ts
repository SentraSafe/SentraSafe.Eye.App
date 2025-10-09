import styled from "styled-components/native";

export const DrawerMenuItem = styled.View<{ severity: "critical" | "warning" }>`
  border-radius: 15px;
  border-color: ${({ severity }) =>
    severity === "critical" ? "#ff4848" : "#ffee00"};
  border-width: 1px;
  margin-top: 10px;
  background-color: ${({ severity }) =>
    severity === "critical" ? "#ffa4a4ff" : "#fff893ff"};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 10px;
`;

export const MenuItemButtonWrapper = styled.View`
  height: 100%;
  align-items: center;
`;

export const MenuItemButton = styled.Pressable`
  height: 100%;
  justify-content: center;
  align-items: center;
`;
