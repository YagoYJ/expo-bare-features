import * as React from "react";
import { GestureResponderEvent } from "react-native";
import { Button } from "native-base";

import { IButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";

interface MainButtonProps extends IButtonProps {
  text: string;
  handlePress: (event: GestureResponderEvent) => void;
}

export function MainButton({ text, handlePress, ...rest }: MainButtonProps) {
  return (
    <Button
      onPress={handlePress}
      w="100%"
      size="lg"
      fontWeight="bold"
      rounded="full"
      textAlign="center"
      {...rest}
    >
      {text}
    </Button>
  );
}
