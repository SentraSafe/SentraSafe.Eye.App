import { Log } from "@/lib/api/logs/logs-api.types";
import { NotificationContext } from "@/lib/hooks/contexts/notification-context";
import { AlarmHubContext } from "@/lib/hooks/contexts/signalr-client.context";
import { Ionicons } from "@expo/vector-icons";
import { HubConnectionState } from "@microsoft/signalr";
import { Link } from "expo-router";
import { FC, use, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import {
  DrawerMenuItem,
  MenuItemButton,
  MenuItemButtonWrapper,
} from "../drawer-menu/drawer-menu.styled";

const NotificationList: FC = () => {
  const connection = use(AlarmHubContext);
  const { notifications, setNotifications } = useContext(NotificationContext);

  useEffect(() => {
    connection?.on("notifications", (payload) =>
      setNotifications((prev) => [...payload, prev])
    );
    console.log(connection);
    if (connection?.state !== HubConnectionState.Connected) return;
    connection?.invoke("SubscribeToNotifications").then((payload: Log[]) => {
      console.log(payload);
      console.log(connection);
      setNotifications(payload);
    });
  }, [setNotifications, connection]);

  return (
    <View>
      {notifications?.map((notification, index) => (
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
            <View>
              <Text>{notification.timeCreated.toLocaleString()}</Text>
              <Text ellipsizeMode="tail">{notification.source}</Text>
            </View>
          </MenuItemButtonWrapper>
          <Link
            href={{
              pathname: "/machines/[machineId]/logs-overview",
              params: {
                machineId: notification.machineId,
              },
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
    </View>
  );
};

export default NotificationList;
