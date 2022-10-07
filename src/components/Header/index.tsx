import { Box, Heading } from "native-base";
import { styles } from "./styles";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <Box style={styles.container}>
      <Heading style={styles.title}>{title}</Heading>
    </Box>
  );
}
