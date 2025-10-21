import FormButton from "@/components/buttons/form-button.component";
import { LargeHeader } from "@/components/text-elements/text-elements.styled";
import { AuthenticationContext } from "@/lib/hooks/authenitcation/authentication";
import { router, useFocusEffect } from "expo-router";
import { FC, useCallback, useContext, useRef } from "react";
import { Text, View } from "react-native";

const LoginScreen: FC = () => {
  const { authenticate } = useContext(AuthenticationContext);
  const hasRun = useRef(false);

  const callback = useCallback(() => {
    if (hasRun.current) return;

    hasRun.current = true;

    const init = async () => {
      try {
        await authenticate();
        router.dismissTo("/(drawer)");
      } catch (e) {
        console.error("Authentication failed", e);
      }
    };

    init();
  }, [authenticate]);

  useFocusEffect(callback);
  return (
    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
      <LargeHeader>Logger ind...</LargeHeader>
      <Text>Vent et øjeblik – vi arbejder på det.</Text>
      <Text style={{ marginBottom: 10 }}>
        Hvis der ikke sker noget, så tryk på knappen.
      </Text>
      <FormButton
        onPress={() => {
          hasRun.current = false;
          callback();
        }}
      >
        Login
      </FormButton>
    </View>
  );
};

export default LoginScreen;
