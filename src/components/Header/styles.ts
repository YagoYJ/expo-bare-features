import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(true) + 16,
    paddingHorizontal: 24,
    paddingBottom: 60,
    backgroundColor: "#8257E5",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    color: "#FFF",
    // fontFamily: "Inter-Bold",
  },
});
