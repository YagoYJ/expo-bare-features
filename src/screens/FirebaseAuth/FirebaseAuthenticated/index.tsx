import { Box, Button, Heading, Stack, Text } from "native-base";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { useFirebase } from "../../../contexts/FirebaseContext";

export function FirebaseAuthenticated() {
  const user: FirebaseAuthTypes.User = auth().currentUser;

  const { handleSignOut } = useFirebase();

  return (
    <Stack p="10" space={10}>
      <Box>
        <Heading>{user.email}</Heading>
        <Text fontSize="lg" color="green.500">
          Is Logged!
        </Text>
      </Box>

      <Button w="100%" onPress={() => handleSignOut(user.email)}>
        Sign Up
      </Button>
    </Stack>
  );
}
