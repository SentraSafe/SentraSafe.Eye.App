import { Log } from "@/lib/api/logs/logs-api.types";
import { NotificationContext } from "@/lib/hooks/contexts/notification-context";
import useSignalR from "@/lib/hooks/signalr-clients/signalr-client-hook";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FC, use, useEffect } from "react";
import { Text, View } from "react-native";
import {
  DrawerMenuItem,
  MenuItemButton,
  MenuItemButtonWrapper,
} from "../drawer-menu/drawer-menu.styled";

const NotificationList: FC = () => {
  const { subscribe } = useSignalR<Log[]>("AlarmHub");
  const { notifications, setNotifications } = use(NotificationContext);

  useEffect(() => {
    const init = async () => {
      const logs = await subscribe(
        "SubscribeToAlarms",
        [],
        "notification",
        (payload) => {
          console.log("notifications", payload);
          setNotifications([...notifications, payload]);
        }
      );
      setNotifications(logs);
    };

    init();
  }, []);

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
              <Text>{notification.timeStamp.toLocaleString()}</Text>
              <Text ellipsizeMode="tail">{notification.description}</Text>
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
