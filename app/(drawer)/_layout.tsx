import {
  DrawerMenuItem,
  MenuItemButton,
  MenuItemButtonWrapper,
} from "@/components/drawer-menu/drawer-menu.styled";
import PageHeader from "@/components/page-header/page-header.component";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Link } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type Notification = {
  text: string;
  severity: "critical" | "warning";
  deviceId: string;
};

export default function DrawerLayout() {
  const [notifications, setNotifications] = useState(
    new Array<Notification>(
      { text: "server down", severity: "critical", deviceId: "a" },
      { text: "device malfunctioned", severity: "warning", deviceId: "b" }
    )
  );

  return (
    <Drawer
      drawerContent={(props) => (
        <DrawerContentScrollView style={{ backgroundColor: "#0c1117" }}>
          <View>
            <Pressable onPress={props.navigation.closeDrawer}>
              <Ionicons name="close" size={24} />
            </Pressable>
          </View>

          {notifications.map((notification, index) => (
            <DrawerMenuItem severity={notification.severity} key={index}>
              <MenuItemButtonWrapper
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <MenuItemButton
                  style={{ height: "100%" }}
                  onPress={() =>
                    setNotifications([
                      ...notifications.filter((x) => x !== notification),
                    ])
                  }
                >
                  <Ionicons
                    name="close"
                    style={{
                      fontSize: 15,
                      marginRight: 10,
                    }}
                  />
                </MenuItemButton>
                <Text>{notification.text}</Text>
              </MenuItemButtonWrapper>
              <Link
                href={{
                  pathname: "/device/[deviceId]",
                  params: { deviceId: notification.deviceId },
                }}
              >
                <Ionicons
                  name="log-in-outline"
                  style={{
                    fontSize: 30,
                    marginRight: 10,
                  }}
                />
              </Link>
            </DrawerMenuItem>
          ))}
        </DrawerContentScrollView>
      )}
      screenOptions={{
        drawerPosition: "right",
        header: (props) => (
          <PageHeader
            iconType={"notifications"}
            onPress={props.navigation.openDrawer}
          ></PageHeader>
        ),
      }}
    ></Drawer>
  );
}
