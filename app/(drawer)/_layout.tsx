import {
  DrawerMenuItem,
  MenuItemButton,
  MenuItemButtonWrapper,
} from "@/components/drawer-menu/drawer-menu.styled";
import PageHeader from "@/components/page-header/page-header.component";
import useSignalR from "@/lib/hooks/signalr-clients/signalr-client-hook";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Link } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function DrawerLayout() {
  const [notifications, setNotifications] = useState<any[]>([]);

  const { subscribe, unsubscribe } = useSignalR("logs");

  useEffect(() => {
    subscribe(null, "messages", (payload) => {
      setNotifications([...notifications, payload]);
    });

    return () => {
      unsubscribe(null, "messages");
    };
  }, [subscribe, unsubscribe]);

  return (
    <Drawer
      drawerContent={(props) => (
        <DrawerContentScrollView>
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
                  pathname: "/machines/[machineId]",
                  params: { machineId: notification.deviceId },
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
