import NotificationList from "@/components/notifications/notification-list.component";
import DrawerHeader from "@/components/page-header/header.component";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Pressable, View } from "react-native";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => (
        <DrawerContentScrollView>
          <View>
            <Pressable onPress={props.navigation.closeDrawer}>
              <Ionicons name="close" size={24} />
            </Pressable>
          </View>
          <NotificationList></NotificationList>
        </DrawerContentScrollView>
      )}
      screenOptions={{
        drawerPosition: "right",
        header: (props) => <DrawerHeader drawerProps={props}></DrawerHeader>,
      }}
    ></Drawer>
  );
}
