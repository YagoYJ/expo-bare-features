import React, { ReactNode } from "react";
import { View } from "react-native";

interface ItemWrapperProps {
  children: ReactNode;
}

export function ItemWrapper({ children }: ItemWrapperProps) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {children}
    </View>
  );
}
