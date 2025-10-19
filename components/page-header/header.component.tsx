import { DrawerHeaderProps, useDrawerStatus } from "@react-navigation/drawer";
import { router } from "expo-router";
import { FC } from "react";
import { Pressable, View } from "react-native";
import PageHeader from "./page-header.component";
import { StyledIcon } from "./page-header.styled";

const DrawerHeader: FC<{ drawerProps: DrawerHeaderProps }> = ({
  drawerProps,
}) => {
  const drawerStatus = useDrawerStatus();

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <PageHeader
        iconType={"notifications"}
        onPress={drawerProps.navigation.openDrawer}
      >
        {router.canGoBack() && drawerStatus === "closed" && (
          <Pressable onPress={() => router.back()}>
            <StyledIcon name="arrow-back"></StyledIcon>
          </Pressable>
        )}
      </PageHeader>
    </View>
  );
};

export default DrawerHeader;
