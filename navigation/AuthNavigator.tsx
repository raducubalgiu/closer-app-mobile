import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import {
  AuthScreen,
  LoginScreen,
  RegisterScreen,
  RegisterBusinessScreen,
  UsernameScreen,
} from "../screens";

const Stack = createSharedElementStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Username" component={UsernameScreen} />
      <Stack.Screen
        name="RegisterBusiness"
        component={RegisterBusinessScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
