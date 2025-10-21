import { Log } from "@/lib/api/logs/logs-api.types";
import { NotificationContext } from "@/lib/hooks/contexts/notification-context";
import useSignalR from "@/lib/hooks/signalr-clients/signalr-client-hook";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FC, useContext, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import {
  DrawerMenuItem,
  MenuItemButton,
  MenuItemButtonWrapper,
} from "../drawer-menu/drawer-menu.styled";

const NotificationList: FC = () => {
  const { subscribe } = useSignalR<Log[]>("AlarmHub");
  const { notifications, setNotifications } = useContext(NotificationContext);
  const isSubscribed = useRef(false);

  useEffect(() => {
    if (isSubscribed.current) return;

    const init = async () => {
      try {
        const logs = await subscribe(
          "SubscribeToNotifications",
          null,
          "notifications",
          (payload: Log[]) => {
            setNotifications((prev: Log[]) => {
              const prevArr = Array.isArray(prev) ? prev : [];
              const next = Array.isArray(payload) ? payload : [];
              return [...next, ...prevArr];
            });
          }
        );
        if (logs) setNotifications(logs as Log[]);
        isSubscribed.current = true;
      } catch (e) {
        console.error("Notification subscription failed", e);
      }
    };

    init();
  }, [setNotifications, subscribe]);

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
