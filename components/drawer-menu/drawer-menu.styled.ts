import { severityColor } from "@/lib/helpers/enum-helpers";
import { SeverityEnum } from "@/lib/types/shared";
import styled from "styled-components/native";

export const DrawerMenuItem = styled.View<{ severity: SeverityEnum }>`
  border-radius: 15px;
  border-color: ${({ severity }) =>
    severityColor(severity, "", "#ffee00", "#ff4848")};
  border-width: 1px;
  margin-top: 10px;
  background-color: ${({ severity }) =>
    severityColor(severity, "", "#fff893ff", "#ffa4a4ff")};
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
