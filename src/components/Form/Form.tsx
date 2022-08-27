import React, { ReactNode } from "react";
import { Platform } from "react-native";
import { KeyboardAvoidingView, ScrollView, VStack } from "native-base";

import { InterfaceKeyboardAvoidingViewProps } from "native-base/lib/typescript/components/basic/KeyboardAvoidingView/types";
import { InterfaceScrollViewProps } from "native-base/lib/typescript/components/basic/ScrollView/types";
import { InterfaceVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";

interface FormProps {
  children: ReactNode;
  formSize?: "normal" | "large";
  keyboardAvoidingViewProps?: InterfaceKeyboardAvoidingViewProps;
  scrollViewProps?: InterfaceScrollViewProps;
  vStackProps?: InterfaceVStackProps;
}

export function Form({
  children,
  formSize = "normal",
  keyboardAvoidingViewProps,
  scrollViewProps,
  vStackProps,
}: FormProps) {
  return (
    <KeyboardAvoidingView
      flex={formSize === "normal" ? 1 : 0}
      w="100%"
      alignItems="center"
      justifyContent="center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      {...keyboardAvoidingViewProps}
    >
      <ScrollView
        flex={formSize === "normal" ? 1 : 0}
        w="100%"
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          flex: formSize === "normal" ? 1 : 0,
          w: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        {...scrollViewProps}
      >
        <VStack
          w="100%"
          space={6}
          my={formSize === "large" ? 10 : 0}
          {...vStackProps}
        >
          {children}
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
