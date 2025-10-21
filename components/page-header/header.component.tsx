import { NotificationContext } from "@/lib/hooks/contexts/notification-context";
import { DrawerHeaderProps, useDrawerStatus } from "@react-navigation/drawer";
import { router } from "expo-router";
import { FC, use } from "react";
import { Pressable, Text, View } from "react-native";
import PageHeader from "./page-header.component";
import { StyledIcon } from "./page-header.styled";

const DrawerHeader: FC<{ drawerProps: DrawerHeaderProps }> = ({
  drawerProps,
}) => {
  const drawerStatus = useDrawerStatus();
  const { notifications } = use(NotificationContext);

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <PageHeader
        icon={() => (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 100,
                backgroundColor: "#832121",
                color: "#fff",
                width: 18,
                height: 18,
              }}
            >
              {notifications?.length}
            </Text>
            <Pressable
              style={{ alignSelf: "center" }}
              onPress={drawerProps.navigation.openDrawer}
            >
              <StyledIcon name="notifications" />
            </Pressable>
          </View>
        )}
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
