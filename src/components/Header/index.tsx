import { Box, Heading } from "native-base";
import { styles } from "./styles";

export function Header() {
  return (
    <Box style={styles.container}>
      <Heading style={styles.title}>CRUD - Todo</Heading>
    </Box>
  );
}
