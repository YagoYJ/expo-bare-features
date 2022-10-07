import React, { ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Pressable, Text, HStack } from "native-base";
import { Entypo } from "@expo/vector-icons";

import { styles } from "./styles";

export type FeatureItem = {
  label: string;
  navigateTo: keyof ReactNavigation.RootParamList;
  icon: ReactNode;
};

export function FeaturesListItem({ icon, label, navigateTo }: FeatureItem) {
  const { navigate } = useNavigation();
  return (
    <Pressable style={styles.container} onPress={() => navigate(navigateTo)}>
      {({ isPressed }) => {
        return (
          <Box
            bg={isPressed ? "coolGray.200" : "coolGray.100"}
            background="#8257E5"
            rounded="md"
            style={{
              ...styles.content,
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
            shadow={3}
          >
            <HStack alignItems="center">
              <Box style={styles.iconContainer}>{icon}</Box>
              <Text color="#fff" fontWeight="medium" fontSize="xl">
                {label}
              </Text>

              <Box ml="auto">
                <Entypo name="chevron-right" size={24} color="#fff" />
              </Box>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
}
