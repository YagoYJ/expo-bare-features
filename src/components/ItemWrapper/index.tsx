import { ReactNode } from "react";
import { Box } from "native-base";

import { styles } from "./styles";

interface ItemWrapperProps {
  children: ReactNode;
}

export function ItemWrapper({ children }: ItemWrapperProps) {
  return <Box style={styles.container}>{children}</Box>;
}
