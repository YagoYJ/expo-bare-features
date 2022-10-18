import { Box, Button, Heading, Stack, Text } from "native-base";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export function FirebaseAuthenticated() {
  const user: FirebaseAuthTypes.User = auth().currentUser;

  function handleSignOut() {
    auth().signOut();
  }

  return (
    <Stack p="10" space={10}>
      <Box>
        <Heading>{user.email}</Heading>
        <Text fontSize="lg" color="green.500">
          Is Logged!
        </Text>
      </Box>

      <Button w="100%" onPress={handleSignOut}>
        Sign Up
      </Button>
    </Stack>
  );
}
