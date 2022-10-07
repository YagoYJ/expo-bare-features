import { Box, FlatList } from "native-base";

import { Header } from "../../components/Header";
import { FeaturesListItem } from "../../components/FeaturesListItem";

import { featuresList } from "../../utils/featuesList";

import { styles } from "./styles";

export function Features() {
  return (
    <>
      <Header title="Others features" />

      <Box style={styles.main}>
        <FlatList
          data={featuresList}
          keyExtractor={(item) => item.navigateTo}
          renderItem={({ item }) => (
            <FeaturesListItem
              icon={item.icon}
              label={item.label}
              navigateTo={item.navigateTo}
            />
          )}
        />
      </Box>
    </>
  );
}
