import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

import { Home } from "../screens/Home";
import { Others } from "../screens/Others";

export function TabRoutes() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <AntDesign name="home" size={size} color={color} />;
          } else if (route.name === "Others") {
            return <FontAwesome5 name="bars" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#8257E5",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 3,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Others" component={Others} />
    </Tab.Navigator>
  );
}
