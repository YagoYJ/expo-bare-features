import { Alert, CloseIcon, HStack, IconButton, Text } from "native-base";

interface CustomAlertProps {
  text: string;
  status: "error" | "success" | "warning" | "info";
}

export function CustomAlert({ text, status }: CustomAlertProps) {
  return (
    <Alert w="100%" status={status} mt="15" px="10">
      <HStack
        flexShrink={1}
        space={2}
        alignItems="center"
        justifyContent="space-between"
        px="10"
      >
        <Alert.Icon mr="1" />
        <Text fontSize="md" color="coolGray.800">
          {text}
        </Text>
        <IconButton
          variant="unstyled"
          _focus={{
            borderWidth: 0,
          }}
          icon={<CloseIcon size="3" />}
          _icon={{
            color: "coolGray.600",
          }}
        />
      </HStack>
    </Alert>
  );
}
