import { Alert, CloseIcon, HStack, IconButton, Text } from "native-base";

interface SuccessAlertProps {
  text: string;
}

export function SuccessAlert({ text }: SuccessAlertProps) {
  return (
    <Alert w="100%" status="success" mt="15">
      <HStack flexShrink={1} space={2} justifyContent="space-between">
        <HStack space={2} flexShrink={1}>
          <Alert.Icon mt="1" />
          <Text fontSize="md" color="coolGray.800">
            {text}
          </Text>
        </HStack>
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
